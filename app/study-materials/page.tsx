"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Search, BookOpen, ArrowRight, GraduationCap, Clock, Award } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { subjects } from "@/data/study-material"  // Import subjects from data file

export default function StudyMaterialsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  // Updated filtering logic for functional filters
  const filteredSubjects = subjects
    .map(subject => {
      const filteredMaterials = subject.materials.filter(material => {
        const matchesLevel =
          selectedLevel === "all" ||
          material.name.toLowerCase().includes(selectedLevel.toLowerCase())
        const matchesTab =
          activeTab === "all" ||
          (activeTab === "completed"
            ? material.status === "completed"
            : material.status !== "completed")
        return matchesLevel && matchesTab
      })
      return { ...subject, materials: filteredMaterials }
    })
    .filter(subject => {
      const matchesSearch = subject.title.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch && subject.materials.length > 0
    })

  return (
    <div className="w-full px-4 py-6">
      <div className="container max-w-7xl mx-auto p-6">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4">Senior Secondary Study Materials</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive study materials aligned with the senior secondary curriculum. 
            Track your progress, prepare for exams, and excel in your studies.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[{ icon: GraduationCap, label: "Study Materials", value: "24 Books" }, { icon: Clock, label: "Average Completion", value: "45 Hours" }, { icon: Award, label: "Exam Resources", value: "All Subjects" }].map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search subjects..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="senior 1">Senior 1</SelectItem>
              <SelectItem value="senior 2">Senior 2</SelectItem>
              <SelectItem value="senior 3">Senior 3</SelectItem>
              <SelectItem value="senior 4">Senior 4</SelectItem>
            </SelectContent>
          </Select>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Materials Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filteredSubjects.map((subject, index) => (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative group hover:shadow-lg transition-all">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${subject.color} flex items-center justify-center text-2xl mb-2`}>
                    {subject.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{subject.title}</CardTitle>
                  <CardDescription>{subject.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Overall Progress</span>
                        <span className="font-medium">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      {subject.materials.map((material) => (
                        <Link 
                          key={material.id} 
                          href={`/study-materials/${material.id}`}
                          className="block"
                        >
                          <Card className="hover:bg-muted/50 transition-colors">
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <BookOpen className="h-4 w-4" />
                                <span>{material.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge 
                                  variant={material.status === 'completed' ? 'default' : 'secondary'}
                                  className="capitalize"
                                >
                                  {material.status}
                                </Badge>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
