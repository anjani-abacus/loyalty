
import client from "../../axiosInstance";

import { BADGE_LIST, BONUS_LIST, CREATE_BONUS_POINTS, UPDATE_BONUS, UPDATE_BONUS_POINTS, UPDATE_BADGE, UPDATE_SPIN, CREATE_SPIN_WIN, SPIN_LIST, CREATE_BADGE, BADGE_ASSIGNED_INFLUENCER, UPDATE_SPIN_DETAILS } from "../../endPoints";


// Fetch all categories
export const fetchBonusList = async ({ status, page, limit, ...filter }) => {
  const { data } = await client.post(BONUS_LIST,
{ status, page, limit, ...filter },
  ); 
  return data; 
};


export const updateBonusStatus = async (id, payload ) => {
  const { data } = await client.put(UPDATE_BONUS(id), payload);
  return data;
}





export const fetchBadgeList = async ({status, page, limit, ...filter}) => {
  const {data} = await client.post(BADGE_LIST, {status, page, limit, ...filter}
  )
  return data;
}

export const updateBadgeStatus = async (id ,payload) => {
  const {data}=await client.put(UPDATE_BADGE(id),payload);
  return data ;
};

export const fetchSpinList = async ({status, page, limit, ...filter}) => {
  const {data} = await client.post(SPIN_LIST, {status, page, limit, ...filter})
  return data;
}


export const updateSpinStatus = async (id ,payload) => {
  const {data}=await client.put(UPDATE_SPIN(id),payload);
  return data ;
};

export const updateSpinDetails = async (id ,payload) => {
  const {data}=await client.put(UPDATE_SPIN_DETAILS(id),payload);
  return data ;
};

export const createBadge = async (payload) => {
  const { data } = await client.post(CREATE_BADGE, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export const fetchAssignedInfluencer = async (payload) => {
  const { data } = await client.post(BADGE_ASSIGNED_INFLUENCER(payload));
  return data;
};


export const createBonusPoints = async payload => {
    const {data} = await client.post(CREATE_BONUS_POINTS, payload)
    return data;
  }

export const updateBonusPoints = async (request) => {
  const { id, ...payload } = request;
  const { data } = await client.put(UPDATE_BONUS_POINTS(id), payload);
  return data;
};

export const fetchCreateSpinSlab = async payload => {
  const {data} = await client.post(CREATE_SPIN_WIN, payload)
  return data;
}

// export const updateInfluencer = async ({id, ...payload}) => { --- IGNORE ---
//   const {data} = await client.put(`${UPDATE_INFLUENCER}/${id}`, payload) --- IGNORE ---
//   return data; --- IGNORE ---
// } --- IGNORE ---

// export const deleteInfluencer = async (id) => { --- IGNORE ---
//   const {data} = await client.delete(`${DELETE_INFLUENCER}/${id}`) --- IGNORE ---
//   return data; --- IGNORE ---
// } --- IGNORE ---