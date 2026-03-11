import {DELETE_PDF_CATALOGUE, PDF_CATALOGUE ,CREATE_PDF_CATALOGUE} from "../../../reactQuery/endPoints"
import client from "../../axiosInstance";


export const getAllPdfCatalogueApi = async (payload) => {
  const res = await client.post(PDF_CATALOGUE, payload);
  return res.data; 
};


export const createPdfCatalogueApi = async (payload) => {
  const res = await client.post(CREATE_PDF_CATALOGUE, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deletePdfCatalogueApi =async (id)=>{
     const res = await client.delete(DELETE_PDF_CATALOGUE(id));
  return res.data;  

}
