
// import React from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
// import { Button } from "@/components/ui/button";
// import MuiButton from "@mui/material/Button";
// import { Download } from "lucide-react";

// const ExportButtons = ({ fileName = "data", data = [] }) => {

//   const handleDownloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(data);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
//     const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//     const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//     saveAs(blob, `${fileName}.xlsx`);
//   };

//   // const handleExportCSV = () => {
//   //   const worksheet = XLSX.utils.json_to_sheet(data);
//   //   const csv = XLSX.utils.sheet_to_csv(worksheet);
//   //   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//   //   saveAs(blob, `${fileName}.csv`);
//   // };

//   return (
//     <>
//        <div className="gap-3 flex">
//               {/* <MuiButton
//                 color="black"
//                 variant="outlined"
//                 size="small"
//                      onClick={handleDownloadExcel}
//                 className="cursor-pointer text-sm"
//               >
//                 Download Excel
//               </MuiButton> */}
//               <Button
//                 size="small"
//                 variant="outline"
//                 className="rounded-full cursor-pointer text-sm px-2"
//                  onClick={handleDownloadExcel}
//               >
//                 Export <Download />
//               </Button>
//             </div>
//     </>
//   );
// };

// export default ExportButtons;

// 

import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ExportButtons = ({ fileName = "data" }) => {
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState({ from: "", to: "" });
  const [loading, setLoading] = useState(false);

  // Call your backend API with date range
  // const fetchData = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/export?from=${dates.from}&to=${dates.to}`
  //     );
  //     const data = await res.json();
  //     return data || [];
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     return [];
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchData = async () => {
  try {
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}getALL_cat`);
    const data = await res.json();

    // if API sometimes returns null/undefined, fallback safely
    return data ?? [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  } finally {
    setLoading(false);
  }
};


  const exportExcel = async () => {
    const data = await fetchData();
    if (!data.length) return alert("No data found for selected dates!");

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `${fileName}.xlsx`);
    setOpen(false);
  };

  const exportCSV = async () => {
    const data = await fetchData();
    if (!data.length) return alert("No data found for selected dates!");

    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${fileName}.csv`);
    setOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <Button
        size="sm"
        variant="outline"
        className="rounded-full cursor-pointer text-sm px-2"
        onClick={() => setOpen(true)}
      >
        Export <Download className="ml-2 h-4 w-4" />
      </Button>

      {/* Popup Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Date Range</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-3">
            <label className="text-sm">From:</label>
            <Input
              type="date"
              value={dates.from}
              onChange={(e) => setDates({ ...dates, from: e.target.value })}
            />

            <label className="text-sm">To:</label>
            <Input
              type="date"
              value={dates.to}
              onChange={(e) => setDates({ ...dates, to: e.target.value })}
            />
          </div>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={exportExcel}
              disabled={loading}
              className="bg-green-600 text-white"
            >
              {loading ? "Exporting..." : "Export Excel"}
            </Button>
            <Button
              onClick={exportCSV}
              disabled={loading}
              className="bg-blue-600 text-white"
            >
              {loading ? "Exporting..." : "Export CSV"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExportButtons;
