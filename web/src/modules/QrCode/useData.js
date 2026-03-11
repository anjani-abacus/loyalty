import { useMutation, useQuery } from "@tanstack/react-query";
import { createQr, deleteQrCodeGrouped, fetchProductItemList, fetchProductSizeList, fetchQrCodeListGrouped, fetchQrCodeListTabWise } from "../../reactQuery/services/qrCode/qrCodeApi";

export const useQrGrouped = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (params) => fetchQrCodeListGrouped(params)
  })
  return {qrListData:data?.data, total:data?.count, tabListData: [{key:'Not Scanned Coupons', count:data?.totalActive}, {key:'Scanned Coupons', count:data?.totalInactive}], fetchQrListData:mutate, mutateAsync, error, isPending, isSuccess, reset }
}


export const useDeleteQrGrouped = () => {
  return useMutation({mutationFn: (params) => deleteQrCodeGrouped(params)})
}

export const useQrListTabWise = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (params) => fetchQrCodeListTabWise(params)
  })
  return {qrListData:data?.data, total:data?.count, tabListData: [{key:'Not Scanned Coupons', count:data?.totalActive}, {key:'Scanned Coupons', count:data?.totalInactive}], fetchQrListData:mutate, mutateAsync, error, isPending, isSuccess, reset }
}

export const useProductSize = () => {
  const { isLoading, refetch, data: productSizeData, isFetching } = useQuery({
    queryKey: ['productSizeList'],
    queryFn: () => fetchProductSizeList()
  })
  return { productSizeData: productSizeData?.data, isLoading, refetch, isFetching };
}

export const useProductItemList = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (payload) => fetchProductItemList(payload)
  })
  return {productItemData:data?.data, total:data?.count, tabListData: [{key:'Active', count:data?.totalActive}, {key:'InActive', count:data?.totalInactive}], fetchItemData:mutate, mutateAsync, error, isPending, isSuccess, reset }
  // return { productItemData: productItemData?.products, isLoading, refetch, isFetching };
}

export const useCreateQr = () =>
  useMutation({
    mutationFn: (payload) => createQr(payload),
  });