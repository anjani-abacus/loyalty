
import client from "../../axiosInstance";
import { CREATE_GIFT, GET_ALL_REDEEM_REQUEST, GIFT_LIST, UPDATE_GIFT_LIST, UPDATE_INFLUENCER_SHIPPING, UPDATE_REDEEM  } from "../../endPoints";



export const fetchGiftList = async (payload) => {
  const {data} = await client.post(GIFT_LIST, payload)
  return data;

}


export const updateGiftStatus = async (id, payload) => {
  const {data} = await client.put(UPDATE_GIFT_LIST(id), payload)
  return data;}




  export const createGift = async payload => {
    const {data} = await client.post(CREATE_GIFT, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    return data;
  }

 export const fetchRedeemRequestList = async (payload) => {
  console.log("payload", payload);
  const { data } = await client.post(GET_ALL_REDEEM_REQUEST, payload);
  return data;
};

  
export const updateInfluencerShipping = async (id, payload) => {
  console.log('Shipping update payload:', id, payload);
  const { data } = await client.put(UPDATE_INFLUENCER_SHIPPING(id), payload);
  return data;
};

export const updateRedeemRequest = async (id, payload) => {
  
    const {data} = await client.put(UPDATE_REDEEM(id), payload)
    return data;
}


// export const updateRedeemRequest = async (request) => {
//   const {  payload } = request;
//  const endpoint = UPDATE_REDEEM;
//   const { data } = await client.put(endpoint, payload);
  
//   return data;
// };


