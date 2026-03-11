import { useQueryWithError } from './middleware';
import { fetchInfluencerTypeList } from '../modules/commonApi';

export const useInfluencerList = (request) => useQueryWithError(['influencerTypeList', request], ()=>fetchInfluencerTypeList(request), true);
