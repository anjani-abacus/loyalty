import client from "../../axiosInstance";
import { GET_ALL_CATEGORY, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY_STATUS } from "../../endPoints";

// Fetch all categories
export const getAllCategoryApi = async (payload) => {
  const { data } = await client.post(GET_ALL_CATEGORY, payload);
  return data;
};

// Update category
export const updateCategoryApi = async ({id, ...payload}) => {
  console.log(id)
  const { data } = await client.put(UPDATE_CATEGORY(id), payload);
  return data;
};

// Create category
export const createCategoryApi = async (payload) => {
  const { data } = await client.post(CREATE_CATEGORY, payload);
  return data;
};

// for status update 

export const updateCategoryStatusApi = async ({ id, status }) => {
  const { data } = await client.put(UPDATE_CATEGORY_STATUS(id), { status });
  return data;
};

// Delete category
export const deleteCategoryApi = async (id) => {
  const { data } = await client.delete(DELETE_CATEGORY(id));
  return data;
};