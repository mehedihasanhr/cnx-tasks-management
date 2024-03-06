import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  IconArrowBarRight,
  IconArrowsDiagonal,
  IconCalendarMonth,
  IconCheck,
  IconDots,
  IconLink,
  IconPaperclip,
  IconPlus,
  IconSubtask,
  IconThumbUp,
} from "@tabler/icons-react";

import { fetchTask } from "@/actions/tasks";
import SubTaskRow from "@/components/site/tasks/subtask-row";
import TaskCloseButton from "@/components/site/tasks/task-close-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/types";
import dayjs from "dayjs";
import { revalidateTag } from "next/cache";
import dynamic from "next/dynamic";

const RichEditor = dynamic(() => import("@/components/rich-editor"), {
  ssr: false,
});

async function TaskDetailsPage({ params }: { params: { taskId: string } }) {
  // revalidate on reload
  revalidateTag("TASK");

  const data = await fetchTask(params.taskId);

  if (!data.task) return null;

  const { task }: { task: Task } = data;

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center border-b border-base-400 px-5 py-4">
        <Button variant="secondary" size="sm" className="text-xs">
          <IconCheck size={20} className="mr-2" />
          Mark complete
        </Button>

        <div className="ml-auto flex items-center space-x-1.5">
          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:text-base-white text-base-300"
          >
            <IconThumbUp size={20} />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:text-base-white text-base-300"
          >
            <IconPaperclip size={20} />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:text-base-white text-base-300"
          >
            <IconSubtask size={20} />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:text-base-white text-base-300"
          >
            <IconLink size={20} />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:text-base-white text-base-300"
          >
            <IconArrowsDiagonal size={20} />
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            className="hover:text-base-white text-base-300"
          >
            <IconDots size={20} />
          </Button>

          <TaskCloseButton
            variant="ghost"
            size="icon-sm"
            className="hover:text-base-white text-base-300"
          >
            <IconArrowBarRight size={20} />
          </TaskCloseButton>
        </div>
      </div>

      <ScrollArea className="flex-1" type="auto">
        <div className="px-8 py-8">
          <div className="mb-8 text-2xl"> {data.task.title} </div>
          <div className="flex flex-col gap-7">
            {/* Item */}
            <div className="flex items-center gap-4">
              <div className="w-28 text-xs text-base-300">Assignee</div>
              <div className="flex-1 text-sm text-base-100">
                {task.assignee?.name}
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center gap-4">
              <div className="w-28 text-xs text-base-300">Due date</div>
              <div className="flex flex-1 items-center text-sm text-base-100">
                <IconCalendarMonth size={20} className="mr-2" />
                {dayjs(task.dueDate).format("MMM DD, YYYY")}
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center gap-4">
              <div className="w-28 text-xs text-base-300">Project</div>
              <div className="flex flex-1 items-center text-sm text-base-100">
                <Badge
                  variant="secondary"
                  className="bg-base-300/10 text-base-200 hover:bg-base-300/30"
                >
                  {task.project?.title}
                </Badge>
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center gap-4">
              <div className="w-28 text-xs text-base-300">Dependencies</div>
              <div className="flex flex-1 items-center text-xs text-base-300 hover:cursor-pointer hover:text-base-100">
                <IconPlus size={16} className="mr-2" />
                Add dependencies
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center gap-4">
              <div className="w-28 text-xs text-base-300">Priority</div>
              <div className="flex flex-1 items-center text-xs text-base-300 hover:cursor-pointer hover:text-base-100">
                <IconPlus size={16} className="mr-2" />
                Add dependencies
              </div>
            </div>

            {/* status */}
            <div className="flex items-center gap-4">
              <div className="w-28 text-xs text-base-300">Status</div>
              <div className="flex flex-1 items-center text-xs text-base-300 hover:cursor-pointer hover:text-base-100">
                <Badge
                  style={{
                    color: task?.status?.textColor,
                    background: task?.status?.bgColor,
                  }}
                >
                  {task?.status?.title}
                </Badge>
              </div>
            </div>

            {/* description */}
            <div className="flex flex-col gap-2.5">
              <div className="w-28 text-xs text-base-300">Description</div>
              <div className="flex flex-1 items-center text-xs text-base-300 hover:cursor-pointer hover:text-base-100">
                <RichEditor placeholder="What is this task about?" />
              </div>
            </div>
          </div>
        </div>

        {/* Subtask */}
        <div className="mt-3.5 flex flex-col gap-2.5">
          <div className="w-28 px-8 text-xs text-base-300">Subtasks</div>
          <div className="flex flex-1 flex-col text-xs text-base-300">
            <SubTaskRow task={task} />
            <SubTaskRow task={task} />
          </div>
          <div className="mt-3 px-8">
            <Button
              variant="secondary"
              size="sm"
              className="h-8 w-fit border-2 border-white/5 px-2.5 pr-3 text-xs font-normal"
            >
              <IconPlus size={15} className="mr-1.5" />
              <span>Add subtask</span>
            </Button>
          </div>
        </div>
      </ScrollArea>

      {/* Subtask */}
      <Separator className="my-5" />
      <div className="flex flex-col gap-2.5 pb-6">
        <div className="w-28 px-8 text-xs text-base-300">Comment</div>
        <div className="flex flex-1 items-center px-8 text-xs text-base-300 hover:cursor-pointer hover:text-base-100">
          <RichEditor placeholder="Write a comment" className="min-h-24" />
        </div>
      </div>
    </div>
  );
}

export default TaskDetailsPage;
