"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Zap, ArrowRight, Clock } from "lucide-react"
import Link from "next/link"
import confetti from "canvas-confetti"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

const quizOfTheDay: Question[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
  },
  {
    id: 5,
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "South Africa", "Australia", "Brazil"],
    correctAnswer: "Australia",
  },
]

export default function QuizOfTheDayPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(Array(quizOfTheDay.length).fill(""))
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(5 * 60) // 5 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer)
          handleQuizCompletion()
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (quizCompleted && score === quizOfTheDay.length) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [quizCompleted, score])

  const handleAnswerSelection = (answer: string) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestionIndex] = answer
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizOfTheDay.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleQuizCompletion()
    }
  }

  const handleQuizCompletion = () => {
    const newScore = selectedAnswers.reduce((acc, answer, index) => {
      return answer === quizOfTheDay[index].correctAnswer ? acc + 1 : acc
    }, 0)
    setScore(newScore)
    setQuizCompleted(true)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const currentQuestion = quizOfTheDay[currentQuestionIndex]

  if (quizCompleted) {
    const percentage = (score / quizOfTheDay.length) * 100

    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Quiz of the Day - Results</CardTitle>
          <CardDescription>Here's how you did:</CardDescription>
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
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
              ></circle>
              <text
                x="50"
                y="50"
                fontFamily="Verdana"
                fontSize="20"
                textAnchor="middle"
                alignmentBaseline="middle"
              >{`${score}/${quizOfTheDay.length}`}</text>
            </svg>
          </div>
          <p className="text-lg mb-2">
            You scored {score} out of {quizOfTheDay.length} questions correctly.
          </p>
          <p className="text-lg mb-4">Time taken: {formatTime(5 * 60 - timeLeft)}</p>
          <p className="text-lg mb-4">
            {score === quizOfTheDay.length
              ? "Congratulations! You aced the Quiz of the Day!"
              : "Great effort! Keep practicing to improve your score!"}
          </p>
          <Link href="/">
            <Button>
              Return to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center">
          <Zap className="mr-2 h-6 w-6 text-yellow-500" />
          Quiz of the Day
        </CardTitle>
        <CardDescription>
          Question {currentQuestionIndex + 1} of {quizOfTheDay.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Time left: {formatTime(timeLeft)}</p>
          <Clock className="h-6 w-6 text-gray-500" />
        </div>
        <Progress value={(currentQuestionIndex / quizOfTheDay.length) * 100} className="mb-4" />
        <p className="text-lg mb-4">{currentQuestion.question}</p>
        <RadioGroup onValueChange={handleAnswerSelection} value={selectedAnswers[currentQuestionIndex]}>
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-end mt-6">
          <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestionIndex]}>
            {currentQuestionIndex === quizOfTheDay.length - 1 ? "Finish" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

