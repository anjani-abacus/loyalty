import axios from 'axios';
import { GET_ALL_POST } from '../endpoints';

export const fetchFeedList = (request) => axios.get(GET_ALL_POST, request);
