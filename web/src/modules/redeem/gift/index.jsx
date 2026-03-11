import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { LoaderIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { FilterDialog } from "../../../components/filterDialog";
import { ConfirmationBox, ConfirmationDialog } from "../../../components/confirmationDialog";
import { getColumns } from "./Columns";
import { useRedeemRequest ,useUpdateInfluencerShipping,useUpdateRedeemRequest} from "./useData";
import TableSkeleton from "../../../skeleton/tableSkeleton";
import { useGiftStats } from "../../Dashboard/useData";


const normalize = (s) => (s ? String(s).trim().toUpperCase() : "");


const GiftRedeemList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [redeemType, setRedeemType] = useState("");

  
// DATA LAYER CONFIG
  const [tabValue, setTabValue] = useState("PENDING");
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { fetchRequestListData, redeemRequestData, total, tabListData, error, isPending } = useRedeemRequest();
    const [alertValue, setAlertValue] = useState(null)
    const isFirstRender = useRef(true)

    const { mutate: updateRedeem, isLoading: isUpdatingRedeem } = useUpdateRedeemRequest();
const { mutate: updateShipping, isLoading: isUpdatingShipping } = useUpdateInfluencerShipping();

const isMutating = isUpdatingRedeem || isUpdatingShipping;


  useEffect(() => {
     fetchRequestListData({
       page :page,
       gift_type:"GIFT",  
       limit:limit,
       filters: { ...filter,
          action_status: tabValue.toUpperCase(),
          gift_type:"GIFT", },
      });
  }, [tabValue, filter, page]);

  const onRefresh = () => {
  
    setFilter({
      ...filter,
      action_status: tabValue.toUpperCase(),
    });

  };
  //   const handleStatusChange = (value, status) => {
  //   setAlertValue({value, status})
  //   setShowAlertDialog(true);
  // };
    // DATA LAYER CONFIG
//       const handleResult = (action) => {
//     console.log('action clicked ===> ', action)

//     if(action == 'continue'){
//       console.log('alert dialog===> ', alertValue)
//       console.log(action)
// updateRedeem({ id: alertValue.id, payload:{ action_status: alertValue?.status?.toUpperCase() }})
//     }
//     if(action == 'cancel'){
//       console.log('cancel action')
//     }
//   }


const handleStatusChange = (value, status) => {
  setAlertValue({
    id: value?.id ?? null,
    type: "action",
    payload: { action_status: status?.toUpperCase() }, // e.g. APPROVED, REJECT
  });
  setShowAlertDialog(true);
};

const handleShippedStatusChange = (value, status) => {
  // normalize to API token
  const giftStatus = normalize(status);

  setAlertValue({
    id: value?.id ?? null,
    type: "shipping",
    payload: { gift_status: giftStatus }, 
  });
  setShowAlertDialog(true);
};



// const handleResult = (action) => {
//   if (action === 'continue') {
//     updateRedeem(
//       {
//         id: alertValue.id,
//         payload: alertValue.filters 
//       },
//       {
//         onSuccess: () => {
      
//           fetchRequestListData({
//             page:page,
//             gift_type: "GIFT",
//             limit:limit,
//             filters: {
//               ...filter,
//               action_status: tabValue.toUpperCase(),
//               gift_type: "GIFT",
//             },
//           });
//           setShowAlertDialog(false);
//         },
//     });
//   }
  
//   if (action === 'cancel') {
//     console.log('cancel action');
//     setShowAlertDialog(false);
//   }
// };

const handleResult = (action) => {
  if (action === "continue") {
    if (!alertValue) return setShowAlertDialog(false);

    const { id, type, payload } = alertValue;


    const mutationFn = type === "action" ? updateRedeem : updateShipping;

    mutationFn(
      { id, payload },
      {
        onSuccess: () => {
          fetchRequestListData({
            page,
            gift_type: "GIFT",
            limit,
            filters: {
              ...filter,
              action_status: tabValue.toUpperCase(),
              gift_type: "GIFT",
            },
          });
          setShowAlertDialog(false);
        },
        onError: () => {
          setShowAlertDialog(false);
        },
      }
    );
  } else if (action === "cancel") {
    setShowAlertDialog(false);
  }
};



  if (error) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <h2 className="text-xl font-semibold text-red-600">Failed to load gift redeem requests</h2>
          <p className="text-gray-600 mt-2">
            {error?.data?.message || "We couldn't connect to the server. Please try again later."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <DataTable
        pageTitle="Gift Redeem Requests"
        userData={redeemRequestData || []}
        buttonNavigation="/add-gift"
        columns={getColumns({tabValue, handleStatusChange,handleShippedStatusChange ,page, limit })}
        defaultValue={tabValue}
        tabListData={tabListData}
        setTabValue={setTabValue}
        setFilter={setFilter}
        onRefresh={onRefresh}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
      total={tabListData?.filter((item)=>(item?.key==tabValue))[0]?.count}

      />
      <FilterDialog />
     <ConfirmationBox
  openDialog={showAlertDialog}
  setOpenDialog={setShowAlertDialog}
  onResult={handleResult}
  message={'You want to change status'}
  isProcessing={isMutating}
/>
    </Container>
  );
};

export default GiftRedeemList;
