"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search as SearchIcon, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { subjects } from "@/data/study-material" // Import study materials

// Sample quiz data - replace with your actual data source
const allQuizzes = [
  { id: "general-knowledge", title: "General Knowledge", description: "Test your knowledge", category: "General", icon: "🧠", type: "quiz" },
  { id: "mathematics", title: "Mathematics", description: "Math challenges", category: "Mathematics", icon: "🔢", type: "quiz" },
  { id: "science", title: "Science Quiz", description: "Scientific concepts", category: "Science", icon: "🔬", type: "quiz" },
  // ...add more quizzes
]

// Combine quizzes and study materials
const allSearchableItems = [...allQuizzes, ...subjects.map(subject => ({ ...subject, type: "study-material" }))];

function SearchResults({ query = "" }) {
  const filteredItems = allSearchableItems.filter(item => {
    const searchTerm = query.toLowerCase();
    if (item.type === "quiz") {
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        ('category' in item && item.category.toLowerCase().includes(searchTerm))
      );
    } else if (item.type === "study-material") {
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm)
      );
    }
    return false;
  });

  if (filteredItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-muted-foreground">No results found matching "{query}"</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {item.type === "quiz" ? <span>{item.icon}</span> : <BookOpen className="h-4 w-4" />}
                {item.title}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {item.type === "quiz" ? (
                <>
                  <p className="mb-4">Category: {('category' in item) ? item.category : 'N/A'}</p>
                  <Link href={`/quiz/${item.id}`}>
                    <Button className="w-full">Start Quiz</Button>
                  </Link>
                </>
              ) : (
                <Link href={`/study-materials`}>
                  <Button className="w-full">View Study Material</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const queryParam = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(queryParam)

  // Synchronize searchQuery state when URL query param changes.
  useEffect(() => {
    setSearchQuery(queryParam)
  }, [queryParam])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Quizzes and Study Materials</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search quizzes and study materials..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>
      
      {queryParam && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Search results for "{queryParam}"
          </h2>
        </div>
      )}

      <SearchResults query={queryParam} />
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

