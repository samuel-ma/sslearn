"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Zap, ArrowRight } from "lucide-react"
import Link from "next/link"

interface Challenge {
  id: number
  question: string
  options: string[]
  correctAnswer: string
  subject: string
}

const challenges: Challenge[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    subject: "Geography",
  },
  {
    id: 2,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
    subject: "Art History",
  },
  {
    id: 3,
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Fe", "Cu"],
    correctAnswer: "Au",
    subject: "Chemistry",
  },
  {
    id: 4,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: "Mars",
    subject: "Astronomy",
  },
  {
    id: 5,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare",
    subject: "Literature",
  },
]

export default function DailyChallengePage() {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch the daily challenges here
    // For now, we'll just shuffle the challenges array
    const shuffled = [...challenges].sort(() => 0.5 - Math.random())
    challenges.splice(0, challenges.length, ...shuffled.slice(0, 3))
  }, [])

  const currentChallenge = challenges[currentChallengeIndex]

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNextChallenge = () => {
    if (selectedAnswer === currentChallenge.correctAnswer) {
      setScore(score + 1)
    }

    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1)
      setSelectedAnswer(null)
    } else {
      setShowResult(true)
    }
  }

  if (showResult) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Daily Challenge Complete!</CardTitle>
          <CardDescription>Here's how you did:</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Your score: {score} out of {challenges.length}
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
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Daily Challenge</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Zap className="mr-2 h-6 w-6 text-yellow-500" />
            Challenge {currentChallengeIndex + 1} of {challenges.length}
          </CardTitle>
          <CardDescription>{currentChallenge.subject}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">{currentChallenge.question}</p>
          <RadioGroup onValueChange={handleAnswerSelection} value={selectedAnswer || undefined}>
            {currentChallenge.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          <Button onClick={handleNextChallenge} disabled={!selectedAnswer} className="mt-4">
            {currentChallengeIndex === challenges.length - 1 ? "Finish" : "Next Challenge"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

