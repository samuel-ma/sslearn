"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Book, Clock, Users, Star, Target, Zap } from "lucide-react"
import Link from "next/link"

// Mock data for subjects
const subjects = {
  "general-knowledge": {
    id: "general-knowledge",
    title: "General Knowledge",
    description: "Expand your understanding of various topics",
    image: "/placeholder.svg?height=200&width=400&text=General+Knowledge",
    chapters: [
      {
        id: "gk-chapter-1",
        title: "Chapter 1: World Geography",
        progress: 0,
        completed: false,
        content: "Detailed overview of continents, countries, climates, and landmarks.",
        image: "/images/gk/chapter1.jpg",
      },
      {
        id: "gk-chapter-2",
        title: "Chapter 2: Famous Literature",
        progress: 20,
        completed: false,
        content: "Explore the timeless works of literature from across the globe.",
        image: "/images/gk/chapter2.jpg",
      },
      {
        id: "gk-chapter-3",
        title: "Chapter 3: Art History",
        progress: 50,
        completed: false,
        content: "Dive into the evolution of art through the centuries.",
        image: "/images/gk/chapter3.jpg",
      },
      {
        id: "gk-chapter-4",
        title: "Chapter 4: Music & Culture",
        progress: 75,
        completed: false,
        content: "Learn about the influence of music on different cultures.",
        image: "/images/gk/chapter4.jpg",
      },
      {
        id: "gk-chapter-5",
        title: "Chapter 5: World Cuisines",
        progress: 100,
        completed: true,
        content: "A gastronomic tour through diverse international cuisines.",
        image: "/images/gk/chapter5.jpg",
      },
    ],
    instructors: [
      { name: "Dr. Jane Smith", avatar: "/placeholder.svg?height=40&width=40&text=JS" },
      { name: "Prof. John Doe", avatar: "/placeholder.svg?height=40&width=40&text=JD" },
    ],
    stats: {
      studentsEnrolled: 1234,
      averageRating: 4.7,
      totalQuizzes: 24,
    },
    relatedSubjects: ["History", "Geography", "Culture"],
  },
  mathematics: {
    id: "mathematics",
    title: "Mathematics",
    description: "Master mathematical concepts from basic arithmetic to advanced calculus",
    image: "/placeholder.svg?height=200&width=400&text=Mathematics",
    chapters: [
      {
        id: "math-chapter-1",
        title: "Chapter 1: Algebra Basics",
        progress: 100,
        completed: true,
        content: "Introduction to algebraic expressions and equations.",
        image: "/images/math/chapter1.jpg",
      },
      {
        id: "math-chapter-2",
        title: "Chapter 2: Geometry",
        progress: 60,
        completed: false,
        content: "Explore shapes, sizes, positions of figures, and the properties of space.",
        image: "/images/math/chapter2.jpg",
      },
      {
        id: "math-chapter-3",
        title: "Chapter 3: Trigonometry",
        progress: 30,
        completed: false,
        content: "Study relationships between side lengths and angles of triangles.",
        image: "/images/math/chapter3.jpg",
      },
      {
        id: "math-chapter-4",
        title: "Chapter 4: Calculus",
        progress: 0,
        completed: false,
        content: "Learn about rates of change and accumulation.",
        image: "/images/math/chapter4.jpg",
      },
      {
        id: "math-chapter-5",
        title: "Chapter 5: Statistics",
        progress: 0,
        completed: false,
        content: "Collect, analyze, interpret, present, and organize data.",
        image: "/images/math/chapter5.jpg",
      },
    ],
    instructors: [
      { name: "Dr. Alan Turing", avatar: "/placeholder.svg?height=40&width=40&text=AT" },
      { name: "Prof. Ada Lovelace", avatar: "/placeholder.svg?height=40&width=40&text=AL" },
    ],
    stats: {
      studentsEnrolled: 2345,
      averageRating: 4.9,
      totalQuizzes: 30,
    },
    relatedSubjects: ["Physics", "Computer Science", "Economics"],
  },
  // Add more subjects here...
}

export default function LearnSubject() {
  const { subjectId } = useParams()
  const subject = subjects[subjectId as keyof typeof subjects]
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null)

  if (!subject) {
    return <div>Subject not found</div>
  }

  const completedChapters = subject.chapters.filter((ch) => ch.completed).length
  const overallProgress = (completedChapters / subject.chapters.length) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-3xl">{subject.title}</CardTitle>
              <CardDescription>{subject.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={subject.image || "/placeholder.svg"}
                alt={subject.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span>{subject.stats.studentsEnrolled} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span>{subject.stats.averageRating} average rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-muted-foreground" />
                  <span>{subject.stats.totalQuizzes} quizzes</span>
                </div>
              </div>
              <Progress value={overallProgress} className="mb-2" />
              <p className="text-sm text-muted-foreground mb-4">{Math.round(overallProgress)}% Complete</p>
              <div className="flex justify-between">
                <Button onClick={() => setActiveTab("chapters")}>
                  Continue Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href={`/quiz/${subjectId}`}>
                  <Button variant="outline">
                    Take a Quiz
                    <Zap className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="chapters">Chapters</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Course Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    This comprehensive course covers a wide range of topics in {subject.title}. You will explore various
                    aspects of the subject through interactive lessons, quizzes, and real-world examples.
                  </p>
                  <h3 className="text-lg font-semibold mb-2">What you will learn:</h3>
                  <ul className="list-disc pl-5 mb-4">
                    <li>Fundamental concepts and principles of {subject.title}</li>
                    <li>Practical applications in real-world scenarios</li>
                    <li>Critical thinking and problem-solving skills</li>
                    <li>Latest developments and trends in the field</li>
                  </ul>
                  <h3 className="text-lg font-semibold mb-2">Requirements:</h3>
                  <ul className="list-disc pl-5">
                    <li>No prior knowledge required</li>
                    <li>A curious mind and willingness to learn</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="chapters">
              <Card>
                <CardHeader>
                  <CardTitle>Course Chapters</CardTitle>
                </CardHeader>
                <CardContent>
                  {subject.chapters.map((chapter, index) => (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-4 last:mb-0"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Book className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{chapter.title}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={chapter.completed ? "default" : "secondary"}>
                            {chapter.completed ? "Review" : chapter.progress > 0 ? "Continue" : "Start"}
                          </Badge>
                          <Link href={`/learn/${subjectId}/${chapter.id}`}>
                            <Button variant="outline" size="sm">
                              {chapter.completed ? "Review" : chapter.progress > 0 ? "Continue" : "Start"}
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <Progress value={chapter.progress} className="mt-2 h-2" />
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="quizzes">
              <Card>
                <CardHeader>
                  <CardTitle>Available Quizzes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {[1, 2, 3].map((quiz) => (
                      <Card key={quiz}>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Quiz {quiz}: {subject.title} Fundamentals
                          </CardTitle>
                          <CardDescription>Test your knowledge on the basics</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">15 minutes</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Target className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">10 questions</span>
                            </div>
                          </div>
                          <Link href={`/quiz/${subjectId}`}>
                            <Button className="w-full mt-4">Start Quiz</Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="discussion">
              <Card>
                <CardHeader>
                  <CardTitle>Course Discussion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((post) => (
                      <Card key={post}>
                        <CardHeader>
                          <div className="flex items-center space-x-2">
                            <Avatar>
                              <AvatarImage src={`/placeholder.svg?height=40&width=40&text=U${post}`} />
                              <AvatarFallback>U{post}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-sm">User {post}</CardTitle>
                              <CardDescription className="text-xs">2 hours ago</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm">
                            This is a great course! I am learning so much about {subject.title}.
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button className="w-full mt-4">Post a Comment</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="md:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-primary">{Math.round(overallProgress)}%</div>
                <p className="text-sm text-muted-foreground">Overall Completion</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Chapters Completed:</span>
                  <span>
                    {completedChapters} / {subject.chapters.length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Quizzes Taken:</span>
                  <span>3 / {subject.stats.totalQuizzes}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Time Spent:</span>
                  <span>4h 23m</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Subjects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {subject.relatedSubjects.map((relatedSubject, index) => (
                  <Badge key={index} variant="secondary">
                    {relatedSubject}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

