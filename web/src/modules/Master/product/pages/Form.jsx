import { useForm, FormProvider } from "react-hook-form";
import { useEffect, useState } from "react";
import { DataTableHeader } from "../../../../layouts/DataTable/Header";
import { FormInput, FormSelect, FormTextArea, FormSubmitButton } from "../../../../components/forms";
import { User } from "lucide-react";
import { useAddHeader } from "../../../../layouts/DataTable/Header";
import { useLocation, useNavigate } from "react-router-dom";
import ImageUploader from "../../../../components/forms/FormImageUploader";
import { useProductCreate, useUpdateProduct } from "../useData";
import FormSelectField from "../../../../components/forms/FormSelectField";
import { useCategory } from "../../category/useData";
import { useSubCategory } from "../../subcategory/useData";
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { usePointCategory } from "../../pointCategoryList/useData";

// ------------------- Constants -------------------
const INITIAL_VALUES = {
    "product_name": "",
    "product_code": "",
    "mrp": "",
    "brand": "",
    "master_packing_size": "",
    "small_packing_size": "",
    "point_category_id": "",
    "product_scan": "",
    "product_size": "",
    "description": "",
    "qty": "",
    "uom": "",
    "category_name": "",
    "sub_category_name": ""
}

export const schema = Yup.object().shape({
    product_name: Yup.string()
        .trim()
        .required("Product name is required"),

    product_code: Yup.string()
        .trim()
        .required("Product code is required"),

    mrp: Yup.number()
        .typeError("MRP must be a valid number")
        .positive("MRP must be greater than zero")
        .required("MRP is required"),

    brand: Yup.string()
        .trim()
        .required("Brand is required"),

    master_packing_size: Yup.string()
        .trim()
        .required("Master packing size is required"),

    small_packing_size: Yup.string()
        .trim()
        .required("Small packing size is required"),

    point_category_id: Yup.string()
        .trim()
        .required("Coupon point is required"),

    product_scan: Yup.string()
        .trim()
        .required("Product scan is required"),

    product_size: Yup.string()
        .trim()
        .required("Product size is required"),

    description: Yup.string()
        .trim()
        .required("Description is required"),

    qty: Yup.number()
        .typeError("Quantity must be a valid number")
        .integer("Quantity must be an integer")
        .min(1, "Quantity must be at least 1")
        .required("Quantity is required"),
    uom: Yup.string()
        .trim()
        .oneOf(["KG", "SQFT", "PCS", "LTR"], "Invalid UOM. Allowed: KG, SQFT, PCS, LTR")
        .required("Unit of measure (UOM) is required"),


    category_name: Yup.string()
        .trim()
        .required("Category name is required"),

    sub_category_name: Yup.string()
        .trim()
        .required("Sub category name is required"),
});


// ------------------- Component -------------------
export default function ProductAdd() {
    const [selectedImage, setSelectedImage] = useState(null);
    const { createProduct, isPending: isCreating } = useProductCreate()
    const navigate = useNavigate();
    const isLoading = isCreating

    const { categoryData, fetchCategoryData } = useCategory();
    const { subCategoryData, fetchSubCategoryData } = useSubCategory();
    const { pointCategoryData, fetchPointCategoryData } = usePointCategory();
    const { updateProduct } = useUpdateProduct()

    const methods = useForm({
        defaultValues: INITIAL_VALUES,
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        fetchCategoryData({ page: 1, limit: 50, status: true });
        fetchPointCategoryData({ page: 1, limit: 50, filter: {} })
    }, [])

    const {
        handleSubmit,
        reset,
        register,
        control,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = methods;

    const location = useLocation();
    const { mode = "add", initialData } = location.state || {};

    const onSubmit = (data) => {

        const formData = new FormData();
        if (selectedImage) {
            formData.append("image", selectedImage);
        }

        formData.append("category_id", Number(categoryData?.filter((item) => item?.category == data?.category_name)[0]?.id));
        formData.append("sub_category_id", Number(subCategoryData?.filter((item) => item?.sub_category_name == data?.sub_category_name)[0]?.id));
        formData.append("point_category_name", String(pointCategoryData?.filter((item) => item?.id == data?.point_category_id)[0]?.point_category_name));

        if (mode == 'add') {
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            // formData.append("influencer_point", Number(pointCategoryData?.filter((item)=>item?.id == data?.point_category_id)[0]?.influencer_point));
            createProduct(formData, {
                onSuccess: () => { reset(INITIAL_VALUES); setSelectedImage(null); navigate(-1) },
            })
        }

        if (mode == 'edit') {
            formData.append('product_name', data?.product_name);
            formData.append('product_code', data?.product_code);
            formData.append('mrp', data?.mrp);
            formData.append('brand', data?.brand);
            formData.append('master_packing_size', data?.master_packing_size);
            formData.append('small_packing_size', data?.small_packing_size);
            formData.append('product_size', data?.product_size);
            formData.append('description', data?.description);
            formData.append('qty', data?.qty);

            formData.append('uom', data?.uom);
            formData.append('category_name', data?.category_name);
            formData.append('sub_category_name', data?.sub_category_name);
            formData.append('point_category_id', data?.point_category_id);

            updateProduct({ id: data?.id, payload: formData }, {
                onSuccess: () => { reset(INITIAL_VALUES); setSelectedImage(null); navigate(-1) },
            })
        }
    };

    useEffect(() => {
        if (mode === "edit" && initialData) {
            fetchSubCategoryData({ page: 1, limit: 50, filters: { master_category_name: initialData?.category_name } });

            const formdata = Object.fromEntries(
                Object.entries(initialData).filter(([key]) => Object.keys(INITIAL_VALUES).includes(key))
            );
            reset({ ...formdata, id: initialData?.id });
        }
    }, [mode, initialData, reset]);

    const pageTitle = useAddHeader(mode);


    const onCategoryChange = (val) => {
        fetchSubCategoryData({ page: 1, limit: 50, filters: { master_category_name: val } });

    }

    return (
        <>
            <DataTableHeader pageTitle={pageTitle} />

            <div className="px-4">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-2 mt-3">
                        {/* Basic Information */}
                        <SectionCard title="Basic Information" icon={<User className="w-4 h-4" />}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <FormSelectField
                                    label="Category"
                                    name="category_name"
                                    options={categoryData?.map(item => ({ label: item?.category, value: item?.category }))}
                                    value={watch("category_name")}
                                    onChange={(val) => { setValue("category_name", val); onCategoryChange(val) }}
                                    error={errors.category_name}
                                    required
                                />

                                <FormSelectField
                                    label="Sub Category"
                                    name="sub_category_name"
                                    options={subCategoryData?.map(item => ({ label: item?.sub_category_name, value: item?.sub_category_name }))}
                                    value={watch("sub_category_name")}
                                    onChange={(val) => { setValue("sub_category_name", val) }}
                                    error={errors.sub_category_name}
                                    required
                                />

                                <FormInput
                                    label="Product Name"
                                    name="product_name"
                                    type="text"
                                    register={register}
                                    error={errors?.product_name}
                                    required
                                />

                                <FormInput
                                    label="Product Code"
                                    name="product_code"
                                    type="text"
                                    register={register}
                                    error={errors?.product_code}
                                    required
                                />

                                <FormInput
                                    label="MRP"
                                    name="mrp"
                                    type="number"
                                    register={register}
                                    error={errors?.mrp}
                                    required
                                />

                                <FormInput
                                    label="Pack Qty."
                                    name="qty"
                                    type="number"
                                    register={register}
                                    error={errors?.qty}
                                    required
                                />

                                <FormInput
                                    label="Master Packing Size"
                                    name="master_packing_size"
                                    type="number"
                                    register={register}
                                    error={errors?.master_packing_size}
                                    required
                                />

                                <FormInput
                                    label="Small Packing Size"
                                    name="small_packing_size"
                                    type="number"
                                    register={register}
                                    error={errors?.small_packing_size}
                                    required
                                />
                            </div>
                        </SectionCard>

                        <SectionCard title="Other Information" icon={<User className="w-4 h-4" />}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <FormInput
                                    label="Brand"
                                    name="brand"
                                    type="text"
                                    register={register}
                                    error={errors?.brand}
                                    required
                                />


                                <FormSelectField
                                    label="Coupon Point"
                                    name="point_category_id"
                                    options={pointCategoryData?.map(item => ({ label: item?.point_category_name, value: item?.id }))}
                                    value={watch("point_category_id")}
                                    onChange={(val) => { setValue("point_category_id", val) }}
                                    error={errors.point_category_id}
                                    required
                                />

                                <FormSelectField
                                    label="Product Scan"
                                    name="product_scan"
                                    options={[
                                        { label: "Yes", value: "yes" },
                                        { label: "No", value: "no" },
                                    ]}
                                    value={watch("product_scan")}
                                    onChange={(val) => { setValue("product_scan", val) }}
                                    error={errors.product_scan}
                                    required
                                />

                                <FormInput
                                    label="Unit of Measurement"
                                    name="uom"
                                    type="text"
                                    register={register}
                                    error={errors?.uom}
                                    required
                                    onChange={(e) => {
                                        setValue("uom", e.target.value.toUpperCase());
                                    }}
                                />

                                <FormInput
                                    label="Product Size"
                                    name="product_size"
                                    type="text"
                                    register={register}
                                    error={errors?.product_size}
                                    required
                                />
                            </div>
                        </SectionCard>

                        <SectionCard>
                            <div className="grid grid-cols-1">
                                <FormTextArea
                                    label="Product Description"
                                    name="description"
                                    register={register}
                                    error={errors?.description}
                                    rows={3}
                                    maxLength={500}
                                    className="h-24"
                                    required={true}
                                />
                            </div>
                        </SectionCard>

                        <SectionCard>
                            <div className="flex flex-col items-start gap-4">
                                <ImageUploader setSelectedImage={setSelectedImage} uploadedImage={initialData?.images[0]?.image} />
                            </div>
                        </SectionCard>

                        {/* Buttons */}
                        <div className="sticky top-0  z-20 py-3 flex justify-end gap-3">
                            <FormSubmitButton
                                mode={mode}
                                isLoading={isLoading}
                                size="sm"
                                className="w-40"
                                variant="add"
                                disabled={isLoading}
                            >
                                {mode === "add" ? "Add " : "Update"}
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
        </>
    );
}

/** Section Card wrapper */
function SectionCard({ title, icon, children }) {
    return (
        <div className="bg-section-background rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            {(title || icon) && (
                <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                    <span className="text-indigo-500">{icon}</span>
                    {title}
                </h3>
            )}
            <div className="space-y-4">{children}</div>
        </div>
    );
}
