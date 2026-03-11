import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { LoaderIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

import { FilterDialog } from "../../../components/filterDialog";
import { ConfirmationBox, ConfirmationDialog } from "../../../components/confirmationDialog";
import { getColumns, moduleColumns } from "./Columns";
import { useAssignedInfluencerBadge, useBadgeList, useUpdateBadgeStatus } from "./useData";
import TableSkeleton from "../../../skeleton/tableSkeleton";
import { Button } from "@/components/ui/button";


const BadgeList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openList, setOpenList] = useState(false);

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const [tabValue, setTabValue] = useState("Active");
  const [filter, setFilter] = useState({})
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { badgeListData, tabListData, fetchBadgeData, total, isPending, isLoading, error, refetch } = useBadgeList();
  const { mutate: fetchAssignedInfluencerBadge, data:assignedInfluencers } = useAssignedInfluencerBadge()

  const { mutate: updateBadgeStatus } = useUpdateBadgeStatus();

  const isFirstRender = useRef(true)

  //  useEffect(() => {
  //    fetchBadgeData({ page:page, limit:limit, status:"Active", filters:filter})
  //  },[])


  useEffect(() => {
    const status = tabValue === "Active" ? true : false;

     fetchBadgeData({ page: page, limit: limit, filters: { ...filter, status } })
  }, [tabValue, filter, page])

  const onRefresh = () => {
    const status = tabValue === "Active" ? true : false;

    setFilter({ status })
  }

  const handleStatusChange = (selectedBadge, status) => {
    console.log("selectedBadge==>", selectedBadge, status);

    setSelectedBadge({
      id: selectedBadge?.id || null,
      status: selectedBadge?.status,
    });
    setShowAlertDialog(true);
  };

  const handleResult = (action) => {
    if (action === "continue") {
      updateBadgeStatus(
        {
          id: selectedBadge.id,
          payload: { status: !selectedBadge.status },
        },
        // console.log("selectbadge handleResult==>" ,selectedBadge),

        {
          onSuccess: () => {

            const status = tabValue === "Active";
            fetchBadgeData({
              page: page,
              limit: limit,
              filters: { ...filter, status },
            });
            setShowAlertDialog(false);
            setSelectedBadge(null);
          },
        },
        {
          onError: (error) => {
            console.error("Failed to update badge status:", error);
            setShowAlertDialog(false);
            setSelectedBadge(null);
          },
        }
      );
    } else {
      setShowAlertDialog(false);
      setSelectedBadge(null);
    }
  };

  const handleViewInfluencer = (data) => {
    console.log('asdf =>asdf ', data)
    fetchAssignedInfluencerBadge(data?.id)
    setOpenList(true)
  }


  // if (error) {
  //   return (
  //     <Container>
  //       <div className="flex flex-col items-center justify-center h-64 text-center">
  //         <h2 className="text-xl font-semibold text-red-600">Failed to load badges</h2>
  //         <p className="text-gray-600 mt-2">
  //           {error?.data?.message || "We couldn't connect to the server. Please try again later."}
  //         </p>
  //         <button
  //           onClick={() => window.location.reload()}
  //           className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  //         >
  //           Retry
  //         </button>
  //       </div>
  //     </Container>
  //   );
  // }

  return (
    <Container>
      <DataTable
        pageTitle="Badges"
        isLoading={isPending}
        userData={badgeListData || []}
        renderSkeleton={() => <TableSkeleton columns={getColumns({})} rows={limit} />}
        columns={getColumns({ handleStatusChange, setOpenList, handleViewInfluencer, page, limit })}
        buttonNavigation="/add-badge"

        defaultValue={tabValue}
        tabListData={tabListData}
        setTabValue={setTabValue}
        setFilter={setFilter}
        onRefresh={onRefresh}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={30}
      />
      <FilterDialog />
      <ConfirmationBox
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        value={selectedBadge?.status}
        onResult={handleResult}

      />

      <Dialog open={openList} onOpenChange={setOpenList}>
        <DialogContent className="max-w-7xl">
          <DialogHeader>
            <DialogTitle>Enrolled Influencers</DialogTitle>
          </DialogHeader>
          <DataTable
            title={'Enrolled Influencers'}
            disableHeader={true}
            disableTabs={'Enrolled Influencers'}
            disableFooter={true}
            userData={assignedInfluencers || []} // ✅ Pass static data here
            columns={moduleColumns()} // ✅ Use columns
            isLoading={false} // ✅ No loader
            defaultValue="PENDING"
            setTabValue={() => { }}
            setFilter={() => { }}
            onRefresh={onRefresh}
            startPoint={0}
            setStartPoint={() => { }}
            page={1}
            limit={50}
            setPage={() => { }}
            setLimit={() => { }}
            total={10}
          />
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpenList(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default BadgeList;
