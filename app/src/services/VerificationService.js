import axiosInstance from './BaseService';
const VerificationService = async (value, url) => {
  try {
    let headers = {
      'Content-Type': 'application/json',
    };
    const response = await axiosInstance.post(url, JSON.stringify(value), {
      headers,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
export default VerificationService;
