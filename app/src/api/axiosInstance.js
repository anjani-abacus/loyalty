// /src/api/apiClient.js
import axios from 'axios';
import * as keychain from 'react-native-keychain';
import {BASE_URL_DEV, BASE_URL_LIVE, APP_ENVIRONMENT} from '@env';
import { BASE_URL } from './endpoints';

let logoutFn = null; // store logout from AuthContext

export const setLogoutHandler = (fn) => {
  logoutFn = fn;
};

const axiosInstance = axios.create({
  baseURL: BASE_URL, //process.env.BASE_URL
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token or logging if needed
axiosInstance.interceptors.request.use(async (request) => {
  const credentials = await keychain.getGenericPassword();
  let session = '';
  if (credentials) {session = JSON.parse(credentials.password);}
  if (session?.token) {request.headers.Authorization = `Bearer ${session?.userData?.accessToken}`;}
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.deactivated && logoutFn) {
      logoutFn(true); // pass a flag that it's auto-logout
    }
    if (response?.data?.sessionExpired && logoutFn) {
        logoutFn(true); // pass a flag that it's auto-logout
      }
    return response;
  },
  (error) => {
    if (error.response?.data?.deactivated && logoutFn) {
      logoutFn(true); // pass a flag that it's auto-logout
    }

    if (error.response) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
