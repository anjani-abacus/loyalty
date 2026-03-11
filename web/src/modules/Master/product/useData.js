import { useMutation } from "@tanstack/react-query";

import { getAllProductApi, deleteProductApi, createProductApi ,updateProductStatusApi ,updateProductApi } from "../../../reactQuery/services/products/productApi";
import moment from "moment";


// ✅ Fetch Product list
export const useProduct = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } =
    useMutation({
      mutationFn: (payload) => getAllProductApi(payload),
    });

  return {
    productData: data?.data || [],
      total: data?.count || 0,  
    tabListData: [
          { key: "Active", count: data?.totalActive ?? 0 },
      { key: "InActive", count: data?.totalInactive ?? 0 },
    ],
    fetchProductData: mutate,
    fetchProductAsync: mutateAsync,
    error,
    isPending,
    isSuccess,
    reset,
  };
};

export const useProductDetail = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } =
    useMutation({
      mutationFn: (payload) => getAllProductApi(payload),
    });

    const product = data?.data[0]

const detail = {
  dateCreated: { label: "Date Created", value: moment(product?.date_created)?.format("DD MMM, YYYY") },
  category: { label: "Category", value: product?.category_name }, // only id is given
  subCategory: { label: "Sub Category", value: product?.sub_category_name }, // only id is given
  productName: { label: "Product Name", value: product?.product_name },
  productCode: { label: "Product Code", value: product?.product_code },
  mrp: { label: "MRP", value: product?.mrp },
  packQty: { label: "Pack QTY.", value: product?.qty },
  brand: { label: "Brand", value: product?.brand },
  pointCategory: { label: "Point Category", value: product?.point_category_name },
  // color: { label: "Color", value: product?.color },
  unitOfMeasurement: { label: "Unit of Measurement", value: product?.uom },
  masterPackingSizeUom: { label: "Master Packing Size", value: product?.master_packing_size_uom },
  smallPackingSize: { label: "Small Packing Size", value: product?.small_packing_size },
  // smallPackingSizeUom: { label: "Small Packing Size", value: product?.small_packing_size_uom },
  masterPackingSize: { label: "Master Packing Size", value: product?.master_packing_size },
  productSize: { label: "Product Size", value: product?.product_size },
  // productThickness: { label: "Product Thickness", value: product?.product_thickness },
  // productDimensionInInch: { label: "Product Dimension In Inch", value: product?.sizes }, // sizes field exists
  // stock: { label: "Stock", value: product?.stock },
  // boxItemWithQr: { label: "Box Item with QR", value: product?.boxWOItem },
  // featureApply: { label: "Feature Apply", value: product?.feature },
  status: { label: "Status", value: product?.status },
  lastUpdatedBy: { label: "Last Updated By", value: product?.last_updated_by_name },
  lastUpdatedOn: { label: "Last Updated On", value: moment(product?.last_update_date)?.format('DD MMM, YYYY') },
  description: { label: "Description", value: product?.description },
};



  return {
    detail:product,
    productData: detail || {},
      total: data?.count || 0,  
    tabListData: [
          { key: "Active", count: data?.totalActive ?? 0 },
      { key: "InActive", count: data?.totalInactive ?? 0 },
    ],
    fetchProductData: mutate,
    fetchProductAsync: mutateAsync,
    error,
    isPending,
    isSuccess,
    reset,
  };
};

// ✅ Delete Product
export const useDeleteProduct = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } =
    useMutation({
      mutationFn: (id) => deleteProductApi(id),
    });

  return {
    deleteProduct: mutate,
    deleteProductAsync: mutateAsync,
    deleteData: data,
    deleteError: error,
    isPending,
    isSuccess,
    reset,
  };
};

export const useProductCreate = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } =
    useMutation({
      mutationFn: (payload) => createProductApi(payload),
    });

  return {
    createProduct: mutate,
    createProductAsync: mutateAsync,
    createData: data,
    createError: error,
    isPending,
  }
}

export const useUpdateProductStatus =()=>{
const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } =
    useMutation({ mutationFn: ({ id, status }) => updateProductStatusApi({ id, status }) });
    
 return {
    updateStatus: mutate,
    updateStatusAsync: mutateAsync,
    updateStatusData: data,
    updateStatusError: error,
    isPending,
    isSuccess,
    reset,
  };

}
export const useUpdateProduct = () => {
  const { mutate, mutateAsync, data, error, isPending, isSuccess, reset } = useMutation({ mutationFn: (payload) => updateProductApi(payload) });
  return { updateProduct: mutate, updateProductAsync: mutateAsync, updateData: data, updateError: error, isPending, isSuccess, reset };
};
