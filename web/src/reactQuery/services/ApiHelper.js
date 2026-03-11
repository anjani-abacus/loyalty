// src/api/apiHelper.js
import {apiClient} from "../axiosInstance";

export const apiRequest = async (method, url, payload = {}, config = {}) => {
  try {
    let response;

    if (method.toLowerCase() === "get") {
      // For GET requests → payload should go in params
      response = await apiClient.get(url, { params: payload, ...config });
    } else {
      // For POST, PUT, PATCH, DELETE → payload is the body
      response = await apiClient.post(url, payload, config);
    }

    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
