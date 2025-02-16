import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

const subjects = [
  { id: "mathematics-4", title: "Mathematics Class 4", icon: "📐" },
  { id: "physics-4", title: "Physics Class 4", icon: "⚡" },
  { id: "chemistry-4", title: "Chemistry Class 4", icon: "🧪" },
  { id: "biology-4", title: "Biology Class 4", icon: "🧬" },
]

export function StudyMaterialsSection() {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Study Materials</h2>
        <Link href="/study-materials">
          <Button variant="outline">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <Link key={subject.id} href={`/study-materials/${subject.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center gap-4">
                <span className="text-2xl">{subject.icon}</span>
                <div>
                  <CardTitle>{subject.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Click to view study material
                  </p>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
