import { useMutation, useQuery } from "@tanstack/react-query";

import {  fetchCreateSpinSlab, fetchSpinList, updateSpinDetails, updateSpinStatus } from "../../../reactQuery/services/bonusPoints/bonusPointsApi";


export const useSpinWinList = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (params) => fetchSpinList(params)
  })
  return {spinListData:data?.data, 
    total:data?.count, tabListData: [{key:'Active', count:data?.totalActive}, {key:'InActive', count:data?.totalInactive}], fetchSpinWinData:mutate, mutateAsync, error, isPending, isSuccess, reset }
}

export const useUpdateSpinStatus = () => {
  return useMutation({
    mutationFn: ({ id, payload }) => updateSpinStatus(id, payload),
  });
};

export const useUpdateSpinDetails = () => {
  return useMutation({
    mutationFn: ({ id, payload }) => updateSpinDetails(id, payload),
  });
};

export const useCreateSpinSlab = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (params) => {
      // Call your API function to create a new influencer
      return fetchCreateSpinSlab(params);
    },
  });

  return { createSpinSlabData: data, error, isPending, isSuccess, mutate, mutateAsync, reset };
}

