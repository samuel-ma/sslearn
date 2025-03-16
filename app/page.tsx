"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import LeaderboardPreview from "@/components/LeaderboardPreview";
import AnalyticsOverview from "@/components/AnalyticsOverview";
import { DailyChallenge } from "@/components/DailyChallenge";
import { StudyStreak } from "@/components/StudyStreak";
import { Banner } from "@/components/Banner";
import Link from "next/link";
import { ArrowRight, LogIn } from "lucide-react";
import { FeaturedQuizzesSkeleton } from "@/components/FeaturedQuizzesSkeleton";
import { StudyMaterialsDashboard } from "@/components/StudyMaterialsDashboard";
import { FeaturedExams } from "@/components/FeaturedExams";
import { motion } from "framer-motion";

// Update featured quizzes array to use string IDs
const quizzes = [
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description: "Test your general knowledge",
    category: "General",
    icon: "🧠",
  },
  {
    id: "mathematics",
    title: "Mathematics",
    description: "Challenge your mathematical skills",
    category: "Mathematics",
    icon: "🔢",
  },
  {
    id: "science",
    title: "Science",
    description: "Explore scientific concepts",
    category: "Science",
    icon: "🔬",
  },
  {
    id: "history",
    title: "History",
    description: "Journey through historical events",
    category: "History",
    icon: "🏛️",
  },
];

export default function Dashboard() {
  const [isLoadingFeatured, setIsLoadingFeatured] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingFeatured(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome to SS-Learn</h1>
          <p className="text-xl text-gray-600">
            Challenge yourself and learn something new today!
          </p>
        </div>
      </div>

      <div>
        <AnalyticsOverview />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
        <div className="lg:col-span-2 space-y-8">
          <FeaturedExams />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StudyMaterialsDashboard />
          </motion.div>

          <section>
            {isLoadingFeatured ? (
              <FeaturedQuizzesSkeleton />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Featured Quizzes
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quizzes.map((quiz, index) => (
                    <motion.div
                      key={quiz.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                          <CardTitle className="flex items-center text-2xl">
                            <span className="text-3xl mr-2">{quiz.icon}</span>
                            {quiz.title}
                          </CardTitle>
                          <CardDescription>{quiz.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <p className="text-sm text-muted-foreground mb-4">
                            Category: {quiz.category}
                          </p>
                          <Link href={`/quiz/${quiz.id}`}>
                            <Button className="w-full group">
                              Start Quiz
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Link href="/quizzes">
                    <Button variant="outline" size="lg" className="group">
                      Explore All Quizzes
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </section>
        </div>

        <div className="space-y-4 lg:space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <LeaderboardPreview />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <DailyChallenge />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <StudyStreak />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Banner />
      </motion.div>
    </motion.div>
  );
}
