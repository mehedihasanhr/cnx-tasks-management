"use client";

import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const layouts = {
  lg: [
    { i: "TASK_WIDGET", x: 0, y: 0, w: 6, h: 3, minW: 3 },
    { i: "PROJECT_WIDGET", x: 6, y: 0, w: 6, h: 3, minW: 3 },
    { i: "GOAL_WIDGET", x: 0, y: 3, w: 6, h: 3, minW: 3 },
  ],
  md: [
    { i: "TASK_WIDGET", x: 0, y: 0, w: 3, h: 1, minW: 3 },
    { i: "PROJECT_WIDGET", x: 3, y: 0, w: 3, h: 3, minW: 3 },
    { i: "GOAL_WIDGET", x: 0, y: 3, w: 3, h: 3, minW: 3 },
  ],
};

function WidgetContainer({ children }: { children: React.ReactNode }) {
  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      margin={[32, 32]}
      breakpoints={{ lg: 1200, md: 996 }}
      cols={{ lg: 12, md: 10 }}
    >
      {children}
    </ResponsiveGridLayout>
  );
}

export default WidgetContainer;
