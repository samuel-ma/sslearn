"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  BarChart,
  BookOpen,
  Star,
  Target,
  Zap,
  Clock,
  Users,
  Trophy,
  Bookmark,
  Rocket,
  GraduationCap,
} from "lucide-react"

const achievements = [
  { id: 1, name: "Quick Learner", description: "Completed 5 courses in a week", icon: Zap, color: "bg-yellow-500" },
  { id: 2, name: "Bookworm", description: "Read 1000 pages of course material", icon: BookOpen, color: "bg-blue-500" },
  { id: 3, name: "Perfect Score", description: "Achieved 100% in a quiz", icon: Target, color: "bg-green-500" },
  {
    id: 4,
    name: "Consistent Learner",
    description: "Logged in for 30 consecutive days",
    icon: Clock,
    color: "bg-purple-500",
  },
  {
    id: 5,
    name: "Helpful Peer",
    description: "Answered 50 questions in the community forum",
    icon: Users,
    color: "bg-pink-500",
  },
]

const courses = [
  { id: 1, name: "Introduction to Python", progress: 80, score: 92 },
  { id: 2, name: "Web Development Fundamentals", progress: 65, score: 88 },
  { id: 3, name: "Data Science Essentials", progress: 40, score: 78 },
  { id: 4, name: "Machine Learning Basics", progress: 25, score: 85 },
  { id: 5, name: "Advanced JavaScript", progress: 90, score: 95 },
]

const quizHistory = [
  { id: 1, name: "Python Basics", score: 9, total: 10, date: "2023-05-15" },
  { id: 2, name: "HTML & CSS", score: 18, total: 20, date: "2023-05-10" },
  { id: 3, name: "JavaScript Fundamentals", score: 14, total: 15, date: "2023-05-05" },
  { id: 4, name: "Data Structures", score: 12, total: 15, date: "2023-04-30" },
  { id: 5, name: "Algorithms", score: 17, total: 20, date: "2023-04-25" },
]

const skills = [
  { name: "JavaScript", level: 85 },
  { name: "Python", level: 70 },
  { name: "React", level: 80 },
  { name: "Node.js", level: 75 },
  { name: "SQL", level: 65 },
]

export default function ProfilePage() {
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-center sm:text-left">
                <CardTitle className="text-3xl">John Doe</CardTitle>
                <CardDescription className="text-lg">Web Development Enthusiast</CardDescription>
                <div className="flex flex-wrap justify-center sm:justify-start items-center mt-2 space-x-2">
                  <Badge variant="secondary" className="text-sm">
                    Level 15
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    1250 XP
                  </Badge>
                  <span className="text-sm text-muted-foreground">Joined: January 2023</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Passionate learner with a focus on web technologies and programming. Always eager to take on new
              challenges and expand my knowledge.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button>Edit Profile</Button>
              <Button variant="outline">Share Profile</Button>
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center text-center cursor-pointer"
                    onClick={() => setSelectedAchievement(achievement)}
                  >
                    <div
                      className={`w-16 h-16 rounded-full ${achievement.color} flex items-center justify-center mb-2`}
                    >
                      <achievement.icon className="h-8 w-8 text-white" />
                    </div>
                    <span className="text-sm font-medium">{achievement.name}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedAchievement(null)}
          >
            <Card className="w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <selectedAchievement.icon
                    className={`mr-2 h-6 w-6 ${selectedAchievement.color} text-white rounded-full p-1`}
                  />
                  {selectedAchievement.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{selectedAchievement.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <div className="mt-8">
        <Tabs defaultValue="progress">
          <TabsList className="w-full justify-start mb-4 overflow-x-auto flex-nowrap">
            <TabsTrigger value="progress">Course Progress</TabsTrigger>
            <TabsTrigger value="quizzes">Quiz History</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="stats">Learning Stats</TabsTrigger>
          </TabsList>
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Course Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                {courses.map((course) => (
                  <div key={course.id} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{course.name}</span>
                      <span className="text-sm text-muted-foreground">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-muted-foreground">Score: {course.score}%</span>
                      <Badge variant={course.score >= 90 ? "success" : "secondary"}>
                        {course.score >= 90 ? "Excellent" : "Good"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="quizzes">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="mr-2 h-5 w-5" />
                  Quiz History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  {quizHistory.map((quiz) => (
                    <div key={quiz.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{quiz.name}</p>
                        <p className="text-sm text-muted-foreground">{quiz.date}</p>
                      </div>
                      <Badge variant={quiz.score / quiz.total >= 0.8 ? "success" : "secondary"}>
                        {quiz.score}/{quiz.total}
                      </Badge>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Rocket className="mr-2 h-5 w-5" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent>
                {skills.map((skill) => (
                  <div key={skill.name} className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="stats">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart className="mr-2 h-5 w-5" />
                    Learning Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] flex items-end justify-between">
                    {[...Array(7)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 bg-primary rounded-t"
                        style={{ height: `${Math.random() * 100}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="mr-2 h-5 w-5" />
                    Key Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">15</p>
                      <p className="text-sm text-muted-foreground">Courses Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">42</p>
                      <p className="text-sm text-muted-foreground">Quizzes Taken</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">89%</p>
                      <p className="text-sm text-muted-foreground">Average Score</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">120h</p>
                      <p className="text-sm text-muted-foreground">Total Study Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bookmark className="mr-2 h-5 w-5" />
            Recommended Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {["Advanced React Patterns", "Node.js Microservices", "GraphQL Fundamentals"].map((course, index) => (
              <Button key={index} variant="outline" className="h-auto py-4 flex flex-col items-start text-left">
                <span className="text-lg font-semibold mb-1">{course}</span>
                <span className="text-sm text-muted-foreground">Enhance your skills</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

