import client from "../../axiosInstance";
import { DISTRICT_LIST, STATE_LIST } from "../../endPoints";

export const fetchStateList = async () => {
    const { data } = await client.get(STATE_LIST)
    return data;
}

export const fetchDistrictList = async (state) => {
    const { data } = await client.post(DISTRICT_LIST, state)
    return data;
}