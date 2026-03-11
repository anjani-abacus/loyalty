// import { useMutation ,useQueryClient ,useQuery} from "@tanstack/react-query";
// import { getAllPdfCatalogueApi ,deletePdfCatalogueApi} from "../../../reactQuery/services/pdf/pdfApi";


// export const usePdfCatalogue = () => {
//   const mutation = useMutation({
//     mutationFn: (payload) => getAllPdfCatalogueApi(payload),
//   });

//   return {
//     fetchPdfCatalogue: mutation.mutate, 
//     fetchPdfCatalogueAsync: mutation.mutateAsync,  
//     pdfCatalogueData: mutation.data?.data || [], 
//     count: mutation.data?.count || 0, 
//     message: mutation.data?.message || "",
//     isError: mutation.isError,
//      isLoading: mutation.isPending, 
//     error: mutation.error,
//     reset: mutation.reset,
//   };
// };


// export const useDeletePdfCatalogue = () => {
//   const queryClient = useQueryClient(); 

//   const mutation = useMutation({
//     mutationFn: (id) => deletePdfCatalogueApi(id),
//     onSuccess: () => {
      
//       queryClient.invalidateQueries(["PdfCatalogue"]);
//     },
//   });

//   return {
//     deletePdfCatalogue: mutation.mutate,
//     deletePdfCatalogueAsync: mutation.mutateAsync,
//     isDeleting: mutation.isLoading,
//     isError: mutation.isError,
//     error: mutation.error,
//     reset: mutation.reset,
//   };
// };
import { useMutation ,useQueryClient ,useQuery} from "@tanstack/react-query";
import { getAllPdfCatalogueApi ,deletePdfCatalogueApi ,createPdfCatalogueApi} from "../../../reactQuery/services/pdf/pdfApi";


export const usePdfCatalogue = () => {
  const mutation = useMutation({
    mutationFn: (payload) => getAllPdfCatalogueApi(payload),
  });

  return {
    fetchPdfCatalogue: mutation.mutate, 
    fetchPdfCatalogueAsync: mutation.mutateAsync,  
    pdfCatalogueData: mutation.data?.data || [], 
    count: mutation.data?.count || 0, 
    message: mutation.data?.message || "",
    isError: mutation.isError,
     isLoading: mutation.isPending, 
    error: mutation.error,
    reset: mutation.reset,
  };
};


export const useDeletePdfCatalogue = () => {
  const queryClient = useQueryClient(); 

  const mutation = useMutation({
    mutationFn: (id) => deletePdfCatalogueApi(id),
    onSuccess: () => {
      
      queryClient.invalidateQueries(["PdfCatalogue"]);
    },
  });

  return {
    deletePdfCatalogue: mutation.mutate,
    deletePdfCatalogueAsync: mutation.mutateAsync,
    isDeleting: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};


export const useCreatePdfCatalogue = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (payload) => createPdfCatalogueApi(payload),
    onSuccess: () => {
      return queryClient.invalidateQueries(["PdfCatalogue"]);
    },
  });
  const mutationLoading = mutation.isLoading ?? mutation.isPending ?? false;
  const mutationPending = mutation.isPending ?? mutation.isLoading ?? false;
  return {
    createPdf: mutation.mutateAsync,
    isLoading: mutationLoading,
    isPending: mutationPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
};


// export const useGeneratePdf = () => {
//   const mutation = useMutation({
//     mutationFn: (payload) => 

//   }); 
//   return {
//     generatePdf: mutation.mutate,
//     generatePdfAsync: mutation.mutateAsync,
//     isGenerating: mutation.isLoading,   
//     isError: mutation.isError,
//     error: mutation.error,
//     reset: mutation.reset,
//   };
// }