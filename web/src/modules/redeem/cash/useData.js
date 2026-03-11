import { useMutation } from "@tanstack/react-query";
import { fetchRedeemRequestList } from "../../../reactQuery/services/giftGalary/giftGalaryApi";

export const useRedeemRequest = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset
   } = useMutation({
    mutationFn: (params) => fetchRedeemRequestList(params),
  });


  // const tabListData = data?.TabList?.map((tab) => ({
  //   key: tab.key,
  //   count: tab.count,
  // })) || [];

  return {
    redeemRequestData: data?.data || [],
  totalCount:data?.count, 
 
  tabListData: data?.TabList?.map(item => ({  key: item.key.toUpperCase(),  count: item.count || 0
  })) || [
    { key: "PENDING", count: 0 }, 
    { key: "APPROVED", count: 0 },
    { key: "REJECT", count: 0 },
  ],
    error, isPending, isSuccess, reset ,
    fetchRequestListData: mutate,
    mutateAsync }
  };