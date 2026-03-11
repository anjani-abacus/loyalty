import moment from "moment";
import SwitchButton from "../../../components/ui/Switch";
import { Link } from "react-router-dom";
import { Copy } from "lucide-react";
import { copyContent } from "../../../utils";
import QRCodeLayout from "../../../components/qrCode/QrCode";

export const getColumns = ({ handleQrSelect, page, limit }) => [
    {
        accessorKey: "",
        header: "Sr.No.",
        filterType: "",
        cell: ({ row }) => row.index + 1 + (page > 1 ? limit * (page - 1) : 0),
    },
    {
        accessorKey: "date_created",
        header: "Date Created",
        filterType: "date",
        cell: ({ row }) => (
            <span className="text-gray-500">
                {moment(row.original.date_created).format("DD MMM YYYY")}
            </span>
        ),
    },
    {
        accessorKey: "created_by_name",
        header: "Created By",
        cell: ({ row }) => (
            <span className="text-foreground">
                {row.original.created_by_name || "—"}
            </span>
        ),
    },
    {
        accessorKey: "small_box_qr_code",
        header: "Small Box QR Code",
        cell: ({ row }) => (
            <span className="text-foreground">
                {row.original.small_box_qr_code || "—"}
            </span>
        ),
    },
    {
        accessorKey: "coupon_code",
        header: "Product QR Code",
        cell: ({ row }) => (
            <span className="text-foreground" onClick={()=>copyContent((row.original.coupon_code?.toUpperCase() || ''))}>
                {row.original.coupon_code?.toUpperCase() || "—"}
                <Copy className="w-3 h-3 ml-1 inline" />
            </span>
            // <QRCodeLayout size={50} value={row.original.coupon_code?.toUpperCase()} />
        ),
    },
    
    
    {
        accessorKey: "batch_name",
        header: "Batch No.",
        cell: ({ row }) => (
            <span className="text-foreground">
                {row.original.batch_name || "—"}
            </span>
        ),
    },
    {
        accessorKey: "product_detail",
        header: "Product Detail",
        cell: ({ row }) => (
            <span className="text-foreground">
                {row.original.product_detail || "—"}
            </span>
        ),
    },
    {
        accessorKey: "remark",
        header: "Remark",
        cell: ({ row }) => (
            <span className="text-foreground block  max-w-[200px] truncate" title={row.original.remark}>
                {row.original.remark || "—"}
            </span>
        ),
    },
    // {
    //     accessorKey: "Action",
    //     header: "Action",
    //     // filterType: "selection",
    //     cell: ({ row }) => (
    //         <SwitchButton
    //             checked={row.original?.status === "active"}
    //             onChange={() => handleQrSelect(row.original)}
    //         />
    //     ),
    // },

];
