"use client";

import { Task } from "@prisma/client";
import React from "react";
import AddTaskButtonWithDropdown from "@/components/button/add-task-button-with-dropdown";
import TaskDataTable from "./table/data-table";

function TaskTable({ tasks }: { tasks: Task[] }) {
  const [editMode, setEditMode] = React.useState(false);

  const toggleEditMode = () => setEditMode((mode) => !mode);

  return (
    <div>
      <AddTaskButtonWithDropdown toggleEditMode={toggleEditMode} />
      <TaskDataTable
        tasks={tasks}
        editMode={editMode}
        toggleEditMode={toggleEditMode}
      />
    </div>
  );
}

export default TaskTable;
