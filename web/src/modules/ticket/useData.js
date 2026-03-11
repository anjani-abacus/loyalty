import { useState, useEffect } from "react";
import ticketJson from "../../utils/mockData/ticket.json";
import { fetchTicketList, udpateTicketStatus } from "../../reactQuery/services/ticketApi/ticketApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTicketData = () => {
return useMutation({
    mutationFn: (payload) => fetchTicketList(payload)
  });
};

export const useTicketUpdate = () => {
  return useMutation({
    mutationFn:(payload)=>udpateTicketStatus(payload)
  })
}