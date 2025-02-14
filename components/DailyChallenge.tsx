import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import Link from "next/link"

export function DailyChallenge() {
  return (
    <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Zap className="mr-2 h-6 w-6" />
          Daily Challenge
        </CardTitle>
        <CardDescription className="text-yellow-100">Test your knowledge daily!</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Today's challenge covers various subjects</p>
        <p className="mb-6">Complete the challenge to earn bonus points and keep your study streak alive!</p>
        <Link href="/daily-challenge">
          <Button variant="secondary" className="w-full bg-white text-orange-500 hover:bg-yellow-100">
            Start Challenge
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

