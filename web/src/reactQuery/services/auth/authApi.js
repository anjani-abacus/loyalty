import client from "../../axiosInstance";

import { LOGIN , SEND_OTP, VERIFY_OTP ,LOGOUT, LOGIN_USER_DETAIL} from "../../endPoints";
export const loginApi = async (credentials) => {
  const { data } = await client.post(LOGIN, credentials);
  return data;
};
export const sendOtpApi= async(payload)=>{
  const {data} = await client.put(SEND_OTP ,payload)
  return data;
}
export const verifyOtpApi= async(payload)=>{
  const {data} = await client.put(VERIFY_OTP, payload)
  return data;
}
export const loginDetails= async()=>{
  const {data} = await client.get(LOGIN_USER_DETAIL)
  return data;
}
export const logoutApi = async () => {
  const { data } = await client.delete(LOGOUT); 
  return data;
};