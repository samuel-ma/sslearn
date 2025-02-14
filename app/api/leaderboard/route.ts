import { NextResponse } from "next/server"

// This would typically come from a database
const leaderboardData = [
  {
    id: 1,
    name: "Alice Johnson",
    score: 2800,
    quizzesTaken: 15,
    avatarUrl: "/placeholder.svg?height=50&width=50",
    achievements: 3,
  },
  {
    id: 2,
    name: "Bob Smith",
    score: 2650,
    quizzesTaken: 14,
    avatarUrl: "/placeholder.svg?height=50&width=50",
    achievements: 2,
  },
  {
    id: 3,
    name: "Charlie Brown",
    score: 2500,
    quizzesTaken: 13,
    avatarUrl: "/placeholder.svg?height=50&width=50",
    achievements: 2,
  },
  {
    id: 4,
    name: "David Lee",
    score: 2400,
    quizzesTaken: 12,
    avatarUrl: "/placeholder.svg?height=50&width=50",
    achievements: 1,
  },
  {
    id: 5,
    name: "Eva Martinez",
    score: 2300,
    quizzesTaken: 11,
    avatarUrl: "/placeholder.svg?height=50&width=50",
    achievements: 1,
  },
  {
    id: 6,
    name: "Frank Wilson",
    score: 2200,
    quizzesTaken: 10,
    avatarUrl: "/placeholder.svg?height=50&width=50",
    achievements: 1,
  },
  {
    id: 7,
    name: "Grace Taylor",
    score: 2100,
    quizzesTaken: 9,
    avatarUrl: "/placeholder.svg?height=50&width=50",
    achievements: 0,
  },
  {
    id: 8,
    name: "Henry Davis",
    score: 2000,
    quizzesTaken: 8,
    avatarUrl: "/placeholder.svg?height=50&width=50",
    achievements: 0,
  },
  {
    id: 9,
    name: "Isabel Rodriguez",
    score: 1900,
    quizzesTaken: 7,
    avatarUrl: "/placeholder.svg?height=50&width=50",
    achievements: 0,
  },
  {
    id: 10,
    name: "Jack Thompson",
    score: 1800,
    quizzesTaken: 6,
    avatarUrl: "/placeholder.svg?height=50&width=50",
    achievements: 0,
  },
]

export async function GET() {
  return NextResponse.json({ leaderboard: leaderboardData })
}

