import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuizzesLoading() {
  return (
    <div className="space-y-10 container mx-auto px-6">
      {/* Hero Section Skeleton */}
      <section className="relative py-10 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Skeleton className="h-12 w-[80%] mx-auto mb-6" />
          <Skeleton className="h-6 w-[60%] mx-auto" />
        </div>
      </section>

      {/* Filters Section Skeleton */}
      <section className="flex flex-col gap-4">
        <Skeleton className="h-10 w-full" />
        <div className="w-full mt-4">
          <div className="flex gap-4 flex-wrap justify-start">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="h-10 w-[100px] flex-1" />
            ))}
          </div>
        </div>
      </section>

      {/* Quizzes Grid Skeleton */}
      <section>
        <Skeleton className="h-8 w-[200px] mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center">
                  <Skeleton className="h-10 w-10 rounded-full mr-2" />
                  <Skeleton className="h-7 w-[150px]" />
                </div>
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-[120px] mb-2" />
                <Skeleton className="h-4 w-[100px] mb-2" />
                <Skeleton className="h-4 w-[150px] mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
