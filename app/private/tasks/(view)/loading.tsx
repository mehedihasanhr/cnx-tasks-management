import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

function TaskPageLoader() {
  return (
    <>
      <div className="flex gap-4 px-10">
        {/* Avatar */}
        <Skeleton className="h-12 w-12 rounded-full" />

        <div>
          <h3 className="text-xl">My Tasks</h3>
          <Skeleton className="h-5 w-12" />
          {/* navigation tab */}
          <div className="mt-1 flex items-center">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </div>

      <Separator className="-mt-0.5 h-0.5 bg-white/10" />
    </>
  );
}

export default TaskPageLoader;
