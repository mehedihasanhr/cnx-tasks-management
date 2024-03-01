import React from "react";
import AddTaskButtonWithDropdown from "@/components/button/add-task-button-with-dropdown";
import TaskDataTable from "@/components/tables/tasks/data-table";
import { config } from "@/config";

const fetchTasks = async () => {
  const tasks = await fetch(`${config.API}/tasks`, { cache: "no-cache" }).then(
    (res) => res.json()
  );
  return tasks;
};

async function TaskListView() {
  const { tasks } = await fetchTasks();

  return (
    <>
      <AddTaskButtonWithDropdown />
      <TaskDataTable tasks={tasks} />
    </>
  );
}

export default TaskListView;
