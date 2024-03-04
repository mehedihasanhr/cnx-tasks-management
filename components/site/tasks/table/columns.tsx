import { ColumnDef } from "@tanstack/react-table";
import type { Task } from "@/types";
import DueDate from "./due-date";
import TaskTitle from "./task-title";
import ProjectList from "./project-list";
import TaskAssignee from "./task-assignee";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const columns: ColumnDef<Task>[] = [
  {
    id: "task_name",
    header: "Task name",
    accessorKey: "title",
    minSize: 300,
    size: 500,
    maxSize: 500,
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
