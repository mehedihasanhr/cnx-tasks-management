import { fetchTasks } from "@/actions/tasks";
import TaskTable from "@/components/site/tasks/task-table";
import { revalidateTag } from "next/cache";

async function TaskListView() {
  revalidateTag("TASK_COLLECTION");
  const { tasks } = await fetchTasks();
  return <TaskTable tasks={tasks} />;
}

export default TaskListView;
