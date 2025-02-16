import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function FeaturedQuizzesSkeleton() {
  return (
    <section>
      <Skeleton className="h-8 w-[200px] mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded" />
                <Skeleton className="h-6 w-[150px]" />
              </div>
              <Skeleton className="h-4 w-[200px] mt-2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-[100px] mb-4" />
              <Skeleton className="h-9 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-6">
        <Skeleton className="h-10 w-[200px] mx-auto" />
      </div>
    </section>
  )
}
