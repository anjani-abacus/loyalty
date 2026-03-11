"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useCouponScanGenerated } from "./useData";

export default function CouponScanPieChart() {
  const { couponData, isLoading } = useCouponScanGenerated();

  if (isLoading) return <div>Loading...</div>;
  if (!couponData || Object.keys(couponData).length === 0)
    return <div>No data</div>;

  const { totalGeneratedCoupons, activeCoupons, scannedCoupons } = couponData;

  // --- Prepare Pie data ---
  const chartData = [
    { name: "Active", value: activeCoupons, fill: "var(--chart-1)" },
    { name: "Scanned", value: scannedCoupons, fill: "var(--chart-2)" },
  ];

//   const total = (activeCoupons || 0) + (scannedCoupons || 0);

  return (
    <Card className="flex flex-col bg-card w-1/3 border shadow-sm pt-6 rounded-xl ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Coupon Summary</CardTitle>
        <CardDescription>Active vs Scanned</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer className="mx-auto aspect-square max-h-[250px] ">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              labelLine={false}
            />
            {/* Center text overlay */}
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-foreground text-2xl font-bold"
            >
              {totalGeneratedCoupons.toLocaleString()}
            </text>
            <text
              x="50%"
              y="65%"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted-foreground text-xm"
            >
              Total Coupons
            </text>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
      

        <div className="flex justify-center gap-3 mb-10 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[var(--chart-1)]"></div>
            Active {activeCoupons}
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[var(--chart-2)]"></div>
            Scanned {scannedCoupons}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
