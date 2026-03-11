
import client from "../../axiosInstance";
import { CREATE_QR_CODE, DELETE_QR_GROUPED, PRODUCT_LIST, QR_CODE_LIST_GROUPED, QR_CODE_LIST_TAB_WISE, QR_TEMPLATE_LIST } from "../../endPoints";

export const fetchQrCodeListGrouped = async ({status, page, limit, ...filter}) => {
  const {data} = await client.post(QR_CODE_LIST_GROUPED, {status, page, limit, ...filter})
  return data;
}

export const deleteQrCodeGrouped = async (request) => {
  console.log(request)
  const {data} = await client.delete(DELETE_QR_GROUPED(request))
  return data;
}

export const fetchQrCodeListTabWise = async ({status, page, limit, ...filter}) => {
  const {data} = await client.post(QR_CODE_LIST_TAB_WISE, {status, page, limit, ...filter})
  return data;
}

export const fetchProductSizeList = async () => {
  const {data} = await client.get(QR_TEMPLATE_LIST)
  return data;
}

export const fetchProductItemList = async (payload) => {
  const {data} = await client.post(PRODUCT_LIST , payload)
  return data;
}

export const createQr = async payload => {
    const {data} = await client.post(CREATE_QR_CODE, payload)
    return data;
  }