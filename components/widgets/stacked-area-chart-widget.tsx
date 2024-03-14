"use client";

import StackedAreaChart from "@/components/charts/stacked-area-chart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IconDotsVertical } from "@tabler/icons-react";

function StackedAreaChartWidget() {
  return (
    <div className="relative flex h-full min-h-fit flex-col rounded-lg border border-base-0/5 bg-gradient-service-card p-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl">Area Chart</h3>
        <Button
          onMouseDown={(e) => e.stopPropagation()}
          variant="secondary"
          size="icon-sm"
          className="border border-base-0/5 text-sm text-base-300"
        >
          <IconDotsVertical size={16} />
        </Button>
      </div>

      <Separator className="mb-3 h-0.5 bg-base-0/5" />

      <div className="h-full w-full overflow-hidden">
        <StackedAreaChart />
      </div>
    </div>
  );
}

export default StackedAreaChartWidget;
