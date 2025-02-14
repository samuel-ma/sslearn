"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"
import confetti from "canvas-confetti"

// Quiz data for different subjects
const quizData = {
  "general-knowledge": {
    title: "General Knowledge Quiz",
    description: "Test your knowledge across various topics",
    questions: [
      { id: 1, question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correctAnswer: "Paris" },
      { id: 2, question: "Which planet is known as the Red Planet?", options: ["Mars", "Jupiter", "Venus", "Saturn"], correctAnswer: "Mars" },
      { id: 3, question: "What is the largest ocean in the world?", options: ["Atlantic", "Pacific", "Indian", "Arctic"], correctAnswer: "Pacific" },
      { id: 4, question: "Who wrote 'Hamlet'?", options: ["Charles Dickens", "William Shakespeare", "J.K. Rowling", "Mark Twain"], correctAnswer: "William Shakespeare" },
      { id: 5, question: "Which country gifted the Statue of Liberty to the USA?", options: ["France", "Canada", "Germany", "England"], correctAnswer: "France" },
      { id: 6, question: "Which element does 'O' represent on the periodic table?", options: ["Osmium", "Oxygen", "Gold", "Oganesson"], correctAnswer: "Oxygen" },
      { id: 7, question: "In which continent is the Amazon Rainforest located?", options: ["Africa", "Asia", "South America", "Australia"], correctAnswer: "South America" },
      { id: 8, question: "What is the tallest mountain in the world?", options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], correctAnswer: "Mount Everest" },
      { id: 9, question: "Which artist painted the Mona Lisa?", options: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"], correctAnswer: "Leonardo da Vinci" },
      { id: 10, question: "Which is the smallest country in the world?", options: ["Vatican City", "Monaco", "Nauru", "San Marino"], correctAnswer: "Vatican City" },
    ],
  },
  mathematics: {
    title: "Mathematics Quiz",
    description: "Test your mathematical skills",
    questions: [
      { id: 1, question: "What is the square root of 144?", options: ["10", "12", "14", "16"], correctAnswer: "12" },
      { id: 2, question: "What is 15% of 200?", options: ["20", "25", "30", "35"], correctAnswer: "30" },
      { id: 3, question: "Solve: 7 * 8", options: ["54", "56", "58", "60"], correctAnswer: "56" },
      { id: 4, question: "What is 100 divided by 4?", options: ["20", "25", "24", "30"], correctAnswer: "25" },
      { id: 5, question: "What is the value of π (approx)?", options: ["3.14", "2.17", "4.20", "3.00"], correctAnswer: "3.14" },
      { id: 6, question: "What is 9 squared?", options: ["81", "72", "99", "91"], correctAnswer: "81" },
      { id: 7, question: "Solve: 15 + 27", options: ["42", "32", "52", "44"], correctAnswer: "42" },
      { id: 8, question: "What is the perimeter of a square with side 5?", options: ["10", "15", "20", "25"], correctAnswer: "20" },
      { id: 9, question: "What is 3 factorial?", options: ["3", "6", "9", "12"], correctAnswer: "6" },
      { id: 10, question: "Solve: 50 - 15", options: ["35", "40", "30", "25"], correctAnswer: "35" },
    ],
  },
  science: {
    title: "Science Quiz",
    description: "Test your scientific knowledge",
    questions: [
      { id: 1, question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Cu"], correctAnswer: "Au" },
      { id: 2, question: "What is the largest organ in the human body?", options: ["Brain", "Heart", "Skin", "Liver"], correctAnswer: "Skin" },
      { id: 3, question: "What gas do plants absorb from the atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correctAnswer: "Carbon Dioxide" },
      { id: 4, question: "What is H2O commonly known as?", options: ["Hydrogen Peroxide", "Water", "Oxygen", "Salt"], correctAnswer: "Water" },
      { id: 5, question: "What planet is known for its rings?", options: ["Mars", "Saturn", "Jupiter", "Uranus"], correctAnswer: "Saturn" },
      { id: 6, question: "What force keeps us on the ground?", options: ["Magnetism", "Gravity", "Friction", "Inertia"], correctAnswer: "Gravity" },
      { id: 7, question: "What is the primary gas found in the Earth's atmosphere?", options: ["Oxygen", "Hydrogen", "Nitrogen", "Carbon Dioxide"], correctAnswer: "Nitrogen" },
      { id: 8, question: "What is the center of an atom called?", options: ["Electron", "Proton", "Neutron", "Nucleus"], correctAnswer: "Nucleus" },
      { id: 9, question: "Which planet is closest to the sun?", options: ["Earth", "Mercury", "Venus", "Mars"], correctAnswer: "Mercury" },
      { id: 10, question: "What phenomenon causes a rainbow?", options: ["Reflection", "Refraction", "Diffraction", "Dispersion"], correctAnswer: "Dispersion" },
    ],
  },
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutes
  const [timeTaken, setTimeTaken] = useState(0)

  const quizId = params.id as string
  const quiz = quizData[quizId as keyof typeof quizData]

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
    if (!quiz) return; // added guard to prevent undefined access
    if (quizCompleted && score >= quiz.questions.length * 0.8) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [quizCompleted, score, quiz ? quiz.questions.length : 0])

  const handleAnswerSelection = (answer: string) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestionIndex] = answer
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      handleQuizCompletion()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleQuizCompletion = () => {
    const newScore = selectedAnswers.reduce((acc, answer, index) => {
      return answer === quiz.questions[index].correctAnswer ? acc + 1 : acc
    }, 0)
    setScore(newScore)
    setTimeTaken(20 * 60 - timeLeft)
    setQuizCompleted(true)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (!quiz) {
    return <div>Quiz not found</div>
  }

  if (quizCompleted) {
    const percentage = (score / quiz.questions.length) * 100

    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{quiz.title} - Results</CardTitle>
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
                className={`text-${score >= quiz.questions.length * 0.8 ? "green" : "blue"}-600 progress-ring__circle stroke-current`}
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
              >{`${score}/${quiz.questions.length}`}</text>
            </svg>
          </div>
          <p className="text-lg mb-2">
            You scored {score} out of {quiz.questions.length} questions correctly.
          </p>
          <p className="text-lg mb-4">Time taken: {formatTime(timeTaken)}</p>
          <p className="text-lg mb-4">
            {score >= quiz.questions.length * 0.8
              ? "Excellent! You've mastered this topic!"
              : "Keep practicing to improve your score!"}
          </p>
          <div className="flex gap-4">
            <Button onClick={() => router.push("/quizzes")}>Back to Quizzes</Button>
            <Button variant="outline" onClick={() => router.push(`/learn/${quizId}`)}>
              Review Material
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{quiz.title}</CardTitle>
        <CardDescription>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Time left: {formatTime(timeLeft)}</p>
          <Clock className="h-6 w-6 text-gray-500" />
        </div>
        <Progress value={(currentQuestionIndex / quiz.questions.length) * 100} className="mb-6" />
        <p className="text-lg mb-4">{currentQuestion.question}</p>
        <RadioGroup
          onValueChange={handleAnswerSelection}
          value={selectedAnswers[currentQuestionIndex]}
          className="space-y-4"
        >
          {currentQuestion.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
        <div className="flex justify-between mt-6">
          <Button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestionIndex]}>
            {currentQuestionIndex === quiz.questions.length - 1 ? "Finish" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

