import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function QuizHistoryLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>

      {/* Quiz history items skeleton */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-[200px]" />
                <Skeleton className="h-6 w-[100px]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
              <Skeleton className="h-2 w-full mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
