import moment from "moment";
import SwitchButton from "../../components/ui/Switch";
import { Link } from "react-router-dom";
import { Copy, Eye, QrCode, Trash2 } from "lucide-react";
import { copyContent } from "../../utils";

export const getColumns = ({setSelectedImage, handleQrSelect, page, limit }) => [
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
    // {
    //     accessorKey: "created_by_name",
    //     header: "Coupon Type",
    //     cell: ({ row }) => (
    //         <span className="text-foreground">
    //             {row.original.created_by_name || "—"}
    //         </span>
    //     ),
    // },
    // {
    //     accessorKey: "paper_size",
    //     header: "Paper Size",
    //     cell: ({ row }) => (
    //         <span className="text-foreground">
    //             {row.original.paper_size || "—"}
    //         </span>
    //     ),
    // },
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
        accessorKey: "batch_no",
        header: "Batch No.",
        cell: ({ row }) => (
            <span className="text-foreground">
                {row.original.batch_name || "—"}
            </span>
        ),
    },
    {
        accessorKey: "point_category_name",
        header: "Product Category",
        cell: ({ row }) => (
            <span className="text-foreground">
                {row.original.point_category_name || "—"}
            </span>
        ),
    },
    {
        accessorKey: "coupon_code",
        header: "Qr Code",
        cell: ({ row }) => (
            <span className="text-foreground" onClick={() => copyContent((row.original.coupon_code?.toUpperCase() || ''))}>
                {row.original.coupon_code?.toUpperCase() || "—"}
                <Copy className="w-3 h-3 ml-1 inline" />
            </span>
            // <span className="text-foreground">
            //     {row.original.coupon_code || "—"}
            // </span>
        ),
    },
    {
        accessorKey: "coupon_qty",
        header: "View QR Code",
        cell: ({ row }) => (
            <div className="flex gap-2 justify-around">
                <button onClick={()=>setSelectedImage(row.original.coupon_code)} className="flex items-center gap-1 text-blue-600 hover:underline text-[10px] border rounded-2xl px-2 border-blue-100 cursor-pointer">Show QR</button>
            </div>
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
    //         <div className="flex items-center gap-3">
    //             <SwitchButton
    //                 checked={row.original?.del === "active"}
    //                 onChange={() => handleQrSelect(row.original)}
    //             />
    //         </div>
    //     ),
    // },

];

export const getGroupedColumns = ({ handleQrSelect, deleteQrGroup, page, limit }) => [
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
    // {
    //     accessorKey: "created_by_name",
    //     header: "Coupon Type",
    //     cell: ({ row }) => (
    //         <span className="text-foreground">
    //             {row.original.created_by_name || "—"}
    //         </span>
    //     ),
    // },
    {
        accessorKey: "paper_size",
        header: "Paper Size",
        cell: ({ row }) => (
            <span className="text-foreground">
                {row.original.paper_size || "—"}
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
        accessorKey: "batch_no",
        header: "Batch No.",
        cell: ({ row }) => (
            <span className="text-foreground">
                {row.original.batch_name || "—"}
            </span>
        ),
    },
    {
        accessorKey: "point_category_name",
        header: "Product Category",
        cell: ({ row }) => (
            <span className="text-foreground">
                {row.original.point_category_name || "—"}
            </span>
        ),
    },
    {
        accessorKey: "coupon_qty",
        header: "Total QR Code",
        cell: ({ row }) => (
            <div className="flex gap-2 justify-around">
                {row.original.coupon_qty || "—"}
                < Link
                    to={'/QrCode/'+String(row.original.id)}
                    state={{
                        qrCode: row.original?.coupons,
                        listType: "dataList"
                    }}
                    className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                    <button className="text-[10px] border rounded-2xl px-2 border-blue-100 cursor-pointer">Show QR</button>
                </Link >
            </div>
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
    {
        accessorKey: "Action",
        header: "Action",
        // filterType: "selection",
        cell: ({ row }) => (
            <div className="flex justify-center items-center gap-3">
                <button onClick={()=>deleteQrGroup(row.original.id)} >
                    <Trash2 className="w-4 h-4 text-red-500" />
                </button>
            </div>
        ),
    },

];

