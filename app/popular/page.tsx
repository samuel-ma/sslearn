import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Users } from "lucide-react"
import Link from "next/link"

const popularCourses = [
  {
    id: 1,
    title: "Introduction to Python",
    enrolled: 15234,
    rating: 4.8,
    subject: "Computer Science",
  },
  {
    id: 2,
    title: "Basic Calculus",
    enrolled: 12456,
    rating: 4.7,
    subject: "Mathematics",
  },
  {
    id: 3,
    title: "World History",
    enrolled: 9876,
    rating: 4.6,
    subject: "History",
  },
]

export default function PopularPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Popular Courses</h1>
      <div className="grid gap-6">
        {popularCourses.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{course.enrolled.toLocaleString()} enrolled</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 mr-2" />
                  <span>{course.rating}</span>
                </div>
              </div>
              <Link href={`/learn/${course.subject.toLowerCase()}`}>
                <Button className="w-full">Start Learning</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

