"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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

export const description = "A pie chart with a label list";

const chartConfig = {
    slab: {
        label: "Slab",
    },
    chrome: {
        label: "Chrome",
        color: "var(--chart-1)",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "Firefox",
        color: "var(--chart-3)",
    },
    edge: {
        label: "Edge",
        color: "var(--chart-4)",
    },
    other: {
        label: "Other",
        color: "var(--chart-5)",
    },
};

export function ChartPieLabelList({ slabList }) {

    const chartData = slabList?.map((value, i) => ({
        browser: String(value),
        slab: 1,
        fill: i % 2 ? "#7b56cc" : "#c1a6ff",
    }));


    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>SPIN - WHEEL</CardTitle>
            </CardHeader>

            <CardContent className="flex-1 pb-0">
               
                <div className="bg-[url('/assets/pupleBust.jpg')] rounded-2xl bg-cover bg-center aspect-square max-h-[360px]">
                    <ChartContainer
                        config={chartConfig}
                        className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[360px]"
                    >
                        <PieChart className="spin-wheel">
                            <Pie data={chartData} stroke="#999"
                                strokeWidth={1} dataKey="slab">
                                <LabelList
                                    dataKey="browser"
                                    className="fill-background"
                                    stroke="none"
                                    fontSize={12}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    );
}
