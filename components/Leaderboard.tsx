"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Trophy, ArrowRight, Medal, Star, Target, Book } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface LeaderboardEntry {
  id: number
  name: string
  score: number
  quizzesTaken: number
  avatarUrl: string
  rank: number
  achievements: number
  accuracy: number
  streak: number
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedEntry, setSelectedEntry] = useState<LeaderboardEntry | null>(null)

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(
          data.leaderboard.slice(0, 5).map((entry: LeaderboardEntry, index: number) => ({
            ...entry,
            rank: index + 1,
            accuracy: Math.round(Math.random() * 40 + 60), // Simulated accuracy
            streak: Math.round(Math.random() * 10), // Simulated streak
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
    return <div className="text-center">Loading leaderboard...</div>
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-2">
          {leaderboard.map((entry) => (
            <motion.div
              key={entry.id}
              className="flex items-center space-x-4 p-4 hover:bg-accent transition-colors cursor-pointer"
              onClick={() => setSelectedEntry(entry === selectedEntry ? null : entry)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
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
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {selectedEntry && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-accent p-4 space-y-2"
            >
              <h3 className="font-semibold text-lg">{selectedEntry.name}'s Stats</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2 text-yellow-500" />
                  <span>Score: {selectedEntry.score}</span>
                </div>
                <div className="flex items-center">
                  <Book className="w-4 h-4 mr-2 text-blue-500" />
                  <span>Quizzes: {selectedEntry.quizzesTaken}</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2 text-green-500" />
                  <span>Accuracy: {selectedEntry.accuracy}%</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 mr-2 text-purple-500" />
                  <span>Achievements: {selectedEntry.achievements}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

