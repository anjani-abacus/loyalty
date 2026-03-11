import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FilterDialog } from "../../../components/filterDialog";
import {  ConfirmationBox } from "../../../components/confirmationDialog";
import { getColumns } from "./Columns";
import { useBonusPoints, useUpdateBonusStatus } from "./useData";
import TableSkeleton from "../../../skeleton/tableSkeleton";

const BadgeList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const [tabValue, setTabValue] = useState("Active");
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { tabListData, fetchBonusData, bonusPointsData, isPending, error } = useBonusPoints();
  const { mutate: updateBonusStatus } = useUpdateBonusStatus();

  const isFirstRender = useRef(true);

  useEffect(() => {
    const status = tabValue === "Active";
      fetchBonusData({ page, limit, filters: { ...filter, status } });
  }, [tabValue, filter, page, limit]);

  const onRefresh = () => {
    const status = tabValue === "Active";
    setFilter({ status });
    fetchBonusData({ page, limit, filters: { ...filter, status } });
  };

  // Trigger status confirmation dialog
  const handleStatusChange = (badge) => {
    setSelectedBadge(badge);
    setShowStatusDialog(true);
  };

  // Confirm or cancel status change
  const confirmStatusChange = (action) => {
    if (action === "continue" && selectedBadge) {
      updateBonusStatus(
        { id: selectedBadge.id, payload: { status: !selectedBadge.status } },
        {
          onSuccess: () => {
            onRefresh();
          },
        }
      );
    }
    // Close dialog and reset selection regardless of action
    setShowStatusDialog(false);
    setSelectedBadge(null);
  };

  const handleViewInfluencer = () => {};

  if (error) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <h2 className="text-xl font-semibold text-red-600">Failed to load badges</h2>
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
        pageTitle="Bonus-Point"
        isLoading={isPending}
        userData={bonusPointsData || []}
        renderSkeleton={() => <TableSkeleton columns={getColumns({})} rows={limit} />}
        columns={getColumns({ handleStatusChange, handleViewInfluencer, page, limit })}
        buttonNavigation="/add-bonus-point"
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
        openDialog={showStatusDialog}
        setOpenDialog={setShowStatusDialog}
        title="Change Status"
        message="Are you sure you want to change the status?"
        onResult={confirmStatusChange}
      />
    </Container>
  );
};

export default BadgeList;
