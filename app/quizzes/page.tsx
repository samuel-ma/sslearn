"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { motion } from "framer-motion"
import QuizzesLoading from "./loading"

// Expanded quizzes array with categories
const quizzes = [
  { id: "general-knowledge", title: "General Knowledge", description: "Test your knowledge across various topics", category: "General", icon: "🧠", rating: 4.5, participants: 1234 },
  { id: "mathematics", title: "Mathematics", description: "Challenge your mathematical skills", category: "Mathematics", icon: "🔢", rating: 4.8, participants: 987 },
  { id: "science", title: "Science", description: "Explore scientific concepts", category: "Science", icon: "🔬", rating: 4.6, participants: 2345 },
  { id: "history", title: "History", description: "Journey through historical events", category: "History", icon: "🏛️", rating: 4.4, participants: 876 },
  { id: "geography", title: "Geography", description: "Discover world destinations", category: "Geography", icon: "🌍", rating: 4.2, participants: 671 },
  { id: "literature", title: "Literature", description: "Immerse into classic and modern works", category: "Literature", icon: "📚", rating: 4.7, participants: 543 },
  { id: "sports", title: "Sports", description: "Test your sports trivia", category: "Sports", icon: "🏅", rating: 4.3, participants: 432 },
  { id: "music", title: "Music", description: "How well do you know your tunes?", category: "Music", icon: "🎵", rating: 4.5, participants: 678 },
  { id: "technology", title: "Technology", description: "Explore tech innovations", category: "Technology", icon: "💻", rating: 4.9, participants: 789 },
  { id: "movies", title: "Movies", description: "A quiz for cinema enthusiasts", category: "Entertainment", icon: "🎬", rating: 4.6, participants: 912 },
  // ... add more quizzes as needed
]

export default function QuizzesPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("All")

  const categories = ["All", "General", "Mathematics", "Science", "History", "Geography", "Literature", "Sports", "Music", "Technology", "Entertainment"]

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) || quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "All" || quiz.category === filterCategory
    return matchesSearch && matchesCategory
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // simulate a 2-second delay
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <QuizzesLoading />
  }

  return (
    <div className="space-y-10 container mx-auto px-6">
      {/* Hero Section */}
      <section className="relative py-10 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Learn Anything with Expert Explanations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Access step-by-step solutions, video tutorials, and comprehensive study guides verified by experts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="flex flex-col gap-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="w-full mt-4">
          <div className="flex gap-4 flex-wrap justify-start">
            {categories.map((cat) => (
              <Button 
                key={cat} 
                variant={filterCategory === cat ? "default" : "outline"} 
                onClick={() => setFilterCategory(cat)}
                className="capitalize flex-1"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Quizzes Grid */}
      <section>
        <h2 className="text-3xl font-semibold mb-6">All Quizzes</h2>
        {filteredQuizzes.length === 0 ? (
          <p className="text-center text-gray-500">No quizzes found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <Card key={quiz.id} className="group hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <span className="text-3xl mr-2">{quiz.icon}</span>
                    {quiz.title}
                  </CardTitle>
                  <CardDescription>{quiz.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-sm text-gray-500 mb-2">Category: {quiz.category}</p>
                  <p className="text-sm text-gray-500 mb-2">Rating: {quiz.rating} ★</p>
                  <p className="text-sm text-gray-500 mb-4">{quiz.participants.toLocaleString()} participants</p>
                  <Link href={`/quiz/${quiz.id}`}> 
                    <Button className="w-full">
                      Start Quiz
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

