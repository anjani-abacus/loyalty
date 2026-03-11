import client from "../../axiosInstance";
import { CREATE_USER, USER_DETAILS, UPDATE_USER, USER_LIST } from "../../endPoints";

export const fetchUsers = async (params) => {
  const {data} = await client.post(USER_LIST, params)
  return data;
}

export const createUser = async payload => {
    const {data} = await client.post(CREATE_USER, payload)
    return data;
  }

  export const updateUser = async ({id, ...payload}) => {
    const {data} = await client.put(UPDATE_USER(id), payload)
    return data;
  }

  export const fetchUserDetail = async id => {
    const {data} = await client.get(USER_DETAILS(id))
    return data;
  }
