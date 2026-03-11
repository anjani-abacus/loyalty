import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFaqListApi, createFaqApi, editFaqApi, deleteFaqApi  ,fetchUserListApi,} from "../../../reactQuery/services/aboutUs/aboutApi";

// Get FAQ list
export const useFaqList = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: getFaqListApi,
  });
};

// // Create FAQ
// export const useCreateFaq = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createFaqApi,
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["faqs"] }),
//   });
// };

// // Edit FAQ
// export const useEditFaq = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ id, faq }) => editFaqApi(id, faq),
//     onSuccess: () => queryClient.invalidateQueries({ queryKey: ["faqs"] }),
//   });
// };


export const useCreateFaq = () => {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload) => createFaqApi(payload),
    onSuccess: () => {

      return qc.invalidateQueries({ queryKey: ["faqs"] });
    },
  });

  return {
    createFaq: mutation.mutateAsync, 
    isLoading: mutation.isLoading ?? mutation.isPending ?? false,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};

export const useEditFaq = () => {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, faq }) => editFaqApi(id, faq),
    onSuccess: () => {
      return qc.invalidateQueries({ queryKey: ["faqs"] });
    },
  });

  return {
    editFaq: mutation.mutateAsync,
    isLoading: mutation.isLoading ?? mutation.isPending ?? false,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};

// Delete FAQ
export const useDeleteFaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFaqApi,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["faqs"] }),
  });
};


export const useUserList = () => {
  return useQuery({
    queryKey: ["userList"],
    queryFn: fetchUserListApi,
    select: (res) => {
      const list = res?.data || [];
      return list.map((item) => ({
        value: item.user_type,
        label:
          item.user_type === "INFLUENCER"
            ? "Influencer"
            : item.user_type === "SALE_USER"
            ? "Sales User"
            : "All",
      }));
    },
  });
};