"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import LearningSection from "@/components/LearningSection"
import LeaderboardPreview from "@/components/LeaderboardPreview"
import AnalyticsOverview from "@/components/AnalyticsOverview"
import { DailyChallenge } from "@/components/DailyChallenge"
import { StudyStreak } from "@/components/StudyStreak"
import { QuizOfTheDay } from "@/components/QuizOfTheDay"
import { Banner } from "@/components/Banner"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FeaturedQuizzesSkeleton } from "@/components/FeaturedQuizzesSkeleton"
import { StudyMaterialsDashboard } from "@/components/StudyMaterialsDashboard"

// Update featured quizzes array to use string IDs
const quizzes = [
  { id: "general-knowledge", title: "General Knowledge", description: "Test your general knowledge", category: "General", icon: "🧠" },
  { id: "mathematics", title: "Mathematics", description: "Challenge your mathematical skills", category: "Mathematics", icon: "🔢" },
  { id: "science", title: "Science", description: "Explore scientific concepts", category: "Science", icon: "🔬" },
  { id: "history", title: "History", description: "Journey through historical events", category: "History", icon: "🏛️" },
]

export default function Dashboard() {
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingFeatured(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome to QuizMaster</h1>
        <p className="text-xl text-gray-600 mb-6">Challenge yourself and learn something new today!</p>
        <AnalyticsOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            {isLoadingFeatured ? (
              <FeaturedQuizzesSkeleton />
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-4">Featured Quizzes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quizzes.map((quiz) => (
                    <Card key={quiz.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center text-2xl">
                          <span className="text-3xl mr-2">{quiz.icon}</span>
                          {quiz.title}
                        </CardTitle>
                        <CardDescription>{quiz.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-4">
                        <p className="text-sm text-muted-foreground mb-4">Category: {quiz.category}</p>
                        <Link href={`/quiz/${quiz.id}`}> {/* URL now reflects the proper quiz key */}
                          <Button className="w-full">
                            Start Quiz
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Link href="/quizzes">
                    <Button variant="outline" size="lg">
                      Explore All Quizzes
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </section>

          <StudyMaterialsDashboard />
          <LearningSection />
          <QuizOfTheDay />
        </div>

        <div className="space-y-4 lg:space-y-8">
          <LeaderboardPreview />
          <DailyChallenge />
          <StudyStreak />
        </div>
      </div>

      <Banner />
    </div>
  )
}

