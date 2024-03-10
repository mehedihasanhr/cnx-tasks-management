"use client";

import RowDragHandler from "@/components/site/projects/data-table/row-drag-handler";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Project } from "@/types";
import { IconChevronDown } from "@tabler/icons-react";
import { ColumnDef } from "@tanstack/react-table";
import _ from "lodash";
import ProjectCollaborators from "./collaborators";
import DueDate from "./due-date";
import ProjectManager from "./project-manager";
import ProjectTitle from "./project-title";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<Project>[] = [
  {
    id: "project_name",
    header: "Project name",
    accessorKey: "title",
    minSize: 300,
    size: 700,
    maxSize: 700,
    enableResizing: true,
    cell: ({ row }) => {
      const { title, status, id } = row.original;
      return (
        <div className="relative pl-2">
          <RowDragHandler projectId={id} />
          <ProjectTitle title={title} projectId={id} status={status} />
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
      return <DueDate projectId={id} createdAt={createdAt} dueDate={dueDate} />;
    },
  },
  {
    id: "task",
    header: "Tasks",
    accessorKey: "tasks",
    enableResizing: true,
    cell: ({ row }) => {
      const { tasks } = row.original;
      return _.size(tasks);
    },
  },
  {
    id: "project_manager",
    header: "Project Manager",
    accessorKey: "projectManagerId",
    enableResizing: true,
    cell: ({ row }) => {
      return <ProjectManager manager={row.original?.manager} />;
    },
  },
  {
    id: "collaborators",
    header: "Collaborators",
    accessorKey: "collaborators",
    enableResizing: true,
    cell: ({ row }) => (
      <ProjectCollaborators
        projectId={row.original.id}
        collaborators={row.original.collaborators}
      />
    ),
  },
];
