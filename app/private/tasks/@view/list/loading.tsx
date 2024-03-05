import { Skeleton } from "../../../../../components/ui/skeleton";

function TaskListLoader() {
  return (
    <div className="px-10 pt-8">
      <Skeleton className="h-9 w-36" />

      <div className="mt-8">
        <div className="flex w-full items-center border-y border-white/10 px-4 py-2">
          <Skeleton className="h-3 w-[50%]" />
        </div>
        <Skeleton className="mx-4 my-3 h-5 w-72" />

        {[...Array(10)].map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="flex w-full items-center gap-3 border-t border-white/10 px-4 py-2.5"
          >
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-3.5 w-[50%]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskListLoader;
