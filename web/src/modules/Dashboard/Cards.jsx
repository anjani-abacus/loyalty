

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CreditCard, Gift, Tickets, Users } from "lucide-react";
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts";

const RECOLORS = [ "#00cc94" ,"#d1d5db" ]; 

export function InfluencerCard({ total = 0, active = 0, inactive = 0 }) {
  const sold = active;
  const remaining = inactive; 
  const percentage = total > 0 ? ((sold / total) * 100).toFixed(1) : 0;

  const data = [
    { name: "Active", value: sold },
    { name: "Inactive", value: remaining },
  ];

  return (
    <Card className="bg-card border shadow-sm hover:shadow-md transition-all p-1">
      <CardHeader className="flex flex-row items-center gap-3 pb-1 space-y-0">
<div className="bg-background hover:bg-section-background p-3 flex items-center justify-center rounded-2xl shadow-xl">
        <Users className="h-5 w-5 text-foreground  -mt-1" />
        </div>
        <div className="flex items-center flex-col justify-center">
        <CardTitle className="text-sm font-semibold text-muted-foreground">Total Influencers </CardTitle>
         <div className="text-3xl font-bold text-foreground -ml-13" >{total}</div>
  </div>
        <div className="relative w-20 h-20  flex ml-auto ">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={24}
                outerRadius={30}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={RECOLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-foreground">{percentage}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground ">
          <span className="status-card status-active  font-semibold">Active: {active}</span>
          <span className="status-card status-inactive font-semibold">Inactive: {inactive}</span>
        </div>
      </CardContent>
    </Card>
  );
}




const COLORS = [ "#facc15","#d1d5db",]

export function RedeemCard({ total = 0, pending = 0 }) {
  const completed = total - pending;
  const percentage = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <Card className="bg-card border shadow-sm hover:shadow-md transition-all p-1">
      <CardHeader className="flex flex-row items-center gap-3 pb-1 space-y-0 w-full">
        {/* Label and total count */}
         <div className="bg-background hover:bg-section-background p-3 flex items-center justify-center rounded-2xl shadow-xl">
        <Gift className="h-5 w-5 text-foreground  -mt-1" />
        </div>
        <div className="flex  flex-col justify-center">
          <CardTitle className="text-sm font-semibold text-muted-foreground ">
            Redeem Requests
          </CardTitle>
          <div className="text-3xl font-bold text-foreground">{total}</div>
        </div>

        {/* Pie chart */}
        <div className="relative w-20 h-20 ml-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={24}
                outerRadius={30}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-foreground">{percentage}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className="status-card status-completed  font-semibold">Completed: {completed}</span>
          <span className="status-card status-pending-blue font-semibold">Pending: {pending}</span>
        </div>
      </CardContent>
    </Card>
  );
}
 



export function TicketSection({ total = 0, pending = 0 }) {
  const completed = total - pending;
  const percentage = total > 0 ? ((completed / total) * 100).toFixed(1) : 0;

  const data = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  return (
    <Card className="bg-card border shadow-sm hover:shadow-md transition-all p-1">
      <CardHeader className="flex flex-row items-center gap-3 pb-1 space-y-0 w-full">
        {/* Label and total count */}
        <div className="bg-background hover:bg-section-background p-3 flex items-center justify-center rounded-2xl shadow-xl">
        <Tickets className="h-5 w-5 text-foreground  -mt-1" />
        </div>
        <div className="flex flex-col">
        
          <CardTitle className="text-sm font-semibold text-muted-foreground">
           Ticket Requests
          </CardTitle>
          <div className="text-3xl font-bold text-foreground">{total}</div>
        </div>

        {/* Pie chart */}
        <div className="relative w-20 h-20 ml-auto">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={24}
                outerRadius={30}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-foreground">{percentage}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className="status-card status-closed font-semibold">Closed: {completed}</span>
          <span className="status-card status-pending-orange font-semibold">Pending: {pending}</span>
        </div>
      </CardContent>
    </Card>
  );
}





