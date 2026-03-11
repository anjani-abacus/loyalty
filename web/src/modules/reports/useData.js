import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchStreak } from "../../reactQuery/services/influencers/streakApi";
import { fetchCategoryWiseScanReport, fetchCouponHistoryReport, fetchInfluencerScanLogin, fetchMonthlyScanAging, fetchRedemptionReport, fetchScanPoint, fetchSevenDaysNotScannedReport, fetchStateKycStatus, fetchStateLoginAging, fetchUserBonusPointsReport, fetchUserScanReport } from "../../reactQuery/services/reports/reportsApi";

export const useStreak = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (payload)=> fetchStreak(payload)
  })
  return { fetchStreak:mutate, streakData:data?.data, error, isPending, isSuccess, reset }
};

export const useRedemptionReport = () => {
  return useQuery({queryKey: ["redemption"], queryFn: fetchRedemptionReport, enabled: false});
};

export const useUserScanReport = () => {
  return useQuery({queryKey: ["user-scan"], queryFn: fetchUserScanReport, enabled: false});
};

export const useSevenDaysNotScannedReport = () => {
  return useQuery({queryKey: ["seven-days-not-scanned"], queryFn: fetchSevenDaysNotScannedReport, enabled: false});
};

export const useCouponHistoryReport = () => {
  return useQuery({queryKey: ["coupon-history"], queryFn: fetchCouponHistoryReport, enabled: false});
};

export const useCategoryWiseScanReport = () => {
  return useQuery({queryKey: ["category-wise-scan"], queryFn: fetchCategoryWiseScanReport, enabled: false});
};

export const useUserBonusPointsReport = () => {
  return useQuery({queryKey: ["user-bonus-point-report"], queryFn: fetchUserBonusPointsReport, enabled: false});
};

export const useMonthlyScanAgingReport = () => {
  return useQuery({queryKey: ["monthly-scan-aging-report"], queryFn: fetchMonthlyScanAging, enabled: false});
};

export const useInfluencerScanLoginReport = () => {
  return useQuery({queryKey: ["influencer-scan-login-report"], queryFn: fetchInfluencerScanLogin, enabled: false});
};

export const useStateKycStatusReport = () => {
  return useQuery({queryKey: ["state-kyc-status-report"], queryFn: fetchStateKycStatus, enabled: false});
};

export const useStateLoginAgingReport = () => {
  return useQuery({queryKey: ["state-login-aging-report"], queryFn: fetchStateLoginAging, enabled: false});
};

export const useScanPointReport = () => {
  return useQuery({queryKey: ["scan-point-report"], queryFn: fetchScanPoint, enabled: false});
};

// export const useCreateInfluencer = () =>
//   useMutation({
//     mutationFn: (payload) => createInfluencer(payload),
//   });

// export const useUpdateInfluencer = () =>
//   useMutation({
//     mutationFn: (payload) => updateInfluencer(payload),
//   });