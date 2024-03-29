"use client";

import CustomTooltip from "@/components/charts/tooltip";
import {
  Bar,
  BarChart as BarChartComponent,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function BarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChartComponent
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="rgba(255,255,255,0.1)"
          vertical={false}
        />
        <XAxis
          dataKey="name"
          tick={{ fontSize: "12px", fill: "rgba(255,255,255,0.3)" }}
        />
        <YAxis
          tickCount={30}
          tick={{ fontSize: "12px", fill: "rgba(255,255,255,0.3)" }}
          axisLine={{
            stroke: "rgba(255,255,255,0.1)",
          }}
          tickLine={{
            stroke: "rgba(255,255,255,0.1)",
          }}
        />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.03" }}
          content={<CustomTooltip />}
        />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChartComponent>
    </ResponsiveContainer>
  );
}
