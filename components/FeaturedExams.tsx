"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Clock,
  FileText,
  Sparkles,
  Award,
  BookOpen,
  Calendar,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Sample exam data
const featuredExams = [
  {
    id: "ple-2022",
    title: "PLE Mathematics 2022",
    description: "Primary Leaving Examination for Mathematics from 2022",
    country: "Uganda",
    type: "PLE",
    subject: "Mathematics",
    year: 2022,
    questions: 10,
    duration: "2 hours",
    difficulty: "Intermediate",
    popularity: 95,
    passingRate: 68,
    featured: true,
    level: "Primary",
    educationSystem: "Primary",
    color: "#4f46e5",
    bgGradient: "from-indigo-50 to-indigo-100",
    icon: "📝",
  },
  {
    id: "sat-2022",
    title: "SAT Mathematics 2022",
    description: "Scholastic Assessment Test for Mathematics from 2022",
    country: "USA",
    type: "SAT",
    subject: "Mathematics",
    year: 2022,
    questions: 10,
    duration: "3 hours",
    difficulty: "Advanced",
    popularity: 98,
    passingRate: 65,
    featured: true,
    level: "High School",
    educationSystem: "Secondary",
    color: "#0891b2",
    bgGradient: "from-cyan-50 to-cyan-100",
    icon: "🎓",
  },
  {
    id: "kcse-2022",
    title: "KCSE Mathematics 2022",
    description:
      "Kenya Certificate of Secondary Education for Mathematics from 2022",
    country: "Kenya",
    type: "KCSE",
    subject: "Mathematics",
    year: 2022,
    questions: 10,
    duration: "2 hours",
    difficulty: "Advanced",
    popularity: 90,
    passingRate: 67,
    featured: true,
    level: "Secondary",
    educationSystem: "Secondary",
    color: "#ca8a04",
    bgGradient: "from-amber-50 to-amber-100",
    icon: "🧮",
  },
  {
    id: "igcse-2022",
    title: "IGCSE Mathematics 2022",
    description:
      "International General Certificate of Secondary Education for Mathematics",
    country: "International",
    type: "IGCSE",
    subject: "Mathematics",
    year: 2022,
    questions: 12,
    duration: "2.5 hours",
    difficulty: "Intermediate",
    popularity: 94,
    passingRate: 75,
    featured: true,
    level: "Secondary",
    educationSystem: "Secondary",
    color: "#16a34a",
    bgGradient: "from-green-50 to-green-100",
    icon: "🌍",
  },
];

export function FeaturedExams() {
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredExam, setHoveredExam] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 bg-gradient-to-b from-background to-muted/30 p-6 rounded-2xl border border-border/40"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Featured Exams</h2>
            <Badge
              variant="outline"
              className="ml-2 bg-primary/10 hover:bg-primary/20 text-primary"
            >
              New
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Practice with real past examination papers to boost your performance
          </p>
        </div>
        <Link href="/exams">
          <Button variant="outline" className="group">
            Browse All Exams
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-[280px] bg-muted animate-pulse rounded-xl"
            ></div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {featuredExams.map((exam, index) => (
            <motion.div
              key={exam.id}
              variants={item}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
              onHoverStart={() => setHoveredExam(exam.id)}
              onHoverEnd={() => setHoveredExam(null)}
              className={`bg-gradient-to-br ${exam.bgGradient} dark:bg-gradient-to-br dark:from-gray-800/90 dark:to-gray-700/90 dark:border-${exam.color.replace("#", "")} rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 dark:border-opacity-30 relative`}
              style={{
                backgroundColor: "white",
                borderColor: exam.color,
              }} // Fallback background color with custom border
            >
              <div className="absolute top-0 right-0 w-24 h-24 opacity-10 flex items-center justify-center text-4xl">
                <span>{exam.icon}</span>
              </div>

              <div
                className="p-6 flex flex-col h-full relative z-10"
                style={{ backgroundColor: "transparent" }}
              >
                <div className="flex justify-between items-start mb-4">
                  <Badge
                    variant="secondary"
                    className={`px-3 py-1 text-sm font-medium ${hoveredExam === exam.id ? "text-white" : "bg-white/80 dark:bg-gray-800 backdrop-blur-sm"} transition-colors duration-300 shadow-sm`}
                    style={
                      hoveredExam === exam.id
                        ? { backgroundColor: exam.color }
                        : {}
                    }
                  >
                    {exam.type}
                  </Badge>
                  <div className="flex items-center text-xs font-medium px-2 py-1 rounded-full bg-white/80 dark:bg-gray-800 dark:text-white backdrop-blur-sm shadow-sm">
                    <FileText
                      className="h-3 w-3 mr-1"
                      style={{ color: exam.color }}
                    />
                    {exam.questions} Questions
                  </div>
                </div>

                <h3
                  className="text-xl font-bold mb-2 line-clamp-1 dark:text-white"
                  style={{ color: exam.color }}
                >
                  {exam.title}
                </h3>
                <p className="text-sm text-muted-foreground dark:text-gray-200 mb-5 line-clamp-2">
                  {exam.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="flex flex-col gap-1 bg-white/60 dark:bg-gray-800/80 dark:border dark:border-gray-700 backdrop-blur-sm p-3 rounded-lg">
                    <div className="flex items-center text-xs text-muted-foreground dark:text-gray-300 mb-1">
                      <GraduationCap
                        className="h-3 w-3 mr-1"
                        style={{ color: exam.color }}
                      />
                      <span>Difficulty</span>
                    </div>
                    <span className="text-sm font-medium dark:text-white">
                      {exam.difficulty}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 bg-white/60 dark:bg-gray-800/80 dark:border dark:border-gray-700 backdrop-blur-sm p-3 rounded-lg">
                    <div className="flex items-center text-xs text-muted-foreground dark:text-gray-300 mb-1">
                      <Clock
                        className="h-3 w-3 mr-1"
                        style={{ color: exam.color }}
                      />
                      <span>Duration</span>
                    </div>
                    <span className="text-sm font-medium dark:text-white">
                      {exam.duration}
                    </span>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="text-muted-foreground dark:text-gray-300">
                      Passing Rate
                    </span>
                    <span
                      className="font-medium dark:text-white"
                      style={{ color: exam.color }}
                    >
                      {exam.passingRate}%
                    </span>
                  </div>
                  <Progress
                    value={exam.passingRate}
                    className="h-2 dark:bg-gray-700"
                    style={
                      {
                        backgroundColor: "rgba(255,255,255,0.5)",
                        "--progress-value": `${exam.passingRate}%`,
                      } as any
                    }
                  />
                </div>

                <Link href={`/exams/${exam.id}`} className="mt-auto">
                  <Button
                    className="w-full group font-medium dark:bg-white dark:text-black dark:hover:bg-opacity-90 dark:hover:text-white"
                    style={
                      hoveredExam === exam.id
                        ? { backgroundColor: exam.color }
                        : {}
                    }
                    variant={hoveredExam === exam.id ? "default" : "secondary"}
                  >
                    Start Exam
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
}
