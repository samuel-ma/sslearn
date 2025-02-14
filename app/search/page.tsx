"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import Link from "next/link"
import { Search, Filter } from "lucide-react"

// This would typically come from an API or database
const allQuizzes = [
  { id: 1, title: "General Knowledge Quiz", category: "General", difficulty: "Easy", questions: 10, rating: 4.5 },
  { id: 2, title: "Science Trivia", category: "Science", difficulty: "Medium", questions: 15, rating: 4.2 },
  { id: 3, title: "History Challenge", category: "History", difficulty: "Hard", questions: 20, rating: 4.8 },
  { id: 4, title: "Math Puzzles", category: "Math", difficulty: "Medium", questions: 12, rating: 4.0 },
  { id: 5, title: "Literature Quiz", category: "Literature", difficulty: "Easy", questions: 10, rating: 4.3 },
  // Add more quizzes here
]

const categories = ["General", "Science", "History", "Math", "Literature"]
const difficulties = ["Easy", "Medium", "Hard"]

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("")
  const [minQuestions, setMinQuestions] = useState(0)
  const [minRating, setMinRating] = useState(0)
  const [searchResults, setSearchResults] = useState(allQuizzes)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const filteredResults = allQuizzes.filter((quiz) => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(quiz.category)
      const matchesDifficulty = !selectedDifficulty || quiz.difficulty === selectedDifficulty
      const matchesQuestions = quiz.questions >= minQuestions
      const matchesRating = quiz.rating >= minRating
      return matchesSearch && matchesCategory && matchesDifficulty && matchesQuestions && matchesRating
    })
    setSearchResults(filteredResults)
  }, [searchQuery, selectedCategories, selectedDifficulty, minQuestions, minRating])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedDifficulty("")
    setMinQuestions(0)
    setMinRating(0)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Quizzes</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Filters</span>
                <Button variant="ghost" size="sm" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className={`${showFilters ? "block" : "hidden"} md:block`}>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Categories</h3>
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label htmlFor={category}>{category}</label>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Difficulty</h3>
                  <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Any">Any</SelectItem>
                      {difficulties.map((difficulty) => (
                        <SelectItem key={difficulty} value={difficulty}>
                          {difficulty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Minimum Questions</h3>
                  <Slider
                    min={0}
                    max={20}
                    step={1}
                    value={[minQuestions]}
                    onValueChange={(value) => setMinQuestions(value[0])}
                  />
                  <p className="text-sm text-muted-foreground mt-1">{minQuestions} questions</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Minimum Rating</h3>
                  <Slider
                    min={0}
                    max={5}
                    step={0.1}
                    value={[minRating]}
                    onValueChange={(value) => setMinRating(value[0])}
                  />
                  <p className="text-sm text-muted-foreground mt-1">{minRating.toFixed(1)} stars</p>
                </div>
                <Button onClick={clearFilters} variant="outline" className="w-full">
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-3/4">
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">Search</Button>
            </div>
          </form>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((quiz) => (
              <Card key={quiz.id}>
                <CardHeader>
                  <CardTitle>{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-2">Category: {quiz.category}</p>
                  <p className="mb-2">Difficulty: {quiz.difficulty}</p>
                  <p className="mb-2">Questions: {quiz.questions}</p>
                  <p className="mb-4">Rating: {quiz.rating.toFixed(1)} / 5</p>
                  <Link href={`/quiz/${quiz.id}`}>
                    <Button className="w-full">Start Quiz</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          {searchResults.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No quizzes found matching your search criteria.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  )
}

