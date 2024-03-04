"use client";

import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import useProjects from "@/hooks/useProjects";
import { cn } from "@/lib/utils";
import { Project } from "@/types";
import { Check } from "lucide-react";

interface PropTypes {
  onSelect: (project: Project) => void;
  footer?: React.ReactNode;
}

// project dropdown
function ProjectPopover({ onSelect, footer }: PropTypes) {
  const [value, setValue] = React.useState("");

  const { data, error, isLoading } = useProjects();

  // update task on select
  const updateOnSelect = async (project: Project) => {
    setValue(project.title);
    onSelect(project);
  };

  if (error) {
    throw new Error(error);
  }

  if (isLoading) {
    return (
      <div className="px-2 py-1.5 text-sm text-base-300"> Loading... </div>
    );
  }

  return (
    <Command>
      <CommandInput placeholder="Search project..." className="h-9" />
      <CommandEmpty>No project found.</CommandEmpty>
      <CommandGroup>
        <ScrollArea className="max-h-72">
          {data?.projects?.map((project: Project) => (
            <CommandItem
              key={project.id}
              value={project.title}
              onSelect={() => updateOnSelect(project)}
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

          {footer}
        </ScrollArea>
      </CommandGroup>
    </Command>
  );
}

export default ProjectPopover;
