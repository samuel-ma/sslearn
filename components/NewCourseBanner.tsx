import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

export default function NewCourseBanner() {
  return (
    <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="mr-2 h-5 w-5" />
          New Course Available!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Master Web Development with our comprehensive new course.</p>
        <Button variant="secondary" className="w-full bg-white text-purple-600 hover:bg-gray-100">
          Enroll Now
        </Button>
      </CardContent>
    </Card>
  )
}

