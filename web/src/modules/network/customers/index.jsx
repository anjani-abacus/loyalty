import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ConfirmationBox, ConfirmationDialog } from "../../../components/confirmationDialog";
import { FilterDialog } from "../../../components/filterDialog";
import { getColumns } from "./Columns";

import { useDealers, useInfluencers, useUpdateInfluencer ,useUpdateLoginStatus ,useUpdateTypeChange} from "./useData";
import TableSkeleton from "../../../skeleton/tableSkeleton";
import { EXPORT_INFLUENCER_FILE, EXPORT_INFLUENCER_SAMPLE_FILE, IMPORT_INFLUENCER_FILE } from "../../../reactQuery/endPoints";

// import {  useQueryClient } from "@tanstack/react-query";

const CustomerNetwork = () => {
  const { influencerCategory } = useParams();
  const [selectedType, setSelectedType] = useState("");

  const [tabValue, setTabValue] = useState("PENDING");
  const isFirstRender = useRef(true)
  const [filter, setFilter] = useState({})
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const { fetchDealersData, dealersData, total, tabListData, isPending } = useDealers();
  const [start, setStart] = useState(0)
  const [alertValue, setAlertValue] = useState(null)
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const { mutate: updateInfluencer } = useUpdateInfluencer()
  const{mutate :updateLoginStatus }=useUpdateLoginStatus()
  const {mutate:updateTypeChange}= useUpdateTypeChange()

useEffect(() => {
    fetchDealersData({
      page,
      limit,
      filters: { 
        ...filter,
        status_of_profile: tabValue,
        // influencer_type_name: influencerCategory?.charAt(0).toUpperCase() + influencerCategory?.slice(1) 
        influencer_type_name: influencerCategory?.toUpperCase() || ""

      },
    });
}, [tabValue, filter, page, influencerCategory]);

const onRefresh = () => {
  setFilter({
    ...filter,
    status_of_profile: tabValue,
    influencer_type_name: influencerCategory?.toUpperCase() || "",
  });
  setPage(1);
};

  const handleStatusChange = (row) => {
    setSelectedRow(row);
    setShowStatusConfirm(true);
  };


 const confirmStatusChange = () => {
    const newStatus = !selectedRow.active_status;

    updateLoginStatus(
      {
        id: selectedRow.id,
        payload: { active_status: newStatus },
      },
      {
        onSuccess: () => {
          setShowStatusConfirm(false);
          fetchDealersData({
            page,
            limit,
            filters: {
              ...filter,
              status_of_profile: tabValue,
              influencer_type_name: influencerCategory?.toUpperCase() || "",
            },
          });
        },
          onError: () => {
        setShowStatusConfirm(false);
      },

        
      }
    );
  };



 const handleTypeChange = (value, row) => {
  setSelectedType(value);
  setAlertValue({ value, id: row?.id }); // ✅ store id instead of mobile
  setShowAlertDialog(true);
};


  // const handleResult = (action) => {
  //   if (action === "continue" && alertValue) {
  //     updateInfluencer(
  //       {
  //         mobile: alertValue.mobile,
  //         influencer_type_name: alertValue.value, 
  //       },
  //       {
  //         onSuccess: () => {
  //           setShowAlertDialog(false);
  //           fetchDealersData({
  //             page,
  //             limit,
  //             filters: {
  //               ...filter,
  //               status_of_profile: tabValue,
  //               influencer_type_name: influencerCategory?.toUpperCase() || "",
  //             },
  //           });
  //         },
  //       }
  //     );
  //   } else {
  //     setShowAlertDialog(false);
  //   }
  // };

const handleResult = (action) => {
  if (action === "continue" && alertValue) {
    updateTypeChange({
        id: alertValue.id, 
        payload: { influencer_type_name: alertValue.value },
      }, {
        onSuccess: () => {
          setShowAlertDialog(false);
          
          fetchDealersData({
            page,
            limit,
            filters: {
              ...filter,
              status_of_profile: tabValue,
              influencer_type_name: influencerCategory?.toUpperCase() || "",
            },
          });
        },
        onError: () => setShowAlertDialog(false),
      })
    // useUpdateType
    // updateInfluencer(
    //   {
    //     id: alertValue.id, 
    //     payload: { influencer_type_name: alertValue.value },
    //   },
    //   {
    //     onSuccess: () => {
    //       setShowAlertDialog(false);
          
    //       fetchDealersData({
    //         page,
    //         limit,
    //         filters: {
    //           ...filter,
    //           status_of_profile: tabValue,
    //           influencer_type_name: influencerCategory?.toUpperCase() || "",
    //         },
    //       });
    //     },
    //     onError: () => setShowAlertDialog(false),
    //   }
    // );
  } else {
    setShowAlertDialog(false);
  }
};


  const alertSubmitHandler = () => {}  

return (
  <Container>
      <>
        <DataTable
        isLoading={isPending}
          pageTitle={influencerCategory}
          userData={ dealersData ||[]}
          setFilter={setFilter}
           renderSkeleton={() => <TableSkeleton columns={getColumns({})} rows={limit} />}
          columns={getColumns({selectedType, setSelectedType, handleTypeChange,handleStatusChange, limit, page})}
          // tabListData={tabListData}
          alertSubmitHandler={alertSubmitHandler}
          defaultValue={tabValue}
          setTabValue={setTabValue}
          startPoint={start}
          setStartPoint={setStart}
        
          // downloadUrl={EXPORT_INFLUENCER_FILE}
          // downloadSampleUrl={EXPORT_INFLUENCER_SAMPLE_FILE}
          // uploadUrl={IMPORT_INFLUENCER_FILE}
          enableUploadCsv={true}
          onRefresh={onRefresh}
          alertValue={alertValue}
          // buttonNavigation={"/influencerAdd"}

          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          total={tabListData?.filter((item)=>(item?.key==tabValue))[0]?.count}
        />
        <FilterDialog />

        <ConfirmationDialog
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        onResult={handleResult}
      />

      <ConfirmationBox
        openDialog={showStatusConfirm}
        setOpenDialog={setShowStatusConfirm}
        title="Change Login Status"
        message={`Are you sure you want to ${
          selectedRow?.active_status ? "deactivate" : "activate"
        } this influencer?`}
        onResult={confirmStatusChange}
        onCancel={() => setShowStatusConfirm(false)}
      />


     
      </>
  
  </Container>
);
};

export default CustomerNetwork;
