import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { LoaderIcon } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Copy, X } from "lucide-react";
import { FilterDialog } from "../../../components/filterDialog";
import { ConfirmationBox, ConfirmationDialog } from "../../../components/confirmationDialog";
import { getColumns } from "./Columns";
import { useSpinWinList, useUpdateSpinStatus } from "./useData";
import TableSkeleton from "../../../skeleton/tableSkeleton";
import { ChartPieLabelList } from "./pages/Chart";

const SpinWinList = () => {
  const location = useLocation();

  const navigate = useNavigate()

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedSpin, setSelectedSpin] = useState(null);


  // DATA LAYER CONFIG
  const [tabValue, setTabValue] = useState("Active");
  const [filter, setFilter] = useState({})
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const { spinListData, fetchSpinWinData, total, tabListData, error, isPending } = useSpinWinList();

  const { mutate: updateSpinStatus } = useUpdateSpinStatus()



  const isFirstRender = useRef(true)
  useEffect(() => {
    const status = tabValue === "Active" ? true : false;
    fetchSpinWinData({ page: page, limit: limit, filters: { ...filter, status } })
  }, [tabValue, filter, page])

  const onRefresh = () => {
    const status = tabValue === "Active" ? true : false
    setFilter({ status })
  }


  const handleStatusChange = (spin) => {
    setSelectedSpin({
      id: spin?.id || null,
      status: spin?.status,
    });
    setShowAlertDialog(true);
  };

  // when user confirms action
  const handleResult = (action) => {
    if (action === "continue") {
      updateSpinStatus(
        {
          id: selectedSpin.id,
          payload: { status: selectedSpin.status ? false : true },
        },
        {
          onSuccess: () => {
            const status = tabValue === "Active";
            fetchSpinWinData({
              page,
              limit,
              filters: { ...filter, status },
            });
            setShowAlertDialog(false);
            setSelectedSpin(null);
          },
          onError: (error) => {
            console.error("Failed to update spin status:", error);
            setShowAlertDialog(false);
            setSelectedSpin(null);
          },
        }
      );
    } else {
      setShowAlertDialog(false);
      setSelectedSpin(null);
    }
  };


  const handleViewInfluencer = () => { }

  return (
    <Container>
      <DataTable
        isLoading={isPending}
        pageTitle="Spin & win"
        buttonNavigation="/add-spin-win"
        userData={spinListData || []}
        renderSkeleton={() => <TableSkeleton columns={getColumns({})} rows={limit} />}
        columns={getColumns({ navigate, setSelectedSpin, handleStatusChange, handleViewInfluencer, page, limit })}
        defaultValue={tabValue}
        // tabListData={tabListData}
        setTabValue={setTabValue}
        setFilter={setFilter}
        onRefresh={onRefresh}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={total}
      />
      <FilterDialog />
      <ConfirmationBox
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        value={selectedSpin?.status}
        onResult={handleResult}

      />

      <Dialog open={!!selectedSpin} onOpenChange={() => setSelectedSpin(null)}>
        <DialogContent
          className="bg-white max-w-xl p-6 rounded-lg"
        >
          <button
            onClick={() => setSelectedSpin(null)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X />
          </button>

          <span className="text-black font-bold block text-center text-lg mb-3">
            Total Slabs: {selectedSpin?.length}
          </span>

          <ChartPieLabelList slabList={selectedSpin} />
        </DialogContent>
      </Dialog>

    </Container>
  );
};

export default SpinWinList;
