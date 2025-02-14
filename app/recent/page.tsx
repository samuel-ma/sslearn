import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock } from "lucide-react"

const recentActivities = [
  {
    id: 1,
    subject: "Mathematics",
    topic: "Calculus Fundamentals",
    progress: 65,
    lastAccessed: "2 hours ago",
  },
  {
    id: 2,
    subject: "Science",
    topic: "Chemical Reactions",
    progress: 45,
    lastAccessed: "4 hours ago",
  },
  {
    id: 3,
    subject: "History",
    topic: "World War II",
    progress: 30,
    lastAccessed: "1 day ago",
  },
]

export default function RecentPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Recent Activities</h1>
      <div className="grid gap-6">
        {recentActivities.map((activity) => (
          <Card key={activity.id}>
            <CardHeader>
              <CardTitle className="text-xl">{activity.subject}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg">{activity.topic}</p>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{activity.lastAccessed}</span>
                </div>
              </div>
              <Progress value={activity.progress} className="mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

