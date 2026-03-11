import client from "../../axiosInstance";
import { CREATE_INFLUENCER, INFLUENCER_DETAIL, POST_EARN_LIST, UPDATE_INFLUENCER } from "../../endPoints";

export const fetchPostEarn = async (payload) => {
  const {data} = await client.post(POST_EARN_LIST, payload)
  return data;
}

// export const createInfluencer = async payload => {
//     const {data} = await client.post(CREATE_INFLUENCER, payload)
//     return data;
//   }

//   export const updateInfluencer = async (request) => {
//       const { id, payload } = request
//     const {data} = await client.put(UPDATE_INFLUENCER(id), payload)
//     return data;
//   }

//   export const fetchInfluencerDetail = async id => {
//     const {data} = await client.get(INFLUENCER_DETAIL(id))
//     return data;
//   }