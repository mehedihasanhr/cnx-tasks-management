import React from "react";
import { fetchTasks } from "@/actions/tasks";
import TaskTable from "@/components/site/tasks/TaskTable";

async function TaskListView() {
  const { tasks } = await fetchTasks();
  return <TaskTable tasks={tasks} />;
}

export default TaskListView;
