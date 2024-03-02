"use client";

import React from "react";
import useSWR from "swr";
import { config } from "@/config";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { Project } from "@/types";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateTask } from "@/actions/tasks";

// fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json());

// ProjectList
function ProjectPopoverContent({
  taskId,
  onSelect,
}: {
  taskId: number;
  onSelect: (value: string) => void;
}) {
  const [value, setValue] = React.useState("");

  const { data, isLoading, error } = useSWR(
    `${config.API}/projects?w-status=COMPLETE`,
    fetcher
  );

  // update task on select
  const updateOnSelect = async (id: number) => {
    await updateTask(taskId, { projectId: id });
  };

  if (error) {
    throw new Error(error);
  }

  if (isLoading) {
    return <div className="px-2 py-1.5 text-base-300"> Loading... </div>;
  }

  return (
    <Command>
      <CommandInput placeholder="Search framework..." className="h-9" />
      <CommandEmpty>No framework found.</CommandEmpty>
      <CommandGroup>
        <ScrollArea className="max-h-72">
          {data?.projects?.map((project: Project) => (
            <CommandItem
              key={project.id}
              value={project.title}
              onSelect={(currentValue) => {
                setValue(currentValue);
                onSelect(project.title);
                updateOnSelect(project.id);
              }}
              className="cursor-pointer text-sm text-white/80"
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === project.title ? "opacity-100" : "opacity-0"
                )}
              />
              {project.title}
            </CommandItem>
          ))}

          <CommandSeparator className="mb-1 mt-4" />
          <CommandItem className="pl-5 hover:cursor-pointer">
            <Plus className="mr-2 h-4 w-4" />
            <span>Create Project</span>
          </CommandItem>
        </ScrollArea>
      </CommandGroup>
    </Command>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function ProjectList({
  project,
  taskId,
}: {
  project: { id: number; title: string };
  taskId: number;
}) {
  const [value, setValue] = React.useState(project.title);
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
