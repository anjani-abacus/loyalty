import { DataTable } from "../../layouts/DataTable";
import Container from "../../components/ui/container";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ConfirmationBox, ConfirmationDialog } from "../../components/confirmationDialog";
// import { HashLoader } from "react-spinners";
import { FilterDialog } from "../../components/filterDialog";
import { getColumns, getGroupedColumns } from "./Columns";
import { useDeleteQrGrouped, useQrGrouped, useQrListTabWise } from "./useData";
import TableSkeleton from "../../skeleton/tableSkeleton";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Copy, X } from "lucide-react";
import QRCodeLayout from "../../components/qrCode/QrCode";
import { copyContent } from "../../utils";

const QrCode = (props) => {
    const { Category } = useParams();
    const { reload } = props;

    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [selectedQr, setSelectedQr] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);


    // DATA LAYER CONFIG
    const [tabValue, setTabValue] = useState("Not Scanned Coupons");
    const [filter, setFilter] = useState({ "is_Scanned": false })
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const { qrListData, fetchQrListData, total, tabListData, error, isPending } = useQrListTabWise();

    useEffect(() => {
        fetchQrListData({ page: page, limit: limit, filters: filter })
    }, [])

    const isFirstRender = useRef(true)

    useEffect(()=>{
        
        setFilter((prev)=>{
            return ({...prev, is_Scanned:(tabValue=='Scanned Coupons')})
        })
    }, [tabValue])

    useEffect(() => {
        if (!isFirstRender?.current) fetchQrListData({ page: page, limit: limit, filters: filter })
        isFirstRender.current = false
    }, [tabValue, filter, page, reload])

    const onRefresh = () => {
        setFilter({})
    }
    // DATA LAYER CONFIG

    const handleStatusChange = () => { }
    const handleViewInfluencer = () => { }

    const handleQrSelect = (Qr) => {
        setShowAlertDialog(true);
        setSelectedQr(Qr);
    };

    return (
        <Container>
            {/* {isPending ? (
                <div className="flex items-center justify-center h-[100vh]">
                     <HashLoader color="#0BAAF4" loading={isPending} /> 
                </div>
            ) : ( */}
            <>
                <DataTable
                    pageTitle="QR Codes"
                    isLoading={isPending}
                    buttonNavigation="/add-qrCode"
                    buttonNavTitle={"Generate Coupon"}
                    {...props}
                    userData={qrListData || []}
                    renderSkeleton={() => <TableSkeleton columns={getColumns({})} rows={limit} />}

                    columns={getColumns({ setSelectedImage, handleQrSelect, page, limit })}
                    defaultValue={tabValue}
                    tabListData={tabListData}
                    setTabValue={setTabValue}
                    setFilter={setFilter}
                    onRefresh={onRefresh}
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                    total={tabListData?.filter((item) => (item?.key == tabValue))[0]?.count}
                />

                <FilterDialog />
                <ConfirmationDialog
                    openDialog={showAlertDialog}
                    setOpenDialog={setShowAlertDialog}
                    value={selectedQr}
                />
            </>

            <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
                <DialogContent className="flex-col justify-center bg-white">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <X />
                        </button>
                        <QRCodeLayout size={100} value={selectedImage?.toUpperCase()} />
                        <span className="text-foreground text-center" onClick={() => copyContent((selectedImage?.toUpperCase() || ''))}>
                            {selectedImage?.toUpperCase() || "—"}
                            <Copy className="cursor-pointer w-3 h-3 ml-1 inline" />
                        </span>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

const GroupedQrCode = (props) => {
    const { Category } = useParams();
    const { reload } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null)

    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [selectedQr, setSelectedQr] = useState(null);





    // DATA LAYER CONFIG
    const [tabValue, setTabValue] = useState("Not Scanned Coupons");
    const [filter, setFilter] = useState({})
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);
    const { qrListData, fetchQrListData, total, tabListData, error, isPending } = useQrGrouped();
    const { mutate: deleteQrCodeGroup } = useDeleteQrGrouped()
    // const { qrListData, fetchQrListData, total, tabListData, error, isPending } = useQrListTabWise();

    useEffect(() => {
        fetchQrListData({ page: page, limit: limit, filters: filter })
    }, [])

    const isFirstRender = useRef(true)
    useEffect(() => {
        if (!isFirstRender?.current) fetchQrListData({ page: page, limit: limit, filters: filter })
        isFirstRender.current = false
    }, [tabValue, filter, page, reload])

    const onRefresh = () => {
        setFilter({})
    }
    // DATA LAYER CONFIG

    const handleStatusChange = () => { }
    const handleViewInfluencer = () => { }

    const handleQrSelect = (Qr) => {
        setShowAlertDialog(true);
        setSelectedQr(Qr);
    };

    const handleDialogResult = (action) => {
        if (action === "continue" && selectedId) {
            deleteQrCodeGroup(selectedId, {
                onSuccess: () => {
                    fetchQrListData({ page: page, limit: limit, filters: filter })
                }
            })
        }
        setOpenDialog(false);
        setSelectedId(null);
    };

    const deleteQrGroup = (id) => {
        setOpenDialog(true);
        setSelectedId(id);


    }

    return (
        <Container>
            {/* {isPending ? (
                <div className="flex items-center justify-center h-[100vh]">
                     <HashLoader color="#0BAAF4" loading={isPending} /> 
                </div>
            ) : ( */}
            <>
                <DataTable
                    pageTitle="QR Codes"
                    isLoading={isPending}
                    buttonNavigation="/add-qrCode"
                    buttonNavTitle={"Generate Coupon"}
                    {...props}
                    userData={qrListData || []}
                    renderSkeleton={() => <TableSkeleton columns={getColumns({})} rows={limit} />}

                    columns={getGroupedColumns({ deleteQrGroup, handleQrSelect, page, limit })}
                    defaultValue={tabValue}
                    // tabListData={tabListData}
                    setTabValue={setTabValue}
                    setFilter={setFilter}
                    onRefresh={onRefresh}
                    page={page}
                    setPage={setPage}
                    limit={limit}
                    setLimit={setLimit}
                    total={tabListData?.filter((item) => (item?.key == tabValue))[0]?.count}
                />

                <FilterDialog />
            </>

            <ConfirmationBox
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                title="Delete QR Codes"
                message="Are you sure? This action cannot be undone."
                onResult={handleDialogResult}
            />
        </Container>
    );
};

export default QrCode;
export { GroupedQrCode }