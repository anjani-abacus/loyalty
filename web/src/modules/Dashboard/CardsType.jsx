// InfluencerTypeCard.jsx

import React from "react";
import { Card, CardHeader, CardTitle, CardContent ,CardDescription} from "@/components/ui/card";
import { PieChart, Pie, Cell, Label, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444", "#a855f7"];

export default function InfluencerTypeCard({ title, data , description  }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  return (
   

   
    <Card className="bg-card border shadow-sm  rounded-2xl hover:shadow-md transition-all">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center flex-col">
        <div className="h-40 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                stroke="none"
                paddingAngle={4}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <Label
                  value={total}
                  position="center"
                  style={{ fontSize: "20px", fontWeight: "bold", fill: "var(--foreground)" }}
                />
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-13 mt-6 text-sm">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <span
                className="w-3 h-3 rounded-full mb-1"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              ></span>
              <span className="font-medium text-muted-foreground">{item.type}</span>
              <span className="font-semibold text-foreground">{item.count}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
   
  );
}
