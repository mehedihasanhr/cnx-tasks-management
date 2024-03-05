import { fetchTasks } from "@/actions/tasks";
import TaskTable from "@/components/site/tasks/task-table";

async function TaskListView() {
  const { tasks } = await fetchTasks();
  return <TaskTable tasks={tasks} />;
}

export default TaskListView;
