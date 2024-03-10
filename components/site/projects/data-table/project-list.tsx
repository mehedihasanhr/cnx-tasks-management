"use client";

import React from "react";

import { CommandItem, CommandSeparator } from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { updateTask } from "@/actions/tasks";
import ProjectPopover from "@/components/site/projects/project-popover";
import type { Project, TaskStatus } from "@/types";
import { Plus } from "lucide-react";
import { toast } from "sonner";

// ProjectList
function ProjectPopoverContent({
  taskId,
  status,
  onSelect,
}: {
  taskId: number;
  status?: TaskStatus;
  onSelect: (value: string) => void;
}) {
  // update task on select
  const updateOnSelect = async (project: Project) => {
    if (status && status.slug === "PENDING") {
      onSelect(project.title);
      await updateTask(taskId, { projectId: project.id });
    } else {
      toast.error(`Task already in ${status}`, {
        description: "You can't change project for this task",
      });
    }
  };

  return (
    <ProjectPopover
      onSelect={updateOnSelect}
      footer={
        <>
          <CommandSeparator className="mb-1 mt-4" />
          <CommandItem className="pl-5 hover:cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            <span>Create Project</span>
          </CommandItem>
        </>
      }
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function ProjectList({
  project,
  taskId,
  status,
}: {
  project: { id: number; title: string };
  taskId: number;
  status?: TaskStatus;
}) {
  const [value, setValue] = React.useState(project?.title);
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="text-left [&>span]:line-clamp-1">
        {value ? (
          <span className="block rounded-lg bg-green-400/50 px-2 py-0.5 text-base-0">
            {value}
          </span>
        ) : (
          <span>Select Project</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="p-0" sideOffset={10}>
        <ProjectPopoverContent
          taskId={taskId}
          status={status}
          onSelect={(value: string) => {
            setValue((prev) => (prev === value ? "" : value));
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default ProjectList;
