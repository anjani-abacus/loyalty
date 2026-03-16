
import {fetchBonusList, updateBonusStatus, createBonusPoints, updateBonusPoints } from "../../../reactQuery/services/bonusPoints/bonusPointsApi";
import { useMutation } from "@tanstack/react-query";

export const useBonusPoints = () => {
   const { mutate, mutateAsync, data, error, isPending, isSuccess, reset ,onSuccess } = useMutation({
    mutationFn: (params) => fetchBonusList(params)
  

  })
  return {bonusPointsData: data?.data, 
    tabListData:[ 
    { key: "Active", count: data?.totalActive || 0 },
      { key: "InActive", count: data?.totalInactive || 0 } ],

        fetchBonusData:mutate,
        mutateAsync
        , error,
        isLoading: isPending,
        isPending,
        isSuccess,
        onSuccess,
        reset }

  // return {  tabListData: [{key:'Active', count:10}, {key:'InActive', count:20}], isLoading, refetch, isFetching };
};


export const useUpdateBonusStatus = () => {
 return  useMutation({

    mutationFn: ({id ,payload}) => updateBonusStatus(id ,payload)
  })

} 

export const useCreateBonusPoints = () =>
  useMutation({
    mutationFn: (payload) => createBonusPoints(payload),
  });

export const useUpdateBonusPoints = () =>
  useMutation({
    mutationFn: (payload) => updateBonusPoints(payload),
  });

