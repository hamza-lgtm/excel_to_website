
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SubdomainScore {
  name: string;
  domain: string;
  x: number; // e.g., complexity
  y: number; // e.g., maturity
  z: number; // size of the point
}

interface ScatterChartProps {
  data: SubdomainScore[];
}

const ScatterChart = ({ data }: ScatterChartProps) => {
  // Group data by domain for different colors
  const domainGroups = data.reduce<Record<string, SubdomainScore[]>>(
    (acc, item) => {
      if (!acc[item.domain]) {
        acc[item.domain] = [];
      }
      acc[item.domain].push(item);
      return acc;
    },
    {}
  );

  // Colors for each domain
  const domainColors: Record<string, string> = {
    Business: "#1E40AF",
    People: "#047857",
    Process: "#B91C1C",
    Technology: "#7C3AED",
    Services: "#F59E0B",
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-center">Maturity vs. Complexity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="Complexity" 
                unit="%" 
                domain={[0, 100]}
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Maturity" 
                unit="%" 
                domain={[0, 100]}
              />
              <ZAxis type="number" dataKey="z" range={[50, 400]} />
              <Tooltip
                cursor={{ strokeDasharray: "3 3" }}
                formatter={(value: number, name: string) => [
                  `${value.toFixed(1)}%`,
                  name,
                ]}
              />
              <Legend />
              {Object.entries(domainGroups).map(([domain, items]) => (
                <Scatter
                  key={domain}
                  name={domain}
                  data={items}
                  fill={domainColors[domain] || "#8884d8"}
                />
              ))}
            </RechartsScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScatterChart;
