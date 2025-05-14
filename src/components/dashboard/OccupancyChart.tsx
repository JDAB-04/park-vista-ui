
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import DashboardCard from "../common/DashboardCard";
import { Button } from "@/components/ui/button";

const data = [
  { time: "6am", occupied: 35, available: 85 },
  { time: "8am", occupied: 60, available: 60 },
  { time: "10am", occupied: 80, available: 40 },
  { time: "12pm", occupied: 95, available: 25 },
  { time: "2pm", occupied: 85, available: 35 },
  { time: "4pm", occupied: 75, available: 45 },
  { time: "6pm", occupied: 65, available: 55 },
  { time: "8pm", occupied: 50, available: 70 },
  { time: "10pm", occupied: 30, available: 90 },
];

const OccupancyChart = () => {
  return (
    <DashboardCard 
      title="Daily Occupancy"
      actions={
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Today</Button>
          <Button variant="ghost" size="sm">Week</Button>
          <Button variant="ghost" size="sm">Month</Button>
        </div>
      }
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOccupied" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAvailable" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
            <XAxis dataKey="time" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="occupied"
              stroke="#EF4444"
              fillOpacity={1}
              fill="url(#colorOccupied)"
            />
            <Area
              type="monotone"
              dataKey="available"
              stroke="#10B981"
              fillOpacity={1}
              fill="url(#colorAvailable)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
};

export default OccupancyChart;
