// import { IN_API } from "../../../api/api";
import client from "../../axiosInstance";
import { CREATE_INFLUENCER, INFLUENCER_DETAIL, STREAK_LIST, UPDATE_INFLUENCER } from "../../endPoints";

export const fetchStreak = async (payload) => {
  const {data} = await client.post(STREAK_LIST, payload)
  return data;
}

export const createInfluencer = async payload => {
    const {data} = await client.post(CREATE_INFLUENCER, payload)
    return data;
  }

  export const updateInfluencer = async (request) => {
      const { id, payload } = request
    const {data} = await client.put(UPDATE_INFLUENCER(id), payload)
    return data;
  }

  export const fetchInfluencerDetail = async id => {
    const {data} = await client.get(INFLUENCER_DETAIL(id))
    return data;
  }
