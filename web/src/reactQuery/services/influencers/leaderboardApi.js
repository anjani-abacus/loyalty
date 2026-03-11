import client from "../../axiosInstance";
import { LEADERBOARD_DISTRICT_WISE, LEADERBOARD_STATE_WISE } from "../../endPoints";

export const fetchLeaderboardStateWise = async (payload) => {
  const {data} = await client.post(LEADERBOARD_STATE_WISE, payload)
  return data;
}

export const fetchLeaderboardDistrictWise = async (payload) => {
  const {data} = await client.post(LEADERBOARD_DISTRICT_WISE, payload)
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
