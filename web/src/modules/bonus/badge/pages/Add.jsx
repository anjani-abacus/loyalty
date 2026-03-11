import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useEffect, useState } from "react"
import { DataTableHeader } from "../../../../layouts/DataTable/Header"
import { FormDatePicker, FormSelect, FormSubmitButton, FormTextArea } from "../../../../components/forms"
import { FormInput } from "../../../../components/forms/FormInput"
import { User } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAddHeader } from "../../../../layouts/DataTable/Header"
import { useCreate } from "../useData"
import { useLocation } from "react-router-dom"
import FormSelectField from "../../../../components/forms/FormSelectField"


const INITIAL_VALUES = {
    influencer_type: '',
    slab_type: '', //DAYWISE, CUSTOM
    title: "",
    start_date: null, // in case of custom
    end_date: null, // in case of custom
    eligible_value: "", //SCANNING POINT
    point_incentive_type: "", //PERCENT, FIXED
    point_value: "", //new
    badge_type: "",
    eligible_days: "", //in case of daywise - 7/15 days


    // scanning_point: null, //removed
    // description: "" //removed
};

const schema = Yup.object().shape({
    influencer_type: Yup.string().required("Influencer type is required"),
    slab_type: Yup.string().required("Date type is required"),
    title: Yup.string()
        .trim()
        .required("Title is required")
        .min(3, "Title must be at least 3 characters"),

    start_date: Yup.date()
        .nullable()
        .when("slab_type", {
            is: "CUSTOM",
            then: (schema) =>
                schema
                    .typeError("Start date is invalid")
                    .required("Start date is required"),
            otherwise: (schema) => schema.notRequired().nullable(),
        }),

    end_date: Yup.date()
        .nullable()
        .when("slab_type", {
            is: "CUSTOM",
            then: (schema) =>
                schema
                    .typeError("End date is invalid")
                    .min(Yup.ref("start_date"), "End date cannot be before start date")
                    .required("End date is required"),
            otherwise: (schema) => schema.notRequired().nullable(),
        }),
    badge_type: Yup.string()
        .when("slab_type", {
            is: "DAYWISE",
            then: (schema) => schema
                .required("Badge type is required"),
            otherwise: (schema) => schema.notRequired(),
        }),

    point_incentive_type: Yup.string()
        .when("slab_type", {
            is: "DAYWISE",
            then: (schema) => schema.typeError("Scanning point must be a number")
                .nullable()
                .required("Point incentive type is required"),
            otherwise: (schema) => schema.notRequired(),
        }),


    eligible_value: Yup.number()
        .typeError("Eligible value must be a number")
        .positive("Eligible value must be greater than 0")
        .required("Eligible value is required"),



    point_value: Yup.number()
        .typeError("Scanning point must be a number")
        .nullable()
        .required("Scanning point is required"),

    eligible_days: Yup.string()
        .when("slab_type", {
            is: "DAYWISE",
            then: (schema) =>
                schema
                    .typeError("Eligible days must be a number")
                    .required("Eligible days is required"),
            otherwise: (schema) => schema.notRequired(),
        }),
});


export default function BadgesAdd() {

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
        setValue,
        formState: { errors, isSubmitting },
    } = methods

    const { gift_type, slab_type, point_incentive_type, start_date, end_date } = watch();

    const location = useLocation()
    const { mode = "add", initialData } = location.state || {}

    const { mutateAsync: createBadge, isPending: isCreating } = useCreate()

    const isLoading = isSubmitting || isCreating





    const onSubmit = (data) => {

        if (mode === "add") {
            const formData = new FormData()
            formData.append("influencer_type", data?.influencer_type || "");
            formData.append("slab_type", data?.slab_type || "");
            formData.append("title", data?.title || "");
            formData.append("start_date", data?.start_date || "");
            formData.append("end_date", data?.end_date || "");
            formData.append("eligible_value", data?.eligible_value ?? "");
            formData.append("point_incentive_type", data?.point_incentive_type);
            formData.append("point_value", data?.point_value ?? "");
            formData.append("badge_type", data?.badge_type);
            formData.append("eligible_days", data?.eligible_days);


            // Optional image (if any)
            if (selectedImage) {
                formData.append("image", selectedImage);
            }


            createBadge(formData, {
                onSuccess: () => {
                    navigate(-1)
                },
                onError: (error) => {
                    console.error("Error creating badge:", error);
                },
            })
        } else {
            // updateInfluencer({ id: initialData?.id, ...data })
        }
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

            <div className="px-4 ">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-2 mt-3">
                        {/* Basic Information */}
                        <SectionCard title="Badge Information" icon={<User className="w-4 h-4" />}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <FormSelect
                                    label="Influencer Type"
                                    name="influencer_type"
                                    control={control}
                                    error={errors?.influencer_type}
                                    options={[{ type: "CONTRACTOR" }, { type: "PAINTER" }]}
                                    register={register}
                                    required
                                    optionLabel="type"
                                    optionValue="type"
                                />
                                <FormSelectField
                                    label="Slab Type"
                                    name="slab_type"
                                    options={[{ label: "DAYWISE", value: "DAYWISE" }, { label: "CUSTOM", value: "CUSTOM" }]}
                                    value={watch("slab_type")}
                                    onChange={(val) => {
                                        setValue("slab_type", val)
                                        setValue("start_date", null)
                                        setValue("end_date", null)
                                    }}
                                    required
                                    error={errors?.slab_type}
                                />

                                {slab_type == 'CUSTOM' && <>
                                    {/* Start Date */}
                                    <FormDatePicker
                                        label="Start On"
                                        name="start_date"
                                        control={control}
                                        error={errors?.start_date}
                                        required
                                        minDate={new Date()}
                                        maxDate={new Date(end_date)}
                                    />

                                    {/* End Date */}
                                    <FormDatePicker
                                        label="End On"
                                        name="end_date"
                                        control={control}
                                        error={errors?.end_date}
                                        required
                                        minDate={new Date(start_date)}
                                    />
                                </>}

                                <FormInput
                                    label="Title"
                                    name="title"
                                    type="text"
                                    register={register}
                                    error={errors?.title}
                                    required
                                />

                                {slab_type == 'DAYWISE' && <FormSelectField
                                    label="Eligible Days"
                                    name="eligible_days"
                                    options={[{ label: "Last 7 Days", value: 7 }, { label: "Last 15 Days", value: 15 }, { label: "Last 30 Days", value: 30 }, { label: "Last 90 Days", value: 90 }]}
                                    value={watch("eligible_days")}
                                    onChange={(val) => { setValue("eligible_days", val) }}
                                    required
                                    error={errors?.eligible_days}
                                />}

                                {/* Eligible Value */}
                                <FormInput
                                    label="Scanning Point"
                                    name="eligible_value"
                                    type="number"
                                    register={register}
                                    error={errors?.eligible_value}
                                    required
                                />

                                {slab_type == 'DAYWISE' && <FormSelect
                                    label="Badge Type"
                                    name="badge_type"
                                    control={control}
                                    options={[{ type: "TRANSACTION" }, { type: "DAY" }]}
                                    register={register}
                                    required
                                    optionLabel="type"
                                    optionValue="type"
                                    error={errors?.badge_type}
                                />}

                                {slab_type == 'DAYWISE' && <FormSelect
                                    label="Point Incentive Type"
                                    name="point_incentive_type"
                                    control={control}
                                    options={[{ type: "PERCENT" }, { type: "FIXED" }]}
                                    register={register}
                                    required
                                    optionLabel="type"
                                    optionValue="type"
                                    error={errors?.point_incentive_type}
                                />}

                                <FormInput
                                    label={`Point (${slab_type == 'CUSTOM' ? 'Fixed' : point_incentive_type?.toLowerCase()} wise)`}
                                    name="point_value"
                                    type="number"
                                    register={register}
                                    error={errors?.point_value}
                                    required
                                />
                            </div>
                        </SectionCard>

                        {/* 🟢 Description */}
                        {/* <SectionCard>
                            <FormTextArea
                                label="Description"
                                name="description"
                                register={register}
                                error={errors?.description}
                                rows={3}
                                className="h-24"
                            />
                        </SectionCard> */}

                        {/* 🟢 Image Upload */}
                        <SectionCard>
                            <div className="flex flex-col items-start gap-4">
                                <ImageUploader setSelectedImage={setSelectedImage} />
                            </div>
                        </SectionCard>

                        {/* Buttons */}
                        <div className="sticky top-0 bg-background z-20 py-3 flex justify-end gap-3 shadow-sm">

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
            </div >
        </>
    )
}


function SectionCard({ title, icon, children }) {
    return (
        <div className="bg-card text-foreground rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            {(title || icon) && <h3 className="flex items-center gap-2 text-sm font-semibold  mb-2">
                <span className="text-indigo-500">{icon}</span>
                {title}
            </h3>}
            <div className="space-y-4">{children}</div>
        </div>
    )
}



function ImageUploader({ setSelectedImage }) {
    const [image, setImage] = useState(null);

    // handle file selection
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage({
                file,
                preview: URL.createObjectURL(file),
            });
        }

        setSelectedImage(e.target.files[0])
    };

    // remove uploaded image
    const handleRemoveImage = () => {
        setImage(null);
    };

    return (
        !image ? (
            <label className="cursor-pointer border-2 border-dashed p-6 rounded-lg text-foreground hover:bg-card">
                <span>Click to upload image</span>
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </label>
        ) : (
            <div className="relative">
                <img
                    src={image.preview}
                    alt="Uploaded Preview"
                    className="w-40 h-40 object-cover rounded-lg border"
                />
                <button
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-red-500 text-foreground px-2 py-1 rounded text-sm"
                >
                    ✕
                </button>
            </div>
        )
    );
}
