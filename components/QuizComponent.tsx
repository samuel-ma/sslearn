"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import confetti from "tsparticles"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

interface QuizComponentProps {
  quizId: string
  quizTitle: string
}

export function QuizComponent({ quizId, quizTitle }: QuizComponentProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    fetchQuestions()
    setStartTime(Date.now())
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !quizCompleted) {
      finishQuiz()
    }
  }, [timeLeft, quizCompleted])

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/api/quiz/${quizId}`)
      const data = await response.json()
      setQuestions(data.questions)
    } catch (error) {
      console.error("Failed to fetch questions:", error)
    }
  }

  const handleAnswerSelection = (answer: string) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestionIndex] = answer
    setSelectedAnswers(newSelectedAnswers)
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleFinishQuiz = () => {
    const newScore = selectedAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc
    }, 0)
    setScore(newScore)
    finishQuiz()
  }

  const finishQuiz = async () => {
    setQuizCompleted(true)
    setEndTime(Date.now())
    try {
      const response = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, score, userName }),
      })
      const data = await response.json()
      console.log(data.message)
    } catch (error) {
      console.error("Failed to submit quiz results:", error)
    }

    if (score > 6) {
      confetti.loadFull().then((engine) => {
        engine.start()
      })
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (questions.length === 0) {
    return <div>Loading...</div>
  }

  if (quizCompleted) {
    const timeTaken = endTime && startTime ? Math.floor((endTime - startTime) / 1000) : 0
    const percentageScore = (score / questions.length) * 100

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{score > 6 ? "Congratulations!" : "Quiz Completed"}</CardTitle>
          <CardDescription>Your results for {quizTitle}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative w-48 h-48 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-blue-600 progress-ring__circle stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentageScore / 100)}`}
              ></circle>
              <text
                x="50"
                y="50"
                fontFamily="Verdana"
                fontSize="20"
                textAnchor="middle"
                alignmentBaseline="middle"
              >{`${percentageScore.toFixed(0)}%`}</text>
            </svg>
          </div>
          <div className="mb-4">
            <Label htmlFor="userName">Enter your name for the leaderboard:</Label>
            <Input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name"
              className="mt-1"
            />
          </div>
          <p className="text-lg font-semibold mb-2">
            Score: {score} out of {questions.length}
          </p>
          <p className="mb-2">Time taken: {formatTime(timeTaken)}</p>
          <p className="mb-4">Average time per question: {formatTime(Math.floor(timeTaken / questions.length))}</p>
          <p className="text-center mb-4">
            {score > 6 ? "Great job! You passed the quiz!" : "Keep practicing to improve your score!"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Button
              onClick={() => {
                setQuizCompleted(false)
                setScore(0)
                setCurrentQuestionIndex(0)
                setSelectedAnswers([])
                setTimeLeft(20 * 60)
                setStartTime(null)
                setEndTime(null)
                setUserName("")
              }}
            >
              Retake This Quiz
            </Button>
            <Link href="/">
              <Button variant="outline">Try Other Quizzes</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardTitle>
        <CardDescription>Time left: {formatTime(timeLeft)}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{currentQuestion.question}</p>
        <RadioGroup onValueChange={handleAnswerSelection} value={selectedAnswers[currentQuestionIndex] || ""}>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        {currentQuestionIndex === questions.length - 1 ? (
          <Button onClick={handleFinishQuiz} disabled={selectedAnswers.length !== questions.length}>
            Finish Quiz
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestionIndex]}>
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

