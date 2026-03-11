import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from "yup"
import { useEffect, useState } from "react"

import { DataTableHeader } from "../../../layouts/DataTable/Header"
import { FormDatePicker, FormSelect, FormSubmitButton, FormTextArea } from "../../../components/forms"
import { FormInput } from "../../../components/forms/FormInput"

import { User } from "lucide-react"

import { useAddHeader } from "../../../layouts/DataTable/Header"
import { usePointMasterDetail, useUpdate } from "./useData"
import { useLocation, useNavigate } from "react-router-dom"


// ------------------- Constants -------------------
const INITIAL_VALUES = {
    "welcome_point": "",
    "birthday_point": "",
    "anniversary_point": "",
    "registration_refferal": "",
    "registration_refferal_own": "",
    "transaction_incentive": ""
};

// ------------------- Validation Schema -------------------
const schema = Yup.object().shape({
    welcome_point: Yup.number()
        .typeError("Welcome Point must be a number")
        .required("Welcome Point is required")
        .min(0, "Welcome Point cannot be negative"),

    birthday_point: Yup.number()
        .typeError("Birthday Point must be a number")
        .required("Birthday Point is required")
        .min(0, "Birthday Point cannot be negative"),

    anniversary_point: Yup.number()
        .typeError("Anniversary Point must be a number")
        .required("Anniversary Point is required")
        .min(0, "Anniversary Point cannot be negative"),

    registration_refferal: Yup.number()
        .typeError("Registration Referral must be a number")
        .required("Registration Referral is required")
        .min(0, "Registration Referral cannot be negative"),

    registration_refferal_own: Yup.number()
        .typeError("Registration Referral Own must be a number")
        .required("Registration Referral Own is required")
        .min(0, "Registration Referral Own cannot be negative"),

    transaction_incentive: Yup.number()
        .typeError("Transaction Incentive Points must be a number")
        .required("Transaction Incentive Points are required")
        .min(0, "Transaction Incentive Points cannot be negative"),
});


// ------------------- Component -------------------
export default function ReferralPointMaster() {
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
        formState: { errors, isSubmitting },
    } = methods

    const { gift_type } = watch();

    const location = useLocation()
    const { mutate: updatePointMaster ,isPending:isUpdating} = useUpdate()
    const { mutate: fetchPointMasterDetail, data: pointMasterDetail, isPending: isCreating } = usePointMasterDetail()

    const isLoading = isSubmitting || isCreating ||isUpdating;

    const onSubmit = (data) => {
        updatePointMaster({ id: 1, payload: data })
    }

    useEffect(() => {
        fetchPointMasterDetail({ filters: { id: 1 } }, {
            onSuccess: (res) => {
                const { welcome_point, birthday_point, anniversary_point, registration_refferal, registration_refferal_own, transaction_incentive } = res?.data[0] || {};
                reset({ welcome_point, birthday_point, anniversary_point, registration_refferal, registration_refferal_own, transaction_incentive })
            }
        })
    }, [])

    return (
        <>
            <DataTableHeader pageTitle={"Update Point Master"} />

            <div className="px-4">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-2 mt-3">
                        {/* Basic Information */}
                        <SectionCard title="Point Master Information" icon={<User className="w-4 h-4" />}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <FormInput
                                    label="Welcome Point"
                                    name="welcome_point"
                                    type="tel"
                                    register={register}
                                    error={errors?.welcome_point}
                                    required
                                />
                                <FormInput
                                    label="Birthday Point"
                                    name="birthday_point"
                                    type="tel"
                                    register={register}
                                    error={errors?.birthday_point}
                                    required
                                />
                                <FormInput
                                    label="Anniversary Point"
                                    name="anniversary_point"
                                    type="tel"
                                    register={register}
                                    error={errors?.anniversary_point}
                                    required
                                />
                                <FormInput
                                    label="Registration Referral"
                                    name="registration_refferal"
                                    type="tel"
                                    register={register}
                                    error={errors?.registration_refferal}
                                    required
                                />
                                <FormInput
                                    label="Registration Referral Own"
                                    name="registration_refferal_own"
                                    type="tel"
                                    register={register}
                                    error={errors?.registration_refferal_own}
                                    required
                                />
                                <FormInput
                                    label="Transaction incentive Points"
                                    name="transaction_incentive"
                                    type="tel"
                                    register={register}
                                    error={errors?.transaction_incentive}
                                    required
                                />
                            </div>
                        </SectionCard>

                        {/* Buttons */}
                        <div className="sticky top-0 z-20 py-3 flex justify-end gap-3 ">


                            <FormSubmitButton
                                mode={isSubmitting}
                                isLoading={isLoading}
                                size="sm"
                                className="w-40"
                                variant="add"
                                disabled={isLoading}
                            >
                                {isSubmitting === "Updating" ? "Updating " : "Update Point Master"}
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
    )
}

/** Section Card wrapper */
function SectionCard({ title, icon, children }) {
    return (
        <div className="bg-background rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            {(title || icon) && <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <span className="text-indigo-500">{icon}</span>
                {title}
            </h3>}
            <div className="space-y-4 mt-3">{children}</div>
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
            <label className="cursor-pointer border-2 border-dashed p-6 rounded-lg text-gray-500 hover:bg-gray-50">
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
                    className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                    ✕
                </button>
            </div>
        )
    );
}
