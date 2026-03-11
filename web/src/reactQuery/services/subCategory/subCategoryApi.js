  import client from "../../axiosInstance";
  import { GET_ALL_SUBCATEGORY,UPDATE_SUBCATEGORY , DELETE_SUBCATEGORY, CREATE_SUB_CAT, UPDATE_SUBCATEGORY_STATUS} from "../../endPoints";

  export const getAllSubCategoryApi = async (payload) => {
  const { data } = await client.post(GET_ALL_SUBCATEGORY, payload);
  return data;
};
              
    export const updateSubCategoryApi = async ({id, ...payload}) => {
    const { data } = await client.put(UPDATE_SUBCATEGORY(id), payload);
    return data;
    };

    export const updateSubCategoryStatusApi = async ({ id, status }) => {
      const { data } = await client.put(UPDATE_SUBCATEGORY_STATUS(id), { status });
      return data;
    }
    export const deleteSubCategoryApi = async (id) => {
    const { data } = await client.delete(DELETE_SUBCATEGORY(id));
    return data;
    };

    export const createSubCategoryApi = async (payload) => {
    const { data } = await client.post(`${CREATE_SUB_CAT}`, payload);
    return data;
    }