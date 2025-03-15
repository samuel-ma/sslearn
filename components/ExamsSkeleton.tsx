import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export function ExamsSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32 mt-4 md:mt-0" />
      </div>

      <Skeleton className="h-10 w-full max-w-md mx-auto md:mx-0 mb-6" />

      <div className="bg-accent/50 rounded-lg p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <div className="mb-6">
        <Skeleton className="h-10 w-64 mb-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="h-full flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="grid grid-cols-2 gap-4 text-sm">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="mt-2">
                <Skeleton className="h-4 w-full" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
