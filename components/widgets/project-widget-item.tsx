import React from "react";

import Link from "next/link";
import {
  IconFolder,
  IconDotsVertical,
  IconPlus,
  IconCheck,
  IconTrash,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

function ProjectWidgetItem() {
  return (
    <Link
      href="#project"
      className="flex max-w-min flex-1 items-center gap-4 rounded-lg px-4 py-2.5 hover:bg-base-300/10 hover:text-base-0 dark:hover:bg-slate-800 dark:hover:text-slate-50"
    >
      <IconFolder size={36} />
      <div className="flex-1">
        <p className="whitespace-nowrap">CNX Tasks Management</p>
        <span className="text-xs text-base-300">3 tasks due soon</span>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <IconDotsVertical size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="text-sm">
            <IconPlus size={16} className="mr-2" /> Create Task
          </DropdownMenuItem>
          <DropdownMenuItem className="text-sm focus:bg-green-600">
            <IconCheck size={16} className="mr-2" />
            Complete
          </DropdownMenuItem>
          <DropdownMenuItem className="text-sm focus:bg-red-500">
            <IconTrash size={16} className="mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Link>
  );
}

export default ProjectWidgetItem;
