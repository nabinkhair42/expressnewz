import { Skeleton } from "@/components/ui/skeleton";

export function MajorPostLoading() {
  return (
    <div className="flex flex-col space-y-3 items-center justify-center">
      <div className="space-y-2">
        <Skeleton className="h-16 w-[650px]" />
        <div className="flex items-center space-x-4 justify-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-16 w-[650px]" />
        <div className="flex items-center space-x-4 justify-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-16 w-[650px]" />
        <div className="flex items-center space-x-4 justify-center">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
