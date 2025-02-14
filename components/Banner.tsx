import { Button } from "@/components/ui/button"
import { BookOpen, Zap } from "lucide-react"
import Link from "next/link"

export function Banner() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8 mt-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-white/10 rotate-45 transform"></div>
        <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/2 translate-y-1/2 bg-white/10 rotate-45 transform"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">Unlock Your Potential with QuizMaster</h2>
          <p className="text-xl mb-8">Join thousands of learners and boost your knowledge today!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/learn">
              <Button
                size="lg"
                className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-blue-50"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Start Learning
              </Button>
            </Link>
            <Link href="/daily-challenge">
              <Button
                size="lg"
                className="inline-flex items-center justify-center bg-white text-blue-600 hover:bg-blue-50"
              >
                <Zap className="mr-2 h-5 w-5" />
                Daily Challenge
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

