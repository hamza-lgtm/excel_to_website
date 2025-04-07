import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
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

interface RadarChartProps {
  data: DomainScore[];
}

const RadarChart = ({ data }: RadarChartProps) => {
  // Transform data for the chart
  const chartData = data.map((item) => ({
    subject: item.name,
    A: (item.score / item.maxScore) * 100,
    fullMark: 100,
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">Domain Balance Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Maturity Score"
                dataKey="A"
                stroke="#1E40AF"
                fill="#1E40AF"
                fillOpacity={0.6}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(1)}%`, "Score"]}
              />
              <Legend />
            </RechartsRadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RadarChart;
