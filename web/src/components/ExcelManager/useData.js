import { useMutation, useQuery } from "@tanstack/react-query";
import { downloadCsvFileApi, getSampleFileApi, uploadCsvFileApi } from "../../reactQuery/services/excelManagerApi/excelManagerApi";
import axios from "axios";

export const useUploadCouponDataMutation = () => [()=>{}, { isLoading:false }];
export const useDownLoadDataMutation = () => [()=>{}, { isLoading:false }];

export const useGetSampleFile = () => {
  const { isLoading, refetch, data, isFetching } = useQuery({
    queryKey: ['getSampleFile'],
    queryFn: getSampleFileApi,
    enabled: false,
  });
  return { isLoading, refetch, data, isFetching };
};

export const useUploadCsvFile = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (payload) => uploadCsvFileApi(payload),
  });

  return { mutate, mutateAsync, data, error, isPending, isSuccess, reset };
};

export const useDownloadFile = () => {
  return useMutation({
    mutationFn: (payload)=> downloadCsvFileApi(payload)
  });
};