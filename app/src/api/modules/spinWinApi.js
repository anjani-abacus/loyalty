import axios from '../axiosInstance';
import { EARN_POINT, SPIN_WHEEL_DETAILS, SPIN_WIN_POINT, UPCOMING_GIFTS } from '../endpoints';

export const spinWinDetails = (request) => axios.get(SPIN_WHEEL_DETAILS, request);
export const fetchEarnPoint = (request) => axios.get(EARN_POINT, request);
export const fetchUpcomingGifts = (request) => axios.get(UPCOMING_GIFTS, request);
export const spinWinPoint = (request) => axios.post(SPIN_WIN_POINT, request);
