import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"
import Link from "next/link"

const allCourses = [
  {
    id: 1,
    title: "Mathematics",
    categories: ["Algebra", "Calculus", "Geometry"],
    totalCourses: 25,
  },
  {
    id: 2,
    title: "Science",
    categories: ["Physics", "Chemistry", "Biology"],
    totalCourses: 30,
  },
  {
    id: 3,
    title: "History",
    categories: ["World History", "Ancient Civilizations", "Modern History"],
    totalCourses: 20,
  },
]

export default function BrowsePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Browse All Courses</h1>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid gap-6">
        {allCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {course.categories.map((category) => (
                  <span key={category} className="bg-muted px-2 py-1 rounded-md text-sm">
                    {category}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span>{course.totalCourses} courses</span>
                <Link href={`/learn/${course.title.toLowerCase()}`}>
                  <Button>Explore</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

