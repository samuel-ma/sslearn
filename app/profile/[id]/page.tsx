import { UserProfile } from "@/components/UserProfile"

async function getUserData(id: string) {
  // In a real application, this would be an API call
  // For this example, we'll use mock data
  return {
    id: Number.parseInt(id),
    name: "John Doe",
    avatarUrl: "/placeholder.svg?height=200&width=200",
    score: 2800,
    quizzesTaken: 15,
    rank: 1,
    achievements: [
      { id: 1, title: "Quiz Master", description: "Complete 10 quizzes", icon: "trophy" },
      { id: 2, title: "Perfect Score", description: "Get 100% on a quiz", icon: "star" },
      { id: 3, title: "Fast Learner", description: "Complete a quiz in under 5 minutes", icon: "target" },
    ],
    recentQuizzes: [
      { id: 1, title: "General Knowledge", score: 90, date: "2023-05-01" },
      { id: 2, title: "Science Quiz", score: 85, date: "2023-04-28" },
      { id: 3, title: "History Trivia", score: 95, date: "2023-04-25" },
    ],
  }
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const userData = await getUserData(params.id)

  return (
    <div className="container mx-auto p-4">
      <UserProfile {...userData} />
    </div>
  )
}

