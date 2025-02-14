"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Search } from "lucide-react"
import { format } from "date-fns"

const quizHistory = [
  { id: 1, title: "General Knowledge", score: 8, totalQuestions: 10, date: "2023-05-01", category: "General" },
  { id: 2, title: "Science Quiz", score: 7, totalQuestions: 10, date: "2023-04-28", category: "Science" },
  { id: 3, title: "History Trivia", score: 9, totalQuestions: 10, date: "2023-04-25", category: "History" },
  { id: 4, title: "Math Challenge", score: 6, totalQuestions: 10, date: "2023-04-22", category: "Math" },
  { id: 5, title: "Literature Quiz", score: 8, totalQuestions: 10, date: "2023-04-19", category: "Literature" },
]

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const filteredHistory = quizHistory.filter((quiz) => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || quiz.category === selectedCategory
    const matchesDate = !selectedDate || quiz.date === format(selectedDate, "yyyy-MM-dd")
    return matchesSearch && matchesCategory && matchesDate
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Quiz History</h1>
      <p className="text-xl text-gray-600">Review your past quiz performances and track your progress!</p>
      <Card>
        <CardHeader>
          <CardTitle>Your Recent Quizzes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="History">History</SelectItem>
                <SelectItem value="Math">Math</SelectItem>
                <SelectItem value="Literature">Literature</SelectItem>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-[280px]">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quiz Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Performance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((quiz) => (
                <TableRow key={quiz.id}>
                  <TableCell className="font-medium">{quiz.title}</TableCell>
                  <TableCell>{quiz.category}</TableCell>
                  <TableCell>
                    {quiz.score}/{quiz.totalQuestions}
                  </TableCell>
                  <TableCell>{quiz.date}</TableCell>
                  <TableCell>
                    <Badge variant={quiz.score >= 8 ? "success" : quiz.score >= 6 ? "warning" : "destructive"}>
                      {quiz.score >= 8 ? "Excellent" : quiz.score >= 6 ? "Good" : "Needs Improvement"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

