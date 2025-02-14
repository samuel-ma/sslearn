import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Users } from "lucide-react"
import Link from "next/link"

const trendingCourses = [
  {
    id: 1,
    title: "Machine Learning Basics",
    growth: "+245%",
    enrolled: 5678,
    subject: "Computer Science",
  },
  {
    id: 2,
    title: "Digital Marketing",
    growth: "+180%",
    enrolled: 4567,
    subject: "Business",
  },
  {
    id: 3,
    title: "Data Science Fundamentals",
    growth: "+156%",
    enrolled: 3456,
    subject: "Computer Science",
  },
]

export default function TrendingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Trending Now</h1>
      <div className="grid gap-6">
        {trendingCourses.map((course) => (
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
                <div className="flex items-center text-green-500">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  <span>{course.growth} this week</span>
                </div>
              </div>
              <Link href={`/learn/${course.subject.toLowerCase()}`}>
                <Button className="w-full">Join Now</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

