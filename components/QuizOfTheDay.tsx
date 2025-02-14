import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Link from "next/link"

export function QuizOfTheDay() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Calendar className="mr-2 h-6 w-6 text-blue-500" />
          Quiz of the Day
        </CardTitle>
        <CardDescription>A new quiz every day to keep your mind sharp</CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">World Capitals</h3>
        <p className="mb-4 text-gray-600">Test your knowledge of global geography with today's featured quiz!</p>
        <Link href="/quiz-of-the-day">
          <Button className="w-full">Take the Quiz</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

