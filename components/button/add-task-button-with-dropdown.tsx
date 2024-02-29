import React from "react";
import { IconChevronDown, IconPlus } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

function AddTaskButtonWithDropdown() {
  return (
    <div className="flex">
      <Button
        variant="secondary"
        size="sm"
        className="rounded-r-none border border-r-0 border-white/10 text-xs"
      >
        <IconPlus size={16} className="mr-0.5" />
        Add Task
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon-sm"
            variant="secondary"
            className="rounded-l-none border border-white/10"
          >
            <IconChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Add section</DropdownMenuItem>
          <DropdownMenuItem>Add milestone</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default AddTaskButtonWithDropdown;
