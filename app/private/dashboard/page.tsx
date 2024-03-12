import WidgetItem from "@/components/site/widget-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import BarChartWidget from "@/components/widgets/bar-chart-widget";
import GoalWidget from "@/components/widgets/goal-widget copy";
import LineChartWidget from "@/components/widgets/line-chart-widget";
import PieChartWidget from "@/components/widgets/pie-chart-widget";
import ProjectWidget from "@/components/widgets/project-widget";
import StackedAreaChartWidget from "@/components/widgets/stacked-area-chart-widget";
import TaskWidget from "@/components/widgets/task-widgets";
import dynamic from "next/dynamic";
import React from "react";

// import WidgetContainer from "@/components/site/widget-container";
const WidgetContainer = dynamic(
  () => import("@/components/site/widget-container"),
  {
    ssr: false,
  }
);

async function Dashboard() {
  return (
    <div className="flex flex-1 flex-col overflow-hidden py-10 pb-0">
      <div className="px-8">
        <h3 className="text-xl">Dashboard</h3>
        <p className="text-xs text-base-300">
          Lorem ipsum dolor sit amat consectetur adipisicing eliot.
        </p>
      </div>

      {/* Widgets Container  */}
      <ScrollArea className="mt-6">
        <React.Suspense fallback={<>layout Loading...</>}>
          <WidgetContainer>
            <WidgetItem dataKey="BAR_CHART_WIDGET">
              <LineChartWidget />
            </WidgetItem>

            <WidgetItem dataKey="TASK_WIDGET">
              <TaskWidget />
            </WidgetItem>

            <WidgetItem dataKey="PROJECT_WIDGET">
              <ProjectWidget />
            </WidgetItem>

            <WidgetItem dataKey="GOAL_WIDGET">
              <GoalWidget />
            </WidgetItem>

            <WidgetItem dataKey="LINE_CHART_WIDGET">
              <BarChartWidget />
            </WidgetItem>

            <WidgetItem dataKey="STACKED_AREA_CHART_WIDGET">
              <StackedAreaChartWidget />
            </WidgetItem>

            <WidgetItem dataKey="PIE_CHART_WIDGET">
              <PieChartWidget />
            </WidgetItem>
          </WidgetContainer>
        </React.Suspense>
      </ScrollArea>
    </div>
  );
}

export default Dashboard;
