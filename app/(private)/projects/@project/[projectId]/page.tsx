import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  IconArrowBarRight,
  IconArrowsDiagonal,
  IconCheck,
  IconDots,
  IconLink,
  IconPaperclip,
  IconPlus,
  IconSubtask,
  IconThumbUp,
} from "@tabler/icons-react";

import dynamic from "next/dynamic";

import { fetchProject } from "@/actions/projects";
import DueDate from "@/components/site/projects/data-table/due-date";
import ProjectCloseButton from "@/components/site/projects/project-close-button";
import SubtaskList from "@/components/site/tasks/subtask-list";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/types";
import _ from "lodash";
import { revalidateTag } from "next/cache";

const RichEditor = dynamic(() => import("@/components/rich-editor"), {
  ssr: false,
});

async function ProjectDetailSidePanel({
  params,
}: {
  params: { projectId: string };
}) {
  // revalidate on reload
  revalidateTag("PROJECT");

  const data = await fetchProject(Number(params.projectId));

  if (!data.project) return null;

  const { project }: { project: Project } = data;

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

          <ProjectCloseButton
            variant="ghost"
            size="icon-sm"
            className="hover:text-base-white text-base-300"
          >
            <IconArrowBarRight size={20} />
          </ProjectCloseButton>
        </div>
      </div>

      <ScrollArea className="flex-1" type="auto">
        <div className="px-8 py-8">
          <div className="mb-8 text-2xl"> {project.title} </div>
          <div className="flex flex-col gap-6">
            {/* Item */}
            <div className="flex items-center gap-4">
              <div className="w-28 text-xs text-base-300">Project manager</div>
              <div className="flex-1 text-sm text-base-100">
                {project.manager?.name}
              </div>
            </div>

            {/* Item */}
            <div className="flex items-center gap-4">
              <div className="w-28 text-xs text-base-300">Due date</div>
              <div className="flex items-center text-sm text-base-100">
                <DueDate
                  projectId={project.id}
                  createdAt={project.createdAt}
                  dueDate={project.dueDate}
                />
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
                Add priority
              </div>
            </div>

            {/* status */}
            <div className="flex items-center gap-4">
              <div className="w-28 text-xs text-base-300">Status</div>
              <div className="flex flex-1 items-center text-xs text-base-300 hover:cursor-pointer hover:text-base-100">
                <Badge
                  style={{
                    color: project?.status?.textColor,
                    background: project?.status?.bgColor,
                  }}
                >
                  {project?.status?.title}
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
            <SubtaskList taskIds={_.map(project.tasks, (task) => task.id)} />
          </div>
          <div className="mt-3 px-8">
            <Button
              variant="secondary"
              size="sm"
              className="h-8 w-fit border-2 border-white/5 px-2.5 pr-3 text-xs font-normal"
            >
              <IconPlus size={15} className="mr-1.5" />
              <span>Add task</span>
            </Button>
          </div>
        </div>
      </ScrollArea>

      <Separator className="my-5" />
      <div className="flex flex-col gap-2.5 pb-6">
        <div className="w-28 px-8 text-xs text-base-300">Comment</div>
        <div className="flex flex-1 items-center px-8 text-xs text-base-300 hover:cursor-pointer hover:text-base-100">
          <RichEditor
            placeholder="Write comment here..."
            className="min-h-24"
          />
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailSidePanel;
