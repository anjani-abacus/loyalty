import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { useEffect, useRef, useState } from "react";
import EditSubCategory from "./edit/index";
import { FilterDialog } from "../../../components/filterDialog";
import { ConfirmationBox, ConfirmationDialog } from "../../../components/confirmationDialog";
import getColumns from "./Columns";
import TableSkeleton from "../../../skeleton/tableSkeleton";

import {
  useSubCategory,
  useUpdateSubCategory,
  useDeleteSubCategory,
  useCreateSubCategory,
  useUpdateSubCategoryStatus,
} from "./useData";

import { useCategory } from "../category/useData";

const SubCategoryList = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState(null);

  const [tabValue, setTabValue] = useState("Active");
  const [filter, setFilters] = useState({ status: true });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [modalType, setModalType] = useState("add"); 
  const [showEditDialog, setShowEditDialog] = useState(false);
    const [showStatusDialog, setShowStatusDialog] = useState(false);
     const [selectedRow, setSelectedRow] = useState(null);

  // Fetch hook
  const {
    subCategoryData,
    tabListData,
    total,
    fetchSubCategoryData,
    isPending,
    error,
  } = useSubCategory();


  // const { categoryData: allCategories = [] } = useCategory();
  const { categoryData:allCategories=[], fetchCategoryData } = useCategory();

  const { updateSubCategory, isSuccess: updateSuccess ,isPending:isUpdating} = useUpdateSubCategory();
  const { createSubCategory, isSuccess: createSuccess ,isPending:isCreating} = useCreateSubCategory();


  const onSave = (payload) => modalType=='add' ? createSubCategory(payload, {
    onSuccess:()=>{
      const status = tabValue === "Active";
      fetchSubCategoryData({ page, limit, filters: { ...filter, status } });
    }
  }) : updateSubCategory(payload, {
    onSuccess:()=>{
      const status = tabValue === "Active";
      fetchSubCategoryData({ page, limit, filters: { ...filter, status } });
    }
  });
  const isLoading = modalType === 'add' ?  isCreating : isUpdating;

  const { deleteSubCategory, isSuccess: deleteSuccess } = useDeleteSubCategory();
  const { updateStatus, isSuccess: statusSuccess } = useUpdateSubCategoryStatus();

  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // First render check
  const isFirstRender = useRef(true);
  useEffect(() => {
    const status = tabValue === "Active" ? true : false;
    if (!isFirstRender.current) {

      fetchSubCategoryData({ page, limit, status, filters:{...filter , status} });

      fetchCategoryData({ page, limit, status }); // Fetch all categories for dropdown

    }
    isFirstRender.current = false;
  }, [tabValue, filter, page, limit]);

  useEffect(() => {
    const status = tabValue === "Active" ? true : false;
    setFilters({ status });
  }, [tabValue]);

  useEffect(() => {
    const status = tabValue === "Active" ? true : false;
    if (updateSuccess  || deleteSuccess || statusSuccess) {
      fetchSubCategoryData({ page:page, limit:limit, status, filters:{...filter , status} });
      setShowEditDialog(false);
    }
  }, [updateSuccess, deleteSuccess, statusSuccess]);

  const onRefresh = () => {
    const status = tabValue === "Active" ? true : false;
    setFilters({ status });
    fetchSubCategoryData({ page, limit, filters:{...filter , status} });
  };


  const handleAdd = () => {
      setModalType("add");
      setSelectedSubCategory(null);
      setShowEditDialog(true);
  };


  // Handlers
  const handleStatusChange = (row) => {
    setSelectedRow(row);
    setShowStatusDialog(true);
  };
    const confirmStatusChange = (action) => {
    if (action === "continue" && selectedRow) {
      updateStatus({ id: selectedRow.id, status: !selectedRow.status });
    }
    setSelectedRow(null);
    setShowStatusDialog(false);
  };

  const handleDelete = (id) => {
    setSubCategoryId(id);
    setShowAlertDialog(true);
  };

 const handleConfirmDelete = (action) => {
  if (action === "continue" && subCategoryId) {
    deleteSubCategory( subCategoryId );
  }
 
  setSubCategoryId(null);
  setShowAlertDialog(false);
};


  const handleEdit = (row) => {
    setModalType("edit");
    setSelectedSubCategory(row);
    setShowEditDialog(true);
  };

//  const onSave = (payload) =>
//    modalType === "add" ? createSubCategory(payload) : updateSubCategory(payload);


  return (
    <Container>
      <DataTable
        isLoading={isPending}
        handleAdd={handleAdd}
        pageTitle="Sub Category"
    
        userData={isPending ? [] : subCategoryData}
        columns={getColumns({ handleStatusChange, handleEdit, handleDelete, page, limit })}
        renderSkeleton={() => <TableSkeleton columns={getColumns({})} rows={limit} />}
        defaultValue={tabValue}
        tabListData={tabListData}
        setTabValue={setTabValue}
        setFilter={setFilters}
        onRefresh={onRefresh}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={tabValue === "Active" ? tabListData?.[0]?.count || 0 : tabListData?.[1]?.count || 0}
      />

      <FilterDialog />

    

      <EditSubCategory
        modalType={modalType}
        open={showEditDialog}
        reloadData={onRefresh}
        setOpen={setShowEditDialog}
        subCategory={selectedSubCategory}
        setSubCategory={setSelectedSubCategory}
        categories={allCategories}
        isLoading={isLoading}
        setSelectedSubCategory={setSelectedSubCategory}
        onSave={onSave}
      />
{/* delete */}
        <ConfirmationBox
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        title="Delete Confirmation"
        message="Are you sure you want to delete this Sub Category?"
        onResult={handleConfirmDelete}
      />
 {/* for status change */}
       <ConfirmationBox
        openDialog={showStatusDialog}
        setOpenDialog={setShowStatusDialog}
        title="Change Status"
        message={`Are you sure you want to ${selectedRow?.status ? "Deactivate" : "Activate"}  Sub Category?`}
        onResult={confirmStatusChange}
      />
    </Container>
  );
};


export default SubCategoryList;
