import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

export default function StackedAreaChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>

          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#EF2929" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#EF2929" stopOpacity={0.05} />
          </linearGradient>
        </defs>
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
        <Tooltip />
        <Area
          type="monotone"
          dataKey="pv"
          stackId="1"
          stroke="#EF2929"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
        <Area
          type="monotone"
          dataKey="amt"
          stackId="1"
          id="colorAmt"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorAmt)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
