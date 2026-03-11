import { DataTable } from "../../../layouts/DataTable";
import Container from "../../../components/ui/container";
import { useLocation, useParams } from "react-router-dom";
import { forwardRef, useEffect, useRef, useState } from "react";
import { ConfirmationDialog } from "../../../components/confirmationDialog";
import { HashLoader } from "react-spinners";
import { FilterDialog } from "../../../components/filterDialog";
import { getColumns } from "./Columns";
import QRCodeLayout from "../../../components/qrCode/QrCode";
import { DataTableHeader } from "../../../layouts/DataTable/Header";
import { Copy, Eye, EyeClosed, List, Plus, Printer } from "lucide-react";
import { copyContent } from "../../../utils";
import { Button } from "@/components/ui/button";
import { useReactToPrint } from "react-to-print";

const QrCodeDetail = () => {
  const { Category } = useParams();
  const location = useLocation()
  const [listType, setListType] = useState("dataList")

  const contentRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef, // ✅ v3 API
  });

  const { qrCode: qrListData } = location.state || {}
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [selectedQr, setSelectedQr] = useState(null);
  console.log(qrListData)
  // DATA LAYER CONFIG
  const [tabValue, setTabValue] = useState("Active");
  const [filter, setFilter] = useState({})
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const isFirstRender = useRef(true)

  // DATA LAYER CONFIG

  const handleStatusChange = () => { }
  const handleViewInfluencer = () => { }

  const handleQrSelect = (Qr) => {
    setShowAlertDialog(true);
    setSelectedQr(Qr);
  };

  return (
    <Container>
      {listType == 'dataList' && <>
        <DataTable
          pageTitle="QR Codes Detail"
          userData={qrListData || []}
          handlers={[
            { title: 'Preview', action: () => setListType("qrList"), icon:Eye },
          ]}

          columns={getColumns({ handleQrSelect, page, limit })}
          defaultValue={tabValue}
          setTabValue={setTabValue}
          setFilter={setFilter}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          total={30}
        />

        <FilterDialog />
        <ConfirmationDialog
          openDialog={showAlertDialog}
          setOpenDialog={setShowAlertDialog}
          value={selectedQr}
        />
      </>}

      {listType == 'qrList' && <>
        <DataTableHeader pageTitle={"QR Codes Detail"} />

        <div className="flex flex-1 mt-4 flex-col gap-4 p-4 pt-0">
          <div className="p-2 flex justify-end bg-background border-1 rounded-lg items-center">
            <div className="flex gap-3 items-center">
              
              <Button
                size="sm"
                className="ml-4 text-sm p-2 flex items-center gap-2"
                onClick={() => handlePrint()}
              >
                {'Print Coupons'} <Printer size={16} />
              </Button>
              <Button
                size="sm"
                className="ml-4 text-sm p-2 flex items-center gap-2"
                onClick={() => setListType("dataList")}
              >
                {'List View'} <List size={16} />
              </Button>
            </div>
          </div>
        </div>
        <ComponentToPrint qrListData={qrListData} contentRef={contentRef} />
      </>}
    </Container>
  );
};

export default QrCodeDetail;

const ComponentToPrint = ({ qrListData, contentRef }) => (
  <div className="h-[calc(100vh-150px)] overflow-auto">
    <div className="flex flex-wrap p-4 gap-2" ref={contentRef}>
    {
      qrListData?.map((data) => {
        return <div key={data?.coupon_code} className="bg-section-backgroundbackground p-1 w-[120px]">
          <QRCodeLayout size={50} value={data?.coupon_code?.toUpperCase()} />
          <span className="text-foreground text-center" onClick={() => copyContent((data?.coupon_code?.toUpperCase() || ''))}>
            {data?.coupon_code?.toUpperCase() || "—"}
            <Copy className="w-3 h-3 ml-1 inline" />
          </span>
        </div>
      })
    }
  </div>
  </div>
)