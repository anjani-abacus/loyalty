import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { LoaderIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { FilterDialog } from "../../../components/filterDialog";
import { ConfirmationBox, ConfirmationDialog } from "../../../components/confirmationDialog";
import { getColumns } from "./Columns";
import { useRedeemRequest } from "./useData";
import { useUpdateRedeemRequest } from "../gift/useData"; 

const GiftRedeemList = () => {
  const navigate = useNavigate();
  const location = useLocation();
const { mutate: updateRedeem } = useUpdateRedeemRequest()
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
    
    useEffect(() => {
      if (!isFirstRender?.current) fetchRequestListData({  gift_type:"CASH", page, limit:10, 
        filters:{...filter ,action_status:tabValue ,gift_type:"CASH"} })
      isFirstRender.current = false
    }, [tabValue, filter, page])
  
    
  const onRefresh = () => {
    setFilter({
      ...filter,
      action_status: tabValue,
    });

  };
    

    const handleStatusChange = (value, status ) => {
     setAlertValue({
       id: value?.id || null,
    filters: { action_status: status?.toUpperCase() }
  });
  setShowAlertDialog(true);
  };
    // DATA LAYER CONFIG


const handleResult = (action) => {
  if (action === 'continue') {
    updateRedeem(
      {
        id: alertValue.id,
        payload: alertValue.filters 
      },
      {
        onSuccess: () => {
      
          fetchRequestListData({
            page:page,
            gift_type: "CASH",
            limit:limit,
            filters: {
              ...filter,
              action_status: tabValue.toUpperCase(),
              gift_type: "CASH",
            },
          });
          setShowAlertDialog(false);
        },
    });
  }
  
  if (action === 'cancel') {
    console.log('cancel action');
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
        pageTitle="Cash Redeem Requests"
        userData={redeemRequestData || []}
        buttonNavigation="/add-gift-redeem"
        columns={getColumns({tabValue, handleStatusChange, page, limit })}
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
      />
    </Container>
  );
};

export default GiftRedeemList;
