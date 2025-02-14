"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  Book,
  Calculator,
  Atom,
  Globe,
  History,
  Palette,
  Music,
  Code,
  Trophy,
  Star,
  Clock,
  Users,
  ArrowRight,
  Zap,
  Flame,
  BookOpen,
  Award,
  TrendingUp,
  Microscope,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const subjects = [
  {
    id: "mathematics",
    title: "Mathematics",
    icon: Calculator,
    color: "bg-blue-500",
    progress: 65,
    totalCourses: 12,
    completedCourses: 8,
    description: "Master mathematical concepts from basic arithmetic to advanced calculus",
  },
  {
    id: "science",
    title: "Science",
    icon: Atom,
    color: "bg-green-500",
    progress: 45,
    totalCourses: 15,
    completedCourses: 7,
    description: "Explore physics, chemistry, and biology through interactive lessons",
  },
  {
    id: "history",
    title: "History",
    icon: History,
    color: "bg-amber-500",
    progress: 30,
    totalCourses: 10,
    completedCourses: 3,
    description: "Journey through time and explore significant historical events",
  },
  {
    id: "geography",
    title: "Geography",
    icon: Globe,
    color: "bg-purple-500",
    progress: 75,
    totalCourses: 8,
    completedCourses: 6,
    description: "Discover the world's diverse landscapes, cultures, and environments",
  },
  {
    id: "literature",
    title: "Literature",
    icon: BookOpen,
    color: "bg-red-500",
    progress: 20,
    totalCourses: 12,
    completedCourses: 2,
    description: "Explore classic and contemporary literature from around the globe",
  },
  {
    id: "biology",
    title: "Biology",
    icon: Microscope,
    color: "bg-teal-500",
    progress: 50,
    totalCourses: 10,
    completedCourses: 5,
    description: "Uncover the mysteries of life and the natural world",
  },
  {
    id: "art",
    title: "Art",
    icon: Palette,
    color: "bg-pink-500",
    progress: 80,
    totalCourses: 9,
    completedCourses: 7,
    description: "Express your creativity through various art forms and techniques",
  },
  {
    id: "music",
    title: "Music",
    icon: Music,
    color: "bg-indigo-500",
    progress: 90,
    totalCourses: 7,
    completedCourses: 6,
    description: "Explore the world of music through theory, history, and practice",
  },
  {
    id: "computer-science",
    title: "Computer Science",
    icon: Code,
    color: "bg-slate-500",
    progress: 60,
    totalCourses: 15,
    completedCourses: 9,
    description: "Learn the fundamentals of computer programming and software development",
  },
]

const achievements = [
  { id: 1, title: "Quick Learner", icon: Zap, color: "bg-yellow-500", progress: 80 },
  { id: 2, title: "Knowledge Seeker", icon: Book, color: "bg-blue-500", progress: 60 },
  { id: 3, title: "Study Streak", icon: Flame, color: "bg-red-500", progress: 40 },
]

const featuredCourses = [
  {
    id: 1,
    title: "Calculus Fundamentals",
    instructor: "Dr. Sarah Johnson",
    duration: "8 weeks",
    enrolled: 1234,
    rating: 4.8,
    progress: 65,
    image: "/placeholder.svg?height=200&width=400&text=Calculus",
  },
  {
    id: 2,
    title: "World History I",
    instructor: "Professor David Lee",
    duration: "10 weeks",
    enrolled: 987,
    rating: 4.5,
    progress: 40,
    image: "/placeholder.svg?height=200&width=400&text=World+History",
  },
  {
    id: 3,
    title: "Intro to Programming",
    instructor: "Dr. Emily Carter",
    duration: "12 weeks",
    enrolled: 2345,
    rating: 4.8,
    progress: 75,
    image: "/placeholder.svg?height=200&width=400&text=Programming",
  },
]

interface Subject {
  id: string
  title: string
  icon: any
  color: string
  progress: number
  totalCourses: number
  completedCourses: number
  description: string
}

const SubjectCard = ({ subject }: { subject: Subject }) => (
  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
    <Card className="h-full overflow-hidden">
      <div className={`h-2 w-full ${subject.color}`} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`${subject.color} rounded-lg p-2 w-10 h-10 flex items-center justify-center`}>
              <subject.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{subject.title}</h3>
              <p className="text-sm text-muted-foreground">
                {subject.completedCourses} of {subject.totalCourses} courses completed
              </p>
            </div>
          </div>
          <span className="text-sm font-medium">{subject.progress}%</span>
        </div>
        <Progress value={subject.progress} className="h-2 mb-4 bg-muted [&>div]:bg-blue-600" />
        <p className="text-sm text-muted-foreground mb-6">{subject.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <Avatar key={i} className="border-2 border-background h-8 w-8">
                <AvatarImage src={`/placeholder.svg?height=32&width=32&text=U${i}`} />
                <AvatarFallback>U{i}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Link href={`/learn/${subject.id}`}>
            <Button variant="ghost" className="font-medium">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

interface Course {
  id: number
  title: string
  instructor: string
  duration: string
  enrolled: number
  rating: number
  progress: number
  image: string
}

const FeaturedCourseCard = ({ course }: { course: Course }) => (
  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.instructor}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{course.enrolled} enrolled</span>
          </div>
        </div>
        <div className="flex items-center mb-4">
          <Star className="mr-2 h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">{course.rating}</span>
        </div>
        <Progress value={course.progress} className="mb-4" />
        <Button className="w-full">Continue Learning</Button>
      </CardContent>
    </Card>
  </motion.div>
)

export default function LearnPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [studyStreak, setStudyStreak] = useState(7)
  const [showAchievement, setShowAchievement] = useState(false)

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm)
    // Filter subjects based on search term
    const filteredSubjects = subjects.filter(
      (subject) =>
        subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    // Update UI with filtered subjects
    //  This would require a more complex UI update mechanism, potentially using a state variable to hold the filtered subjects and conditionally rendering them.  This is omitted for brevity as it's beyond the scope of the prompt.
  }

  const handleFilter = (filter: string) => {
    switch (filter) {
      case "recent":
        router.push("/recent")
        break
      case "popular":
        router.push("/popular")
        break
      case "trending":
        router.push("/trending")
        break
      default:
        break
    }
  }

  useEffect(() => {
    // Simulate achievement unlock
    const timer = setTimeout(() => {
      setShowAchievement(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Your Personal
                <span className="text-primary"> Learning Journey</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Track your progress, earn achievements, and master new skills at your own pace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg">
                  Continue Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  Browse Courses
                  <BookOpen className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="bg-primary/5 border-none">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Flame className="h-6 w-6 text-orange-500" />
                      <span className="text-2xl font-bold">{studyStreak} Day Streak!</span>
                    </div>
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={65} className="mb-4" />
                  <p className="text-sm text-muted-foreground">Keep learning to maintain your streak!</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses and subjects..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleFilter("recent")}>
                <Clock className="mr-2 h-4 w-4" />
                Recent
              </Button>
              <Button variant="outline" onClick={() => handleFilter("popular")}>
                <Star className="mr-2 h-4 w-4" />
                Popular
              </Button>
              <Button variant="outline" onClick={() => handleFilter("trending")}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Trending
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Your Learning Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedSubject(subject.id)}
              >
                <SubjectCard subject={subject} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Your Achievements</h2>
            <Button variant="outline">
              View All
              <Trophy className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-full ${achievement.color}`}>
                        <achievement.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline">{achievement.progress}%</Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{achievement.title}</h3>
                    <Progress value={achievement.progress} className="mb-2" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-8">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FeaturedCourseCard course={course} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievement Popup - Updated with navigation */}
      <AnimatePresence>
        {showAchievement && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50"
          >
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  New Achievement Unlocked!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>You've earned the "Consistent Learner" badge!</p>
                <Button 
                  variant="secondary" 
                  className="mt-4" 
                  onClick={() => {
                    setShowAchievement(false)
                    router.push('/achievements')
                  }}
                >
                  View Achievement
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

