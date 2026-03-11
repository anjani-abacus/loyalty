import {
  getAllModuleApi,
  createRoleDesignationApi,
  getAllDesignationRoleApi,
  updateRoleDesignationApi,
  getAllAssignDesignationModuleApi,
  getModulesByDesignationIdApi,
  updateModuleByDesignationApi,
} from "../../../reactQuery/services/designation/DesignationApi";

import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Get all modules (POST)
 */
export const useGetAllModule = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } =
    useMutation({
      mutationFn: (payload) => getAllModuleApi(payload),
    });

  return {
    moduleData: data?.data || [],
    total: data?.count || 0,
    fetchModules: mutate,
    fetchModulesAsync: mutateAsync,
    error,
    isPending,
    isSuccess,
    reset,
  };
};

/**
 * Create role designation
 */
export const useCreateRoleDesignation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRoleDesignationApi,
    onSuccess: () => {
      queryClient.invalidateQueries(["Roles"]);
    },
  });
};

/**
 * Get all designation roles (POST)
 */
export const useGetAllDesignationRole = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } =
    useMutation({
      mutationFn: (payload) => getAllDesignationRoleApi(payload),
    });

  return {
    roleData: data?.data || [],
    total: data?.count || 0,
    fetchRoles: mutate,
    fetchRolesAsync: mutateAsync,
    error,
    isPending,
    isSuccess,
    reset,
  };
};

export const useUpdateRoleDesignation = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } =
    useMutation({
      mutationFn: (payload) => updateRoleDesignationApi(payload),
    });

  return {
    response: data?.data || [],
    total: data?.count || 0,
    updateRoleDesignation: mutate,
    updateRoleDesignationAsync: mutateAsync,
    error,
    isPending,
    isSuccess,
    reset,
  };
};

/**
 * Update role designation
 */
// export const useUpdateRoleDesignation = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: updateRoleDesignationApi,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["Roles"]);
//     },
//   });
// };

/**
 * Get all assigned designation modules (POST)
 */
export const useGetAllAssignDesignationModule = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } =
    useMutation({
      mutationFn: (payload) => getAllAssignDesignationModuleApi(payload),
    });

  return {
    designationModuleData: data?.data || [],
    total: data?.count || 0,
    fetchDesignationModules: mutate,
    fetchDesignationModulesAsync: mutateAsync,
    error,
    isPending,
    isSuccess,
    reset,
  };
};

export const useGetModulesByDesignationId = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } =
    useMutation({
      mutationFn: (payload) => {
        
        return getModulesByDesignationIdApi(payload)},
    });

  return {
    moduleData: data?.getAll || [],
    total: data?.count || 0,
    fetchModulesById: mutate,
    fetchDesignationModulesAsync: mutateAsync,
    error,
    isPending,
    isSuccess,
    reset,
  };
};

export const useUpdateModulesByDesignationId = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } =
    useMutation({
      mutationFn: (payload) => updateModuleByDesignationApi(payload),
    });

  return {
    data: data?.data || [],
    updateModule: mutate,
    updateModulesAsync: mutateAsync,
    error,
    isPending,
    isSuccess,
    reset,
  };
};