"use client";

import React from "react";

import ProjectPopover from "@/components/site/projects/project-popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Project } from "@/types";
import { IconChevronDown, IconTrash } from "@tabler/icons-react";

function ProjectSelectionFilter({
  onSelect,
  title,
  remove,
}: {
  onSelect: (project: Project) => void;
  title: string;
  remove: () => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleProjectSelection = (project: Project) => {
    setOpen(false);
    onSelect(project);
  };

  return (
    <div>
      <p className="mb-1 flex items-center text-sm font-medium text-base-300">
        Project
        <Button
          variant="link"
          size="icon-sm"
          onClick={remove}
          className="text-base-300 hover:text-white"
        >
          <IconTrash size={14} />
        </Button>
      </p>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-2/3 text-white" asChild>
          <div>
            <Input
              readOnly
              defaultValue={title}
              type="text"
              placeholder="Select Project"
              className="cursor-default bg-base-300/5"
              icon={<IconChevronDown />}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="border p-0">
          <ProjectPopover onSelect={handleProjectSelection} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ProjectSelectionFilter;
