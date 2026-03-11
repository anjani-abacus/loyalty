// import { useMutation, useQuery } from "@tanstack/react-query";
// import { totalScanCount,fetchRetailerData } from "../../reactQuery/services/dashboard/dashboardApi"


// export const useRetailerRewardData = () => {
//   const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
//     mutationFn: (params) => fetchRetailerData(params)
//   })
//   return {retailerData:data?.result, fetchRetailerData:mutate, mutateAsync, error, isPending, isSuccess, reset }
// }

// export const useTotalScanCount = () => {
//   const { isLoading, refetch, data: countData, isFetching } = useQuery({
//     queryKey: ['totalScanCount'],
//     queryFn: () => totalScanCount()
//   })
//   return { countData: countData?.result, isLoading, refetch, isFetching };
// }



import { useQuery } from "@tanstack/react-query";
import {
  fetch6MonthScanGenerated, fetchCouponScanGenerated,
  fetchGiftStatusCount,
  fetchInfluencerStateWise, fetchInfluencerStats, fetchRedeemStats, fetchTicketStats
} from "../../reactQuery/services/dashboard/dashboardApi";


export const useInfluencerStats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["influencerStats"],
    queryFn: fetchInfluencerStats,
    refetchOnWindowFocus: false,
  });

  const stats = data?.data || {};
  return {
    influencerData: stats,
    typeWise: stats.influencerTypeWiseCount || [],
    kycWise: stats.InfluencerKycStatusWise || [],
    profileWise: stats.influencerProfileStatus || [],
    top30: stats.Top30 || [],
    isLoading,
    isError,
    // refetch,
  };
};

export const useRedeemStats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["redeemStats"],
    queryFn: fetchRedeemStats,
    refetchOnWindowFocus: false,
  });

  const stats = data || {};

  return {
    redeemData: stats,
    pendingCount: stats.pendingRedeemReqCount || 0,
    totalCount: stats.redeemRequestCount || 0,

    isLoading,
    isError,
    // refetch,
  };
};
export const useTicketStats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ticketStats"],
    queryFn: fetchTicketStats,
    refetchOnWindowFocus: false,
  });

  const stats = data || {};

  return {
    redeemData: stats,
    pendingTicket: stats.openTickets || 0,
    totalTicket: stats.AllTickets || 0,
    closedTicket: stats.closedTickets || 0,
    isLoading,
    isError,
    // refetch,
  };
};


export const useInfluencerStateWise = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["influencerStateWise"],
    queryFn: fetchInfluencerStateWise,
    refetchOnWindowFocus: false,
  });

  return {
    stateData: data?.data || [],
    isLoading,
    isError,
  };
};


export const use6MonthScanGenerated = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sixMonthScanGenerated"],
    queryFn: fetch6MonthScanGenerated,
    refetchOnWindowFocus: false,
  });

  return {
    monthlyData: data?.data || [],
    isLoading,
    isError,
  };
};

export const useCouponScanGenerated = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["couponScanGenerated"],
    queryFn: fetchCouponScanGenerated,
    refetchOnWindowFocus: false,
  });

  return {
    couponData: data?.offerCoupondata || {},
    isLoading,
    isError,

  }
}



export const useGiftStats = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["giftStatusCount"],
    queryFn: fetchGiftStatusCount,
    refetchOnWindowFocus: false,
  });

  

 const raw = data?.data || {};


  const formattedData = [
    { type: "In Progress", count: raw.INPROGRESS || 0 },
    { type: "Shipped", count: raw.SHIPPED || 0 },
    { type: "Delivered", count: raw.DELIVERED || 0 },
  ];
const totalGift = formattedData.reduce((sum, x) => sum + x.count, 0);

  return {
    formattedData,
    totalGift,
    isLoading,
    isError,
  };
};
