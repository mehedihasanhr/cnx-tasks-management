import { ColumnDef } from "@tanstack/react-table";
import type { Task } from "@/types";
import DueDate from "./due-date";
import TaskTitle from "./task-title";
import ProjectList from "./project-list";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<Task>[] = [
  {
    id: "task_name",
    header: "Task name",
    accessorKey: "title",
    minSize: 400,
    size: 700,
    maxSize: 700,
    enableResizing: true,
    cell: ({ row }) => {
      const { id, status, title } = row.original;
      return (
        <div>
          <TaskTitle taskId={id} status={status} title={title} />
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
      const { id, project } = row.original;
      return (
        <div className="text-xs font-medium text-base-300">
          <ProjectList taskId={id} project={project} />
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
