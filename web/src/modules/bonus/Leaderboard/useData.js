import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchLeaderboardDistrictWise, fetchLeaderboardStateWise } from "../../../reactQuery/services/influencers/leaderboardApi";

export const useLeaderboardStateWise = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (payload)=> fetchLeaderboardStateWise(payload)
  })
  return {totalState:data?.count, fetchLeaderboardStateWise:mutate, leaderboardDataStateWise:data?.leaderboard?.entries, error, isPending, isSuccess, reset }
}

export const useLeaderboardDistrictWise = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (payload)=> fetchLeaderboardDistrictWise(payload)
  })
  return {totalDistrict:data?.count, fetchfetchLeaderboardDistrictWise:mutate, leaderboardDataDistrictWise:data?.leaderboard?.entries, error, isPending, isSuccess, reset }
}

// export const useCreateInfluencer = () =>
//   useMutation({
//     mutationFn: (payload) => createInfluencer(payload),
//   });

// export const useUpdateInfluencer = () =>
//   useMutation({
//     mutationFn: (payload) => updateInfluencer(payload),
//   });