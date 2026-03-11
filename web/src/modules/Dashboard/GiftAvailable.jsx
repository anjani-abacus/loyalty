

"use client";

import React, { useState, useMemo } from "react";
import { PieChart, Pie, Sector, Label } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { useGiftStats } from "./useData";

export function GiftPieChart({
  title,
  description,
  data = [],
  colorConfig = {},
  titleType = "Gifts",
  useGiftApi = false,
}) {
  const id = "pie-chart-generic";

  const { formattedData, totalGift, isLoading } = useGiftStats();


  const sourceData = useGiftApi
    ? formattedData || []
    : data || [];

  const isFetching = useGiftApi && isLoading;

  // if (useGiftApi && isLoading) {
  //   return (
  //     <Card className="flex flex-col items-center justify-center p-6">
  //       <CardTitle>Loading {titleType} Data...</CardTitle>
  //     </Card>
  //   );
  // }
  // const colorConfig = {
  //   "in progress": { label: "In Progress", color: "#f87171" }, 
  //   shipped: { label: "Shipped", color: "#facc15" }, 
  //   delivered: { label: "Delivered", color: "#4ade80" }, 
  // };


  const chartData =
    sourceData.length > 0
      ? sourceData.map((item, index) => ({
        type: item.type || item.name || `Unknown ${index + 1}`,
        count:
          item.count ||
          item.total ||
          item.value ||
          item.total_influencers ||
          0,
        fill:
          colorConfig?.[item.type?.toLowerCase()]?.color ||
          `hsl(${(index * 60) % 360}, 70%, 55%)`,
      }))
      : [
        { type: "Available", count: 340, fill: "#62C76C" },
        { type: "Scanned", count: 180, fill: "#d1d5db" },
      ];

  const [activeType, setActiveType] = useState(chartData?.type);
  const activeIndex = useMemo(
    () => chartData.findIndex((item) => item.type === activeType),
    [activeType, chartData]
  );

  const totalCount = chartData.reduce((sum, item) => sum + (item.count || 0), 0);

  const defaultColors = {
    available: { label: "Available", color: "#62C76C" },
    scanned: { label: "Scanned", color: "#d1d5db" },
    inprogress: { label: "In Progress", color: "#fbbf24" },
    shipped: { label: "Shipped", color: "#3b82f6" },
    delivered: { label: "Delivered", color: "#22c55e" },
  };

  return (
    isFetching ? <Card className="flex flex-col items-center justify-center p-6">
      <CardTitle>Loading {titleType} Data...</CardTitle>
    </Card> :
      <Card
        data-chart={id}
        className="flex flex-col bg-card border shadow-sm hover:shadow-md transition-all"
      >
        <ChartStyle
          id={id}
          config={
            typeof colorConfig === "object" &&
              colorConfig !== null &&
              Object.keys(colorConfig).length
              ? colorConfig
              : defaultColors
          }
        />

        <CardHeader className="pb-0">
          <div className="grid gap-1">
            <CardTitle>{title || "Gift Distribution"}</CardTitle>
            <CardDescription>
              {description || "Available vs Scanned"}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center gap-4 pb-2">
          <ChartContainer id={id} className="mx-auto aspect-square w-full max-w-[300px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="count"
                nameKey="type"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                onMouseEnter={(_, index) => setActiveType(chartData[index].type)}
                activeShape={({ outerRadius = 0, ...props }) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox))
                      return null;
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
                          className="fill-foreground text-3xl font-bold "
                        >
                          {totalCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          {titleType === "Gifts"
                            ? "Total Gifts"
                            : `Total ${titleType}`}
                        </tspan>
                      </text>
                    );
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-2  mt-1 text-xs font-medium">
            {chartData.map((item, idx) => (
              <div key={idx} className="flex  items-center  gap-1">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.fill }}
                ></span>
                <span className="text-muted-foreground text-xs">{item.type.toUpperCase()}</span>
                <span className="font-semibold text-foreground">
                  {item.count.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
  );
}
