import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Exit
        </Button>
        <Skeleton className="h-8 w-64" />
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-5 w-20" />
        </div>

        <Skeleton className="h-4 w-full mb-6" />

        <Card className="mb-6">
          <CardHeader>
            <Skeleton className="h-6 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}
