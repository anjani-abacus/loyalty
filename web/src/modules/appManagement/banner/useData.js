

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBannerApi,
  updateBannerApi,
  getBannerByIdApi,
  getBannerListApi,
  deleteBannerApi,
} from "../../../reactQuery/services/aboutUs/aboutApi";

// Query Keys (keep naming consistent across app)
const BANNER_KEYS = {
  all: ["banners"],
  single: (id) => ["banner", id],
};

// // 🪝 Create Banner
// export const useCreateBanner = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: createBannerApi,
//     onSuccess: (res) => {
//       queryClient.invalidateQueries(BANNER_KEYS.all);
//       console.log("✅ Banner created:", res?.data?.message || "Success");
//     },
//     onError: (err) => {
//       console.error("❌ Create failed:", err.response?.data || err.message);
//     },
//   });
// };

// // 🪝 Update Banner
// export const useUpdateBanner = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({ id, data }) => updateBannerApi(id, data),
//     onSuccess: (res) => {
//       queryClient.invalidateQueries(BANNER_KEYS.all);
//       queryClient.invalidateQueries(BANNER_KEYS.single(res?.data?.data?.id));
//       console.log("✅ Banner updated:", res?.data?.message || "Updated");
//     },
//     onError: (err) => {
//       console.error("❌ Update failed:", err.response?.data || err.message);
//     },
//   });
// };

export const useCreateBanner = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => createBannerApi(payload),
    onSuccess: () => {
      // returning promise keeps mutation pending until invalidation completes
      return queryClient.invalidateQueries({ queryKey: BANNER_KEYS?.all ?? ["banner"] });
    },
  });

  return {
    createBanner: mutation.mutateAsync,
    isLoading: mutation.isLoading ?? mutation.isPending ?? false,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};

export const useUpdateBanner = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }) => updateBannerApi(id, data),
    onSuccess: (res) => {
      // invalidate list + single item (if you keep single-item keys)
      const listKey = BANNER_KEYS?.all ?? ["banner"];
      const singleKey = (id) => BANNER_KEYS?.single?.(id) ?? ["banner", id];
      // return combined promise (ensure this resolves before mutation considered finished)
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: listKey }),
        // no harm if singleKey uses a function; keep it optional
        // queryClient.invalidateQueries({ queryKey: singleKey(res?.data?.data?.id) })
      ]);
    },
  });

  return {
    updateBanner: mutation.mutateAsync,
    isLoading: mutation.isLoading ?? mutation.isPending ?? false,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};

// 🪝 Get Banner By ID
export const useGetBannerById = (id, enabled = true) =>
  useQuery({
    queryKey: BANNER_KEYS.single(id),
    queryFn: () => getBannerByIdApi(id).then((res) => res.data.data),
    enabled: !!id && enabled,
  });

// 🪝 Get Banner List
export const useBannerList = () =>
  useQuery({
    queryKey: BANNER_KEYS.all,
    queryFn: () => getBannerListApi().then((res) => res.data.data),
    refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  });

// 🪝 Delete Banner
export const useDeleteBanner = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBannerApi,
    onSuccess: () => {
      queryClient.invalidateQueries(BANNER_KEYS.all);
      console.log("🗑️ Banner deleted successfully");
    },
    onError: (err) => {
      console.error("❌ Delete failed:", err.response?.data || err.message);
    },
  });
};
