
import { useMutation } from "@tanstack/react-query";
import { fetchReferralPointsApi, updateReferralPointsApi } from "../../../reactQuery/services/pointCategoryList/pointCategorylistApi";

// Fetch Category list
export const useUpdate = () => {
    return useMutation({
        mutationKey: ["updatePointCategory"],
        mutationFn: (data) => updateReferralPointsApi(data),
    });
};

export const usePointMasterDetail = () => {
    return useMutation({
        mutationKey: ["pointMasterDetail"],
        mutationFn: (data) => fetchReferralPointsApi(data),
    });
}