// import { IN_API } from "../../../api/api";
import client from "../../axiosInstance";
import { CREATE_INFLUENCER, INFLUENCER_DETAIL, INFLUENCER_LIST, INFLUENCER_LOGIN_STATUS, UPDATE_INFLUENCER ,INFLUENCER_TYPE_CHANGE, UPDATE_INFLUENCER_KYC, UPDATE_INFLUENCER_PROFILE, LEDGER_USER_WISE, SCAN_HISTORY_USER_WISE, REDEEM_HISTORY_USER_WISE, DEALER_LIST, DEALER_DETAIL} from "../../endPoints";

export const fetchInfluencers = async (params) => {
  const {data} = await client.post(INFLUENCER_LIST, params)
  return data;
}

export const fetchDealers = async (params) => {
  const {data} = await client.post(DEALER_LIST, params)
  return data;
}

export const createInfluencer = async payload => {
    const {data} = await client.post(CREATE_INFLUENCER, payload)
    return data;
  }

  export const updateInfluencer = async (request) => {
    const { id, ...payload } = request
    const {data} = await client.put(UPDATE_INFLUENCER(id), payload)
    return data;
  }

  export const updateKycStatus = async (request) => {
      const { id, payload } = request
    const {data} = await client.put(UPDATE_INFLUENCER_KYC(id), payload)
    return data;
  }

   export const updateProfileStatus = async (request) => {
      const { id, payload } = request
    const {data} = await client.put(UPDATE_INFLUENCER_PROFILE(id), payload)
    return data;
  }

  export const updateLoginStatus = async (request) => {
      const { id, payload } = request
    const {data} = await client.put(INFLUENCER_LOGIN_STATUS(id), payload)
    return data;
  }

  export const updateTypeChange = async (request) => {
     const { id, payload } = request
    const {data} = await client.put(INFLUENCER_TYPE_CHANGE(id), payload)
    return data;
  }
  export const fetchInfluencerDetail = async id => {
    const {data} = await client.get(INFLUENCER_DETAIL(id))
    return data;
  }

  export const fetchDealerDetail = async id => {
    const {data} = await client.get(DEALER_DETAIL(id))
    return data;
  }

  export const fetchLedger = async id => {
    const {data} = await client.get(LEDGER_USER_WISE(id))
    return data;
  }

  export const fetchScanHistory = async id => {
    const {data} = await client.get(SCAN_HISTORY_USER_WISE(id))
    return data;
  }

  export const fetchRedeemHistory = async id => {
    const {data} = await client.get(REDEEM_HISTORY_USER_WISE(id))
    return data;
  }