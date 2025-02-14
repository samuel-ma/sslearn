"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search as SearchIcon } from "lucide-react"
import { motion } from "framer-motion"

// Sample quiz data - replace with your actual data source
const allQuizzes = [
  { id: "general-knowledge", title: "General Knowledge", description: "Test your knowledge", category: "General", icon: "🧠" },
  { id: "mathematics", title: "Mathematics", description: "Math challenges", category: "Mathematics", icon: "🔢" },
  { id: "science", title: "Science Quiz", description: "Scientific concepts", category: "Science", icon: "🔬" },
  // ...add more quizzes
]

function SearchResults({ query = "" }) {
  const filteredQuizzes = allQuizzes.filter(quiz => 
    quiz.title.toLowerCase().includes(query.toLowerCase()) ||
    quiz.description.toLowerCase().includes(query.toLowerCase()) ||
    quiz.category.toLowerCase().includes(query.toLowerCase())
  )

  if (filteredQuizzes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-muted-foreground">No quizzes found matching "{query}"</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredQuizzes.map((quiz, index) => (
        <motion.div
          key={quiz.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>{quiz.icon}</span>
                {quiz.title}
              </CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Category: {quiz.category}</p>
              <Link href={`/quiz/${quiz.id}`}>
                <Button className="w-full">Start Quiz</Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Quizzes</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search quizzes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>
      
      {initialQuery && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Search results for "{initialQuery}"
          </h2>
        </div>
      )}

      <SearchResults query={initialQuery} />
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <SearchContent />
    </div>
  )
}

