
export const useCreateGift = () =>
  useMutation({
    mutationFn: (payload) => createGift(payload),
  });

export const useUpdateInfluencer = () =>({})

import { useMutation } from "@tanstack/react-query";
import { createGift, fetchGiftList, updateGiftStatus } from "../../reactQuery/services/giftGalary/giftGalaryApi";

export const useGiftList = () => {
  const {
    mutate,        
    mutateAsync,   
    data,
    error,
    isPending,
    isSuccess,
    reset,
  } = useMutation({
    mutationFn: (params) => fetchGiftList(params),
  });

  return {
    giftListData: data?.data || [],
      total: data?.count || 0,
      tabListData: [
       { key: "GIFT", count: data?.totalGift ?? 0 },
      //  { key: "CASH", count: data?.totalCash ?? 0 },
     ],
    mutate,
    mutateAsync,
    error,
    isPending,
    isSuccess,
    reset,
  };
};

export const useUpdateGiftStatus = () =>
  useMutation({
    
    mutationFn: ({ id, payload }) => updateGiftStatus(id, payload),
  });

  