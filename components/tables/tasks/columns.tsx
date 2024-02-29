import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { IconCalendarMonth, IconCircleCheck } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/site/date-picker";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<any>[] = [
  {
    id: "task_name",
    header: "Task name",
    accessorKey: "title",
    enableResizing: true,
    cell: ({ row }) => {
      const { status, title } = row.original;
      return (
        <div className="flex items-center">
          <Button
            variant="link"
            size="icon"
            className={`mr-2 h-fit w-fit p-0 ${status === "COMPLETE" ? "text-green-400" : "text-base-300"}`}
          >
            <IconCircleCheck />
          </Button>
          <Link href="#task" className="hover:underline">
            {title}
          </Link>
        </div>
      );
    },
  },
  {
    id: "due_date",
    header: "Due date",
    accessorKey: "dueDate",
    enableResizing: true,
    cell: ({ row }) => {
      const { dueDate, createdAt } = row.original;
      return (
        <DatePicker defaultDate={dueDate}>
          <div className="flex h-fit w-full items-center space-x-1 px-0 py-0 text-left text-sm text-base-200 hover:cursor-pointer hover:bg-transparent hover:text-white">
            <IconCalendarMonth size={18} />
            <span>
              {dueDate && createdAt
                ? `${dayjs(createdAt).format("MMM DD")} - ${dayjs(dueDate).format("MMM DD")}`
                : "--"}
            </span>
          </div>
        </DatePicker>
      );
    },
  },
  {
    id: "projects",
    header: "Projects",
    accessorKey: "project",
    enableResizing: true,
    cell: ({ row }) => {
      const { project } = row.original;
      return (
        <div className="line-clamp-1 rounded-lg bg-green-400/50 px-2 py-0.5 text-xs font-medium text-green-50">
          {project?.title}
        </div>
      );
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
