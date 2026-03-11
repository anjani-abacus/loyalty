import { useForm, FormProvider, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useEffect, useState } from "react"

import { DataTableHeader } from "../../../layouts/DataTable/Header"
import { FormSelect, FormSubmitButton, FormTextArea } from "../../../components/forms"
import { FormInput } from "../../../components/forms"

import { LoaderIcon, User } from "lucide-react"

import { useAddHeader } from "../../../layouts/DataTable/Header"
import { useCreateGift, useUpdateInfluencer } from "../useData"
import { useLocation, useNavigate } from "react-router-dom"


// ------------------- Constants -------------------
const INITIAL_VALUES = {
    gift_type: "GIFT",
    influencer_type: "",
    title: "",
    gift_point: null,
    termsNcondition: '',
    point_range_value: "",
    gift_img: null
};

const schema = Yup.object().shape({
    gift_type: Yup.string()
        .required("Gift type is required"),
    influencer_type: Yup.string()
        .required("Influencer type is required"),
    title: Yup.string()
        .required("Title is required"),
    gift_point: Yup.number()
        .typeError("Gift point must be a number")
        .required("Gift point is required")
        .positive("Gift point must be greater than 0"),
    termsNcondition: Yup.string()
        .required("Terms and conditions are required"),
    point_range_value: Yup.number()
        .transform((value, originalValue) => (originalValue === "" ? undefined : value))
        .when("gift_type", {
            is: "CASH",
            then: (schema) =>
                schema
                    .typeError("Point range value must be a number")
                    .required("Point range value is required when Gift Type is CASH")
                    .positive("Point range value must be greater than 0"),
            otherwise: (schema) => schema.notRequired(),
        }),
    gift_img: Yup.mixed()
        .required("Image is required")
    // .test("fileType", "Only image files are allowed", (value) => {
    //     return value && ["image/jpeg", "image/png", "image/webp"].includes(value.type);
    // })
    // .test("fileSize", "Image size must be less than 2MB", (value) => {
    //     return value && value.size <= 2 * 1024 * 1024;
    // }),
});

// ------------------- Component -------------------
export default function GiftGalleryAdd() {
    const [selectedImage, setSelectedImage] = useState(null)
    const methods = useForm({
        defaultValues: INITIAL_VALUES,
        resolver: yupResolver(schema),
    })
    const navigate = useNavigate();

    const {
        handleSubmit,
        reset,
        register,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = methods

    const { gift_type } = watch();

    const location = useLocation()
    const { mode = "add", initialData } = location.state || {}

    // const { mutateAsync: createGift } = useCreateGift()
    // const { mutateAsync: updateInfluencer } = useUpdateInfluencer()
    const { mutateAsync: createGift, isPending: isCreating } = useCreateGift()
    const { mutateAsync: updateInfluencer, isPending: isUpdating } = useUpdateInfluencer()

    const isLoading = isSubmitting || isCreating || isUpdating


    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("gift_type", data?.gift_type || "");
            formData.append("influencer_type", data?.influencer_type || "");
            formData.append("title", data?.title || "");
            formData.append("gift_point", data?.gift_point ?? "");
            formData.append("termsNcondition", data?.termsNcondition || "");
            formData.append("gift_img", data.gift_img);

            if (data?.gift_type === "CASH") {
                formData.append("point_range_value", Number(data?.point_range_value || 0));
            }

            if (mode === "add") {
                await createGift(formData); // ✅ wait until done
            } else {
                await updateInfluencer({ id: initialData?.id, ...data }); // ✅ wait until done
            }

            navigate(-1);
        } catch (error) {
            console.error("Submit failed:", error);
            // You could toast here if you have a global handler
        }
    };


    // const onSubmit = (data) => {
    //     if (mode === "add") {
    //         const formData = new FormData()
    //         formData.append("gift_type", data?.gift_type || "");
    //         formData.append("influencer_type", data?.influencer_type || "");
    //         formData.append("title", data?.title || "");
    //         formData.append("gift_point", data?.gift_point !== null ? data.gift_point : "");
    //         formData.append("termsNcondition", data?.termsNcondition || "");
    //         // formData.append("gift_img", selectedImage || "");
    //         formData.append("gift_img", data.gift_img);
    //         if (data?.gift_type == 'CASH') { formData.append("point_range_value", data?.point_range_value !== null ? Number(data.point_range_value) : ""); }


    //         createGift(formData, {
    //             onSuccess: () => {
    //                 navigate(-1)
    //             }
    //         })
    //     } else {
    //         updateInfluencer({ id: initialData?.id, ...data })
    //     }
    // }

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
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
                                <FormSelect
                                    label="Gift Type"
                                    name="gift_type"
                                    control={control}
                                    error={errors?.gift_type}
                                    options={[{ type: "GIFT" }]} //, { type: 'CASH' }
                                    register={register}
                                    required
                                    optionLabel="type"
                                    optionValue="type"
                                />
                                <FormSelect
                                    label="Influencer Type"
                                    name="influencer_type"
                                    control={control}
                                    error={errors?.influencer_type}
                                    options={[{ type: "Contractor" }, { type: "Painter" }]}
                                    register={register}
                                    required
                                    optionLabel="type"
                                    optionValue="type"
                                />
                                <FormInput
                                    label="Title"
                                    name="title"
                                    type="tel"
                                    register={register}
                                    error={errors?.title}
                                    required
                                />
                                <FormInput
                                    label="Point"
                                    name="gift_point"
                                    type="number"
                                    register={register}
                                    error={errors?.gift_point}
                                    required
                                />
                                {gift_type == 'CASH' && <FormInput
                                    label="Amt per point"
                                    name="point_range_value"
                                    type="text"
                                    register={register}
                                    error={errors?.point_range_value}
                                    required
                                />}
                            </div>
                        </SectionCard>

                        <SectionCard>
                            <FormTextArea
                                label="Description"
                                name="termsNcondition"
                                register={register}
                                error={errors?.termsNcondition}
                                rows={3}
                                className="h-24"
                            />
                        </SectionCard>

                        <SectionCard>
                            <div className="flex flex-col items-start gap-4">
                                <ImageUploader
                                    control={control}
                                    name="gift_img"
                                    error={errors?.gift_img}
                                />
                                {errors?.gift_img && (
                                    <p className="text-red-500 text-xs mt-1">{errors.gift_img.message}</p>
                                )}
                            </div>
                        </SectionCard>

                        {/* Buttons */}
                        {/* <div className="sticky top-0 z-20 py-3 flex justify-end gap-3 ">

                            <FormSubmitButton
                                isLoading={isSubmitting}
                                variant="primary"
                                size="sm"
                                className="w-40 flex items-center justify-center gap-2"
                            >

                                {isSubmitting
                                    ? (<>
                                        <LoaderIcon className="h-4 w-4 animate-spin" />
                                        {mode === "add"
                                            ? "Adding..."
                                            : "Updating..."}   </>)
                                    :
                                    (<>
                                        {mode === "add"
                                            ? "Add Gift"
                                            : "Update Gift"} </>)}
                            </FormSubmitButton>


                            <FormSubmitButton
                                type="button"
                                variant="orange"
                                size="sm"
                                className="w-40 flex items-center justify-center gap-2"
                                onClick={() => reset(initialData || INITIAL_VALUES)}
                                disabled={isSubmitting} 
                            >
                                {isSubmitting ? (
                                    <>
                                        <LoaderIcon className="h-4 w-4 animate-spin" />
                                        Discarding...
                                    </>
                                ) : (
                                    <>Discard All</>
                                )}
                            </FormSubmitButton>
                        </div> */}
                        <div className="sticky top-0 z-20 py-3 flex justify-end gap-3">
                            <FormSubmitButton
                                mode={mode}
                                isLoading={isLoading}
                                disabled={isLoading}
                                size="sm"
                                className="w-40"
                                variant="add"
                                
                            >
                                {mode === "add" ? "Add Gift" : "Update Gift"}
                            </FormSubmitButton>


                            <FormSubmitButton
                                type="button"
                                mode="action"
                                actionLabel="Discard All"
                                variant="orange"
                                size="sm"
                              
                                onClick={() => reset(initialData || INITIAL_VALUES)}
                            
                            />
                        </div>

                    </form>
                </FormProvider>
            </div>
        </>
    )
}

/** Section Card wrapper */
function SectionCard({ title, icon, children }) {
    return (
        <div className="bg-section-background rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            {(title || icon) && <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <span className="text-indigo-500">{icon}</span>
                {title}
            </h3>}
            <div className="space-y-4">{children}</div>
        </div>
    )
}

function ImageUploader({ control, name, error }) {
    const [preview, setPreview] = useState(null);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { value, onChange } }) => (
                !preview ? (
                    <label className="cursor-pointer border-2 border-dashed p-6 rounded-lg text-foreground hover:bg-section-background">
                        <span>Click to upload image</span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setPreview(URL.createObjectURL(file));
                                    onChange(file); // ✅ update RHF
                                }
                            }}
                        />
                    </label>
                ) : (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Uploaded"
                            className="w-40 h-40 object-cover rounded-lg border"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setPreview(null);
                                onChange(null);
                            }}
                            className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-sm"
                        >
                            ✕
                        </button>
                    </div>
                )
            )}
        />
    );
}


// function ImageUploader({ control, name, error }) {
//     const [image, setImage] = useState(null);
//     const [preview, setPreview] = useState(null);
//     // // handle file selection
//     // const handleImageUpload = (e) => {
//     //     const file = e.target.files[0];
//     //     if (file) {
//     //         setImage({
//     //             file,
//     //             preview: URL.createObjectURL(file),
//     //         });
//     //     }

//     //     setSelectedImage(e.target.files[0])
//     // };

//     // // remove uploaded image
//     // const handleRemoveImage = () => {
//     //     setImage(null);
//     // };

//     return (
//         <Controller
//             control={control}
//             name={name}
//             render={({ field: { onChange } }) => (
//                 !preview ? (
//                     <label className="cursor-pointer border-2 border-dashed p-6 rounded-lg text-gray-500 hover:bg-gray-50">
//                         <span>Click to upload image</span>
//                         <input
//                             type="file"
//                             accept="image/*"
//                             className="hidden"
//                             onChange={(e) => {
//                                 const file = e.target.files[0];
//                                 if (file) {
//                                     setPreview(URL.createObjectURL(file));
//                                     onChange(file); // ✅ update form value
//                                 }
//                             }}
//                         />
//                     </label>
//                 ) : (
//                     <div className="relative">
//                         <img
//                             src={preview}
//                             alt="Uploaded Preview"
//                             className="w-40 h-40 object-cover rounded-lg border"
//                         />
//                         <button
//                             type="button"
//                             onClick={() => {
//                                 setPreview(null);
//                                 onChange(null);
//                             }}
//                             className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-sm"
//                         >
//                             ✕
//                         </button>
//                     </div>
//                 )
//             )}
//         />
//     );
// }
