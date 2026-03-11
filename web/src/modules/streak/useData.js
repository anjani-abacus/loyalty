import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchStreak } from "../../reactQuery/services/influencers/streakApi";

export const useStreak = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (payload)=> fetchStreak(payload)
  })
  return { fetchStreak:mutate, streakData:data?.data, error, isPending, isSuccess, reset }
};

// export const useCreateInfluencer = () =>
//   useMutation({
//     mutationFn: (payload) => createInfluencer(payload),
//   });

// export const useUpdateInfluencer = () =>
//   useMutation({
//     mutationFn: (payload) => updateInfluencer(payload),
//   });