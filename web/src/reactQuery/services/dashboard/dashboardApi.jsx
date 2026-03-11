// import client from "../../axiosInstance";
// import { DASHBOARD_TOTAL_SCAN_COUNT,DASHBOARD_RETAILER_DATA  } from "../../endPoints";


// export const fetchRetailerData = async ({tab}) => {
//   const {data} = await client.post(DASHBOARD_RETAILER_DATA, {tab})
//   return data;
// }

// export const totalScanCount = async () => {
//   const {data} = await client.get(DASHBOARD_TOTAL_SCAN_COUNT)
//   return data;
// }


// dashboardApi.js
import client from "../../axiosInstance";
import { DASHBOARD_INFLUENCER_STATE_WISE, DASHBOARD_INFLUENCER_STATS ,
  PENDING_DASHBOARD_REDEEM_STATS,DASHBOARD_6MONTHS_SCANNED,
  COUPON_SCAN_GENERATED,
  DASHBOARD_TICKET_STATS ,GIFT_STATUS_COUNT
 } from "../../endPoints"; 

export const fetchInfluencerStats = async () => {
  const { data } = await client.get(DASHBOARD_INFLUENCER_STATS);

  return data;
};

export const fetchRedeemStats = async () => {
  const { data } = await client.get(PENDING_DASHBOARD_REDEEM_STATS);

  return data;
};
export const fetchTicketStats = async () => {
  const { data } = await client.get(DASHBOARD_TICKET_STATS);

  return data.data;
};


export const fetchInfluencerStateWise = async () => {
  const { data } = await client.get(DASHBOARD_INFLUENCER_STATE_WISE);
  return data;
};


export const fetch6MonthScanGenerated = async () => {
  const { data } = await client.get(DASHBOARD_6MONTHS_SCANNED);
  return data;
};

export const fetchCouponScanGenerated = async () => {
  const { data } = await client.get(COUPON_SCAN_GENERATED);
  return data;
};

export const fetchGiftStatusCount = async () => {
  const { data } = await client.get(GIFT_STATUS_COUNT);
  // Expected response: { success: true, data: [{ INPROGRESS, SHIPPED, DELIVERED, count }] }
  return data;
};