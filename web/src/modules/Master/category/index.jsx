import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { useEffect, useRef, useState } from "react";
import EditCategory from "./add/index";
import { FilterDialog } from "../../../components/filterDialog";
import { ConfirmationBox, ConfirmationDialog } from "../../../components/confirmationDialog"; 
import getColumns from "./Columns";
import { 
  useCategory, 
  useUpdateCategory, 
  useDeleteCategory, 
  useUpdateCategoryStatus, 
  useCreateCategory
} from "./useData";
import TableSkeleton from "../../../skeleton/tableSkeleton"


const CategoryList = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [tabValue, setTabValue] = useState("Active");
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // Fetch hook
  const {
    categoryData,
    tabListData,
    total,
    fetchCategoryData,
    isPending,
    error,
    
  } = useCategory();

  const { updateCategory, isSuccess: updateSuccess } = useUpdateCategory();
  const { createCategory, isSuccess: createSuccess,isPending:isCreating } = useCreateCategory();
  const { deleteCategory, isSuccess: deleteSuccess } = useDeleteCategory();
  const { updateStatus, isSuccess: statusSuccess, isPending:isUpdating} = useUpdateCategoryStatus();

  
  const [modalType, setModalType] = useState("add"); 
  
  const isLoading = modalType === 'add' ?  isCreating : isUpdating;
  const isFirstRender = useRef(true);

  useEffect(() => {
    const status = tabValue === "Active" ? true : false;
    if (!isFirstRender.current) {
      fetchCategoryData({ page, limit, status,  filters: { ...filter, status }, });
    }
      if (updateSuccess || deleteSuccess || statusSuccess) {
      fetchCategoryData({ page, limit, status, filters:{} });
      setShowEditDialog(false);
    }
    isFirstRender.current = false;
  }, [tabValue, filter, page, limit ,updateSuccess, deleteSuccess, statusSuccess]);



  const onRefresh = () => {
    const status = tabValue === "Active" ? true : false;
    setFilter({ status });
    fetchCategoryData({ page, limit, filters: { ...filter, status }});
  };

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);




  const handleStatusChange = (row) => {
    setSelectedRow(row)
     setShowStatusDialog(true);
  };

  const confirmStatusChange = (action) => {
  if (action === "continue" && selectedRow) {
    updateStatus({ id: selectedRow.id, status: !selectedRow.status });
  }
  setSelectedRow(null);
  setShowStatusDialog(false);
};

  const handleEdit = (row) => {
    setModalType("edit");
    setSelectedCategory(row);
    setShowEditDialog(true);
  };

    const handleAdd = () => {
      setModalType("add");
      setSelectedCategory(null);
    setShowEditDialog(true);
  };

  const handleDelete = (id) => {
    setCategoryId(id);
    setShowAlertDialog(true);
  };

  const confirmDelete = (action) => {
 if (action === "continue" && categoryId) {
    deleteCategory(categoryId);
  }
  setCategoryId(null);
  setShowAlertDialog(false);
  };

  // const onSave = (payload) => updateCategory(payload);
  const onSave = (payload) => modalType=='add' ? createCategory(payload) : updateCategory(payload);


  return (
    <Container>
      <DataTable
        isLoading={isPending}
        pageTitle="Category"
 
        userData={isPending ? [] : categoryData}  
        handleAdd={handleAdd}
        columns={getColumns({ handleStatusChange, handleEdit, handleDelete, page, limit })}
        renderSkeleton={() => <TableSkeleton columns={getColumns({})} rows={limit} />}
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

      <ConfirmationDialog
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        value={categoryId}
        onResult={confirmDelete}
/>
<ConfirmationBox
  openDialog={showStatusDialog}
  setOpenDialog={setShowStatusDialog}
  value={selectedRow?.id}
  onResult={confirmStatusChange}
  title="Change Status"
  message={`Are you sure you want to ${selectedRow?.status ? "Deactivate" : "Activate"} this category?`}
/>

      <EditCategory
        modalType={modalType}
        open={showEditDialog}
        setOpen={setShowEditDialog}
        category={selectedCategory}
        reloadData={onRefresh}
        isLoading={isLoading}
        setSelectedCategory={setSelectedCategory}
        onSave={onSave}
      />
    </Container>
  );
};

export default CategoryList;
 