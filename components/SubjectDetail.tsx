import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Chapter {
  id: string
  title: string
  completed: boolean
}

interface SubjectDetailProps {
  id: string
  title: string
  description: string
  chapters: Chapter[]
}

export function SubjectDetail({ id, title, description, chapters }: SubjectDetailProps) {
  const completedChapters = chapters.filter((ch) => ch.completed).length
  const overallProgress = (completedChapters / chapters.length) * 100

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center gap-2 mb-6">
        <Progress value={overallProgress} className="flex-grow" />
        <span className="text-sm font-medium">{Math.round(overallProgress)}% Complete</span>
      </div>
      <div className="grid gap-4">
        {chapters.map((chapter, index) => (
          <Card key={chapter.id}>
            <CardHeader>
              <CardTitle className="text-lg">{chapter.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Progress value={chapter.completed ? 100 : 0} className="flex-grow mr-4" />
                <span className="text-sm font-medium mr-4">{chapter.completed ? "Completed" : "Not started"}</span>
                <Link href={`/learn/${id}/${chapter.id}`}>
                  <Button variant={chapter.completed ? "outline" : "default"}>
                    {chapter.completed ? "Review" : "Start"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

