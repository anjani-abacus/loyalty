import axios from '../axiosInstance';
import {
  PRODUCT_LIST,
  GIFT_GALLERY,
  INFLUENCER_LEDGER,
  REDEEM_GIFT_REQUEST_LIST,
  CATEGORY_LIST,
  DOCUMENT_CATALOGUE_LIST,
  INFLUENCER_BADGE,
  FAQ_QUESTION,
  VIDEO_LIST,
  TUTORIAL_VIDEO_LIST,
  CONTACT_US,
  ABOUT_US,
  EARN_POINT,
  STATE_LIST,
  DISTRICT_LIST,
  PINCODE_DETAIL,
  PRODUCT_DETAIL,
  UPDATE_DOCUMENT,
  SEND_REDEEM_OTP,
  VERIFY_REDEEM_OTP,
  ADD_REDEEM_REQUEST,
  REDEEM_MOBILE_VERIFICATION,
  REDEEM_REQUEST_OTP,
  GET_ALL_POST,
  LIKE_POST,
  NOTIFICATION_LIST,
  NOTIFICATION_SET_READ_LIST,
  LEADERBOARD,
  GET_POST_BY_ID,
  LEADERBOARD_STATE_WISE,
  LEADERBOARD_DISTRICT_WISE,
  LEADERBOARD_USER_RANK,
  CREATE_TICKET,
  TICKET_QUERY_TYPE,
  TICKET_LIST,
  GET_DEALER_BY_CODE,
  BANNER_LIST,
  TOP_5_GIFTS,
  SUBCATEGORY_LIST,
} from '../endpoints';
export const fetchProductList = (request) => axios.post(PRODUCT_LIST, request);
export const fetchProductDetail = (request) => axios.post(PRODUCT_DETAIL, request);
export const fetchGiftGallery = (request) => axios.post(GIFT_GALLERY, request);
export const fetchInfluencerLedger = (request) => axios.post(INFLUENCER_LEDGER, request);
export const fetchRedeemGiftRequestList = (request) => axios.get(REDEEM_GIFT_REQUEST_LIST, request);
export const fetchTopFiveGiftList = (request) => axios.get(TOP_5_GIFTS, request);
export const fetchCategoryList = (request) => axios.post(CATEGORY_LIST, request);
export const fetchSubCategoryList = (request) => axios.post(SUBCATEGORY_LIST, request);
export const fetchDocumentCatalogueList = (request) => axios.post(DOCUMENT_CATALOGUE_LIST, request);
export const fetchInfluencerBadge = (request) => axios.post(INFLUENCER_BADGE, request);
export const fetchFaqQuestion = (request) => axios.post(FAQ_QUESTION, request);
export const fetchVideoList = (request) => axios.post(VIDEO_LIST, request);
export const fetchTutorialVideoList = (request) => axios.get(TUTORIAL_VIDEO_LIST, request);
export const fetchContactUs = (request) => axios.post(CONTACT_US, request);
export const fetchAboutUs = (request) => axios.post(ABOUT_US, request);
export const fetchStateList = (request) => axios.get(STATE_LIST, request);
export const fetchFeedList = (request) => axios.get(GET_ALL_POST, request);
export const fetchMyFeedList = (request) => axios.get(GET_POST_BY_ID, request);
export const fetchLeaderBoardUserRank = (request) => axios.get(LEADERBOARD_USER_RANK, request);
export const fetchLeaderBoard = (request) => {
  const query = request?.type == 'State Wise' ? LEADERBOARD_STATE_WISE : LEADERBOARD_DISTRICT_WISE;
  return axios.get(query, request);
};
export const fetchNotificationList = (request) => axios.post(NOTIFICATION_LIST, request);
export const readNotificationStatus = (request) => axios.put(NOTIFICATION_SET_READ_LIST, request);
export const likePost = (request) => axios.get(LIKE_POST, request);
export const fetchDistrictList = (request) => axios.post(DISTRICT_LIST, request);
export const fetchAddressDetails = (request) => axios.post(PINCODE_DETAIL, request);
export const updateDocuments = (request) => axios.post(UPDATE_DOCUMENT, request, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const verifyRedeemOtp = request => axios.post(REDEEM_MOBILE_VERIFICATION, request);
export const requestRedeemOtp = request => axios.post(REDEEM_REQUEST_OTP, request);
export const addRedeemRequest = request => axios.post(ADD_REDEEM_REQUEST, request);

export const addTicket = request => axios.post(CREATE_TICKET, request, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
export const fetchBannerList = (request) => axios.get(BANNER_LIST, request);
export const fetchTicketType = (request) => axios.get(TICKET_QUERY_TYPE, request);
export const fetchTicketList = (request) => axios.get(TICKET_LIST, request);
export const fetchDealerByCode = (request) => axios.get(GET_DEALER_BY_CODE(request), request);
