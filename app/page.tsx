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

// Update featured quizzes array to use string IDs
const quizzes = [
  { id: "general-knowledge", title: "General Knowledge", description: "Test your general knowledge", category: "General", icon: "🧠" },
  { id: "mathematics", title: "Mathematics", description: "Challenge your mathematical skills", category: "Mathematics", icon: "🔢" },
  { id: "science", title: "Science", description: "Explore scientific concepts", category: "Science", icon: "🔬" },
  { id: "history", title: "History", description: "Journey through historical events", category: "History", icon: "🏛️" },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Welcome to QuizMaster</h1>
        <p className="text-xl text-gray-600 mb-6">Challenge yourself and learn something new today!</p>
        <AnalyticsOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        <div className="lg:col-span-2 space-y-4 lg:space-y-8">
          <section>
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
          </section>

          <LearningSection />
          <QuizOfTheDay />
        </div>

        <div className="space-y-4 lg:space-y-8">
          <LeaderboardPreview />
          <DailyChallenge />
          <StudyStreak />
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <Link href="/community">
          <Button className="px-6 py-3">
            Community
          </Button>
        </Link>
        <Link href="/notifications">
          <Button className="px-6 py-3">
            Notifications
          </Button>
        </Link>
      </div>

      <Banner />
    </div>
  )
}

