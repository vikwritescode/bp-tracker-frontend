import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
interface PieChartCardProps {
  title: string;
  debateData: Array<any>;
  points: number;
}

const PieChartPointCard = ({ title, debateData, points }: PieChartCardProps) => {
  const chartConfig = {} satisfies ChartConfig;
  const chartData = [
    { position: "OG", count: 0 },
    { position: "OO", count: 0 },
    { position: "CG", count: 0 },
    { position: "CO", count: 0 },
  ];
  debateData.filter(x => x[4] == points)
  .forEach((debate) => {
    const position = debate[3];
    const rec_to_inc = chartData.find((x) => x.position == position);
    if (rec_to_inc) {
      rec_to_inc.count++;
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="position"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartPointCard;
