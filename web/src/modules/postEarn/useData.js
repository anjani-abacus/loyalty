import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchPostEarn } from "../../reactQuery/services/influencers/postEarnApi";

export const usePostEarn = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (payload)=> fetchPostEarn(payload)
  })

  return { fetchPostEarn:mutate, streakData:data?.data, error, total:data?.count, isPending, isSuccess, reset }
};