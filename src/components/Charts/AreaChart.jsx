import styles from "./Charts.module.css";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const AreaChartComp = ({ data, dataKey, domain, ticks }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3E36B0" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#3E36B0" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <YAxis
          domain={domain}
          ticks={ticks}
          tick={{ dx: -20, fill: "#888", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <XAxis
          axisLine={false}
          tick={{ fill: "#888", fontSize: 12 }}
          tickLine={false}
          dataKey="name"
        />
        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey={dataKey}
          stroke="transparent"
          fill="url(#colorUser)"
          fillOpacity={1}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p>
          <span className={styles.Tooltip}>{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default AreaChartComp;
