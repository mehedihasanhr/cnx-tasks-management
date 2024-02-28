import WidgetContainer from "@/components/site/widget-container";
import WidgetItem from "@/components/site/widget-item";
import TaskWidget from "@/components/widgets/task-widgets";
import { ScrollArea } from "@/components/ui/scroll-area";
import ProjectWidget from "@/components/widgets/project-widget";
import GoalWidget from "@/components/widgets/goal-widget copy";

async function Dashboard() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden p-10 pb-0">
      <div>
        <h3 className="text-xl">Dashboard</h3>
        <p className="text-xs text-base-300">
          Lorem ipsum dolor sit amat consectetur adipisicing eliot.
        </p>
      </div>

      {/* Widgets Container  */}
      <ScrollArea className="mt-6">
        <WidgetContainer>
          <WidgetItem dataKey="TASK_WIDGET">
            <TaskWidget />
          </WidgetItem>

          <WidgetItem dataKey="PROJECT_WIDGET">
            <ProjectWidget />
          </WidgetItem>

          <WidgetItem dataKey="GOAL_WIDGET">
            <GoalWidget />
          </WidgetItem>
        </WidgetContainer>
      </ScrollArea>
    </div>
  );
}

export default Dashboard;
