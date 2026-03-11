// import { useMutation, useQuery } from "@tanstack/react-query";
// import { fetchBadgeList } from "../../../reactQuery/services/bonusPoints/bonusPointsApi"


// export const useBadgeList = () => {
//  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
//     mutationFn: (params) => fetchBadgeList(params)
//   })

//   return { badgeListData: data?.data,  total:data?.count, tabListData: [{key:'Active', totalActive:data?.totalActive}, {key:'InActive', totalInactive:data?.totalInactive}], fetchBadgeData:mutate, mutateAsync, error, isPending, isSuccess, reset }
// }

import { useMutation } from "@tanstack/react-query";
import { fetchBadgeList, updateBadgeStatus ,createBadge, fetchAssignedInfluencer,} from "../../../reactQuery/services/bonusPoints/bonusPointsApi";

export const useBadgeList = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (params) => fetchBadgeList(params),
  });

  return {
    badgeListData: data?.data || [],
    total: data?.count || 0,
    tabListData: [
      { key: "Active", count: data?.totalActive || 0 },
      { key: "InActive", count: data?.totalInactive || 0 },
    ],
    fetchBadgeData: mutate,
    mutateAsync,
    error,
    isPending,
    isSuccess,
    reset,
  };
};

export const useUpdateBadgeStatus =()=>{
  return useMutation({
      mutationFn: ({id , payload}) => updateBadgeStatus(id ,payload)
  })
}

// export const useCreate = () => {
//   const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
//     mutationFn: (params) => fetchBadgeList(params),
//   });

//   return {
//     badgeListData: data?.data || [],
//     total: data?.count || 0,
//     tabListData: [
//       { key: "Active", count: data?.totalActive || 0 },
//       { key: "InActive", count: data?.totalInactive || 0 },
//     ],
//     fetchBadgeData: mutate,
//     mutateAsync,
//     error,
//     isPending,
//     isSuccess,
//     reset,
//   };
// };


export const useCreate = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (payload) => createBadge(payload),
  });

  return { mutate, mutateAsync, data, error, isPending, isSuccess, reset };
};

export const useAssignedInfluencerBadge = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (payload) => fetchAssignedInfluencer(payload),
  });

  return { mutate, mutateAsync, data:data?.data, error, isPending, isSuccess, reset };
};