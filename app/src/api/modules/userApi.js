// /src/api/modules/usersApi.js
import axios from '../axiosInstance';
import { LOG_OUT, MOBILE_VERIFICATION, REGISTRATION, REQUEST_OTP, STREAK_PROGRESS, UPDATE_USER, USER_DETAIL, USERS, VALIDATE_REFERRAL_CODE } from '../endpoints';

export const fetchUsers = () => axios.get(USERS);
export const fetchUserDetail = id => axios.get(`${USER_DETAIL}`);
export const createUser = data => axios.post(REGISTRATION, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const validateReferralcode = data => axios.post(VALIDATE_REFERRAL_CODE, data);
export const updateUser = (formData) => axios.put(UPDATE_USER, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
export const deleteUser = id => axios.delete(USER_DETAIL(id));
export const verifyUser = request =>  axios.post(MOBILE_VERIFICATION, request);
export const requestOtp = request =>  axios.post(REQUEST_OTP, request);
export const expireSession = request => axios.post(LOG_OUT, request);
export const streakProgress = request => axios.get(STREAK_PROGRESS, request);
