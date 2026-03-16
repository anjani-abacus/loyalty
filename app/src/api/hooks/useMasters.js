
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchProductList,
  fetchGiftGallery,
  fetchInfluencerLedger,
  fetchRedeemGiftRequestList,
  fetchCategoryList,
  fetchDocumentCatalogueList,
  fetchInfluencerBadge,
  fetchFaqQuestion,
  fetchVideoList,
  fetchTutorialVideoList,
  fetchContactUs,
  fetchAboutUs,
  fetchStateList,
  fetchDistrictList,
  fetchAddressDetails,
  fetchProductDetail,
  updateDocuments,
  addRedeemRequest,
  fetchFeedList,
  likePost,
  fetchNotificationList,
  readNotificationStatus,
  fetchLeaderBoard,
  fetchMyFeedList,
  fetchLeaderBoardUserRank,
  addTicket,
  fetchTicketType,
  fetchTicketList,
  fetchDealerByCode,
  fetchBannerList,
  fetchTopFiveGiftList,
  fetchSubCategoryList,
} from '../modules/masterApi';
import { useMutationWithError, useQueryWithError } from './middleware';

export const useProductList = (request) => useQueryWithError(['productList', request], () => fetchProductList(request));
export const useNotificationList = (request) => useMutationWithError(fetchNotificationList);
export const useReadNotification = () => useMutationWithError(readNotificationStatus, false);
export const useProductDetail = () => useMutationWithError(fetchProductDetail);
export const useInfluencerLedger = () => useMutationWithError(fetchInfluencerLedger);
export const useGiftGallery = (request) => useQueryWithError(['requestList', request], () => fetchGiftGallery(request));
export const useTopFiveGifts = (request) => useQueryWithError(['topGiftList', request], () => fetchTopFiveGiftList(request));
// export const useRedeemGiftRequestList = (request) => useQueryWithError(['requestList', request], ()=>fetchRedeemGiftRequestList(request))
export const useRedeemGiftRequestList = (request) => useQueryWithError(['requestList', request], () => fetchRedeemGiftRequestList(request));
export const useLeaderBoardUserRank = (request) => useQueryWithError(['leaderboardUserRank', request], () => fetchLeaderBoardUserRank(request));
export const useLeaderBoard = (request) => useQueryWithError(['requestList', request], () => fetchLeaderBoard(request));
export const useCategoryList = () => useMutationWithError(fetchCategoryList);
export const useSubCategoryList = () => useMutationWithError(fetchSubCategoryList);
export const useDocumentCatalogueList = () => useMutationWithError(fetchDocumentCatalogueList);
export const useInfluencerBadge = () => useMutationWithError(fetchInfluencerBadge);
export const useFaqQuestion = () => useMutationWithError(fetchFaqQuestion);
export const useVideoList = () => useMutationWithError(fetchVideoList);
export const useTutorialVideoList = (request) => useQueryWithError(['videoTutorialList', request], () => fetchTutorialVideoList(request));
export const useAboutUs = (request) => useQueryWithError(['aboutUs', request], () => fetchAboutUs(request));
export const useContactUs = (request) => useQueryWithError(['contactUs', request], () => fetchContactUs(request));
export const useStateList = () => useQueryWithError(['stateList'], fetchStateList);
export const useFeedList = () => useQueryWithError(['feedList'], fetchFeedList);
export const useMyFeedList = () => useQueryWithError(['myFeedList'], fetchMyFeedList);
export const useLikePost = () => useMutationWithError(likePost);
export const useDistrictList = () => useMutationWithError(fetchDistrictList);
export const useAddressDetails = () => useMutationWithError(fetchAddressDetails);
export const useUpdateDocument = () => useMutationWithError(updateDocuments);
export const useAddRedeemRequest = () => useMutationWithError(addRedeemRequest);

export const useAddTicket = () => useMutationWithError(addTicket);

export const useBannerList = (request) => useQueryWithError(['bannerList', request], () => fetchBannerList(request));
export const useTicketTypeList = (request) => useQueryWithError(['ticketTypeList', request], () => fetchTicketType(request));
export const useTicketList = (request) => useQueryWithError(['ticketList', request], () => fetchTicketList(request));
export const useDealerBycode = (request) => useQueryWithError(['dealerByCodeList', request], () => fetchDealerByCode(request), true, { enabled: false, retry: false });
