import {getBaseUrl } from './BaseService';
import axiosInstance from '../api/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import cryptoService from './CryptoService';
import Toast from 'react-native-toast-message';
import { ToastAndroid } from 'react-native';
import * as keychain from 'react-native-keychain';

let cachedMode = null;
export let progress = null;


const getMode = async () => {
  if (cachedMode !== null) {
    return cachedMode;
  }
  try {
    const header = { 'Content-Type': 'application/json' };
    const response = await axiosInstance.post(
      getBaseUrl() + 'login/developmentMode',
      JSON.stringify(''),
      { headers: header },
    );
    const res = response.data;
    if (res.statusCode === 200) {
      cachedMode = res.developement_mode !== '1'; // Cache the mode
      return cachedMode;
    } else {
      throw new Error(res.statusMsg);
    }
  } catch (error) {
    throw error;
  }
};

const ApiCall = async (value, url) => {

  try {
    const resp = await keychain.getGenericPassword();
    if (!resp) {
      throw new Error('No Data Found!');
    }
    const keychainData = JSON.parse(resp.password);
    const token = keychainData?.userData?.user_token;
    const headers = {
      'Content-Type': 'application/json',

      Authorization: `Bearer ${token}`,
    };
    const data = JSON.stringify(value);
    const response = await axiosInstance.post(url, data, { headers });
      return response.data;
  } catch (error) {
    // Check if the error is an Axios error
    throw 'Something went wrong!';
  }
};

// const ApiCall = async (value, url) => {

//   try {
//     const resp = await keychain.getGenericPassword()
//     if (!resp) {
//       throw new Error("No Data Found!")
//     }
//     const {user_token:token} = JSON.parse(resp.password)

//     const [isDevelopmentMode] = await Promise.all([
//       getMode(),
//     ]);

//     const headers = {
//       'Content-Type': 'application/json',

//       Authorization: `Bearer ${JSON.parse(token)}`,
//     };

//     const data = isDevelopmentMode
//       ? JSON.stringify(value)
//       : cryptoService.encryptData(value);

//     const response = await axiosInstance.post(url, data, { headers, });

//     return isDevelopmentMode
//       ? response.data
//       : cryptoService.decryptData(JSON.stringify(response.data));
//   } catch (error) {
//     // Check if the error is an Axios error
//     throw 'Check Your Internet Connection And Try Again'
//   }
// };

const onUploadProgress = (e) => {

  const percentageUploaded = ((e.loaded * 100) / e.total);

  progress = Math.round(percentageUploaded);

  // setUploadProgress(progress);
};

export { ApiCall, getMode };
