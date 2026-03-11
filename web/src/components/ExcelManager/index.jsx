import React, { useState, useCallback, useEffect } from "react";
import {
  Upload,
  Download,
  FileSpreadsheet,
  FileText,
  Trash2,
  Eye,
  X,
  DownloadIcon,
  LoaderIcon,
} from "lucide-react";
import * as XLSX from "xlsx";
import { api } from "../../api/api";
import { showToast } from "../Toast";
import { useDownLoadDataMutation, useDownloadFile, useGetSampleFile, useUploadCouponDataMutation, useUploadCsvFile } from "./useData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Info } from "lucide-react"
import { getCsv } from "../../reactQuery/services/excelManagerApi/excelManagerApi";
import { EXPORT_PRODUCT_FILE } from "../../reactQuery/endPoints";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";




const ExcelManager = ({ downloadUrl, uploadUrl, downloadSampleUrl, uploadCsv }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileData, setFileData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const { mutate: mutateExcelDownload, isPending:excelDownloading } = useDownloadFile();

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setUploadedFile(null);
    setFileData(null);
    setFileName("");
    setError("");
    setShowPreview(false);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  }, []);
  const [uploadCouponData, { isLoading: isUploaderLoading }] = useUploadCouponDataMutation();
  const [DownloadExcel, { isLoading: isDownLoadingExcel }] = useDownLoadDataMutation()
  const { mutate: uploadCsvFile, isPending:uploadingExcel } = useUploadCsvFile()

  const { data: getSampleFileData, refetch: refetchSampleFile, isLoading:downloadingSample } = useGetSampleFile();
  const getSampleFile = async () => {
    refetchSampleFile()
  };
  const DownloadDataInExcel = async () => {
    mutateExcelDownload({ url: downloadUrl, body: { filters: {} } })
  };

  const DownloadSampleExcel = async () => {
    mutateExcelDownload({ url: downloadSampleUrl, body: { filters: {} } })
  };

  const downloadFromUrl = async (url) => {
    if (!url) {
      setError("Please enter a valid URL");
      return;
    }

    setError("");

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      const urlParts = url.split("/");
      const filename = urlParts[urlParts.length - 1] || "downloaded_file.csv";

      link.href = downloadUrl;
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (err) {
      setError(`Failed to download file: ${err.message}`);
    }
  };
  const handleFileUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload  CSV files");
      return;
    }

    setLoading(true);
    setError("");

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        setUploadedFile(file);
        setFileData(jsonData);
        setFileName(file.name.split(".")[0]);
        setLoading(false);
      } catch (err) {
        setError(
          "Error reading file. Please make sure it's a valid Excel or CSV file."
        );
        setLoading(false);
      }
    };

    reader.readAsBinaryString(file);
  }, []);

  const uploadExcelData = async () => {
    if (!uploadedFile) {
      setError("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", uploadedFile);
    uploadCsvFile({ url: uploadUrl, body: formData }, {
      onSuccess:(resp)=>{
        toast.success(resp.message)
        setIsModalOpen(false);
      },
      onError: (err) => {
      console.error("Create failed:", err.response?.data || err.message);
    },
      onSettled: () => {
        setFileData(null)
      }
    });
  };

  const exportAsCSV = useCallback(() => {
    if (!fileData) return;

    const csvContent = fileData
      .map((row) =>
        row
          .map((cell) =>
            typeof cell === "string" && cell.includes(",")
              ? `"${cell}"`
              : cell || ""
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${fileName}_exported.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [fileData, fileName]);

  const clearFile = useCallback(() => {
    setUploadedFile(null);
    setFileData(null);
    setFileName("");
    setError("");
    setShowPreview(false);
    const fileInput = document.getElementById("fileInput");
    if (fileInput) fileInput.value = "";
  }, []);

  const togglePreview = useCallback(() => {
    setShowPreview(!showPreview);
  }, [showPreview]);

  return (
    <div>
      <div className="flex justify-center gap-2">
        {uploadUrl && <button
          onClick={openModal}
          className="cursor-pointer inline-flex items-center space-x-3 bg-blue-600 text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-xs font-medium whitespace-nowrap"
        >
          <FileSpreadsheet className="h-4 w-4" />
          <span className="text-xs">Upload CSV</span>
        </button>}
        {downloadUrl && <button
          disabled={!downloadUrl || excelDownloading}
          onClick={() => DownloadDataInExcel()}
          className="inline-flex items-center space-x-3 
             px-2 py-2 rounded-lg shadow-lg text-xs font-medium whitespace-nowrap
             bg-green-600 text-white hover:bg-green-700 transition-colors 
             disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed disabled:hover:bg-gray-400"
        >
          {excelDownloading?<LoaderIcon className="h-4 w-4 animate-spin" />:
          <DownloadIcon className="h-4 w-4" />}
          <span className="text-xs">{excelDownloading?'Downloading...':'Download CSV'}</span>
        </button>}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full p-0 bg-white">
          <DialogHeader className="flex flex-row items-center justify-between px-4 py-3 border-b">
            <DialogTitle className=" text-lg font-semibold text-gray-800">
              File Upload & Export
            </DialogTitle>
            <button
              onClick={closeModal}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition"
            >
              <X className="h-5 w-5" />
            </button>
          </DialogHeader>

          <div className="px-4 py-3 space-y-4 overflow-y-auto max-h-[70vh]">
            {/* Instructions */}
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-1 rounded-md hover:bg-muted">
                  How to Use <Info className="h-4 w-4 inline text-muted-foreground" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-sm">
                <DialogHeader>
                  {/* <DialogTitle>How to Use</DialogTitle> */}
                </DialogHeader>
                <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                  <li>1️⃣ Export the sample file and fill in your data.</li>
                  <li>2️⃣ Choose the completed CSV file.</li>
                  <li>3️⃣ Preview and upload when ready.</li>
                </ul>
              </DialogContent>
            </Dialog>


            {/* File Upload Box */}
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-blue-400 transition">
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <label htmlFor="fileInput" className="cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-600">
                Choose a CSV file
                <input
                  id="fileInput"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">Only .csv supported</p>
            </div>

            {/* Loading */}
            {loading && (
              <div className="text-center py-2">
                <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <p className="text-xs text-gray-500 mt-1">Processing...</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="p-2 bg-red-100 border border-red-300 text-red-700 text-sm rounded">
                {error}
              </div>
            )}

            {/* Uploaded File Info */}
            {uploadedFile && fileData && (
              <div className="bg-gray-50 rounded-md p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileSpreadsheet className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {fileData.length} rows × {fileData[0]?.length || 0} columns
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={clearFile}
                    className="p-1 text-red-600 hover:bg-red-100 rounded transition"
                    title="Remove file"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={uploadExcelData}
                    disabled={uploadingExcel}
                    className="flex items-center gap-1 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-md hover:bg-orange-600 transition"
                  >
                    {uploadingExcel?<LoaderIcon className="h-4 w-4 animate-spin" />:
                    <Upload className="h-3.5 w-3.5" />}
                     {uploadingExcel?'Uploading...':'Upload CSV'}
                  </button>

                  <button
                    onClick={togglePreview}
                    className="flex items-center gap-1 bg-gray-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-gray-700 transition"
                  >
                    <Eye className="h-3.5 w-3.5" /> {showPreview ? "Hide" : "Show"} Preview
                  </button>
                </div>
              </div>
            )}

            {/* Preview */}
            {showPreview && fileData && (
              <div className="border rounded-md">
                <div className="p-2 border-b bg-gray-50 flex justify-between items-center">
                  <p className="text-sm font-medium text-gray-700">Data Preview</p>
                  <p className="text-xs text-gray-500">
                    Showing first 10 rows
                  </p>
                </div>
                <div className="overflow-x-auto max-h-72">
                  <table className="min-w-full text-xs">
                    <tbody>
                      {fileData.slice(0, 10).map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx === 0 ? "bg-gray-100 font-semibold" : ""}>
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="px-2 py-1 border text-gray-700">
                              {cell || ""}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {fileData.length > 10 && (
                  <div className="p-2 text-center text-xs text-gray-500 border-t">
                    ...and {fileData.length - 10} more rows
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end px-4 py-3 border-t bg-gray-50 gap-2">
            <button
              onClick={closeModal}
              className="px-3 py-1.5 bg-gray-600 text-white text-xs rounded-md hover:bg-gray-700 transition"
            >
              Close
            </button>
            {(
              <button
                // onClick={() => getSampleFile()}
                onClick={() => DownloadSampleExcel()}
                disabled={excelDownloading}
                className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-md text-white ${excelDownloading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                  }`}
              >
                <Download className="h-3.5 w-3.5" />
                {excelDownloading ? "Fetching..." : "Export Sample File"}
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default ExcelManager;