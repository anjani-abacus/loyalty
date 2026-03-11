import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import { DataTableHeader } from "../../../layouts/DataTable/Header"
import { FormSelect, FormSubmitButton, FormTextArea } from "../../../components/forms"
import { FormInput } from "../../../components/forms"

import { User } from "lucide-react"

import { useAddHeader } from "../../../layouts/DataTable/Header"
// import { useCreateInfluencer, useUpdateInfluencer } from "../useData"
import { useLocation, useNavigate } from "react-router-dom"
import { useCreateQr, useProductItemList, useProductSize } from "../useData"
import QrCode, { GroupedQrCode } from "../index"


// ------------------- Constants -------------------
const INITIAL_VALUES = {
    template_id: "",
    product_id: "",
    coupon_qty: "",
    remark: "",
    batch_name: ""
};

const schema = yup.object().shape({
    template_id: yup.string().required("Paper size is required"),
    product_id: yup.number().transform((value, originalValue) => (originalValue === "" ? undefined : value)).required("Product name is required"),
    coupon_qty: yup.number().transform((value, originalValue) => (originalValue === "" ? undefined : value)).required("QR quantity is required"),
    remark: yup.string().required("Remark is required")
});

// ------------------- Component -------------------
export default function AddQrCode() {
    const { productSizeData, isLoading: isLoadingSize, error: errorProductSize } = useProductSize();
    // const { productItemData, isLoading:isLoadingProductItem, error:errorProductItem } = useProductItemList();
    const { fetchItemData, productItemData, total, tabListData, isPending } = useProductItemList();
    const { mutateAsync: createQr, isPending: isCreating } = useCreateQr()
    const navigate = useNavigate()

    const isLoading = isCreating || isPending || isLoadingSize
    useEffect(() => {
        fetchItemData({ page: 1, limit: 50, filters: {} })
    }, [])

    const methods = useForm({
        defaultValues: INITIAL_VALUES,
        resolver: yupResolver(schema),
    })


    const {
        handleSubmit,
        reset,
        register,
        watch,
        
        control,
        formState: {errors, isSubmitting },
    } = methods

    const location = useLocation()
    const { mode = "add", initialData } = location.state || {}

    const selectedDocType = watch("documentType")
    const selectedProductId = watch("product_id")

    // const { mutate: createInfluencer } = useCreateInfluencer()
    // const { mutate: updateInfluencer } = useUpdateInfluencer()

    const [reloadFlag, setReloadFlag] = useState(false)

    const onSubmit = (data) => {

        const request = { ...data }
        const selectedProduct = productItemData?.filter((item) => item?.id == data?.product_id)[0]


        request.point_category_name = selectedProduct?.point_category_name
        request.point_category_id = selectedProduct?.point_category_id
        request.product_mrp = selectedProduct?.mrp
        request.product_qty = 1
        request.product_detail = selectedProduct.product_name
        request.paper_size = productSizeData?.filter((item) => item?.id == data?.template_id)[0]?.size

        createQr(request, {
            onSuccess: () => {
                // navigate(-1)
                setReloadFlag(prev => !prev);
                toast.success("Qr Code Generated");
                reset({})
            }
        })
    }

    // Reset form when editing and data changes
    useEffect(() => {
        if (mode === "edit" && initialData) {
            reset(initialData)
        }
    }, [mode, initialData, reset])

    const pageTitle = useAddHeader(mode)

    return (
        <>
            <DataTableHeader pageTitle={pageTitle} />

            <div className="px-4">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-2 mt-3">
                        {/* Basic Information */}
                        <SectionCard title="Gift Information" icon={<User className="w-4 h-4" />}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <FormSelect
                                    label="Paper Size"
                                    name="template_id"
                                    control={control}
                                    error={errors?.template_id}
                                    options={productSizeData}
                                    register={register}
                                    optionLabel="size"
                                    optionValue="id"
                                    required
                                />
                                <div>
                                    <FormSelect
                                    label="Product Name"
                                    name="product_id"
                                    control={control}
                                    error={errors?.product_id}
                                    options={productItemData}
                                    register={register}
                                    optionLabel="product_name"
                                    optionValue="id"
                                    required
                                />
                                {
                                selectedProductId && (productItemData?.find(p => p.id == selectedProductId)?.point_category_name && (productItemData?.find(p => p.id == selectedProductId)?.point_category_name!='undefined')
                                 ?
                                <span className="text-green-700">Assigned Point Category: {productItemData?.find(elem=>elem.id==selectedProductId)?.point_category_name}</span>:
                                <span className="text-red-600">Point category not assigned on selected product</span>)
                                }
                                </div>

                                <FormInput
                                    label="Batch No"
                                    name="batch_name"
                                    type="text"
                                    register={register}
                                    error={errors?.batch_name}
                                />
                                <FormInput
                                    label="Total Number of QR Code"
                                    name="coupon_qty"
                                    type="tel"
                                    register={register}
                                    error={errors?.coupon_qty}
                                    required
                                />
                            </div>
                        </SectionCard>

                        <SectionCard>
                            <FormTextArea
                                label="Remark"
                                name="remark"
                                register={register}
                                error={errors?.remark}
                                rows={3}
                                required
                                className="h-14"
                            />
                        </SectionCard>

                        {/* Buttons */}
                        <div className="sticky top-0 z-20 py-3 flex justify-end gap-3 ">

                            <FormSubmitButton
                                mode={mode}
                                isLoading={isLoading}
                                size="sm"
                                className="w-40"
                                variant="add"
                                disabled={isLoading}
                            >
                                {mode === "add" ? "Add " : "Edit"}
                            </FormSubmitButton>

                            <FormSubmitButton
                                type="button"
                                mode="action"
                                actionLabel="Discard All"
                                variant="orange"
                                size="sm"
                                // isLoading={isSubmitting}
                                onClick={() => reset(initialData || INITIAL_VALUES)}
                            // loadingLabel="Discarding..."
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>

            <div className="px-4 pt-4">
                <GroupedQrCode disableHeader={true} buttonNavigation={false} reload={reloadFlag} />
            </div>
        </>
    )
}

/** Section Card wrapper */
function SectionCard({ title, icon, children }) {
    return (
        <div className="bg-section-background rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            {(title || icon) && <h3 className="flex items-center gap-2 text-sm font-semibold text-foregorund mb-2">
                <span className="text-indigo-500">{icon}</span>
                {title}
            </h3>}
            <div className="space-y-4">{children}</div>
        </div>
    )
}