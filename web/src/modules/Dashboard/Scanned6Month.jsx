// // ScanVsGeneratedChart.jsx
// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { use6MonthScanGenerated } from "./useData";

// const ScanVsGeneratedChart = () => {
//   const { monthlyData, isLoading } = use6MonthScanGenerated();

//   if (isLoading) return <div>Loading chart...</div>;

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>Last 6 Months: Scanned vs Generated</CardTitle>
//       </CardHeader>
//       <CardContent className="h-[300px]">
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={monthlyData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="generated" name="Generated" fill="#4ade80" radius={[6, 6, 0, 0]} />
//             <Bar dataKey="scanned" name="Scanned" fill="#9ca3af" radius={[6, 6, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default ScanVsGeneratedChart;

"use client"

import React from "react"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { use6MonthScanGenerated } from "./useData" 

export default function ScanVsGeneratedLineChart() {
    const { monthlyData, isLoading, isError } = use6MonthScanGenerated()

    if (isLoading) return <div>Loading chart...</div>
    if (isError) return <div>Failed to load chart data.</div>

    const chartConfig = {
        generated: { label: "Generated", color: "#4ade80" }, 
        scanned: { label: "Scanned", color: "#6366F1" }, 
    }

    const formattedData = (monthlyData || []).map((item) => ({
        month: item.month,
        scanned: Number(item.scanned) || 0,
        generated: Number(item.generated) || 0,
    }))

    console.log("mon==>", monthlyData);
    console.log("for==>", formattedData);


    return (
        <Card className="w-2/3 bg-card h-max-50">
            <CardHeader>
                <CardTitle>Last 6 Months - Scanned vs Generated</CardTitle>
                <CardDescription>Performance trend across last six months</CardDescription>
            </CardHeader>

            <CardContent>
                <ChartContainer config={chartConfig} className="h-[270px] w-full">
                    <LineChart
                        accessibilityLayer
                        data={formattedData}

                        margin={{ left: 6, right: 18, bottom: 1, top: 18 }}
                    >
                        <CartesianGrid vertical={false} strokeDasharray="3 0" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.split("-")[0]} // Show "Jun" etc.
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickCount={6}
                            domain={[0, (dataMax) => Math.ceil(dataMax * 1.1)]} 
                            interval="preserveStartEnd"
                        />
                        
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

                        <Line
                            dataKey="generated"
                            name="Generated"
                            type="monotone"
                            stroke="#4ade80"
                            strokeWidth={2}
                            dot={true}
                        />
                        <Line
                            dataKey="scanned"
                            name="Scanned"
                            type="natural"
                            stroke="#6366F1"
                            strokeWidth={2}
                            dot={true}
                        />

                    </LineChart>
                </ChartContainer>
            </CardContent>


        </Card>
    )
}
