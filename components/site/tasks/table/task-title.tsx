import { createTask, updateTask } from "@/actions/tasks";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IconChevronRight, IconCircleCheck } from "@tabler/icons-react";
import { RocketIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

interface TaskTitleProps {
  taskId?: number;
  status?: string;
  title: string;
  CREATE_NEW?: boolean;
  toggleEditMode?: () => void;
}

function TaskTitle({
  taskId,
  status,
  title,
  CREATE_NEW,
  toggleEditMode,
}: TaskTitleProps) {
  const [name, setName] = React.useState(title);
  const [isLoading, setIsLoading] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setName(title);
    setIsLoading(false);
  }, [title]);

  // focus
  React.useEffect(() => {
    if (ref.current && CREATE_NEW) {
      ref.current.focus();
    }
  }, [CREATE_NEW]);

  const onContentBlur = React.useCallback(
    async (evt: {
      currentTarget: { innerText: React.SetStateAction<string> };
    }) => {
      const title = evt.currentTarget.innerText.toString();

      if (title === name) return;

      if (taskId && !CREATE_NEW) {
        setIsLoading(true);
        await updateTask(taskId, { title: title.toString() });
      } else {
        if (!title && toggleEditMode) toggleEditMode();
        if (title) {
          await createTask({ data: { title } });
        }
      }
      setName(title);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [CREATE_NEW, taskId]
  );

  const markAsComplete = async () => {
    if (!taskId) return;
    if (status !== "COMPLETE") {
      await updateTask(taskId, { status: "COMPLETE" });
      toast.success(
        <div className="flex items-start font-bold">
          <RocketIcon className="mr-2 h-4 w-4" />
          <div>{`Excellent! You've just marked the task as 'Completed'!`}</div>
        </div>
      );
    } else {
      await updateTask(taskId, { status: "PROGRESSING" });
      toast.info(
        <div className="flex items-start font-bold">
          <RocketIcon className="mr-2 h-4 w-4" />
          <div>{`You've just marked the task as 'Progressing'!`}</div>
        </div>
      );
    }
  };

  return (
    <div className="flex w-full items-center">
      <div>
        {isLoading ? (
          "Loading..."
        ) : (
          <Button
            variant="link"
            size="icon"
            onClick={markAsComplete}
            className={`mr-2 h-fit w-fit p-0 ${
              status === "COMPLETE" ? "text-green-400" : "text-base-300"
            }`}
          >
            <IconCircleCheck />
          </Button>
        )}
      </div>
      <ScrollArea className="flex-1">
        <div
          ref={ref}
          contentEditable="plaintext-only"
          data-placeholder="Write a task name"
          onBlur={onContentBlur}
          suppressContentEditableWarning
          className="w-fit whitespace-nowrap border border-transparent bg-transparent px-3 py-1 pr-4 outline-none empty:before:text-base-300 empty:before:content-[attr(data-placeholder)] hover:cursor-text hover:border-white/10 hover:bg-base-300/5 focus:border-white/5 focus:bg-base-300/5 focus:ring-0 focus-visible:ring-0"
        >
          {name}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>

      {taskId && (
        <div className="">
          <Button variant="ghost" size="icon-sm" className="h-8 w-8" asChild>
            <Link
              href={`/tasks/${taskId}`}
              scroll={false}
              prefetch={false}
              aria-label="open-task"
            >
              <IconChevronRight size={16} />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default TaskTitle;
