import BarChart from "@/components/charts/bar-chart";
import LineChart from "@/components/charts/line-chart";
import PieChart from "@/components/charts/pie-chart";
import StackedAreaChart from "@/components/charts/stacked-area-chart";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

export default function DashboardCustomizationDialogContent() {
  return (
    <div>
      <h5 className="mb-4 font-medium text-base-0">Widget Selection:</h5>

      {/* Quick selection */}
      <div className="grid grid-cols-2 gap-4">
        <Widget>
          <BarChart />
        </Widget>
        <Widget>
          <LineChart />
        </Widget>
        <Widget>
          <StackedAreaChart />
        </Widget>

        <Widget>
          <PieChart />
        </Widget>

        <div className="col-span-1 h-52 rounded-lg bg-base-400/50 backdrop-blur-sm">
          <div className="flex h-full w-full items-center justify-center">
            <IconPlus />
            Add Widget
          </div>
        </div>
      </div>
    </div>
  );
}

// pre-config widget
function Widget({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative col-span-1 h-52 rounded-lg bg-base-400/50">
      <Button
        variant="secondary"
        size="sm"
        className="absolute right-2.5 top-2.5 z-10 h-8 border-2 border-base-0/10 bg-base-0 text-black"
      >
        Use
      </Button>
      <div className="pointer-events-none h-full w-full overflow-hidden p-2">
        {children}
      </div>
    </div>
  );
}
