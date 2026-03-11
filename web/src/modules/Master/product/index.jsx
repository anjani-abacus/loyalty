import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { LoaderIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FilterDialog } from "../../../components/filterDialog";
import { ConfirmationBox, ConfirmationDialog } from "../../../components/confirmationDialog";
import getColumns from "./Columns";
import { useProduct, useDeleteProduct ,useUpdateProductStatus } from "./useData";
import TableSkeleton from "../../../skeleton/tableSkeleton";
import { useNavigate } from "react-router-dom";
import { EXPORT_PRODUCT_FILE, EXPORT_SAMPLE_FILE, IMPORT_PRODUCT_FILE } from "../../../reactQuery/endPoints";

const ProductList = () => {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [productId, setProductId] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null)
  const [showStatusDialog, setShowStatusDialog] = useState(false)

  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState("Active");
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

const { fetchProductData, productData, total, tabListData  ,isPending ,error} = useProduct();

const { deleteProduct, isSuccess: deleteSuccess } = useDeleteProduct();
const { updateStatus } =useUpdateProductStatus()



  const isFirstRender = useRef(true);
  useEffect(() => {
    const status = tabValue === "Active" ? true : false;
      fetchProductData({ page, limit, status,  filters:{...filter , status} });
  }, [tabValue, filter, page]);

  useEffect(() => {
    const status = tabValue === "Active" ? true : false;
    if (deleteSuccess) {
      fetchProductData({ page, limit, status, filters:{...filter , status} });
    }
  }, [deleteSuccess]);

  const onRefresh = () => {
    const status = tabValue === "Active" ? true : false;
    setFilter({ status });
    fetchProductData({ page, limit, status, filters:{...filter , status} });
  };
  
  const handleStatusChange = (row) => {
    // updateStatus({ id: row.id, status: !row.status });
    setSelectedRow(row)
     setShowStatusDialog(true)
  };

const handleResult = () => {
  if (selectedRow) {
    const status = tabValue === "Active" ? true : false;

    updateStatus(
      { id: selectedRow.id, status: !selectedRow.status },
      {
        onSuccess: () => {
          fetchProductData({
            page,
            limit,
            filters: { ...filter, status },
          });
        },
      }
    );
  }
  setShowStatusDialog(false);
};



  const handleDelete = (id) => {
    setProductId(id);
    setShowAlertDialog(true);
  };

  const confirmDelete = () => {
    if (productId) deleteProduct(productId);
    setShowAlertDialog(false);
  };

  // if (isPending) {
  //   return (
  //     <Container>
  //       <div className="flex items-center justify-center h-64">
  //         <LoaderIcon className="h-8 w-8 animate-spin" />
  //         <span className="ml-2">Loading products...</span>
  //       </div>
  //     </Container>
  //   );
  // }

  // if (error) {
  //   return (
  //     <Container>
  //       <div className="flex flex-col items-center justify-center h-64 text-center">
  //         <h2 className="text-xl font-semibold text-red-600">
  //           Failed to load products
  //         </h2>
  //         <p className="text-gray-600 mt-2">
  //           {error?.data?.message ||
  //             "We couldn't connect to the server. Please try again later."}
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
        pageTitle="Product"
        isLoading={isPending}
        buttonNavigation="/add-product"
        userData={productData || []}
        downloadUrl={EXPORT_PRODUCT_FILE}
        downloadSampleUrl={EXPORT_SAMPLE_FILE}
        columns={getColumns({handleDelete, handleStatusChange, navigate ,page ,limit})}
        uploadUrl={IMPORT_PRODUCT_FILE}
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
        total={total}
        enableUploadCsv={true}
      />

      <FilterDialog />

      {/* <ConfirmationDialog
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        value={productId}
        onConfirm={confirmDelete}
       
      /> */}

      <ConfirmationBox
        openDialog={showAlertDialog}
        setOpenDialog={setShowAlertDialog}
        value={selectedRow?.id}
        onResult={confirmDelete}
        title="Are you sure?"
        message={`You want to delete this product (Id; ${productId})?`}
      />

      <ConfirmationBox
        openDialog={showStatusDialog}
        setOpenDialog={setShowStatusDialog}
        value={selectedRow?.id}
        onResult={handleResult}
        title="Change Status"
        message={`Are you sure you want to ${selectedRow?.status ? "Deactivate" : "Activate"} this product?`}
      />
    </Container>
  );
};

export default ProductList;
