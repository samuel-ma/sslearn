import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Award, Star, Target, Book, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Achievement {
  id: number
  title: string
  description: string
  icon: "trophy" | "award" | "star" | "target" | "book"
}

interface UserProfileProps {
  id: number
  name: string
  avatarUrl: string
  score: number
  quizzesTaken: number
  rank: number
  achievements: Achievement[]
  recentQuizzes: { id: number; title: string; score: number; date: string }[]
}

export function UserProfile({
  id,
  name,
  avatarUrl,
  score,
  quizzesTaken,
  rank,
  achievements,
  recentQuizzes,
}: UserProfileProps) {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "trophy":
        return <Trophy className="w-4 h-4" />
      case "award":
        return <Award className="w-4 h-4" />
      case "star":
        return <Star className="w-4 h-4" />
      case "target":
        return <Target className="w-4 h-4" />
      case "book":
        return <Book className="w-4 h-4" />
      default:
        return <Award className="w-4 h-4" />
    }
  }

  const handleLogout = () => {
    // Clear auth token
    localStorage.removeItem('token')
    // Refresh the page
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{name}</h2>
              <p className="text-gray-500">Rank: #{rank}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{score}</div>
              <div className="text-sm text-gray-500">Total Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{quizzesTaken}</div>
              <div className="text-sm text-gray-500">Quizzes Taken</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{achievements.length}</div>
              <div className="text-sm text-gray-500">Achievements</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Badge key={achievement.id} variant="secondary" className="p-2 flex items-center space-x-2">
                {getIconComponent(achievement.icon)}
                <span>{achievement.title}</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Quizzes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentQuizzes.map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">{quiz.title}</div>
                  <div className="text-sm text-gray-500">{quiz.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">{quiz.score}%</div>
                  <Progress value={quiz.score} className="w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" size="sm" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  )
}

