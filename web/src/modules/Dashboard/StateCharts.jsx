// import React from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { useInfluencerStateWise } from "./useData";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   LabelList
// } from "recharts";

// export default function InfluencerStateChart() {
//   const { stateData, isLoading } = useInfluencerStateWise();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     // <Card className="bg-card border shadow-sm p-4 rounded-xl">
//     //   <CardHeader>
//     //     <CardTitle className="text-lg font-semibold">Influencers by State</CardTitle>
//     //   </CardHeader>
//     //   <CardContent className="h-80">
//     //     <ResponsiveContainer width="100%" height="100%">
//     //       <BarChart
//     //        data={stateData} 
//     //       margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
//     //         <CartesianGrid strokeDasharray="0 10" vertical={false} />
//     //         <XAxis dataKey="state" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" />
//     //         <YAxis />
//     //         <Tooltip />
//     //         <Bar dataKey="total_influencers" fill="#6366f1">
//     //           <LabelList dataKey="total_influencers" position="top" />
//     //         </Bar>
//     //       </BarChart>
//     //     </ResponsiveContainer>
//     //   </CardContent>
//     // </Card>
//     <Card className="bg-card border shadow-sm p-4 rounded-xl  w-2/3">
//   <CardHeader>
//     <CardTitle className="text-lg font-semibold">Influencers by State</CardTitle>
//   </CardHeader>
//   <CardContent className="h-80 flex">
//     {/* Set width to 50% */}
//     <div className="w-full">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           data={stateData}
//           margin={{ top: 20, right: 20, left: 0, bottom: 20 }}

//         >
//           <CartesianGrid strokeDasharray="0 10" vertical={false} />
//           <XAxis 
//             dataKey="state" 
//             tick={{ fontSize: 10 }} 
//             interval={0} 
//             angle={-30} 
//             textAnchor="end" 
//           />
//           <YAxis 
         
//           />
//           <Tooltip />
//           <Bar 
//             dataKey="total_influencers" 
//             fill="#6366f1" 
//             barSize={20} 
//           >
//             <LabelList dataKey="total_influencers" position="top" />
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   </CardContent>
// </Card>

//   );
// }



import React from "react";
import { useInfluencerStateWise } from "./useData";
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
import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";
import { ResponsiveContainer } from "recharts";

export default function InfluencerStateChart() {
  const { stateData, isLoading } = useInfluencerStateWise();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[40vh]">
        Loading...
      </div>
    );
  }
  
  // Build chart config dynamically
  const chartConfig = {};
  stateData.forEach((item) => {
    if (!chartConfig[item.state]) {
      chartConfig[item.state] = {
        label: item.state,
        color: "var(--chart-1)", 
      };
    }
  });
  
  return (
    <Card className="bg-card w-2/3 border shadow-sm p-4 rounded-xl flex flex-col gap-3 h-2/3"> 
      <CardHeader>
        <CardTitle>Influencers by State</CardTitle>
        <CardDescription>Total influencers per state</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px] sm:h-[400px] md:h-[390px] relative">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              accessibilityLayer 
              data={stateData} 
              margin={{ 
                top: 2, 
                right: 1, 
                left: 0, 
                
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="state"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                angle={-45}
                textAnchor="end"
                height={69}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="total_influencers"
                fill="#0066FF"
                radius={4}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// import React from "react";
// import { useInfluencerStateWise } from "./useData";


// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// import { BarChart, Bar, CartesianGrid, XAxis } from "recharts";

// export default function InfluencerStateChart() {
//   const { stateData, isLoading } = useInfluencerStateWise();

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         Loading...
//       </div>
//     );
//   }

//   // Build chart config dynamically
//   const chartConfig = {};
//   stateData.forEach((item) => {
//     if (!chartConfig[item.state]) {
//       chartConfig[item.state] = {
//         label: item.state,
//         color: "var(--chart-1)", 
//       };
//     }
//   });

  

//   return (
//     <Card className="bg-card border shadow-sm p-4 rounded-xl w-2/3 ">
//       <CardHeader>
//         <CardTitle>Influencers by State</CardTitle>
//         <CardDescription>Total influencers per state</CardDescription>
//       </CardHeader>
//       <CardContent className="h-90">
//         <ChartContainer config={chartConfig}>
//           <BarChart accessibilityLayer data={stateData} margin={{ top: 20, right: 20, left: 0, bottom: 30 }} >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="state"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Bar
//               dataKey="total_influencers"
//               className=""
//               // fill="#8EC5FF"
//               fill="#0066FF"
//               radius={4}
//             />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
      
//     </Card>
//   );
// }
