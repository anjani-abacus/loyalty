import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchDistrictList, fetchStateList } from "./commonApi";

export const useStateList = () => {
    return useQuery({
        queryKey: ['stateList'],
        queryFn: () => fetchStateList(),
        staleTime: 0,          // Never consider data fresh
        cacheTime: 0,          // Don’t keep cached data
        refetchOnMount: true,  // Always refetch on mount
        refetchOnWindowFocus: true, // Refetch if window focused
    });
}

export const useDistrictList = () => {
    return useMutation({
        mutationFn: (payload) => fetchDistrictList(payload),
        staleTime: 0,          // Never consider data fresh
        cacheTime: 0,          // Don’t keep cached data
        refetchOnMount: true,  // Always refetch on mount
        refetchOnWindowFocus: true, // Refetch if window focused
    });
}