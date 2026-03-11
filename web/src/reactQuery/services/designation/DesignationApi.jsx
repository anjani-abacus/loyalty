import client from "../../axiosInstance";
import {
  GET_ALL_DESIGNATION_ROLE,
  GET_ALL_MODULE,
  CREATE_ROLE_DESIGNATION,
  UPDATE_ROLE_DESIGNATION,
  GET_ALL_ASSIGN_DESIGNATION_MODULE,
  GET_MODULE_BY_DESIGNATION,
  UPDATE_MODULE_BY_DESIGNATION,
} from "../../endPoints";

/**
 * Fetch all modules
 */
export const getAllModuleApi = async (payload) => {
  const { data } = await client.post(GET_ALL_MODULE, payload || {});
  return data;
};




/**
 * Create a role designation
 */
export const createRoleDesignationApi = async (body) => {
  const { data } = await client.post(CREATE_ROLE_DESIGNATION, body);
  return data;
};

/**
 * Fetch all designation roles
 */
// export const getAllDesignationRoleApi = async (payload) => {
//   const { data } = await client.post(GET_ALL_DESIGNATION_ROLE, payload);
//   return data;
// };

export const getAllDesignationRoleApi = async (payload = {}) => {
  const { data } = await client.post(GET_ALL_DESIGNATION_ROLE, payload);
  return data;
};

/**
 * Update role designation
 */


export const updateRoleDesignationApi = async ({ id, modules }) => {
  const { data } = await client.put(UPDATE_ROLE_DESIGNATION(id), modules);
  return data;
};

/**
 * Fetch all assigned designation modules
 */
export const getAllAssignDesignationModuleApi = async (payload) => {
  const { data } = await client.post(GET_ALL_ASSIGN_DESIGNATION_MODULE, payload || {});
  return data;
};

export const getModulesByDesignationIdApi = async (payload) => {
  
  const { data } = await client.post(GET_MODULE_BY_DESIGNATION(payload), {id:payload});
  return data;
};


export const updateModuleByDesignationApi = async (payload) => {
  const { data } = await client.put(UPDATE_MODULE_BY_DESIGNATION(payload), {id:payload});
  return data;
};