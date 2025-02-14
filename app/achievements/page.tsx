"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Star, Award, Target, Brain, Zap, Crown, Medal, Gift, Sparkles, Flame, Timer } from "lucide-react"
import confetti from "canvas-confetti"

// Expanded achievements data with more categories and rewards
const achievements = {
  level: {
    current: 12,
    xp: 2450,
    nextLevel: 3000,
    title: "Knowledge Explorer",
  },
  recent: [
    { id: 1, title: "Quiz Master", description: "Complete 50 quizzes", progress: 72, total: 100, icon: Trophy, completed: true },
    { id: 2, title: "Perfect Score", description: "Get 100% in any quiz", progress: 0, total: 1, icon: Star, completed: false },
    { id: 3, title: "Speed Demon", description: "Complete a quiz in under 5 minutes", progress: 1, total: 1, icon: Zap, completed: true },
  ],
  badges: [
    { id: 1, name: "Bronze Scholar", description: "Complete 10 quizzes", icon: Medal, level: "bronze", progress: 100 },
    { id: 2, name: "Silver Scholar", description: "Complete 25 quizzes", icon: Medal, level: "silver", progress: 68 },
    { id: 3, name: "Gold Scholar", description: "Complete 50 quizzes", icon: Medal, level: "gold", progress: 34 },
    { id: 4, name: "Knowledge Seeker", description: "Study for 10 hours", icon: Brain, level: "special", progress: 85 },
    { id: 5, name: "Quiz Champion", description: "Win 5 daily challenges", icon: Crown, level: "special", progress: 40 },
  ],
  milestones: [
    { id: 1, title: "First Steps", description: "Complete your first quiz", reward: "50 XP", progress: 100, icon: Trophy },
    { id: 2, title: "Rising Star", description: "Achieve 5 perfect scores", reward: "Special Badge", progress: 60, icon: Star },
    { id: 3, title: "Marathon Runner", description: "30-day study streak", reward: "Premium Theme", progress: 40, icon: Flame },
  ],
  statistics: {
    totalQuizzes: 47,
    averageScore: 82,
    perfectScores: 3,
    studyStreak: 15,
    timeSpent: "23h 45m",
    totalPoints: 1250,
  }
}

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showReward, setShowReward] = useState(false)

  // Trigger confetti on level milestone
  useEffect(() => {
    if (achievements.level.xp >= achievements.level.nextLevel) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* New Hero Section */}
      <section className="relative py-10 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Your Achievement Journey
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground"
          >
            Track your progress, earn badges, and unlock rewards as you master new skills
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Level {achievements.level.current}: {achievements.level.title}</h2>
              <Progress value={(achievements.level.xp / achievements.level.nextLevel) * 100} className="h-2 mt-2" />
              <p className="text-sm mt-2">{achievements.level.xp}/{achievements.level.nextLevel} XP</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {Object.entries(achievements.statistics).map(([key, value], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Achievements Tabs */}
      <Tabs defaultValue="recent" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-[500px] mx-auto">
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value="recent" className="space-y-6">
          {achievements.recent.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`${achievement.completed ? 'bg-green-50 dark:bg-green-900/10' : ''}`}>
                <CardHeader className="flex flex-row items-center space-x-4">
                  <achievement.icon className={`w-8 h-8 ${achievement.completed ? 'text-green-500' : 'text-gray-400'}`} />
                  <div>
                    <CardTitle>{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                  <p className="text-sm text-right mt-2">{achievement.progress}/{achievement.total}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="badges" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-lg transition-all cursor-pointer">
                <CardHeader>
                  <div className={`mx-auto rounded-full p-3 ${
                    badge.level === 'bronze' ? 'bg-orange-100' :
                    badge.level === 'silver' ? 'bg-gray-100' :
                    badge.level === 'gold' ? 'bg-yellow-100' : 'bg-purple-100'
                  }`}>
                    <badge.icon className={`w-8 h-8 ${
                      badge.level === 'bronze' ? 'text-orange-500' :
                      badge.level === 'silver' ? 'text-gray-500' :
                      badge.level === 'gold' ? 'text-yellow-500' : 'text-purple-500'
                    }`} />
                  </div>
                  <CardTitle className="mt-4">{badge.name}</CardTitle>
                  <CardDescription>{badge.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Progress value={badge.progress} className="h-2" />
                  <p className="text-sm mt-2">{badge.progress}% Complete</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          {achievements.milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center space-x-4">
                  <milestone.icon className="w-8 h-8 text-blue-500" />
                  <div>
                    <CardTitle>{milestone.title}</CardTitle>
                    <CardDescription>{milestone.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={milestone.progress} className="h-2" />
                  <p className="text-sm text-right mt-2">{milestone.progress}% Complete</p>
                  <p className="text-sm text-right mt-2">Reward: {milestone.reward}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <div className="grid gap-6">
            {/* Add all achievements here */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
