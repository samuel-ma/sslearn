import { NextResponse } from "next/server"

// This would typically be stored in a database
const leaderboard = [
  { id: 1, name: "Alice Johnson", score: 2800, quizzesTaken: 15, avatarUrl: "/placeholder.svg?height=50&width=50" },
  { id: 2, name: "Bob Smith", score: 2650, quizzesTaken: 14, avatarUrl: "/placeholder.svg?height=50&width=50" },
  { id: 3, name: "Charlie Brown", score: 2500, quizzesTaken: 13, avatarUrl: "/placeholder.svg?height=50&width=50" },
  { id: 4, name: "David Lee", score: 2400, quizzesTaken: 12, avatarUrl: "/placeholder.svg?height=50&width=50" },
  { id: 5, name: "Eva Martinez", score: 2300, quizzesTaken: 11, avatarUrl: "/placeholder.svg?height=50&width=50" },
]

export async function POST(request: Request) {
  const body = await request.json()
  const { quizId, score, userName } = body

  // Find the user in the leaderboard or create a new entry
  let userEntry = leaderboard.find((entry) => entry.name === userName)
  if (!userEntry) {
    userEntry = {
      id: leaderboard.length + 1,
      name: userName,
      score: 0,
      quizzesTaken: 0,
      avatarUrl: `/placeholder.svg?height=50&width=50&text=${userName.slice(0, 2).toUpperCase()}`,
    }
    leaderboard.push(userEntry)
  }

  // Update the user's score and quizzes taken
  userEntry.score += score
  userEntry.quizzesTaken += 1

  // Sort the leaderboard by score
  leaderboard.sort((a, b) => b.score - a.score)

  // Here you would typically save the updated leaderboard to a database
  console.log(`Updated leaderboard:`, leaderboard)

  return NextResponse.json({ message: "Score submitted successfully", updatedLeaderboard: leaderboard })
}

