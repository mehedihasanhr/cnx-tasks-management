"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { config } from "@/config";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconCalendarMonth,
  IconCircleCheck,
  IconGripVertical,
  IconMessage,
  IconSubtask,
  IconUser,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import { CSSProperties } from "react";
import useSWR from "swr";

// fetcher
const fetcher = (arg: string) => fetch(arg).then((res) => res.json());

function SubTaskRow({ taskId }: { taskId: number }) {
  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    isDragging,
  } = useSortable({ id: taskId.toString() });

  // fetch data
  const { data, error, isLoading } = useSWR(
    `${config.API}/tasks/${taskId}`,
    fetcher
  );

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };

  if (isLoading) {
    return (
      <div className="group -mt-[1px] flex flex-1 border-collapse items-stretch hover:bg-base-400/30">
        <div className="font-sm inset-y-0 mx-8 flex flex-1 items-center border-y border-base-400 py-2">
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  // if has error throw Error
  if (error) throw Error(error.message);
  if (!data?.task) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      style={{ ...style }}
      className="group -mt-[1px] flex flex-1 border-collapse items-stretch hover:bg-base-400/30"
    >
      <div className="invisible flex h-10 items-center border-y border-base-400 group-hover:visible">
        <Button
          variant="ghost"
          size="icon-sm"
          className="h-8 w-8 cursor-move text-base-300/50 hover:bg-transparent"
          {...attributes}
          {...listeners}
          aria-describedby={`DndDescribedBy-${taskId}`}
        >
          <IconGripVertical size={16} />
        </Button>
      </div>

      <div className="flex border-collapse items-center border-y border-base-400">
        <Button
          variant="ghost"
          size="icon-sm"
          className="h-8 w-8 hover:bg-transparent"
          title="Mark complete"
        >
          <IconCircleCheck size={20} />
        </Button>
      </div>
      <div className="font-sm inset-y-0 flex flex-1 items-center border-y border-base-400">
        {data?.task?.title}
      </div>
      <div className="flex items-center border-y border-base-400">
        <Button
          variant="ghost"
          size={data?.task.dueDate ? "sm" : "icon-sm"}
          className="h-8 hover:bg-transparent"
        >
          {data?.task?.dueDate ? (
            <span className="text-xs">
              {dayjs(data?.task?.dueDate).format("MMM DD")}
            </span>
          ) : (
            <IconCalendarMonth size={20} />
          )}
        </Button>

        <div>
          <Button
            variant="ghost"
            size="icon-sm"
            className="h-8 w-8 hover:bg-transparent"
          >
            <IconUser size={20} />
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon-sm"
          className="flex h-8 w-fit items-center hover:bg-transparent"
        >
          <IconSubtask size={20} />
          <span className="text-sm">03</span>
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          className="h-8 w-8 hover:bg-transparent"
        >
          <IconMessage size={20} />
        </Button>
      </div>

      <div className="invisible flex h-10 w-8 items-center border-y border-base-400 group-hover:visible" />
    </div>
  );
}

export default SubTaskRow;
