"use client";

import React from "react";
import { Layout, Layouts, Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultLayouts = {
  xl: [
    {
      w: 4,
      h: 2,
      x: 4,
      y: 2,
      i: "BAR_CHART_WIDGET",
      moved: false,
      static: false,
    },
    {
      w: 4,
      h: 2,
      x: 4,
      y: 0,
      i: "TASK_WIDGET",
      moved: false,
      static: false,
    },
    {
      w: 4,
      h: 2,
      x: 8,
      y: 2,
      i: "PROJECT_WIDGET",
      moved: false,
      static: false,
    },
    {
      w: 5,
      h: 2,
      x: 0,
      y: 4,
      i: "GOAL_WIDGET",
      moved: false,
      static: false,
    },
    {
      w: 4,
      h: 2,
      x: 0,
      y: 0,
      i: "LINE_CHART_WIDGET",
      moved: false,
      static: false,
    },
    {
      w: 4,
      h: 2,
      x: 8,
      y: 0,
      i: "STACKED_AREA_CHART_WIDGET",
      moved: false,
      static: false,
    },
    {
      w: 4,
      h: 2,
      x: 0,
      y: 2,
      i: "PIE_CHART_WIDGET",
      moved: false,
      static: false,
    },
  ],

  lg: [
    {
      w: 12,
      h: 2,
      x: 0,
      y: 4,
      i: "BAR_CHART_WIDGET",
      moved: false,
      static: false,
    },
    {
      w: 12,
      h: 2,
      x: 0,
      y: 8,
      i: "TASK_WIDGET",
      moved: false,
      static: false,
    },
    {
      w: 7,
      h: 2,
      x: 0,
      y: 6,
      i: "PROJECT_WIDGET",
      moved: false,
      static: false,
    },
    {
      w: 12,
      h: 2,
      x: 0,
      y: 10,
      i: "GOAL_WIDGET",
      moved: false,
      static: false,
    },
    {
      w: 12,
      h: 2,
      x: 0,
      y: 2,
      i: "LINE_CHART_WIDGET",
      moved: false,
      static: false,
    },
    {
      w: 12,
      h: 2,
      x: 0,
      y: 0,
      i: "STACKED_AREA_CHART_WIDGET",
      moved: false,
      static: false,
    },
    {
      w: 5,
      h: 2,
      x: 7,
      y: 6,
      i: "PIE_CHART_WIDGET",
      moved: false,
      static: false,
    },
  ],
};

function WidgetContainer({ children }: { children: React.ReactNode }) {
  const [layouts, setLayouts] = React.useState(() => {
    // get layout form local storage
    const localLayouts = localStorage.getItem("cnx-dashboard-layout");

    if (localLayouts) {
      return JSON.parse(localLayouts);
    }
    // if  not found return default
    return defaultLayouts;
  });

  // on layout change
  const handleLayoutChange = (currentLayout: Layout[], allLayouts: Layouts) => {
    localStorage.setItem("cnx-dashboard-layout", JSON.stringify(allLayouts));
    setLayouts(allLayouts);
  };

  return (
    <ResponsiveGridLayout
      className="layout"
      layouts={layouts}
      margin={[32, 32]}
      breakpoints={{ xl: 1200, lg: 992 }}
      cols={{ xl: 12, lg: 12 }}
      onLayoutChange={handleLayoutChange}
    >
      {children}
    </ResponsiveGridLayout>
  );
}

export default WidgetContainer;
