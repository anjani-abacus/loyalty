// // useAboutData.js
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import client from "../../../reactQuery/axiosInstance";
// import { GET_ABOUT_US, UPDATE_ABOUT_US } from "./endpoints";

// // Fetch About Us (only grab first company or specific id)
// export const useAboutData = (companyId = 1) => {
//   const queryClient = useQueryClient();

//   const { data, isLoading } = useQuery(["aboutData", companyId], async () => {
//     const res = await client.get(GET_ABOUT_US);
//     // pick the company by id
//     const company = res.data?.data?.find((c) => c.id === companyId);
//     return company
//       ? { description: company.about_us || "", logo: company.profile_img || "" }
//       : { description: "", logo: "" };
//   });

//   const mutation = useMutation(
//     (payload) => client.put(UPDATE_ABOUT_US(companyId), payload),
//     {
//       onSuccess: (res) => {
//         queryClient.invalidateQueries(["aboutData", companyId]);
//       },
//     }
//   );

//   const updateAboutData = (payload, { onSuccess, onError } = {}) => {
//     mutation.mutate(payload, { onSuccess, onError });
//   };

//   return { aboutData: data, isLoading, updateAboutData };
// };

// useData.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchContacts,
  updateContactApi,
  fetchAboutUs,
  updateAboutUsApi,
} from "../../../reactQuery/services/aboutUs/aboutApi";

// --- About Us Hook ---
export const useAboutData = (companyId = 1) => {
  const queryClient = useQueryClient();

  // ✅ v5-compatible useQuery
  const { data, isLoading } = useQuery({
    queryKey: ["aboutData", companyId],
    queryFn: () => fetchAboutUs(companyId),
  });

  // ✅ v5-compatible useMutation
  const mutation = useMutation({
    mutationFn: ({ companyId, payload }) => updateAboutUsApi(companyId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aboutData", companyId] });
    },
  });

  // ✅ wrap call for cleaner usage in components
  const updateAboutData = ({ payload, onSuccess, onError }) => {
    mutation.mutate({ companyId, payload, onSuccess, onError });
  };

  return { aboutData: data, isLoading, updateAboutData };
};






// --- Contact Hook ---
export const useContactData = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["contactData"], queryFn: fetchContacts });

  const mutation = useMutation({
    mutationFn: ({ id, payload }) => updateContactApi(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["contactData"] }),
  });

  const updateContactData = ({ id, payload, onSuccess, onError }) => {
    mutation.mutate({ id, payload }, { onSuccess, onError });
  };

  return { contactData: data, isLoading, updateContactData };
};