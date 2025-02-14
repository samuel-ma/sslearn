"use client"

import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search } from "lucide-react"

// Simplified quiz data
const allQuizzes = [
  { id: 1, title: "General Knowledge Quiz", category: "General", difficulty: "Easy" },
  { id: 2, title: "Science Trivia", category: "Science", difficulty: "Medium" },
  { id: 3, title: "History Challenge", category: "History", difficulty: "Hard" },
  // Add more if needed
]

function SearchResults() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {allQuizzes.map((quiz) => (
        <Card key={quiz.id}>
          <CardHeader>
            <CardTitle>{quiz.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Category: {quiz.category}</p>
            <p className="mb-4">Difficulty: {quiz.difficulty}</p>
            <Link href={`/quiz/${quiz.id}`}>
              <Button className="w-full">Start Quiz</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SearchContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Quizzes</h1>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search quizzes..."
            className="pl-10"
          />
        </div>
      </div>
      <Suspense fallback={<div>Loading results...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search page...</div>}>
      <SearchContent />
    </Suspense>
  )
}

