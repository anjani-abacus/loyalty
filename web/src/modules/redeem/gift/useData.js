import { useMutation } from "@tanstack/react-query";
import { fetchRedeemRequestList, updateInfluencerShipping, updateRedeemRequest } from "../../../reactQuery/services/giftGalary/giftGalaryApi";

// export const useGiftRedeem = () => {
//   const [cashRedeemData, setCashRedeemData] = useState([]);
//   const [tabListData, setTabListData] = useState([]); 
//   const [tabValue, setTabValue] = useState("All");

//   useEffect(() => {
//     const allRequests = giftRedeemJson.gift_master_list || [];
//     setCashRedeemData(allRequests);

//     setTabListData([
//       { label: "All", count: giftRedeemJson.tabCount.All },
//       { label: "Approved", count: giftRedeemJson.tabCount.Approved },
//       { label: "Reject", count: giftRedeemJson.tabCount.Reject },
//       { label: "Pending", count: giftRedeemJson.tabCount.Pending },
//     ]);
//   }, []);

//   const filteredData =
//     tabValue === "All"
//       ? cashRedeemData
//       : cashRedeemData.filter((item) => item.status === tabValue);

//   const handleStatusChange = (rowData, newStatus) => {
//     const newData = cashRedeemData.map((item) =>
//       item.id === rowData.id ? { ...item, gift_status: newStatus } : item
//     );
//     setCashRedeemData(newData);
//   };

//   return {
//     cashRedeemData: filteredData,
//     tabListData,
//     tabValue,
//     setTabValue,
//     isLoading: false,
//     error: null,
//     handleStatusChange,
//   };
// };


// export const useRedeemRequest = () => {
//   const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
//     mutationFn: (params) => fetchRedeemRequestList(params)
//   })
//   return {
//     redeemRequestData:data?.data, total:data?.count, 
//     tabListData: [{key:'Pending', count:data?.totalActive},
//                     {key:'Approved', count:data?.totalInactive} ,
//                     {key:'Reject', count:data?.totalInactive}],
//                      fetchRequestListData:mutate, mutateAsync, error, isPending, isSuccess, reset }
// }


export const useRedeemRequest = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({
    mutationFn: (params) => fetchRedeemRequestList(params),
  });



  return {
    redeemRequestData: data?.data || [],
    total: data?.totalCount || 0,
    totalCount:data?.count, 
 
  tabListData: data?.TabList?.map(item => ({  key: item.key.toUpperCase(),  count: item.count || 0
  })) || [
    { key: "PENDING", count: 0 }, 
    { key: "APPROVED", count: 0 },
    { key: "REJECT", count: 0 },
  ],
    error, isPending, isSuccess, reset ,
    fetchRequestListData: mutate,
    mutateAsync,
  };
};


export const useUpdateRedeemRequest = () =>
  useMutation({
    mutationFn: (({id ,payload}) => updateRedeemRequest(id,payload)),
  });


  export const useUpdateInfluencerShipping = () =>
  useMutation({
    mutationFn:(({id ,payload}) => updateInfluencerShipping(id, payload )),
  });

  

// export const useUpdateRedeemRequest = (options = {}) =>
//   useMutation({
//     mutationFn: (request) => updateRedeemRequest(request),
//     onSuccess: (data, variables) => {
//       console.log('Update successful:', data);
//       options?.onSuccess?.(data, variables);
//     },
//     onError: (error, variables) => {
//       console.error('Update failed:', error);
//       options?.onError?.(error, variables);
//     },
//     ...options
//   });