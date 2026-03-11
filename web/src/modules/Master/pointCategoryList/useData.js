
import { useMutation } from "@tanstack/react-query";
import { getAllCategoryApi, updateCategoryApi, deleteCategoryApi ,updateCategoryStatusApi, createCategoryApi } from "../../../reactQuery/services/category/categoryApi";
import { createPointCategoryApi, deletePointCategoryApi, fetchPointCategoryApi, updatePointCategoryApi } from "../../../reactQuery/services/pointCategoryList/pointCategorylistApi";

// Fetch Category list
export const usePointCategory = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({ mutationFn: (params) => fetchPointCategoryApi(params) });

  return { 
    pointCategoryData: data?.data || [], total: data?.count || 0, 
     fetchPointCategoryData: mutate, fetchPointCategoryAsync: mutateAsync, error, isPending, isSuccess, reset };
};

// Update Category
export const useUpdatePointCategory = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({ mutationFn: (payload) => updatePointCategoryApi(payload) });
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
  useMutation({ mutationFn: (id) => deletePointCategoryApi(id) });
  return { deleteCategory: mutate, deleteCategoryAsync: mutateAsync, deleteData: data, deleteError: error, isPending, isSuccess, reset };
};

export const useCreatePointCategory = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({ mutationFn: (payload) => createPointCategoryApi(payload) });
  return { createPointCategory: mutate, createPointCategoryAsync: mutateAsync, createData: data, createError: error, isPending, isSuccess, reset };
};