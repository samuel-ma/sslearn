import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BookOpen,
  Calendar,
  Clock,
  GraduationCap,
  MapPin,
  BarChart,
  School,
  Layers,
} from "lucide-react";
import Link from "next/link";

interface ExamCardProps {
  exam: {
    id: string;
    title: string;
    description: string;
    country: string;
    type: string;
    subject: string;
    year: number;
    questions: number;
    duration: string;
    difficulty: string;
    popularity?: number;
    passingRate?: number;
    level?: string;
    educationSystem?: string;
  };
  index: number;
  variant?: "compact" | "full";
}

export function ExamCard({ exam, index, variant = "full" }: ExamCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "intermediate":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="h-full flex flex-col hover:shadow-lg transition-all border-2 hover:border-primary/20">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{exam.title}</CardTitle>
              <CardDescription className="mt-2">
                {exam.description}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-xs font-medium">
              {exam.type}
            </Badge>
          </div>
        </CardHeader>
        <CardContent
          className={`flex-grow ${variant === "compact" ? "pb-3" : ""}`}
        >
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
              <span>{exam.subject}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{exam.year}</span>
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>{exam.questions} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{exam.duration}</span>
            </div>
          </div>

          {variant === "full" && (
            <>
              <div className="mt-4 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{exam.country}</span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(exam.difficulty)}`}
                >
                  {exam.difficulty}
                </span>
              </div>
              {exam.level && (
                <div className="mt-2 flex items-center gap-2">
                  <School className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Level: {exam.level}</span>
                </div>
              )}
              {exam.educationSystem && (
                <div className="mt-2 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    System: {exam.educationSystem}
                  </span>
                </div>
              )}
              {exam.passingRate && (
                <div className="mt-2 flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Passing rate: {exam.passingRate}%
                  </span>
                </div>
              )}
            </>
          )}
        </CardContent>
        <CardFooter>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/exams/${exam.id}`} className="w-full">
                  <Button className="w-full">Start Exam</Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Begin this {exam.difficulty} level exam</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
