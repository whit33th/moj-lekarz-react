"use client";

import { Area, AreaChart, CartesianGrid, XAxis,YAxis, Tooltip } from "recharts";


// Sample chart data
const chartData = [
  { month: "January", users: 186},
  { month: "February", users: 305},
  { month: "March", users: 237 },
  { month: "April", users: 73},
  { month: "May", users: 209 },
  { month: "June", users: 214},
];

export function AreaChartComponent() {
  return (
    <div className="card">
      <div className="chart-container">
        <AreaChart
          data={chartData}
          width={500} // Set the width of the chart
          height={200} // Set the height of the chart
        >
          
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            tickFormatter={(value) => value.slice(0, 3)} // Show first 3 letters of the month
          />
          <YAxis
            dataKey="users"
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            
          />
          <Tooltip cursor={false} />
          
          <Area
            dataKey="users"
            type="natural"
            fill="rgba(0, 123, 255, 0.4)" // Example fill color for desktop
            stroke="rgba(0, 123, 255, 1)" // Example stroke color for desktop
            stackId="a"
          />
        </AreaChart>
      </div>
      
    </div>
  );
}

