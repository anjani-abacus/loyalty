import axios from '../axiosInstance';
import { INFLUENCER_TYPE_LIST } from '../endpoints';

export const fetchInfluencerTypeList = (request) => axios.get(INFLUENCER_TYPE_LIST, request);
