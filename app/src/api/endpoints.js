import { BASE_URL as ENV_BASE_URL, ENV } from '@env';

console.log('ENV CHECK:', ENV);
console.log('BASE_URL:', ENV_BASE_URL);


export const USERS = 'users';
export const USER_DETAIL = 'user-detail';
export const MOBILE_VERIFICATION = 'verify-otp';
export const REQUEST_OTP = 'request-otp';
export const REDEEM_MOBILE_VERIFICATION = 'redeem-verify-otp';
export const REDEEM_REQUEST_OTP = 'redeem-send-otp';
export const VALIDATE_REFERRAL_CODE = 'check-referral-code';
export const REGISTRATION = 'register';
export const UPDATE_DOCUMENT = 'update-doc';
export const UPDATE_USER = 'update-user';
export const LOG_OUT = 'logout';
// export const BASE_URL = ENV_BASE_URL;
// export const BASE_URL = 'https://starkpaints-app-api.basiq360.com/api/loyalty/v1/';
// export const BASE_URL = 'https://dev-starkpaints-app-api.basiq360.co.in/api/loyalty/v1/'; //stark paints dev

export const BASE_URL = 'http://192.168.100.126:3000/api/loyalty/v1/' || 'http://api.basiq360.com/api/loyalty/v1/';
// export const BASE_URL = 'https://app-api.basiq360.com/api/loyalty/v1/'; //basiq360

export const PRODUCT_LIST = 'product-list';
export const PRODUCT_DETAIL = 'product-detail';
export const GIFT_GALLERY = 'gift-gallery';
export const TOP_5_GIFTS = 'get_highlighted_offers';
export const INFLUENCER_LEDGER = 'influencer-ledger';
export const CATEGORY_LIST = 'category-list';
export const DOCUMENT_CATALOGUE_LIST = 'document-catalogue-list';
export const INFLUENCER_BADGE = 'influencer-badge';
export const FAQ_QUESTION = 'faq-question';
export const VIDEO_LIST = 'video-list';
export const TUTORIAL_VIDEO_LIST = 'tutorial-video-list';
export const CONTACT_US = 'contact-us';
export const ABOUT_US = 'about-us';
export const EARN_POINT = 'earn-point';
export const COUPON_SCAN = 'coupon-scan';
export const SCAN_HISTORY = 'coupon-scan-list';
export const STATE_LIST = 'state';
export const DISTRICT_LIST = 'district';
export const PINCODE_DETAIL = 'pincode-details';

export const REDEEM_GIFT_REQUEST_LIST = 'redeem-gift-request-list';
export const SEND_REDEEM_OTP = 'send-otp';
export const VERIFY_REDEEM_OTP = 'verify-otp';
export const ADD_REDEEM_REQUEST = 'add-redeem-request';
export const SPIN_WHEEL_DETAILS = 'get_spin_win';
export const SPIN_WIN_POINT = 'send_spin_win_points';
export const INFLUENCER_TYPE_LIST = 'influencer-types';
export const NOTIFICATION_LIST = 'get_notification';
export const NOTIFICATION_GET_READ_LIST = 'get_read_notifications';
export const NOTIFICATION_SET_READ_LIST = 'set_read_notification';
export const LEADERBOARD_STATE_WISE = 'leaderboard-by-state';
export const LEADERBOARD_DISTRICT_WISE = 'leaderboard-by-district';
export const CREATE_POST = 'create-post';
export const GET_POST_BY_ID = 'get-post';
export const GET_ALL_POST = 'all-posts';
export const LIKE_POST = 'like-post';
export const STREAK_PROGRESS = 'streak-progress';
export const UPCOMING_GIFTS = 'upcoming-gifts';
export const LEADERBOARD_USER_RANK = 'user-full-rank';

export const TICKET_QUERY_TYPE = 'ticket_query_type';
export const CREATE_TICKET = 'create_ticket';
export const TICKET_LIST = 'get_ticket';

export const GET_DEALER_BY_CODE = (id) => `get_dealer/${id}`;
export const BANNER_LIST = 'banner_details';
