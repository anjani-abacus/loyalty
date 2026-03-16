import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ConfirmationDialog } from "../../../components/confirmationDialog";
import { FilterDialog } from "../../../components/filterDialog";
import { getColumns } from "./Columns";
import { useDealers, useCreateDealer, useUpdateDealer, useDeleteDealer } from "./useData";
import TableSkeleton from "../../../skeleton/tableSkeleton";
import DealerFormModal from "./pages/DealerFormModal";

const CustomerNetwork = () => {
  const { influencerCategory } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [filter, setFilter] = useState({});
  const [start, setStart] = useState(0);

  const [modalType, setModalType] = useState("add");
  const [showFormModal, setShowFormModal] = useState(false);
  const [selectedDealer, setSelectedDealer] = useState(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteDealerId, setDeleteDealerId] = useState(null);

  const { fetchDealersData, dealersData, total, isPending } = useDealers();
  const { mutate: createDealer, isPending: isCreating } = useCreateDealer();
  const { mutate: updateDealer, isPending: isUpdating } = useUpdateDealer();
  const { mutate: deleteDealer } = useDeleteDealer();

  const isFormLoading = modalType === "add" ? isCreating : isUpdating;

  const loadDealers = (overrides = {}) => {
    fetchDealersData({
      page,
      limit,
      filters: { ...filter, ...overrides },
    });
  };

  useEffect(() => {
    loadDealers();
  }, [page, limit, filter]);

  const onRefresh = () => {
    setFilter({});
    setPage(1);
  };

  // ── Add ────────────────────────────────────────────────────────────────────
  const handleAdd = () => {
    setModalType("add");
    setSelectedDealer(null);
    setShowFormModal(true);
  };

  // ── Edit ───────────────────────────────────────────────────────────────────
  const handleEdit = (row) => {
    setModalType("edit");
    setSelectedDealer(row);
    setShowFormModal(true);
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = (id) => {
    setDeleteDealerId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = (action) => {
    if (action === "continue" && deleteDealerId) {
      deleteDealer(deleteDealerId, {
        onSuccess: () => {
          setShowDeleteConfirm(false);
          setDeleteDealerId(null);
          loadDealers();
        },
        onError: () => {
          setShowDeleteConfirm(false);
        },
      });
    } else {
      setShowDeleteConfirm(false);
    }
  };

  // ── Save (create or update) ────────────────────────────────────────────────
  const onSave = (payload) => {
    if (modalType === "add") {
      createDealer(payload, {
        onSuccess: () => {
          setShowFormModal(false);
          loadDealers();
        },
      });
    } else {
      updateDealer(payload, {
        onSuccess: () => {
          setShowFormModal(false);
          loadDealers();
        },
      });
    }
  };

  return (
    <Container>
      <>
        <DataTable
          isLoading={isPending}
          pageTitle={influencerCategory}
          userData={dealersData || []}
          setFilter={setFilter}
          renderSkeleton={() => <TableSkeleton columns={getColumns({})} rows={limit} />}
          columns={getColumns({ handleEdit, handleDelete, limit, page })}
          handleAdd={handleAdd}
          onRefresh={onRefresh}
          startPoint={start}
          setStartPoint={setStart}
          page={page}
          limit={limit}
          setPage={setPage}
          setLimit={setLimit}
          total={total}
        />

        <FilterDialog />

        <DealerFormModal
          modalType={modalType}
          open={showFormModal}
          setOpen={setShowFormModal}
          dealer={selectedDealer}
          setSelectedDealer={setSelectedDealer}
          onSave={onSave}
          isLoading={isFormLoading}
        />

        <ConfirmationDialog
          openDialog={showDeleteConfirm}
          setOpenDialog={setShowDeleteConfirm}
          value={deleteDealerId}
          onResult={confirmDelete}
        />
      </>
    </Container>
  );
};

export default CustomerNetwork;
