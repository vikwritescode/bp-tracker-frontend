import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Cell, Pie, PieChart } from "recharts";
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

const PieChartPointCard = ({
  title,
  debateData,
  points,
}: PieChartCardProps) => {
  const chartConfig = {
    OG: {
      label: "OG",
      color: "var(--chart-primary)",
    },
    OO: {
      label: "OO",
      color: "var(--chart-secondary)",
    },
    CG: {
      label: "CG",
      color: "var(--chart-alt-secondary)",
    },
    CO: {
      label: "CO",
      color: "var(--chart-alt-primary)",
    },
    AFF: {
      label: "Affirmative",
      color: "var(--chart-primary)",
    },
    NEG: {
      label: "Negative",
      color: "var(--chart-alt-primary)",
    },
  } satisfies ChartConfig;
  const chartData = [
    { position: "OG", count: 0, fill: "var(--chart-primary)", pattern: "dots" },
    { position: "OO", count: 0, fill: "var(--chart-secondary)", pattern: "diagonal" },
    { position: "CG", count: 0, fill: "var(--chart-alt-secondary)", pattern: "grid" },
    { position: "CO", count: 0, fill: "var(--chart-alt-primary)", pattern: "cross" },
    { position: "AFF", count: 0, fill: "var(--chart-primary)", pattern: "dashes" },
    { position: "NEG", count: 0, fill: "var(--chart-alt-primary)", pattern: "brick" },
  ];
  debateData
    .filter((x) => x["points"] == points)
    .forEach((debate) => {
      const position = debate["position"];
      const rec_to_inc = chartData.find((x) => x.position == position);
      if (rec_to_inc) {
        rec_to_inc.count++;
      }
    });

  const renderPatternSwatch = (color: string, pattern: string) => (
    <svg width={12} height={12} viewBox="0 0 12 12" className="shrink-0">
      <rect width="12" height="12" fill={color} />
      {pattern === "dots" && (
        <>
          <circle cx="3" cy="3" r="1.1" fill="rgba(255,255,255,0.75)" />
          <circle cx="9" cy="9" r="1.1" fill="rgba(255,255,255,0.75)" />
        </>
      )}
      {pattern === "dashes" && (
        <path d="M0 3 H12 M0 8 H12" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" />
      )}
      {pattern === "diagonal" && (
        <path d="M0 12 L12 0 M-1 5 L5 -1 M7 13 L13 7" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" />
      )}
      {pattern === "grid" && (
        <path d="M0 0 H12 M0 4 H12 M0 8 H12 M0 0 V12 M4 0 V12 M8 0 V12 M12 0 V12" stroke="rgba(255,255,255,0.75)" strokeWidth="0.8" />
      )}
      {pattern === "cross" && (
        <>
          <path d="M0 0 L12 12 M12 0 L0 12" stroke="rgba(255,255,255,0.75)" strokeWidth="1.1" />
          <circle cx="6" cy="6" r="1.1" fill="rgba(255,255,255,0.75)" />
        </>
      )}
      {pattern === "brick" && (
        <>
          <path d="M0 0 H12 M0 4 H12 M0 8 H12 M0 0 V12 M4 0 V12 M8 0 V12" stroke="rgba(255,255,255,0.75)" strokeWidth="0.9" />
          <path d="M6 0 H12 V4 H6 Z" fill="rgba(255,255,255,0.2)" />
        </>
      )}
    </svg>
  );

  const tooltipContent = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl">
        {payload.map((item: any) => {
          const entry = item.payload;
          return (
            <div
              key={item.dataKey ?? item.name}
              className="flex items-center justify-between gap-3 py-1"
            >
              <div className="flex items-center gap-2">
                {renderPatternSwatch(entry.fill, entry.pattern)}
                <span className="text-muted-foreground">{item.name}</span>
              </div>
              <span className="font-mono font-medium tabular-nums text-foreground">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <defs>
              {chartData.map((entry) => {
                const patternId = `${entry.position}-pattern`;
                return (
                  <pattern
                    id={patternId}
                    key={patternId}
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect width="8" height="8" fill={entry.fill} />
                    {entry.pattern === "dots" && (
                      <>
                        <circle cx="2" cy="2" r="1.1" fill="rgba(255,255,255,0.75)" />
                        <circle cx="6" cy="6" r="1.1" fill="rgba(255,255,255,0.75)" />
                      </>
                    )}
                    {entry.pattern === "dashes" && (
                      <path d="M0 2 H8 M0 6 H8" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" />
                    )}
                    {entry.pattern === "diagonal" && (
                      <path d="M0 8 L8 0 M-2 2 L2 -2 M6 10 L10 6" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" />
                    )}
                    {entry.pattern === "grid" && (
                      <path d="M0 0 H8 M0 4 H8 M0 8 H8 M0 0 V8 M4 0 V8 M8 0 V8" stroke="rgba(255,255,255,0.75)" strokeWidth="0.8" />
                    )}
                    {entry.pattern === "cross" && (
                      <>
                        <path d="M0 0 L8 8 M8 0 L0 8" stroke="rgba(255,255,255,0.75)" strokeWidth="1.1" />
                        <circle cx="4" cy="4" r="1" fill="rgba(255,255,255,0.75)" />
                      </>
                    )}
                    {entry.pattern === "brick" && (
                      <>
                        <path d="M0 0 H8 M0 4 H8 M0 8 H8 M0 0 V8 M4 0 V8 M8 0 V8" stroke="rgba(255,255,255,0.75)" strokeWidth="0.9" />
                        <path d="M4 0 H8 V4 H4 Z" fill="rgba(255,255,255,0.2)" />
                      </>
                    )}
                  </pattern>
                );
              })}
            </defs>
            <ChartTooltip
              cursor={false}
              content={tooltipContent}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="position"
              innerRadius={60}
            >
              {chartData.map((entry) => (
                <Cell
                  key={entry.position}
                  fill={`url(#${entry.position}-pattern)`}
                  stroke="none"
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartPointCard;
