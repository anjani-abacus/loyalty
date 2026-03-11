
import { useMutation } from "@tanstack/react-query";
import { getAllCategoryApi, updateCategoryApi, deleteCategoryApi ,updateCategoryStatusApi, createCategoryApi } from "../../../reactQuery/services/category/categoryApi";

// Fetch Category list
export const useCategory = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({ mutationFn: (params) => getAllCategoryApi(params) });

  return { 
    categoryData: data?.category || [], total: data?.count || 0, 
    tabListData: [
      { key: "Active", count: data?.totalActive ?? 0 },
       { key: "InActive", count: data?.totalInactive ?? 0 }], fetchCategoryData: mutate, fetchCategoryAsync: mutateAsync, error, isPending, isSuccess, reset };
};

// Update Category
export const useUpdateCategory = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({ mutationFn: (payload) => updateCategoryApi(payload) });
  return { updateCategory: mutate, updateCategoryAsync: mutateAsync, updateData: data, updateError: error, isPending, isSuccess, reset };
};

// update category for status
export const useUpdateCategoryStatus = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } =
    useMutation({ mutationFn: ({ id, status }) => updateCategoryStatusApi({ id, status }) });

      return {
    updateStatus: mutate,
    updateStatusAsync: mutateAsync,
    updateStatusData: data,
    updateStatusError: error,
    isPending,
    isSuccess,
    reset,
  };
}

//  Delete Category
export const useDeleteCategory = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = 
  useMutation({ mutationFn: (id) => deleteCategoryApi(id) });
  return { deleteCategory: mutate, deleteCategoryAsync: mutateAsync, deleteData: data, deleteError: error, isPending, isSuccess, reset };
};

export const useCreateCategory = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({ mutationFn: (payload) => createCategoryApi(payload) });
  return { createCategory: mutate, createCategoryAsync: mutateAsync, createData: data, createError: error, isPending, isSuccess, reset };
};