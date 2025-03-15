"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Clock, Award, Star, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import QuizzesLoading from "./loading";

// Expanded quizzes array with categories
const quizzes = [
  {
    id: "general-knowledge",
    title: "General Knowledge",
    description: "Test your knowledge across various topics",
    category: "General",
    icon: "🧠",
    rating: 4.5,
    participants: 1234,
    difficulty: "Medium",
    timeLimit: "10 min",
    questionsCount: 15,
    recommended: true,
  },
  {
    id: "mathematics",
    title: "Mathematics",
    description: "Challenge your mathematical skills",
    category: "Mathematics",
    icon: "🔢",
    rating: 4.8,
    participants: 987,
    difficulty: "Hard",
    timeLimit: "15 min",
    questionsCount: 20,
    recommended: true,
  },
  {
    id: "science",
    title: "Science",
    description: "Explore scientific concepts",
    category: "Science",
    icon: "🔬",
    rating: 4.6,
    participants: 2345,
    difficulty: "Medium",
    timeLimit: "12 min",
    questionsCount: 18,
    recommended: false,
  },
  {
    id: "history",
    title: "History",
    description: "Journey through historical events",
    category: "History",
    icon: "🏛️",
    rating: 4.4,
    participants: 876,
    difficulty: "Medium",
    timeLimit: "10 min",
    questionsCount: 15,
    recommended: false,
  },
  {
    id: "geography",
    title: "Geography",
    description: "Discover world destinations",
    category: "Geography",
    icon: "🌍",
    rating: 4.2,
    participants: 671,
    difficulty: "Easy",
    timeLimit: "8 min",
    questionsCount: 12,
    recommended: false,
  },
  {
    id: "literature",
    title: "Literature",
    description: "Immerse into classic and modern works",
    category: "Literature",
    icon: "📚",
    rating: 4.7,
    participants: 543,
    difficulty: "Hard",
    timeLimit: "15 min",
    questionsCount: 20,
    recommended: true,
  },
  {
    id: "sports",
    title: "Sports",
    description: "Test your sports trivia",
    category: "Sports",
    icon: "🏅",
    rating: 4.3,
    participants: 432,
    difficulty: "Easy",
    timeLimit: "8 min",
    questionsCount: 12,
    recommended: false,
  },
  {
    id: "music",
    title: "Music",
    description: "How well do you know your tunes?",
    category: "Music",
    icon: "🎵",
    rating: 4.5,
    participants: 678,
    difficulty: "Medium",
    timeLimit: "10 min",
    questionsCount: 15,
    recommended: false,
  },
  {
    id: "technology",
    title: "Technology",
    description: "Explore tech innovations",
    category: "Technology",
    icon: "💻",
    rating: 4.9,
    participants: 789,
    difficulty: "Hard",
    timeLimit: "15 min",
    questionsCount: 20,
    recommended: true,
  },
  {
    id: "movies",
    title: "Movies",
    description: "A quiz for cinema enthusiasts",
    category: "Entertainment",
    icon: "🎬",
    rating: 4.6,
    participants: 912,
    difficulty: "Medium",
    timeLimit: "12 min",
    questionsCount: 18,
    recommended: false,
  },
  {
    id: "biology",
    title: "Biology",
    description: "Explore the science of life",
    category: "Science",
    icon: "🧬",
    rating: 4.7,
    participants: 823,
    difficulty: "Hard",
    timeLimit: "15 min",
    questionsCount: 20,
    recommended: true,
  },
  {
    id: "chemistry",
    title: "Chemistry",
    description: "Discover chemical reactions and elements",
    category: "Science",
    icon: "⚗️",
    rating: 4.5,
    participants: 756,
    difficulty: "Hard",
    timeLimit: "15 min",
    questionsCount: 20,
    recommended: false,
  },
  {
    id: "physics",
    title: "Physics",
    description: "Understand the laws of the universe",
    category: "Science",
    icon: "⚛️",
    rating: 4.6,
    participants: 689,
    difficulty: "Hard",
    timeLimit: "15 min",
    questionsCount: 20,
    recommended: true,
  },
  {
    id: "art",
    title: "Art History",
    description: "Explore famous artworks and artists",
    category: "Arts",
    icon: "🎨",
    rating: 4.4,
    participants: 512,
    difficulty: "Medium",
    timeLimit: "12 min",
    questionsCount: 18,
    recommended: false,
  },
  {
    id: "astronomy",
    title: "Astronomy",
    description: "Journey through the cosmos",
    category: "Science",
    icon: "🔭",
    rating: 4.8,
    participants: 678,
    difficulty: "Medium",
    timeLimit: "12 min",
    questionsCount: 18,
    recommended: true,
  },
];

export default function QuizzesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [showRecommended, setShowRecommended] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");

  const categories = [
    "All",
    "General",
    "Mathematics",
    "Science",
    "History",
    "Geography",
    "Literature",
    "Sports",
    "Music",
    "Technology",
    "Entertainment",
    "Arts",
  ];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const filteredQuizzes = quizzes
    .filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "All" || quiz.category === filterCategory;
      const matchesDifficulty =
        filterDifficulty === "All" || quiz.difficulty === filterDifficulty;
      const matchesRecommended = showRecommended ? quiz.recommended : true;
      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty &&
        matchesRecommended
      );
    })
    .sort((a, b) => {
      if (sortBy === "popularity") return b.participants - a.participants;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return Math.random() - 0.5; // Simulating newest since we don't have date
      return 0;
    });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // simulate a 2-second delay
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <QuizzesLoading />;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-background min-h-screen">
      {/* Minimalist Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Discover Quizzes
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Expand your knowledge with our curated collection of quizzes
        </p>
      </motion.section>

      {/* Filters Section - Minimalist Design */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8 space-y-4 bg-card rounded-lg p-4 shadow-sm"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-1/2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full bg-background border-muted"
            />
          </div>
          <div className="flex gap-2 w-full md:w-1/2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full bg-background border-muted">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={showRecommended ? "default" : "outline"}
              onClick={() => setShowRecommended(!showRecommended)}
              className="whitespace-nowrap"
            >
              {showRecommended ? "All Quizzes" : "Recommended"}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Categories</h3>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <motion.div
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={filterCategory === cat ? "default" : "outline"}
                  onClick={() => setFilterCategory(cat)}
                  size="sm"
                  className="capitalize text-xs h-8"
                >
                  {cat}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Difficulty</h3>
          <div className="flex gap-2 flex-wrap">
            {difficulties.map((diff) => (
              <motion.div
                key={diff}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  key={diff}
                  variant={filterDifficulty === diff ? "default" : "outline"}
                  onClick={() => setFilterDifficulty(diff)}
                  size="sm"
                  className={`capitalize text-xs h-8 ${
                    diff === "Easy"
                      ? "text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600"
                      : diff === "Medium"
                        ? "text-amber-500 border-amber-200 hover:bg-amber-50 hover:text-amber-600"
                        : diff === "Hard"
                          ? "text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          : ""
                  }`}
                >
                  {diff}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Quizzes Grid - Minimalist Design */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl font-medium mb-6">Available Quizzes</h2>
        {filteredQuizzes.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg">
            <p className="text-muted-foreground">
              No quizzes found matching your criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("All");
                setFilterDifficulty("All");
                setShowRecommended(false);
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <Card className="h-full flex flex-col bg-card border-muted hover:border-primary/20 transition-all duration-300">
                  {quiz.recommended && (
                    <div className="bg-primary/10 text-primary text-xs py-1 px-3 text-center font-medium">
                      Recommended for you
                    </div>
                  )}
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center text-xl">
                        <span className="text-2xl mr-2">{quiz.icon}</span>
                        {quiz.title}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={`ml-2 ${
                          quiz.difficulty === "Easy"
                            ? "text-green-500 border-green-200 bg-green-50"
                            : quiz.difficulty === "Medium"
                              ? "text-amber-500 border-amber-200 bg-amber-50"
                              : "text-red-500 border-red-200 bg-red-50"
                        }`}
                      >
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2 line-clamp-2">
                      {quiz.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 flex-grow">
                    <div className="grid grid-cols-2 gap-y-2 mb-4 text-sm">
                      <div className="flex items-center">
                        <BookOpen className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {quiz.questionsCount} questions
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {quiz.timeLimit}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 mr-1 text-amber-500" />
                        <span className="text-xs text-muted-foreground">
                          {quiz.rating}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {quiz.participants.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="mr-2 mb-2 text-xs">
                      {quiz.category}
                    </Badge>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Link href={`/quiz/${quiz.id}`} className="w-full">
                      <Button className="w-full" variant="outline">
                        Start Quiz
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </div>
  );
}
