import client from "../../axiosInstance";
import { CREATE_POINT_CATEGORY, CREATE_POINT_MASTER, DELETE_POINT_CATEGORY, GET_POINT_MASTER, POINT_CATEGORY_LIST, UPDATE_POINT_CATEGORY, UPDATE_POINT_MASTER } from "../../endPoints";

export const fetchPointCategoryApi = async (params) => {
    const { data } = await client.post(POINT_CATEGORY_LIST, { params });
    return data;
  };
  
    export const createPointCategoryApi = async (payload) => {
      const { data } = await client.post(`${CREATE_POINT_CATEGORY}`, payload);
      return data;
    }
  
  export const updatePointCategoryApi = async (payload) => {
    const { id, ...updateData } = payload;
    const { data } = await client.put(UPDATE_POINT_CATEGORY(id), updateData);
    return data;
  }

  export const deletePointCategoryApi = async (payload) => {
    const { data } = await client.delete(DELETE_POINT_CATEGORY(payload?.id));
    return data;
  }

  export const updatePointCategoryStatusApi = async ({ id, status }) => {
    const { data } = await client.patch(`${POINT_CATEGORY_LIST}/status/${id}`, { status });
    return data;
  }

  export const updateReferralPointsApi = async ({id, payload}) => {
      const { data } = await client.put(UPDATE_POINT_MASTER(id), payload);
      return data;
    }

  export const fetchReferralPointsApi = async (payload) => {
      const { data } = await client.post(GET_POINT_MASTER, payload);
      return data;
    }