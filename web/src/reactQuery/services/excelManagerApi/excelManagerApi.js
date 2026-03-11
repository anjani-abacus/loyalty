import client from "../../axiosInstance";
import { EXPORT_SAMPLE_FILE, IMPORT_PRODUCT_FILE } from "../../endPoints";

export const getSampleFileApi = async () => {
 window.open(`${import.meta.env.VITE_BASE_URL}${EXPORT_SAMPLE_FILE}`, "_blank");
}

export const getCsv = async (sampleFile) => {
 window.open(`${import.meta.env.VITE_BASE_URL}${sampleFile}`, "_blank");
}

export const uploadCsvFileApi = async ({url, body}) => {
    const {data} = await client.post(url, body, {
        headers: {
         "Content-Type": "multipart/form-data",
        }
    })
    return data;
}

export const downloadCsvFileApi = async ({url, body}) => {
    const response = await client.post(url, body,
      { responseType: "blob" }
    );

    const downloadLink = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = downloadLink;
    a.download = `${url}.csv` || "exported_file.csv"; // set filename
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(downloadLink);
}