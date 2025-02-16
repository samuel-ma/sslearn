import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookMarked, ArrowRight } from "lucide-react"
import Link from "next/link"

const recentMaterials = [
  { id: 'mathematics-4', title: 'Mathematics Class 4', progress: 65, icon: '📐' },
  { id: 'physics-4', title: 'Physics Class 4', progress: 40, icon: '⚡' },
  { id: 'chemistry-4', title: 'Chemistry Class 4', progress: 30, icon: '🧪' },
]

export function StudyMaterialsPreview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Study Materials</CardTitle>
        <Link href="/study-materials">
          <Button variant="ghost" size="sm">
            View All
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="grid gap-4">
        {recentMaterials.map((material) => (
          <Link key={material.id} href={`/study-materials/${material.id}`}>
            <div className="flex items-center p-2 rounded-lg hover:bg-muted transition-colors">
              <span className="text-2xl mr-3">{material.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-medium">{material.title}</p>
                <div className="h-2 w-full bg-muted-foreground/20 rounded-full mt-1">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${material.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}
