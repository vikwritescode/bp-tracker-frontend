import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Cell, Pie, PieChart, Label } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "../ui/chart";
interface PieChartPositionProps {
  title: string;
  debateData: Array<any>;
  position: string;
}

const PieChartPositionCard = ({
  title,
  debateData,
  position,
}: PieChartPositionProps) => {
  const dispAv = ([s, c]: Array<number>) => (s / c || 0).toFixed(2);
  const teamStats = debateData.reduce(
    (acc, debate) => {
      const position = debate["position"].toLowerCase();
      const points = debate["points"];

      acc[position][0] += points;
      acc[position][1] += 1;
      return acc;
    },
    {
      og: [0, 0],
      oo: [0, 0],
      cg: [0, 0],
      co: [0, 0],
      aff: [0, 0],
      neg: [0, 0]
    },
  );
  const speakStats = debateData.reduce(
    (acc, debate) => {
      const position = debate["position"].toLowerCase();
      const speaks = debate["speaks"];

      acc[position][0] += speaks;
      acc[position][1] += 1;
      return acc;
    },
    {
      og: [0, 0],
      oo: [0, 0],
      cg: [0, 0],
      co: [0, 0],
      aff: [0, 0],
      neg: [0, 0],
    },
  );

  const chartConfig = {
    3: {
      label: "3",
      color: "var(--chart-primary)",
    },
    2: {
      label: "2",
      color: "var(--chart-secondary)",
    },
    1: {
      label: "1",
      color: "var(--chart-alt-secondary)",
    },
    0: {
      label: "0",
      color: "var(--chart-alt-primary)",
    },
  } satisfies ChartConfig;
  const chartData = [
    { points: 0, count: 0, fill: "var(--chart-alt-primary)", pattern: "dots" },
    { points: 1, count: 0, fill: "var(--chart-alt-secondary)", pattern: "diagonal" },
    { points: 2, count: 0, fill: "var(--chart-secondary)", pattern: "grid" },
    { points: 3, count: 0, fill: "var(--chart-primary)", pattern: "dashes" },
  ];
  debateData
    .filter((x) => x["position"] == position)
    .forEach((debate) => {
      const points = debate["points"];
      const rec_to_inc = chartData.find((x) => x.points == points);
      if (rec_to_inc) {
        rec_to_inc.count++;
      }
    });
  // dispAv(speakStats[title.toLowerCase()])

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
        <CardTitle>
          {title}
        </CardTitle>
        <CardDescription>
          {dispAv(speakStats[position.toLowerCase()])} speaks
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-62.5"
        >
          <PieChart>
            <defs>
              {chartData.map((entry) => {
                const patternId = `${entry.points}-pattern`;
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
              <Label
                position="center"
                className="text-foreground"
                fontSize={18}
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl"
                        >
                          {dispAv(teamStats[position.toLowerCase()])}
                        </tspan>
                      </text>
                    );
                  }
                }}
              ></Label>
              {chartData.map((entry) => (
                <Cell
                  key={entry.points}
                  fill={`url(#${entry.points}-pattern)`}
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

export default PieChartPositionCard;
