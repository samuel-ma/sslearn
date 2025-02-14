"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Clock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface QuizHistoryItem {
  id: string
  title: string
  date: string
  score: number
  totalQuestions: number
  timeTaken: string
  category: string
}

export default function QuizHistoryPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [quizHistory, setQuizHistory] = useState<QuizHistoryItem[]>([])

  useEffect(() => {
    // Simulate API call delay
    const fetchQuizHistory = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // 2 second delay
      setQuizHistory([
        {
          id: "1",
          title: "Mathematics Quiz",
          date: "2024-01-20",
          score: 85,
          totalQuestions: 10,
          timeTaken: "15:30",
          category: "Mathematics",
        },
        // Add more history items...
      ])
      setIsLoading(false)
    }

    fetchQuizHistory()
  }, [])

  if (isLoading) {
    return <QuizHistoryLoading />
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Quiz History</h1>
        <p className="text-muted-foreground">Track your progress and review past quiz attempts</p>
      </div>

      <div className="space-y-4">
        {quizHistory.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{quiz.title}</CardTitle>
                <span className="text-muted-foreground">{new Date(quiz.date).toLocaleDateString()}</span>
              </div>
              <CardDescription>{quiz.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span>Score: {quiz.score}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span>Time: {quiz.timeTaken}</span>
                </div>
              </div>
              <Progress value={quiz.score} className="h-2" />
              <p className="text-sm text-right mt-2">
                {quiz.score}/{quiz.totalQuestions} questions correct
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// Import the loading component directly in the same file
function QuizHistoryLoading() {
  return <div>Loading...</div>
}
