import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { useEffect, useRef, useState } from "react";
import Modal from "./edit/index";
import { FilterDialog } from "../../../components/filterDialog";
import { ConfirmationBox, ConfirmationDialog } from "../../../components/confirmationDialog";
import getColumns from "./Columns";
import {
  usePointCategory,
  useDeleteCategory,
  useUpdateCategoryStatus,
  useCreatePointCategory,
  useUpdatePointCategory
} from "./useData";
import TableSkeleton from "../../../skeleton/tableSkeleton"

const PointCategoryList = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  const [tabValue, setTabValue] = useState("Active");
  const [filters, setFilter] = useState({ status: true });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    pointCategoryData,
    tabListData,
    total,
    fetchPointCategoryData,
    isPending,
    error,
  } = usePointCategory();

  const { updateCategory, isSuccess: updateSuccess ,isPending:isUpdating} = useUpdatePointCategory();
  const { createPointCategory ,isPending:isCreating } = useCreatePointCategory();

  const { deleteCategory, isSuccess: deleteSuccess } = useDeleteCategory();

  const [modalType, setModalType] = useState("add"); // 'add' or 'edit'

  const isLoading = modalType === 'add' ?  isCreating : isUpdating;
  const isFirstRender = useRef(true);
  useEffect(() => {
    const status = tabValue === "Active" ? true : false;
    if (!isFirstRender.current) {
      fetchPointCategoryData({ page, limit, status, filters });
    }
    isFirstRender.current = false;
  }, [tabValue, filters, page, limit]);

  useEffect(() => {
    const status = tabValue === "Active" ? true : false;
    setFilter({ status });
  }, [tabValue]);

  useEffect(() => {
    if (updateSuccess || deleteSuccess) {
      fetchPointCategoryData({ page, limit, filters });
      setShowEditDialog(false);
    }
  }, [updateSuccess, deleteSuccess]);

  const onRefresh = () => {
    setFilter({});
    fetchPointCategoryData({ page, limit });
  };

  const [selectedData, setSelected] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);





  const handleEdit = (row) => {
    setModalType("edit");
    setSelected(row);
    setShowEditDialog(true);
  };

  const handleAdd = () => {
    setModalType("add");
    setSelected(null);
    setShowEditDialog(true);
  };

  const handleDelete = (id) => {
    setCategoryId(id);
    setShowAlertDialog(true);
  };

  const confirmDelete = () => {
    if (categoryId) deleteCategory({ id: categoryId });
    setShowAlertDialog(false);
  };

  // const onSave = (payload) => updateCategory(payload);
  const onSave = (payload) => modalType == 'add' ? createPointCategory(payload, {
    onSuccess:()=>{
      onRefresh()
      setShowEditDialog(false);
    }
  }) : updateCategory(payload, {
        onSuccess: () => {
          onRefresh();
+         setShowEditDialog(false);
        },
      });
  if (!isPending && (!pointCategoryData || pointCategoryData.length === 0)) {

  }

  return (
    <Container>
      <DataTable
        isLoading={isPending}
        pageTitle="Point Category List"
        userData={isPending ? [] : pointCategoryData}
        handleAdd={handleAdd}
        columns={getColumns({ handleEdit, handleDelete, page, limit })}
        renderSkeleton={() => <TableSkeleton columns={getColumns({})} rows={limit} />}
        defaultValue={tabValue}
        // tabListData={tabListData}
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

      {/* <ConfirmationDialog
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        value={categoryId}
        onConfirm={confirmDelete}
      /> */}

      <ConfirmationBox
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        title="Are you sure?"
        message={`Are you sure you want to delete?`}
        onResult={confirmDelete}
        onCancel={() => setShowAlertDialog(false)}
      />

      <Modal
        modalType={modalType}
        open={showEditDialog}
        setOpen={setShowEditDialog}
        listData={selectedData}
        reloadData={onRefresh}
        setSelected={setSelected}
        onSave={onSave}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default PointCategoryList;
