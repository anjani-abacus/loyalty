import { useMutation } from "@tanstack/react-query";
import { getAllSubCategoryApi, updateSubCategoryApi, deleteSubCategoryApi, createSubCategoryApi, updateSubCategoryStatusApi } from "../../../reactQuery/services/subCategory/subCategoryApi";

export const useSubCategory = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (params) => getAllSubCategoryApi(params),
  });

  return {
    subCategoryData: data?.data || [],
    total: data?.count || 0,
    tabListData: [
      { key: "Active", count: data?.totalActive ?? 0 },
      { key: "InActive", count: data?.totalInactive ?? 0 },
    ],
    fetchSubCategoryData: mutate,
    fetchSubCategoryDataAsync: mutateAsync,
    error,
    isPending,
    isSuccess,
    reset,
  };
};

export const useCreateSubCategory = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({ mutationFn: (payload) => createSubCategoryApi(payload) });
  return { createSubCategory: mutate, createSubCategoryAsync: mutateAsync, createData: data, createError: error, isPending, isSuccess, reset };
};


export const useUpdateSubCategory = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (payload) => updateSubCategoryApi(payload),
  });

  return {
    updateSubCategory: mutate,
    updateSubCategoryAsync: mutateAsync,
    updateData: data,
    updateError: error,
    isPending,
    isSuccess,
    reset,
  };
};


export const useUpdateSubCategoryStatus = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: ({ id, status }) => updateSubCategoryStatusApi({ id, status }),
  });

  return {
    updateStatus: mutate,
    updateStatusAsync: mutateAsync,
    updateStatusData: data,
    updateStatusError: error,
    isPending,
    isSuccess,
    reset,
  };
};


  export const useDeleteSubCategory = () => {
    const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
      mutationFn: (id) => deleteSubCategoryApi(id),
    });

    return { deleteSubCategory: mutate, deleteSubCategoryAsync: mutateAsync, deleteData: data, deleteError: error, isPending, isSuccess, reset };
  };
