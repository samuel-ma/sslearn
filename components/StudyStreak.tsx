import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Flame } from "lucide-react"

export function StudyStreak() {
  const currentStreak = 7 // This would be fetched from the user's data
  const nextMilestone = 10

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Flame className="mr-2 h-6 w-6 text-orange-500" />
          Study Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <p className="text-4xl font-bold text-orange-500">{currentStreak}</p>
          <p className="text-sm text-gray-500">days</p>
        </div>
        <Progress value={(currentStreak / nextMilestone) * 100} className="h-2 mb-2" />
        <p className="text-sm text-center text-gray-600">
          {nextMilestone - currentStreak} more days to reach your next milestone!
        </p>
      </CardContent>
    </Card>
  )
}

