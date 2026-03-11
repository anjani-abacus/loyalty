// import React from "react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { useTopInfluencers } from "./useData";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Crown } from "lucide-react";

// export default function TopInfluencersCard() {
//   const { data: topInfluencers = [], isLoading } = useTopInfluencers();

//   if (isLoading) {
//     return (
//       <Card className="bg-card border shadow-sm p-4 rounded-xl">
//         <CardHeader>
//           <CardTitle>Top 30 Influencers</CardTitle>
//         </CardHeader>
//         <CardContent className="flex items-center justify-center h-48">
//           Loading...
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="bg-card border shadow-sm rounded-xl w-full lg:w-1/3">
//       <CardHeader className="pb-2 flex items-center justify-between">
//         <CardTitle className="text-lg font-semibold flex items-center gap-2">
//           <Crown className="h-5 w-5 text-yellow-500" />
//           Top 30 Influencers
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         <ScrollArea className="h-80 pr-3">
//           <ul className="divide-y divide-muted">
//             {topInfluencers.map((user, idx) => (
//               <li
//                 key={idx}
//                 className="flex justify-between items-center py-2 text-sm"
//               >
//                 <span className="font-medium text-foreground">
//                   {idx + 1}. {user.name}
//                 </span>
//                 <span className="font-semibold text-violet-600">
//                   ₹{user.current_wallet_balnc.toLocaleString()}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// }


import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Coin from "../../../public/Coin.svg";
import CoinGold from "../../../public/CoinGold.svg";
export default function TopInfluencersCard({ data = [] }) {
  return (
    <Card className="bg-card border shadow-sm rounded-xl w-1/3 lg:w-1/3">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top 30 Influencers</CardTitle>
      </CardHeader>
      <CardContent className="max-h-100  overflow-y-auto px-2">
        {data.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-6">
            No data available
          </div>
        ) : (
          <div className="divide-y">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 hover:bg-muted/30 rounded-md px-2 transition"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-foreground-card w-5 text-right">
                    {index + 1}.
                  </span>
                  <span className="text-sm font-medium text-muted-foreground truncate max-w-[130px]">
                    {item.name}
                  </span>
                </div>
                <span className="flex gap-2 text-sm font-semibold text-chart-2">
                  {item.current_wallet_balnc.toLocaleString()}
                  <span className=""><img src={CoinGold} alt="coin" width={16} height={16} /></span>
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
