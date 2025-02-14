import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface OverallProgressProps {
  progress: { [key: string]: number }
}

export function OverallProgress({ progress }: OverallProgressProps) {
  const averageProgress =
    Object.values(progress).reduce((sum, value) => sum + value, 0) / Object.values(progress).length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Overall Learning Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(progress).map(([subject, value]) => (
            <div key={subject}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{subject}</span>
                <span className="text-sm font-medium">{value}%</span>
              </div>
              <Progress value={value} className="h-2" />
            </div>
          ))}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Average Progress</span>
              <span className="text-sm font-medium">{averageProgress.toFixed(1)}%</span>
            </div>
            <Progress value={averageProgress} className="h-3" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

