"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"
import { LearningProgressSkeleton } from "./LearningProgressSkeleton"

interface Chapter {
  id: string
  title: string
  completed: boolean
}

interface LearningSubject {
  id: string
  title: string
  description: string
  imageUrl: string
  chapters: Chapter[]
}

const subjects: LearningSubject[] = [
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description: "Expand your understanding of various topics",
    imageUrl: "/placeholder.svg?height=100&width=200&text=General+Knowledge",
    chapters: Array.from({ length: 12 }, (_, i) => ({
      id: `gk-chapter-${i + 1}`,
      title: `Chapter ${i + 1}: ${["World Geography", "Famous Literature", "Art History", "Music Theory", "World Cuisines", "Famous Inventions", "World Leaders", "Natural Wonders", "Ancient Civilizations", "Space Exploration", "World Religions", "Global Economics"][i]}`,
      completed: Math.random() < 0.5,
    })),
  },
  {
    id: "science",
    title: "Science",
    description: "Discover the wonders of the scientific world",
    imageUrl: "/placeholder.svg?height=100&width=200&text=Science",
    chapters: Array.from({ length: 12 }, (_, i) => ({
      id: `science-chapter-${i + 1}`,
      title: `Chapter ${i + 1}: ${["Physics Basics", "Chemistry Fundamentals", "Biology Essentials", "Astronomy Wonders", "Earth Sciences", "Human Anatomy", "Genetics", "Ecology", "Quantum Mechanics", "Organic Chemistry", "Neuroscience", "Scientific Method"][i]}`,
      completed: Math.random() < 0.5,
    })),
  },
]

export default function LearningSection() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LearningProgressSkeleton />
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => {
          const completedChapters = subject.chapters.filter((ch) => ch.completed).length
          const progress = (completedChapters / subject.chapters.length) * 100

          return (
            <Card key={subject.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <Image
                  src={subject.imageUrl || "/placeholder.svg"}
                  alt={subject.title}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-2">{subject.title}</CardTitle>
                <CardDescription className="mb-4">{subject.description}</CardDescription>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {completedChapters} / {subject.chapters.length} chapters
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <Link href={`/learn/${subject.id}`}>
                  <Button className="w-full">
                    Continue Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <div className="mt-6 text-center">
        <Link href="/learn">
          <Button variant="outline" className="inline-flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Explore All Courses
          </Button>
        </Link>
      </div>
    </div>
  )
}

