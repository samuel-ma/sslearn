import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function LeaderboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      {/* Header skeleton */}
      <Skeleton className="h-10 w-1/3 mx-auto mb-8" />

      <div className="grid w-full grid-cols-2 mb-8">
        <Skeleton className="h-10 rounded-l-md" />
        <Skeleton className="h-10 rounded-r-md" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-[200px]" />
        </CardHeader>
        <CardContent>
          {/* Top three users */}
          <div className="flex justify-center space-x-8 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="text-center">
                <div className="relative">
                  <Skeleton className="h-24 w-24 rounded-full mx-auto mb-2" />
                  <Skeleton className="h-6 w-6 rounded-full absolute -top-2 -right-2" />
                </div>
                <Skeleton className="h-5 w-20 mx-auto mb-2" />
                <Skeleton className="h-7 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-12 mx-auto" />
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <Skeleton className="h-16 w-full rounded-lg mb-6" />

          {/* Table */}
          <div className="w-full overflow-hidden rounded-md border">
            <div className="flex items-center p-4 border-b">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <Skeleton key={`header-${i}`} className="h-4 flex-1 mr-4" />
              ))}
            </div>

            <div className="space-y-0">
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div
                  key={i}
                  className="flex items-center p-4 border-b animate-pulse"
                >
                  <Skeleton className="h-6 w-6 mr-4" />
                  <div className="flex items-center space-x-2 mr-4 w-[180px]">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                  <Skeleton className="h-4 flex-1 mr-4" />
                  <Skeleton className="h-4 flex-1 mr-4" />
                  <Skeleton className="h-4 flex-1 mr-4" />
                  <Skeleton className="h-4 flex-1 mr-4" />
                  <Skeleton className="h-4 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
