import { Button } from "@/components/ui/button";
import { Task } from "@/types";
import {
  IconCalendarMonth,
  IconCircleCheck,
  IconGripVertical,
  IconMessage,
  IconUser,
} from "@tabler/icons-react";
import dayjs from "dayjs";

function SubTaskRow({ task }: { task: Task }) {
  return (
    <div className="group -mt-[1px] flex flex-1 border-collapse items-stretch hover:bg-base-400/30">
      <div className="invisible flex h-10 items-center border-y border-base-400 group-hover:visible">
        <Button
          variant="ghost"
          size="icon-sm"
          className="h-8 w-8 cursor-move text-base-300/50 hover:bg-transparent"
          title="Mark complete"
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
        {task?.title}d
      </div>
      <div className="flex items-center border-y border-base-400">
        <Button
          variant="ghost"
          size={task.dueDate ? "sm" : "icon-sm"}
          className="h-8 hover:bg-transparent"
        >
          {task?.dueDate ? (
            <span className="text-xs">
              {dayjs(task.dueDate).format("MMM DD")}
            </span>
          ) : (
            <IconCalendarMonth size={20} />
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon-sm"
          className="h-8 w-8 hover:bg-transparent"
        >
          <IconUser size={20} />
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
