import { Card, CardContent } from "@/common/components/ui/card";
import { Skeleton } from "@/common/components/ui/skeleton";

export function DetailFireSensorLoading() {
  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card className="rounded-xl border-border/70">
        <CardContent className="p-4 md:p-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="space-y-3">
              <Skeleton className="h-3 w-36" />
              <Skeleton className="h-8 w-72" />
              <Skeleton className="h-4 w-60" />
              <Skeleton className="h-4 w-full max-w-xl" />
              <Skeleton className="h-4 w-64" />
            </div>

            <div className="flex flex-wrap gap-2 lg:w-[360px] lg:justify-end">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-7 w-32" />
              <Skeleton className="h-7 w-36" />
              <Skeleton className="h-7 w-7" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-40 rounded-xl" />
      </div>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-96 rounded-xl" />
          <Skeleton className="h-96 rounded-xl" />
        </div>

        <Skeleton className="h-[500px] rounded-xl" />
      </div>
    </div>
  );
}
