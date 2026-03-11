// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { api } from '../../../api/api';

// export const productApi = createApi({
//     reducerPath: "productApi",
//     baseQuery: fetchBaseQuery({
//         baseUrl: api,
//         credentials: 'include',
//         prepareHeaders: (headers, { getState }) => {
//             const token = getState().auth.token;
//             if (token) {
//                 headers.set('authorization', `Bearer ${token}`);
//             }
//             return headers;
//         },
//     }),
//     tagTypes: ["Product"],
//     endpoints: (builder) => ({

//         createProduct: builder.mutation({
//             query: (data) => ({
//                 url: "/product/create_product",
//                 method: "POST",
//                 body: data
//             }),
//             invalidatesTags: ["Product"],
//         }),

//         getAllProducts: builder.query({
//             query: () => "/product/getAll_product",
//             providesTags: ["Product"],
//         }),
//         deleteProduct: builder.mutation({
//             query: (id) => ({
//                 url: `/product/delete_product/${id}`,
//                 method: "DELETE",
//             }),
//             invalidatesTags: ["Product"],
//         }),
//     }),
// });

// export const { useCreateProductMutation,useGetAllProductsQuery ,useDeleteProductMutation} = productApi;



    import client from "../../axiosInstance";
import { DELETE_PRODUCT, PRODUCTS_LIST ,UPDATE_PRODUCT, UPDATE_PRODUCT_DATA } from "../../endPoints";

export const getAllProductApi = async (payload) => {
  const res = await client.post(PRODUCTS_LIST, payload);
  return res.data; 
};

export const updateProductApi =async ({id ,payload})=>{
  const {data}=await client.put(UPDATE_PRODUCT_DATA(id), payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return data;
}

export const updateProductStatusApi = async({id ,status})=>{
  const { data } = await client.put(UPDATE_PRODUCT(id), {status});
  return data;
};

export const deleteProductApi = async (id) => {
  const res = await client.delete(DELETE_PRODUCT(id));
  return res.data;
};

export const createProductApi = async (payload) => {
  const res = await client.post(`create_product`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};