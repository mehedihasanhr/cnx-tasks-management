"use client";

import RowDragHandler from "@/components/site/tasks/table/row-drag-handler";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Task } from "@/types";
import { IconChevronDown } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import DueDate from "./due-date";
import ProjectList from "./project-list";
import TaskAssignee from "./task-assignee";
import TaskTitle from "./task-title";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<Task>[] = [
  {
    id: "task_name",
    header: "Task name",
    accessorKey: "title",
    minSize: 300,
    size: 700,
    maxSize: 700,
    enableResizing: true,
    cell: ({ row }) => {
      const { id, status, title } = row.original;
      return (
        <div className="relative pl-2">
          <RowDragHandler taskId={id} />
          <TaskTitle taskId={id} status={status} title={title} />
        </div>
      );
    },
  },
  {
    id: "due_date",
    minSize: 230,
    header: ({ column }) => {
      const handleSorting = (type: string) => {
        // eslint-disable-next-line no-param-reassign
        column.columnDef.sortingFn = (a, b) => {
          if (type === "due date") {
            const d1 = a.original.dueDate as Date;
            const d2 = b.original.dueDate as Date;
            return d1 > d2 ? 1 : -1;
          }
          if (type === "start date") {
            const c1 = a.original.createdAt;
            const c2 = b.original.createdAt;
            return c1 > c2 ? 1 : -1;
          }

          return 0;
        };
      };

      return (
        <div className="group flex flex-1 items-center justify-between py-1">
          Duration (start - due date)
          <div
            role="button"
            tabIndex={0}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <Popover>
              <PopoverTrigger className="invisible flex h-7 w-7 items-center justify-center border border-base-400 bg-transparent p-0 text-base-300 hover:border-base-400 hover:bg-base-300/5 hover:text-white group-hover:visible data-[state=open]:visible data-[state=open]:border-base-400 data-[state=open]:bg-base-300/5 [&>svg]:hidden">
                <div>
                  <IconChevronDown size={12} />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56 rounded-md p-0 shadow-lg shadow-base-500">
                <Command className="rounded-md">
                  <CommandList>
                    <CommandItem
                      value="start date"
                      onSelect={() => {
                        handleSorting("start date");
                        column.toggleSorting();
                      }}
                    >
                      Sort by start date
                    </CommandItem>
                    <CommandItem
                      value="due date"
                      onSelect={() => {
                        handleSorting("due date");
                        column.toggleSorting();
                      }}
                    >
                      Sort by due date
                    </CommandItem>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      );
    },
    accessorKey: "dueDate",
    enableResizing: true,
    cell: ({ row }) => {
      const { id, dueDate, createdAt } = row.original;
      return (
        <div>
          <DueDate taskId={id} dueDate={dueDate} createdAt={createdAt} />
        </div>
      );
    },
  },
  {
    id: "projects",
    header: "Projects",
    accessorKey: "project",
    enableResizing: true,
    cell: ({ row }) => {
      const { id, status, project } = row.original;
      return (
        <div className="text-xs font-medium text-base-300">
          <ProjectList status={status} taskId={id} project={project} />
        </div>
      );
    },
  },
  {
    id: "assignee",
    header: "Assignee",
    accessorKey: "assignee",
    enableResizing: true,
    cell: ({ row }) => {
      const { id, status, assignee } = row.original;
      return <TaskAssignee taskId={id} assignee={assignee} status={status} />;
    },
  },
  {
    id: "task_visibility",
    header: "Task visibility",
    accessorKey: "members",
    enableResizing: true,
    cell: ({ row }) => {
      const { members } = row.original;
      return members?.length;
    },
  },

  {
    id: "collaborators",
    header: "Collaborators",
    accessorKey: "collaborators",
    enableResizing: true,
    cell: (row) => row.getValue() ?? "--",
  },
];
