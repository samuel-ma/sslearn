"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: string
}

interface ChapterTestProps {
  questions: Question[]
  onComplete: (score: number) => void
}

export function ChapterTest({ questions, onComplete }: ChapterTestProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [testCompleted, setTestCompleted] = useState(false)

  const handleAnswerSelection = (answer: string) => {
    const newSelectedAnswers = [...selectedAnswers]
    newSelectedAnswers[currentQuestionIndex] = answer
    setSelectedAnswers(newSelectedAnswers)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      finishTest()
    }
  }

  const finishTest = () => {
    setTestCompleted(true)
    const score = selectedAnswers.reduce((acc, answer, index) => {
      return answer === questions[index].correctAnswer ? acc + 1 : acc
    }, 0)
    onComplete(score)
  }

  if (testCompleted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Test Completed</CardTitle>
          <CardDescription>Your score has been recorded.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chapter Test</CardTitle>
        <CardDescription>
          Question {currentQuestionIndex + 1} of {questions.length}
        </CardDescription>
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
      <CardFooter>
        <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestionIndex]}>
          {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  )
}

