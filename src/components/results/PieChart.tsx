import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DomainScore {
  name: string;
  score: number;
  maxScore: number;
}

interface PieChartProps {
  data: DomainScore[];
}

const COLORS = ['#1E40AF', '#047857', '#B91C1C', '#7C3AED', '#F59E0B'];

const PieChart = ({ data }: PieChartProps) => {
  // Transform data for the chart
  const chartData = data.map((item, index) => ({
    name: item.name,
    value: item.score,
    color: COLORS[index % COLORS.length]
  }));

  const totalScore = chartData.reduce((sum, item) => sum + item.value, 0);
  const averageScore = totalScore / chartData.length;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">Domain Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [
                  `Score: ${value} (${((value / averageScore) * 100).toFixed(1)}% of avg)`,
                  name
                ]}
              />
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PieChart;
