import { ScrollArea } from "@/components/ui/scroll-area";

import { Skeleton } from "@/components/ui/skeleton";

async function TaskLoader() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center border-b border-base-400 px-5 py-4">
        <Skeleton className="h-7 w-32" />
      </div>

      <ScrollArea className="flex-1">
        <div className="px-5 py-8">
          <div className="mb-8 text-2xl">
            <Skeleton className="h-3.5 w-4/5" />
          </div>
          <div className="flex flex-col gap-7">
            {/* Item */}
            <div className="flex items-center gap-8">
              <div className="w-24 text-xs text-base-300">
                <Skeleton className="h-2.5 w-full" />
              </div>
              <div className="flex flex-1 items-center text-sm text-base-100">
                <Skeleton className="h-3 w-3/5" />
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center gap-8">
              <div className="w-24 text-xs text-base-300">
                <Skeleton className="h-2.5 w-full" />
              </div>
              <div className="flex flex-1 items-center text-sm text-base-100">
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center gap-8">
              <div className="w-24 text-xs text-base-300">
                <Skeleton className="h-2.5 w-full" />
              </div>
              <div className="flex flex-1 items-center text-sm text-base-100">
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center gap-8">
              <div className="w-24 text-xs text-base-300">
                <Skeleton className="h-2.5 w-full" />
              </div>
              <div className="flex flex-1 items-center text-sm text-base-100">
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center gap-8">
              <div className="w-24 text-xs text-base-300">
                <Skeleton className="h-2.5 w-full" />
              </div>
              <div className="flex flex-1 items-center text-sm text-base-100">
                <Skeleton className="h-4 w-36" />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default TaskLoader;
