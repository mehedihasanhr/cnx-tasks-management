import { fetchTasks } from "@/actions/tasks";
import TaskTable from "@/components/site/tasks/TaskTable";

async function DefaultTaskListView() {
  const { tasks } = await fetchTasks();
  return <TaskTable tasks={tasks} />;
}

export default DefaultTaskListView;
