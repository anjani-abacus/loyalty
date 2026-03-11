import { useNavigate, useParams } from "react-router-dom";
import { DetailHeader, useAddHeader, useDetailHeader } from "../../../../layouts/DataTable/Header";
import { Edit } from "lucide-react";
import { useProductDetail } from "../useData";
import React, { useEffect } from "react";
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/styles.min.css'

const logsData = [
    { name: "Pankaj Sharma", date: "11 Sep 2025, 12:25 PM", remark: "Order Has Been Created" },
    { name: "Yogesh Singh", date: "09 Oct 2024, 5:53 PM", remark: "Order Has Been Created" },
];


const DetailBlock = ({detail, id, title, data, isLoading }) => {
    const displayData = { ...data };

    return (
        <div className="p-4 bg-card border rounded-lg shadow-xs">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                {title == 'Basic Detail' &&
                    <EditButton id={id} initialData={detail} />}
            </div>
            <div className="flex flex-wrap gap-4 ">
                {Object.entries(displayData).map(([key, item]) => (
                    isLoading ? <div className="relative flex flex-1 h-12 flex-col px-2 py-1  min-w-[150px] rounded-md overflow-hidden b">
                        <div className="absolute inset-0 bg-gradient-to-r  from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
                    </div> :
                        (item?.type == 'Image' ? <div
                            title={item?.value || "---"}
                            key={key}
                            className="flex flex-1 flex-col px-2 py-1 hover:bg-gray-100 bg-gray-50 min-w-[150px] rounded-md"
                        >
                            <span className="text-gray-500 text-xs">{item?.label}</span>
                            <a href={item?.value} target="_blank"><img className="cursor-pointer" src={item?.value} height={'50px'} width={'50px'} /></a>
                        </div> : <div
                            title={item?.value || "---"}
                            key={key}
                            className="flex flex-1 flex-col px-2 py-1 bg-background min-w-[150px] rounded-md"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground text-xs">{item?.label}</span>
                                {item?.action && (
                                    <button onClick={item.action.onClick} className="items-center flex cursor-pointer mt-1 text-blue-600 text-xs hover:underline">
                                        {item?.action?.label}
                                        {item?.action?.icon && React.createElement(item?.action?.icon, { className: "w-4 h-4 ml-1 inline" })}
                                    </button>)}

                            </div>
                            <span className="line-clamp-1 text-foreground font-medium">{item?.value || "---"}</span>
                        </div>)
                ))}
            </div>
        </div>
    );
};


const EditButton = ({id, initialData}) => {
    const pageTitle = useDetailHeader();
    const navigate = useNavigate();
    return <button onClick={() => navigate(`/edit-product/${id}`, { state: { pageTitle: pageTitle, mode: 'edit', initialData } })} className="cursor-pointer">
        <Edit height={'20px'} width={'20px'} />
    </button>
}

const ProductDetail = () => {
    const pageTitle = useDetailHeader();
    const params = useParams();

    const { detail, fetchProductData, productData, isLoading } = useProductDetail()
    
    useEffect(() => {
        fetchProductData({ page: 1, filters: { id: Number(params?.id) } })
    }, [])

    return (
        <>
            <DetailHeader pageTitle={"Product Detail"} />

            <div className="flex mt-4 gap-2 p-4 pt-0">
                {/* Left: Image */}
                <div className="w-[320px] p-2 bg-card border rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col gap-3">
                        {/* Product Image */}
                        <InnerImageZoom
                            src={detail?.images[0]?.image}
                            // src=''
                            zoomSrc={detail?.images[0]?.image}
                            zoomType="hover"
                            zoomPreload
                            className="w-full rounded-xl object-cover"
                        />

                        {/* Product Name */}
                        <h1 className="text-lg font-semibold text-foreground capitalize line-clamp-2">
                            {productData?.productName?.value || "Product Name"}
                        </h1>
                        <h2 className="text-sm text-muted-foreground capitalize line-clamp-2">
                            {productData?.description?.value || "Product Description"}
                        </h2>

                        {/* Category Badges */}
                        <div className="flex gap-2 py-2 border-b border-gray-200 flex-wrap">
                            <span className="border px-3 py-1 text-sm bg-section-background border-blue-600 text-blue-700 rounded-full font-medium">
                                {productData?.category?.value || "Category"}
                            </span>
                            <span className="border px-3 py-1 text-sm bg-section-background border-green-600 text-green-700 rounded-full font-medium">
                                {productData?.subCategory?.value || "Sub Category"}
                            </span>
                        </div>

                        {/* Price Section */}
                        <div className="flex flex-col gap-2 py-4">
                            <h3 className="text-2xl font-bold text-foreground">
                                ₹{productData?.mrp?.value || "5,000"}
                            </h3>
                            {productData?.netPrice?.value && (
                                <p className="text-sm text-foreground">
                                    Net Price:{" "}
                                    <span className="font-medium text-muted-foreground">
                                        ₹{productData?.netPrice?.value}
                                    </span>
                                </p>
                            )}
                        </div>

                        {/* Extra Info (Optional) */}
                        <div className="flex justify-between items-center border-t pt-3 text-sm text-foreground">
                            <span>Brand: <span className="font-medium text-muted-foreground">{productData?.brand?.value || "N/A"}</span></span>
                            {/* <span>Stock: <span className="font-medium text-gray-700">{productData?.stock?.value || 0}</span></span> */}
                        </div>
                    </div>
                </div>


                {/* Right: Detail Sections */}
                <div className="flex-1 flex flex-col gap-6 ">
                    <div className="flex flex-col gap-2 ">
                        <DetailBlock detail={detail} id={params?.id} title={'Basic Detail'} data={productData} isLoading={isLoading} />

                    </div>
                </div>


            </div>
        </>
    );
};

export default ProductDetail;