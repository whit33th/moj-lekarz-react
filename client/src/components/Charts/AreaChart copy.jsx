import React from "react";

import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const productSales = [
  { name: "Jan", user: 30 },
  { name: "Feb", user: 50 },
  { name: "Mar", user: 20 },
  { name: "Apr", user: 70 },
  { name: "May", user: 100 },
];

const AreaChartComp = () => {
  return (
    <ResponsiveContainer width={265} height={205}>
      <AreaChart data={productSales}>
        <defs>
          <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3E36B0" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#3E36B0" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} />
        <XAxis dataKey="name" />
        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="user"
          stroke="transparent"
          fill="url(#colorUser)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-medium text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Users:
          <span className="ml-2"> {payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default AreaChartComp;
