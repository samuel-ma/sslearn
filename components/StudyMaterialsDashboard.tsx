import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const studyMaterials = [
  {
    id: 'mathematics-4',
    subject: 'Mathematics',
    class: 4,
    icon: '📐',
    progress: 65,
    lastRead: '2 hours ago',
    totalPages: 120,
    currentPage: 78,
    color: 'bg-blue-500/10'
  },
  {
    id: 'physics-4',
    subject: 'Physics',
    class: 4,
    icon: '⚡',
    progress: 40,
    lastRead: '1 day ago',
    totalPages: 150,
    currentPage: 60,
    color: 'bg-yellow-500/10'
  },
  {
    id: 'chemistry-4',
    subject: 'Chemistry',
    class: 4,
    icon: '🧪',
    progress: 30,
    lastRead: '3 days ago',
    totalPages: 100,
    currentPage: 30,
    color: 'bg-green-500/10'
  },
  {
    id: 'biology-4',
    subject: 'Biology',
    class: 4,
    icon: '🧬',
    progress: 55,
    lastRead: '5 days ago',
    totalPages: 140,
    currentPage: 77,
    color: 'bg-red-500/10'
  }
]

export function StudyMaterialsDashboard() {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Study Materials</h2>
          <p className="text-muted-foreground">Continue where you left off</p>
        </div>
        <Link href="/study-materials">
          <Button variant="outline">
            Browse All Materials
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studyMaterials.map((material) => (
          <Link key={material.id} href={`/study-materials/${material.id}`}>
            <Card className="hover:shadow-lg transition-all cursor-pointer">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${material.color}`}>
                    <span className="text-2xl">{material.icon}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    {material.lastRead}
                  </div>
                </div>
                <h3 className="font-semibold mb-2">
                  {material.subject} Class {material.class}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{material.progress}%</span>
                  </div>
                  <Progress value={material.progress} className="h-2" />
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <BookOpen className="h-4 w-4 mr-1" />
                      Page {material.currentPage} of {material.totalPages}
                    </div>
                    <Button variant="ghost" size="sm" className="font-medium">
                      Continue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
