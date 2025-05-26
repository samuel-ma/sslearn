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
import { LogIn, BookOpen, Users, Trophy, Star, ArrowRight, Globe } from "lucide-react";
import { FeaturedQuizzesSkeleton } from "@/components/FeaturedQuizzesSkeleton";
import { StudyMaterialsDashboard } from "@/components/StudyMaterialsDashboard";
import { FeaturedExams } from "@/components/FeaturedExams";
import { motion } from "framer-motion";

import {  } from 'lucide-react';


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
          <h1 className="text-2xl font-bold">Welcome to SS-Learn 👋</h1>
          <p className="text-md text-gray-600">
            Challenge yourself and learn something new today!
          </p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div>
        {/* Main banner */}
        <div className="relative p-10 rounded-lg w-full h-[250px] overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-6 left-20 w-12 h-12 border-2 border-white rounded-full"></div>
                <div className="absolute top-12 right-32 w-10 h-10 border-2 border-white rounded-lg rotate-45"></div>
                <div className="absolute bottom-8 left-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
                <div className="absolute bottom-12 right-1/3 w-8 h-8 border-2 border-white rounded-lg rotate-12"></div>
                <div className="absolute top-20 left-1/2 w-6 h-6 border-2 border-white rounded-full"></div>
            </div>

            {/* Main Content */}
            <div className="relative h-full flex items-center">
                <div className="flex items-center justify-between w-full gap-8">
                
                {/* Left Content */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5">
                        <Globe className="w-4 h-4" />
                        <span className="text-sm font-medium">SS-Learn</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-300 fill-current" />
                        <Star className="w-4 h-4 text-yellow-300 fill-current" />
                        <Star className="w-4 h-4 text-yellow-300 fill-current" />
                        <Star className="w-4 h-4 text-yellow-300 fill-current" />
                        <Star className="w-4 h-4 text-yellow-300 fill-current" />
                        <span className="text-sm text-blue-100 ml-1">Trusted by 1000+ students</span>
                    </div>
                    </div>
                    
                    <h1 className="text-2xl font-bold mb-2 leading-tight">
                    Empowering South Sudanese Students
                    <span className="block text-yellow-300">Through Quality Education</span>
                    </h1>
                    
                    <p className="text-sm text-blue-100 mb-4">
                    Access world-class education in your local language. Learn at your own pace, connect with peers, and build a brighter future.
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                    <button className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2">
                        Start Learning Free
                        <ArrowRight className="w-4 h-4" />
                    </button>
                    <button className="border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300">
                        Browse Courses
                    </button>
                    </div>
                </div>

                {/* Center Stats */}
                <div className="hidden lg:flex flex-col gap-4">
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center min-w-[120px]">
                    <div className="text-2xl font-bold text-yellow-300">1000+</div>
                    <div className="text-xs text-blue-100">Active Students</div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center min-w-[120px]">
                    <div className="text-2xl font-bold text-yellow-300">50+</div>
                    <div className="text-xs text-blue-100">Courses Available</div>
                    </div>
                </div>

                
                </div>
            </div>

            {/* Floating Animation Elements */}
            <div className="absolute top-8 right-20 animate-pulse">
                <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
            </div>
            <div className="absolute bottom-8 left-40 animate-pulse" style={{animationDelay: '1s'}}>
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-16 left-3/4 animate-pulse" style={{animationDelay: '2s'}}>
                <div className="w-1 h-1 bg-green-300 rounded-full"></div>
        </div>

            {/* Subtle bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-blue-800/30 to-transparent"></div>
            </div>
      </div>
      </motion.div>

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
    </motion.div>
  );
}
