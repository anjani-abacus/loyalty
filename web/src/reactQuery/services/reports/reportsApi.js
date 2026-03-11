import client from "../../axiosInstance";
import { REPORT_CATEGORY_SCAN, REPORT_COUPON_HISTORY, REPORT_INFLUENCER_SCAN_LOGIN, REPORT_MONTHLY_SCAN_AGING, REPORT_REDEMPTION, REPORT_SCAN_POINT, REPORT_SEVEN_DAYS_NOT_SCANNED, REPORT_STATE_KYC_STATUS, REPORT_STATE_LOGIN_AGING, REPORT_USER_BONUS_POINTS, REPORT_USER_SCAN } from "../../endPoints";

export const fetchRedemptionReport = async () => {
  const {data} = await client.get(REPORT_REDEMPTION)
  return data;
}

export const fetchUserScanReport = async () => {
  const {data} = await client.get(REPORT_USER_SCAN)
  return data;
}

export const fetchSevenDaysNotScannedReport = async () => {
  const {data} = await client.get(REPORT_SEVEN_DAYS_NOT_SCANNED)
  return data;
}

export const fetchCouponHistoryReport = async () => {
  const {data} = await client.get(REPORT_COUPON_HISTORY)
  return data;
}

export const fetchCategoryWiseScanReport = async () => {
  const {data} = await client.get(REPORT_CATEGORY_SCAN)
  return data;
}

export const fetchUserBonusPointsReport = async () => {
  const {data} = await client.get(REPORT_USER_BONUS_POINTS)
  return data;
}

export const fetchMonthlyScanAging = async () => {
  const {data} = await client.get(REPORT_MONTHLY_SCAN_AGING)
  return data;
}

export const fetchInfluencerScanLogin = async () => {
  const {data} = await client.get(REPORT_INFLUENCER_SCAN_LOGIN)
  return data;
}

export const fetchStateKycStatus = async () => {
  const {data} = await client.get(REPORT_STATE_KYC_STATUS)
  return data;
}

export const fetchStateLoginAging = async () => {
  const {data} = await client.get(REPORT_STATE_LOGIN_AGING)
  return data;
}


export const fetchScanPoint = async () => {
  const {data} = await client.get(REPORT_SCAN_POINT)
  return data;
}