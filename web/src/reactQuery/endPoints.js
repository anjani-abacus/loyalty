export const USER_LIST = "get_all_sfa_user"
export const CREATE_USER = "create_user"
export const USER_DETAILS = (id) => `get_user_by_id/${id}`
export const UPDATE_USER=(id)=>`update_user/${id}`
export const DELETE_USER=(id)=>`delete_user/${id}`
export const LOGIN_USER_DETAIL = 'get_user_from_token'

export const INFLUENCER_LIST = 'get_influencer'
export const CREATE_INFLUENCER = 'create_influencer'
export const UPDATE_INFLUENCER = (id)=>`update_influencer/${id}`
export const UPDATE_INFLUENCER_KYC = (id)=>`update_influencer_kyc/${id}`
export const UPDATE_INFLUENCER_PROFILE = (id)=>`update_influencer_profile_status/${id}`
export const INFLUENCER_LOGIN_STATUS = (id)=>`update_influencer_active_status/${id}`
export const INFLUENCER_TYPE_CHANGE=(id)=>`update_influencer_type_name/${id}`
export const INFLUENCER_DETAIL = (id)=>`get_influencer_by_id/${id}`
export const STATE_LIST = 'get_all_states_redis'
export const DISTRICT_LIST = 'get_all_districts_redis'

export const DEALER_LIST = 'get_all_dealer'
export const DEALER_DETAIL = id => `get_dealer/${id}`


export const LOGIN = "login"
export const LOGOUT = "logout"
export const SEND_OTP = "send_otp"
export const VERIFY_OTP = "verify_otp"

export const GET_ALL_CATEGORY="getALL_cat"
export const CREATE_CATEGORY="create_cat"

export const UPDATE_CATEGORY_STATUS= (id) => `update_category_status/${id}`
export const UPDATE_CATEGORY= (id) => `update_category/${id}`
export const DELETE_CATEGORY= (id)=>`category/${id}`

export const BONUS_LIST = "get_all_bonus_points"
export const UPDATE_BONUS=(id)=> `update_bonus_points_status/${id}`



export const BADGE_LIST = "get_all_badges"
export const UPDATE_BADGE=(id)=>`update_badge/${id}`
export const CREATE_BADGE="create_badge"
export const BADGE_ASSIGNED_INFLUENCER = (id)=> `enroll_influencer_badge/${id}`


export const SPIN_LIST = "get_all_spin_win"
export const UPDATE_SPIN=(id)=>`update_spin_win_status/${id}`
export const UPDATE_SPIN_DETAILS=(id)=>`update_spin_win/${id}`



export const GET_ALL_SUBCATEGORY= "getAll_sub_cat"
export const UPDATE_SUBCATEGORY =(id)=> `update_sub_category/${id}`
export const UPDATE_SUBCATEGORY_STATUS =(id)=> `update_sub_category_status/${id}`
export const DELETE_SUBCATEGORY =(id)=> `delete_sub_category/${id}`


export const QR_TEMPLATE_LIST = 'getAll_qr_template'
export const PRODUCT_LIST = 'getAll_product'
export const CREATE_QR_CODE = 'create_coupon'

// INDIVIDUAL (used on qr list)
export const QR_CODE_LIST_TAB_WISE = 'get_all_offer_coupon_history_list'

// GROUPED (used on qr add)
export const QR_CODE_LIST_GROUPED = 'get_all_coupon_history'
export const DELETE_QR_GROUPED = (id)=> `delete_coupon_history/${id}`


export const PRODUCTS_LIST = 'getAll_product' 
// had to replace with real apis 
export const UPDATE_PRODUCT =(id)=> `update_product_status/${id}`
export const UPDATE_PRODUCT_DATA =(id)=> `update_product/${id}`
export const DELETE_PRODUCT =(id)  => `delete_product/${id}`

// export const POINT_CATEGORY_LIST =""   // hold now apis pending
// export const REFERRAL_POINT_LIST ="getAll_pointmaster" // hold now apis pending

export const PDF_CATALOGUE ="get_all_pdfs"
export const DELETE_PDF_CATALOGUE = (id)=> `delete_pdf/${id}`
export const CREATE_PDF_CATALOGUE ="upload_pdf"

export const GET_ALL_DESIGNATION_ROLE = "get_all_role"
export const GET_ALL_MODULE = "get_aLL_module"
export const CREATE_ROLE_DESIGNATION = "create_role"
export const UPDATE_ROLE_DESIGNATION =(id)=> `update_role/${id}`
export const GET_ALL_ASSIGN_DESIGNATION_MODULE = "getAll_assign_designation_module"
export const GET_MODULE_BY_DESIGNATION = (id)=> `get_module_by_designation_id/${id}`
export const UPDATE_MODULE_BY_DESIGNATION = (id)=> `update_assign_designation_module/${id}`
export const UPDATE_MODULE = (id)=>`update_module/${id}`  // created

export const GET_ALL_REDEEM_REQUEST = "getAll_redeem_request"
export const UPDATE_REDEEM =(id)=> `update_redeem_request/${id}`
export const UPDATE_INFLUENCER_SHIPPING = (id) => `update_shipping_details/${id}`



export const GIFT_LIST= "get_gift_gallery"
export const CREATE_GIFT = "create_gift_gallery"
export const UPDATE_GIFT_LIST =(id)=> `update_status/${id}`


export const CREATE_BONUS_POINTS = "create_bonus_points"
export const CREATE_SPIN_WIN = "create_spin_win"

export const CREATE_SUB_CAT = "create_sub_cat"
export const CREATE_PRODUCT = "create_product"
export const POINT_CATEGORY_LIST = "getAll_point_category"
export const CREATE_POINT_CATEGORY = "create_point_category"
export const DELETE_POINT_CATEGORY = (id)=> `delete_point_category/${id}`
export const UPDATE_POINT_CATEGORY =(id)=> `update_point_category/${id}`
export const CREATE_POINT_MASTER = "create_point_master"
export const UPDATE_POINT_MASTER = (id)=> `update_point_master/${id}`
export const GET_POINT_MASTER = "getAll_pointmaster"
export const EXPORT_SAMPLE_FILE = 'download_product_template'
export const IMPORT_PRODUCT_FILE = 'upload_product_csv'
export const EXPORT_PRODUCT_FILE = 'export_product_csv'

export const STREAK_LIST = 'get_streak'
export const POST_EARN_LIST = 'get_post_and_earn'
export const LEADERBOARD_STATE_WISE = 'leaderboard_statewise'
export const LEADERBOARD_DISTRICT_WISE = 'leaderboard_districtwise'

export const  DASHBOARD_TOTAL_SCAN_COUNT= "leaderboard_statewise"
export const DASHBOARD_RETAILER_DATA = "leaderboard_districtwise"
export const LEDGER_USER_WISE = (id)=> `get_user_ledger_balance/${id}`
export const SCAN_HISTORY_USER_WISE = (id)=> `get_scanned_coupon_by_id/${id}`

// export const REDEEM_HISTORY_USER_WISE = (id)=> `get_scanned_coupon_by_id/${id}`


export const BANNER_LIST = "get_all_banners"
export const CREATE_BANNER = "create_banner"
export const UPDATE_BANNER =(id)=> `update_banner/${id}`
export const DELETE_BANNER=(id)=>`delete_banner/${id}`
export const BANNER_BY_ID =(id)=>`get_banner_by_id/${id}`


// export const VIDEO_LIST = "get_all_videos"




export const FAQ_LIST = "get_all_faq"
export const CREATE_FAQ = "create_faq"
export const UPDATE_FAQ = (id)=> `update_faq/${id}`
export const DELETE_FAQ = (id)=> `delete_faq/${id}`


export const CONTACT_US_LIST = "get_company_contact"
export const UPDATE_CONTACT = `update_company_contact`  
export const CREATE_CONTACT ="create_company_contact"

export const GET_ABOUT_US = "get_company_contact"; // same as contact, just pick about_us and profile_img
export const UPDATE_ABOUT_US = (id) => `update_company_contact/${id}`;
export const FAQ_USER_TYPE = "get_faq_by_user_type/ALL"

export const REDEEM_HISTORY_USER_WISE = (id)=> `get_redeem_request/${id}`


export const REPORT_REDEMPTION = `redemption_report`
export const REPORT_USER_SCAN = `user_scan_report`
export const REPORT_SEVEN_DAYS_NOT_SCANNED = `seven_days_not_scanned_report`
export const REPORT_COUPON_HISTORY = `coupon_history_report`

export const REPORT_CATEGORY_SCAN = `category_wise_scan_report`
export const REPORT_USER_BONUS_POINTS = `user_bonus_points`
export const REPORT_MONTHLY_SCAN_AGING = `monthly_scan_ageing`
export const REPORT_INFLUENCER_SCAN_LOGIN = `influencer_scan_login`
export const REPORT_STATE_KYC_STATUS = `state_kyc_status`
export const REPORT_STATE_LOGIN_AGING = `state_wise_login_ageing`
export const REPORT_SCAN_POINT = `scan_point_report`

export const EXPORT_REPORT_REDEMPTION = 'export_redemption_report'
export const EXPORT_REPORT_USER_SCAN = 'export_user_scan_report'
export const EXPORT_REPORT_SEVEN_DAYS_NOT_SCANNED = 'export_seven_days_not_scanned_report'
export const EXPORT_REPORT_COUPON_HISTORY = 'export_coupon_history_report'

export const EXPORT_REPORT_CATEGORY_SCAN = `export_category_wise_scan_report`
export const EXPORT_REPORT_USER_BONUS_POINTS = `export_user_bonus_points`
export const EXPORT_REPORT_MONTHLY_SCAN_AGING = `export_monthly_scan_ageing`
export const EXPORT_REPORT_INFLUENCER_SCAN_LOGIN = `export_influencer_scan_login`
export const EXPORT_REPORT_STATE_KYC_STATUS = `export_state_kyc_status`
export const EXPORT_REPORT_STATE_LOGIN_AGING = `export_state_wise_login_ageing`
export const EXPORT_REPORT_SCAN_POINT = `export_scan_point_report`

export const EXPORT_INFLUENCER_FILE = 'export_influencer_csv'
export const EXPORT_INFLUENCER_SAMPLE_FILE = 'download_influencer_template'
export const IMPORT_INFLUENCER_FILE = 'upload_influencer_csv'


export const DASHBOARD_INFLUENCER_STATS = "influencer_data"

export const PENDING_DASHBOARD_REDEEM_STATS = "pending_redeem_request_count"; 
export const DASHBOARD_TICKET_STATS= "tickets_stats"
export const DASHBOARD_INFLUENCER_STATE_WISE = "influencer_state_wise";
export const DASHBOARD_6MONTHS_SCANNED = "last_six_month_scan_generated"
export const COUPON_SCAN_GENERATED = "coupon_data"
export const GIFT_STATUS_COUNT = "gift_status_count"

export const GET_ALL_TICKET = "get_all_tickets"
export const UPDATE_TICKET_STATUS = (id)=> `update_ticket_status/${id}`

export const VIDEO_LIST = "get_all_tutorials"
export const ADD_VIDEO = "create_tutorial"
export const DELETE_VIDEO = (id) => `delete_tutorial/${id}`