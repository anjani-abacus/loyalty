import { fetchFeedList } from '../modules/feedApi';
import { useQueryWithError } from './middleware';

export const useFeed = (request) => useQueryWithError(['feedList', request], ()=>fetchFeedList(request));
