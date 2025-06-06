"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Medal,
  Search,
  Filter,
  RefreshCw,
  BookOpen,
  GraduationCap,
  Award,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LeaderboardLoading from "./loading";

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  quizzesTaken: number;
  avatarUrl: string;
  rank: number;
  achievements: number;
  accuracy: number;
  streak: number;
  examScore: number;
  totalScore: number;
  examsTaken: number;
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("score");
  const [timeFrame, setTimeFrame] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // In a real application, you would fetch data based on the timeFrame
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(
          data.leaderboard.map((entry: LeaderboardEntry, index: number) => {
            // Simulate exam scores and other metrics
            const examScore = Math.round(Math.random() * 500 + 200);
            const examsTaken = Math.round(Math.random() * 8 + 2);
            const accuracy = Math.round(Math.random() * 40 + 60);
            const streak = Math.round(Math.random() * 10);
            const achievements =
              entry.achievements || Math.round(Math.random() * 10 + 1);

            // Calculate total score based on quiz score, exam score and achievements
            const totalScore = entry.score + examScore + achievements * 50;

            return {
              ...entry,
              rank: index + 1,
              accuracy,
              streak,
              examScore,
              examsTaken,
              achievements,
              totalScore,
            };
          }),
        );
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard:", error);
        setLoading(false);
      });
  }, []); // Removed timeFrame from dependencies

  const filteredLeaderboard = leaderboard
    .filter((entry) =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortBy as keyof LeaderboardEntry];
      const bValue = b[sortBy as keyof LeaderboardEntry];
      return typeof aValue === "number" && typeof bValue === "number"
        ? bValue - aValue
        : 0;
    });

  const topThree = filteredLeaderboard.slice(0, 3);
  const restOfLeaderboard = filteredLeaderboard.slice(3);

  if (isLoading) {
    return <LeaderboardLoading />;
  }

  if (loading) {
    return (
      <div className="text-center text-2xl mt-8">Loading leaderboard...</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        SS-Learn Leaderboard
      </h1>

      <Tabs defaultValue="leaderboard" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leaderboard">Global Leaderboard</TabsTrigger>
          <TabsTrigger value="personal">Your Rankings</TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-4 mb-8">
                {topThree.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="relative">
                      <Avatar className="w-24 h-24 mx-auto mb-2">
                        <AvatarImage src={entry.avatarUrl} alt={entry.name} />
                        <AvatarFallback>
                          {entry.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <Medal
                        className={`absolute -top-2 -right-2 w-8 h-8 ${
                          index === 0
                            ? "text-yellow-400"
                            : index === 1
                              ? "text-gray-400"
                              : "text-orange-400"
                        }`}
                      />
                    </div>
                    <h3 className="font-semibold text-lg">{entry.name}</h3>
                    <p className="text-2xl font-bold">{entry.totalScore}</p>
                    <p className="text-sm text-muted-foreground">
                      Rank #{index + 1}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="bg-accent rounded-lg p-4 mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-4">
                  <div className="w-full md:w-1/3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[180px]">
                          <Filter className="mr-2 h-4 w-4" />
                          Sort & Filter
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Card>
                          <CardContent className="space-y-2 p-4">
                            <div className="space-y-1">
                              <label
                                htmlFor="sort-by"
                                className="text-sm font-medium"
                              >
                                Sort by
                              </label>
                              <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger id="sort-by">
                                  <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  <SelectItem value="totalScore">
                                    Total Score
                                  </SelectItem>
                                  <SelectItem value="score">
                                    Quiz Score
                                  </SelectItem>
                                  <SelectItem value="examScore">
                                    Exam Score
                                  </SelectItem>
                                  <SelectItem value="quizzesTaken">
                                    Quizzes Taken
                                  </SelectItem>
                                  <SelectItem value="examsTaken">
                                    Exams Taken
                                  </SelectItem>
                                  <SelectItem value="accuracy">
                                    Accuracy
                                  </SelectItem>
                                  <SelectItem value="streak">Streak</SelectItem>
                                  <SelectItem value="achievements">
                                    Achievements
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-1">
                              <label
                                htmlFor="time-frame"
                                className="text-sm font-medium"
                              >
                                Time frame
                              </label>
                              <Select
                                value={timeFrame}
                                onValueChange={setTimeFrame}
                              >
                                <SelectTrigger id="time-frame">
                                  <SelectValue placeholder="Time frame" />
                                </SelectTrigger>
                                <SelectContent position="popper">
                                  <SelectItem value="all">All Time</SelectItem>
                                  <SelectItem value="month">
                                    This Month
                                  </SelectItem>
                                  <SelectItem value="week">
                                    This Week
                                  </SelectItem>
                                  <SelectItem value="day">Today</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </CardContent>
                        </Card>
                      </PopoverContent>
                    </Popover>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("");
                        setSortBy("score");
                        setTimeFrame("all");
                      }}
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Reset
                    </Button>
                  </div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        Total Score
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1 text-blue-500" />
                        Quiz Score
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <GraduationCap className="w-4 h-4 mr-1 text-green-500" />
                        Exam Score
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <Zap className="w-4 h-4 mr-1 text-amber-500" />
                        Accuracy
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1 text-purple-500" />
                        Achievements
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {restOfLeaderboard.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">
                        {entry.rank}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage
                              src={entry.avatarUrl}
                              alt={entry.name}
                            />
                            <AvatarFallback>
                              {entry.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <span>{entry.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {entry.totalScore}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span>{entry.score}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({entry.quizzesTaken} quizzes)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span>{entry.examScore}</span>
                          <span className="text-xs text-muted-foreground ml-2">
                            ({entry.examsTaken} exams)
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-full bg-muted rounded-full h-2.5 mb-1">
                          <div
                            className="bg-primary h-2.5 rounded-full"
                            style={{ width: `${entry.accuracy}%` }}
                          ></div>
                        </div>
                        <span className="text-xs">
                          {entry.accuracy}% (streak: {entry.streak})
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {entry.achievements}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Your Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-lg mb-4">
                Log in to see your personal rankings and progress!
              </p>
              <div className="flex justify-center">
                <Button>Log In</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
