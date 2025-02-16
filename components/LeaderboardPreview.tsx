"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Trophy, ArrowRight, Medal } from "lucide-react"
import Link from "next/link"
import { LeaderboardPreviewSkeleton } from "./LeaderboardPreviewSkeleton"

interface LeaderboardEntry {
  id: number
  name: string
  score: number
  quizzesTaken: number
  avatarUrl: string
  rank: number
}

export default function LeaderboardPreview() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(
          data.leaderboard.slice(0, 5).map((entry: LeaderboardEntry, index: number) => ({
            ...entry,
            rank: index + 1,
          })),
        )
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching leaderboard:", error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <LeaderboardPreviewSkeleton />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Trophy className="w-6 h-6 mr-2" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {leaderboard.map((entry) => (
          <div key={entry.id} className="flex items-center space-x-4 p-4 hover:bg-accent transition-colors">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
              {entry.rank <= 3 ? (
                <Medal
                  className={`w-6 h-6 ${
                    entry.rank === 1 ? "text-yellow-400" : entry.rank === 2 ? "text-gray-400" : "text-orange-400"
                  }`}
                />
              ) : (
                <span className="text-lg font-bold text-muted-foreground">{entry.rank}</span>
              )}
            </div>
            <Avatar className="w-10 h-10 border-2 border-background shadow-sm">
              <AvatarImage src={entry.avatarUrl} alt={entry.name} />
              <AvatarFallback>{entry.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="font-semibold">{entry.name}</div>
              <div className="text-sm text-muted-foreground">Score: {entry.score}</div>
            </div>
            <div className="text-sm font-medium">{entry.quizzesTaken} quizzes</div>
          </div>
        ))}
        <div className="p-4 bg-accent">
          <Link href="/leaderboard">
            <Button className="w-full">
              View Full Leaderboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

