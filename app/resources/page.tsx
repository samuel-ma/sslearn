"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  CheckCircle,
  Star,
  ArrowRight,
  BookOpen,
  Calculator,
  FlaskRoundIcon as Flask,
  Globe,
  History,
  Users,
  MessageCircle,
} from "lucide-react"

const subjects = [
  {
    id: "math",
    title: "Mathematics",
    icon: Calculator,
    color: "bg-blue-500",
    resources: 234,
    experts: 12,
  },
  {
    id: "science",
    title: "Science",
    icon: Flask,
    color: "bg-green-500",
    resources: 189,
    experts: 15,
  },
  {
    id: "history",
    title: "History",
    icon: History,
    color: "bg-yellow-500",
    resources: 156,
    experts: 8,
  },
  {
    id: "geography",
    title: "Geography",
    icon: Globe,
    color: "bg-purple-500",
    resources: 142,
    experts: 10,
  },
]

const featuredResources = [
  {
    id: 1,
    title: "Calculus Made Easy",
    type: "Course",
    author: "Dr. Sarah Johnson",
    rating: 4.8,
    students: 1234,
    image: "/placeholder.svg?height=200&width=400&text=Calculus",
    verified: true,
  },
  {
    id: 2,
    title: "Chemistry Fundamentals",
    type: "Video Series",
    author: "Prof. Michael Chen",
    rating: 4.7,
    students: 987,
    image: "/placeholder.svg?height=200&width=400&text=Chemistry",
    verified: true,
  },
  {
    id: 3,
    title: "World History Timeline",
    type: "Interactive Guide",
    author: "Dr. Emily Williams",
    rating: 4.9,
    students: 2156,
    image: "/placeholder.svg?height=200&width=400&text=History",
    verified: true,
  },
]

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Student",
    avatar: "/placeholder.svg?height=40&width=40&text=AT",
    content: "The step-by-step explanations helped me understand complex topics easily.",
    subject: "Mathematics",
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "High School Student",
    avatar: "/placeholder.svg?height=40&width=40&text=MG",
    content: "I improved my grades significantly using these resources!",
    subject: "Science",
  },
  {
    id: 3,
    name: "James Wilson",
    role: "College Student",
    avatar: "/placeholder.svg?height=40&width=40&text=JW",
    content: "The expert-verified content gives me confidence in my learning.",
    subject: "History",
  },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Learn Anything with Expert Explanations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Access step-by-step solutions, video tutorials, and comprehensive study guides verified by experts.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for any topic or subject..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Popular Subjects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${subject.color} flex items-center justify-center mb-4`}>
                      <subject.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle>{subject.title}</CardTitle>
                    <CardDescription>
                      {subject.resources} resources • {subject.experts} experts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      Explore Resources
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={resource.image || "/placeholder.svg"}
                      alt={resource.title}
                      className="w-full h-48 object-cover"
                    />
                    {resource.verified && (
                      <Badge className="absolute top-4 right-4 bg-green-500">
                        <CheckCircle className="mr-1 h-3 w-3" /> Expert Verified
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{resource.title}</CardTitle>
                        <CardDescription>
                          {resource.type} by {resource.author}
                        </CardDescription>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{resource.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-muted-foreground">
                        <Users className="inline h-4 w-4 mr-1" />
                        {resource.students} students
                      </span>
                      <Badge variant="outline">{resource.type}</Badge>
                    </div>
                    <Button className="w-full">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Search,
                title: "Find Your Topic",
                description: "Search through our extensive library of resources across various subjects.",
              },
              {
                icon: BookOpen,
                title: "Learn Step-by-Step",
                description: "Follow detailed explanations and interactive guides at your own pace.",
              },
              {
                icon: MessageCircle,
                title: "Get Expert Help",
                description: "Connect with subject matter experts for personalized assistance.",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Student Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2">{testimonial.content}</p>
                    <Badge variant="secondary">{testimonial.subject}</Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Excel in Your Studies?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of students who are already benefiting from our expert-verified resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              Browse Resources
              <BookOpen className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

