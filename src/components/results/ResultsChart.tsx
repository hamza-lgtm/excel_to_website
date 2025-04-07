
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DomainScore {
  name: string;
  score: number;
  maxScore: number;
}

interface ResultsChartProps {
  data: DomainScore[];
}

const ResultsChart = ({ data }: ResultsChartProps) => {
  // Transform data for the chart
  const chartData = data.map((item) => ({
    name: item.name,
    Score: (item.score / item.maxScore) * 100,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">Domain Scores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis unit="%" />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}%`, "Score"]}
              />
              <Legend />
              <Bar
                dataKey="Score"
                name="Maturity Score"
                fill="#1E40AF"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsChart;
