import styles from './Charts.module.css'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const productSales = [
  { name: 'Jan', user: 30 }, // 30%
  { name: 'Feb', user: 50 }, // 50%
  { name: 'Mar', user: 20 }, // 20%
  { name: 'Apr', user: 70 }, // 70%
  { name: 'May', user: 100 }, // 40%
];

const AreaChartComp = () => {
  return (
    <ResponsiveContainer width='100%' height='100%'> 
      <AreaChart
        data={productSales}
      >
        <defs>
          <linearGradient  id="colorUser" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3E36B0" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#3E36B0" stopOpacity={0.05} />
          </linearGradient>
        </defs>


        <YAxis 
          domain={[0, 100]} 
          ticks={[0, 20, 40, 60, 80, 100]} 
          tick={{ dx: -20, fill: '#888', fontSize: 12 }} 
          axisLine={false}
          tickLine={false}
        />
        
        
        <XAxis axisLine={false}
        tick={{fill: '#888', fontSize: 12}}
          tickLine={false} dataKey="name" />
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

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div>
        <p>
          <span className={styles.Tooltip}> {payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default AreaChartComp;
