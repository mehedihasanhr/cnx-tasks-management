"use client";

import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const layouts = {
  lg: [
    { i: "BAR_CHART_WIDGET", x: 0, y: 0, w: 4, h: 2, minW: 4, minH: 2 },
    { i: "TASK_WIDGET", x: 0, y: 3, w: 6, h: 3, minW: 3 },
    { i: "PROJECT_WIDGET", x: 6, y: 0, w: 6, h: 3, minW: 3 },
    { i: "GOAL_WIDGET", x: 6, y: 3, w: 6, h: 3, minW: 3 },
    { i: "LINE_CHART_WIDGET", x: 0, y: 6, w: 6, h: 3, minW: 3, minH: 2 },
    {
      i: "STACKED_AREA_CHART_WIDGET",
      x: 6,
      y: 6,
      w: 6,
      h: 3,
      minW: 3,
      minH: 2,
    },
    {
      i: "PIE_CHART_WIDGET",
      x: 0,
      y: 9,
      w: 6,
      h: 3,
      minW: 3,
      minH: 2,
    },
  ],
};

function WidgetContainer({ children }: { children: React.ReactNode }) {
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      margin={[32, 32]}
      breakpoints={{ lg: 1200 }}
      cols={{ lg: 12 }}
    >
      {children}
    </ResponsiveGridLayout>
  );
}

export default WidgetContainer;
