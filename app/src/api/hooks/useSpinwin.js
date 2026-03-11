import { fetchEarnPoint, fetchUpcomingGifts, spinWinDetails, spinWinPoint } from '../modules/spinWinApi';
import { useMutationWithError, useQueryWithError } from './middleware';

export const useSpinWin = (request) => useQueryWithError(['spinWin', request], ()=>spinWinDetails(request)); //to get slabs
export const useEarnPoint = (request) => useQueryWithError(['earnedPoints', request], ()=>fetchEarnPoint(request), false); //to get total earned points
export const useUpcomingGifts = (request) => useQueryWithError(['upcomingGifts', request], ()=>fetchUpcomingGifts(request), false); //to get total earned points
export const useSpinWinPoint = () => useMutationWithError(spinWinPoint, false);
