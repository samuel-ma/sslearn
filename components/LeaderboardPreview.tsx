"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, ArrowRight, Medal, Award, BookOpen, GraduationCap } from "lucide-react"
import Link from "next/link"
import { LeaderboardPreviewSkeleton } from "./LeaderboardPreviewSkeleton"
import { motion } from "framer-motion"

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  quizzesTaken: number;
  avatarUrl: string;
  rank: number;
  examScore?: number;
  achievements?: number;
  totalScore?: number;
}

// Add mock data for development and fallback
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { id: 1, name: "Alex Johnson", score: 1250, quizzesTaken: 45, avatarUrl: "/avatars/01.png", rank: 1, examScore: 480, achievements: 8, totalScore: 1730 },
  { id: 2, name: "Sarah Wilson", score: 1180, quizzesTaken: 42, avatarUrl: "/avatars/02.png", rank: 2, examScore: 460, achievements: 7, totalScore: 1640 },
  { id: 3, name: "Michael Chen", score: 1150, quizzesTaken: 40, avatarUrl: "/avatars/03.png", rank: 3, examScore: 450, achievements: 6, totalScore: 1600 },
  { id: 4, name: "Emma Davis", score: 1120, quizzesTaken: 38, avatarUrl: "/avatars/04.png", rank: 4, examScore: 440, achievements: 5, totalScore: 1560 },
  { id: 5, name: "James Lee", score: 1090, quizzesTaken: 36, avatarUrl: "/avatars/05.png", rank: 5, examScore: 430, achievements: 4, totalScore: 1520 },
]

export default function LeaderboardPreview() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          await new Promise(r => setTimeout(r, 1000)) // Simulate loading
          setLeaderboard(MOCK_LEADERBOARD)
          return
        }

        const res = await fetch("/api/leaderboard")
        if (!res.ok) throw new Error('Failed to fetch leaderboard')
        const data = await res.json()
        setLeaderboard(data.leaderboard.slice(0, 5))
      } catch (err) {
        console.error("Error fetching leaderboard:", err)
        setLeaderboard(MOCK_LEADERBOARD) // Fallback to mock data
        setError("Couldn't load latest data")
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  if (loading) {
    return <LeaderboardPreviewSkeleton />;
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center text-xl font-semibold">
          <Trophy className="w-5 h-5 mr-2 text-primary" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {leaderboard.map((entry) => (
          <motion.div
            key={entry.id}
            className="flex items-center space-x-4 p-4 hover:bg-muted/50 transition-colors border-b last:border-0"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex-shrink-0 w-8 text-center">
              {entry.rank <= 3 ? (
                <Medal
                  className={`w-5 h-5 mx-auto ${
                    entry.rank === 1
                      ? "text-yellow-500"
                      : entry.rank === 2
                      ? "text-zinc-400"
                      : "text-amber-600"
                  }`}
                />
              ) : (
                <span className="text-sm font-medium text-muted-foreground">
                  {entry.rank}
                </span>
              )}
            </div>
            <Avatar className="w-8 h-8">
              <AvatarImage src={entry.avatarUrl} alt={entry.name} />
              <AvatarFallback>{entry.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow min-w-0">
              <div className="font-medium truncate">{entry.name}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span className="flex items-center">
                  <BookOpen className="h-3 w-3 mr-1" />
                  {entry.score}
                </span>
                <span className="flex items-center">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {entry.examScore}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {entry.quizzesTaken} quizzes
                </Badge>
              </div>
            </div>
            <div className="font-medium text-primary">
              {(entry.totalScore ?? 0).toLocaleString()}
            </div>
          </motion.div>
        ))}
        <div className="p-4 border-t">
          <Button variant="secondary" asChild className="w-full">
            <Link href="/leaderboard" className="flex items-center justify-center">
              View Full Leaderboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
