"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, PieChart, TrendingUp, Award } from "lucide-react"

export default function AnalyticsOverview() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      className={`bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-6 shadow-lg cursor-pointer transition-all duration-300 ease-in-out ${
        isExpanded ? "scale-105" : ""
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.h2
        className="text-2xl font-semibold text-white mb-6"
        animate={{ fontSize: isExpanded ? "2.5rem" : "1.5rem" }}
      >
        Analytics Overview
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        animate={{ opacity: isExpanded ? 1 : 0.8 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg border-none text-white rounded-lg p-4"
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Quizzes Taken</CardTitle>
            <BarChart className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-white/70">+20% from last month</p>
          </CardContent>
        </motion.div>
        <motion.div
          className="bg-white/10 backdrop-blur-lg border-none text-white rounded-lg p-4"
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-white/70">+5% from last month</p>
          </CardContent>
        </motion.div>
        <motion.div
          className="bg-white/10 backdrop-blur-lg border-none text-white rounded-lg p-4"
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            <PieChart className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Science</div>
            <p className="text-xs text-white/70">35% of all quizzes taken</p>
          </CardContent>
        </motion.div>
        <motion.div
          className="bg-white/10 backdrop-blur-lg border-none text-white rounded-lg p-4"
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Achievements Earned</CardTitle>
            <Award className="h-4 w-4 text-white/70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-white/70">3 new this month</p>
          </CardContent>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

