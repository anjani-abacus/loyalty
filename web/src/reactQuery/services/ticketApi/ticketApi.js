import client from "../../axiosInstance";
import { GET_ALL_TICKET, UPDATE_TICKET_STATUS } from "../../endPoints";

export const fetchTicketList = async payload => {
    const {data} = await client.post(GET_ALL_TICKET, payload)
    return data;
  }

export const udpateTicketStatus = async ({id, payload}) => {
    const {data} = await client.put(UPDATE_TICKET_STATUS(id), payload)
    return data;
  }