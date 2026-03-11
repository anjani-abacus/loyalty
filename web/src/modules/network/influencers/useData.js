// useInfluencers.js
import { createInfluencer, fetchInfluencerDetail, fetchInfluencers, fetchLedger, fetchRedeemHistory, fetchScanHistory, updateInfluencer, updateKycStatus, updateLoginStatus ,updateProfileStatus,updateTypeChange } from "../../../reactQuery/services/influencers/influencersApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import { copyContent } from "../../../utils";
import { Copy } from "lucide-react";

export const useInfluencers = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (params) => fetchInfluencers(params)
  })
  return { 
    fetchInfluencerData:mutate, 
    mutateAsync, influencerData:data?.data, 
  totalCount:data?.count, 
 
  tabListData: data?.TabList?.map(item => ({  key: item.key.toUpperCase(),  count: item.count || 0
  })) || [
    { key: "PENDING", count: 0 }, 
    { key: "APPROVED", count: 0 },
    { key: "REJECT", count: 0 },
  ],
    error, isPending, isSuccess, reset }

};

export const useCreateInfluencer = () =>
  useMutation({
    mutationFn: (payload) => createInfluencer(payload),
  });

export const useUpdateInfluencer = () =>
  useMutation({
    mutationFn: (payload) => updateInfluencer(payload),
  });

  export const useUpdateKycStatus = () =>
  useMutation({
    mutationFn: (payload) => updateKycStatus(payload),
  });

  export const useUpdateProfileStatus = () =>
  useMutation({
    mutationFn: (payload) => updateProfileStatus(payload),
  });

  export const useUpdateLoginStatus = () =>
  useMutation({
    mutationFn: (request) => updateLoginStatus(request),
  });

  export const useUpdateTypeChange = () =>
  useMutation({
    mutationFn: (payload) => updateTypeChange(payload),
  });

export const useInfluencerDetail = (id) => {
  const { isLoading, refetch, data, isFetching } = useQuery({
    queryKey: ['influencerDetail', id], // include id
    queryFn: () => fetchInfluencerDetail(id),
  });

const basicDetail = {
  status_of_profile: { label: 'Profile Status', value: data?.data?.status_of_profile,
    // action: {
    //   label:'Edit',
    //   onclick: () => {}
    // }
   },
  id: { label: 'User Id', value: data?.data?.id },
  name: { label: 'Name', value: data?.data?.name },
  // email: { label: 'Email', value: data?.data?.email },
  mobile: { label: 'Mobile', value: data?.data?.mobile}, 
  Referral: { label: 'Referral Code', value: data?.data?.referral_code}, 
  Referred: { label: 'Referred By', value: data?.data?.referred_by_code
}, 
    // action: {
    //  label: 'Edit', 
    // }
  
  // kycStatus: { label: 'KYC Status', value: data?.data?.kyc_status },

  
  // address: { 
  //   label: 'Address', 
  //   value: `${data?.data?.address || ''}, ${data?.data?.area || ''}, ${data?.data?.city || ''}, ${data?.data?.state || ''}, ${data?.data?.country || ''} - ${data?.data?.pincode || ''}`.replace(/(, )+/g, ', ').replace(/^, |, $/g, ''),
  //   action: {
  //    icon: Copy, onClick: () => copyContent(basicDetail?.address?.value) 
  //   }
  // },

  // Important Dates
  birthDate: { label: 'Date of Birth', value: data?.data?.birth_date && moment(data?.data?.birth_date)?.format("DD MMM, YYYY") },
  // weddingDate: { label: 'Wedding Date', value: data?.data?.wedding_date && moment(data?.data?.wedding_date)?.format("DD MMM, YYYY") },
  // workAnniversaryDate: { label: 'Work Anniversary', value: data?.data?.work_anniversary_date && moment(data?.data?.work_anniversary_date)?.format("DD MMM, YYYY") },

  
};

// const bankDetail = {
//   paymentPreference: { label: 'Payment Preference', value: data?.data?.user_redeemption_prefrence },
//   upiId: { label: 'UPI ID', value: data?.data?.upi_id },
//   bankName: { label: 'Bank Name', value: data?.data?.bank_name },
//   accountNo: { label: 'Account Number', value: data?.data?.account_no },
//   ifscCode: { label: 'IFSC Code', value: data?.data?.ifsc_code },
// }

const documentDetail = {
  // panNumber: data?.data?.pan_no,
  // panImage: data?.data?.document_pan_img,

  documentName: data?.data?.kyc_document_type,
  documentNumber: data?.data?.document_no,
  documentImage: [{title:'Front', url:data?.data?.document_img_front}, {title:'Back', url:data?.data?.document_img_back}],
}

const dealerDetail = {
  dealerName: { label: 'Dealer Name', value: data?.data?.dealer_name },
  dealerMobile: { label: 'Dealer Mobile', value: data?.data?.dealer_mobile },
  distributorName: { label: 'Dealer Code', value: data?.data?.dealer_code },
}


const logsRaw = data?.logs || [];

const logsData = logsRaw.map((log) => ({
  id: log.id,
  // prefer changed_by_name if present, otherwise fallback to the generic name field
  name: log.changed_by_name || log.name || `User ${log.changed_by_id || ""}`,
  // format timestamp to a readable string
  date: log.timestamp ? moment(log.timestamp).format("DD MMM, YYYY hh:mm A") : "",
  remark: log.remark || "",
  raw: log, 
}));




return { detail:data?.data, isLoading, refetch, basicDetail, documentDetail, dealerDetail, isFetching , logs: logsRaw,
  logsData, }
};



export const useLedgerList = (id) => {
  const { isLoading, refetch, data, isFetching } = useQuery({
    queryKey: ['ledgerList', id], // include id
    queryFn: () => fetchLedger(id),
  });

return { ledgerList:data?.ance, isLoading, refetch, isFetching }
};

export const useScanHistoryList = (id) => {
  const { isLoading, refetch, data, isFetching } = useQuery({
    queryKey: ['scanHistoryList', id],
    queryFn: () => fetchScanHistory(id),
  });

return { scanHistoryData:data?.data, isLoading, refetch, isFetching }
};

export const useRedeemHistoryList = (id) => {
  const { isLoading, refetch, data, isFetching } = useQuery({
    queryKey: ['scanHistoryList', id],
    queryFn: () => fetchRedeemHistory(id),
  });

return { redeemHistoryData:data?.data, isLoading, refetch, isFetching }
};