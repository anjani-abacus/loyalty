import axios from '../axiosInstance';
import { COUPON_SCAN } from '../endpoints';

export const couponScan = (request) => axios.post(COUPON_SCAN, request);
