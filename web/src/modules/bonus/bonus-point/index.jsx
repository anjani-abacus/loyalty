import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FilterDialog } from "../../../components/filterDialog";
import { ConfirmationBox } from "../../../components/confirmationDialog";
import { getColumns } from "./Columns";
import { useBonusPoints, useUpdateBonusStatus } from "./useData";
import TableSkeleton from "../../../skeleton/tableSkeleton";

const BadgeList = () => {
  const navigate = useNavigate();

  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

  const [tabValue, setTabValue] = useState("Active");
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const { tabListData, fetchBonusData, bonusPointsData, isPending, error } = useBonusPoints();
  const { mutate: updateBonusStatus } = useUpdateBonusStatus();

  useEffect(() => {
    const status = tabValue === "Active";
    fetchBonusData({ page, limit, filters: { ...filter, status } });
  }, [tabValue, filter, page, limit]);

  const onRefresh = () => {
    const status = tabValue === "Active";
    setFilter({ status });
    fetchBonusData({ page, limit, filters: { ...filter, status } });
  };

  const handleStatusChange = (badge) => {
    setSelectedBadge(badge);
    setShowStatusDialog(true);
  };

  const confirmStatusChange = (action) => {
    if (action === "continue" && selectedBadge) {
      updateBonusStatus(
        { id: selectedBadge.id, payload: { status: !selectedBadge.status } },
        { onSuccess: () => onRefresh() }
      );
    }
    setShowStatusDialog(false);
    setSelectedBadge(null);
  };

  const handleEdit = (row) => {
    navigate("/add-bonus-point", { state: { mode: "edit", initialData: row } });
  };

  if (error) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <h2 className="text-xl font-semibold text-red-600">Failed to load bonus points</h2>
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
        columns={getColumns({ handleStatusChange, handleEdit, page, limit })}
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
        total={tabValue === "Active" ? tabListData?.[0]?.count || 0 : tabListData?.[1]?.count || 0}
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
