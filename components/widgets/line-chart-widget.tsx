"use client";

import LineChart from "@/components/charts/line-chart";
import WidgetCustomization from "@/components/site/widget-customization";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { IconDotsVertical, IconSettings, IconTrash } from "@tabler/icons-react";
import React from "react";

function LineChartWidget() {
  const [isCustomizationDialogOpen, setIsCustomizationDialogOpen] =
    React.useState(false);

  return (
    <div className="relative flex h-full min-h-fit flex-col rounded-lg border border-base-0/5 bg-gradient-service-card p-6 pt-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xl">Line Chart</h3>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="focus-within:border-none focus:border-0 focus:ring-0 focus-visible:border-none focus-visible:ring-0 data-[state=open]:bg-base-400 data-[state=open]:text-white"
            asChild
          >
            <Button
              onMouseDown={(e) => e.stopPropagation()}
              variant="ghost"
              size="icon-sm"
              className=" text-sm text-base-300"
            >
              <IconDotsVertical size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center space-x-2 hover:bg-base-400/20">
              <IconTrash size={18} />
              <span>Delete</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setIsCustomizationDialogOpen(true)}
              className="flex items-center space-x-2 hover:bg-base-400/20"
            >
              <IconSettings size={18} />
              <span> Setting </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator className="mb-3 h-0.5 bg-base-0/5" />

      <div className="h-full w-full overflow-hidden">
        <LineChart />
      </div>

      <WidgetCustomization
        isOpen={isCustomizationDialogOpen}
        onClose={() => setIsCustomizationDialogOpen(false)}
      />
    </div>
  );
}

export default LineChartWidget;
