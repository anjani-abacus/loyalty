import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput, FormSubmitButton, FormDatePicker } from "../../../components/forms";
import FormSelectField from "../../../components/forms/FormSelectField";
import { User, MapPin } from "lucide-react";
import { DataTableHeader, useAddHeader } from "../../../layouts/DataTable/Header";
import { useEffect, useState } from "react";
import { useCreateUser, useUpdateUser } from "../useData";
import { useDistrictList, useStateList } from "../../../reactQuery/services/commonApi/useCommon";
import { useGetAllDesignationRole } from "../../Roles&Permission/Designation/useData";
import { useLocation, useNavigate } from "react-router-dom";

// ✅ Yup Schema
export const userSchema = yup.object().shape({
  login_type: yup
    .string()
    .trim()
    .required("Login type is required"),

  user_type: yup
    .string()
    .trim()
    .required("User type is required"),

  designation_id: yup
    .number()
    .typeError("Designation ID must be a number")
    .positive("Designation ID must be positive")
    .integer("Designation ID must be an integer")
    .required("Designation ID is required"),

  designation_name: yup
    .string()
    .trim()
    .required("Designation name is required"),

  name: yup
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  contact_01: yup
    .string()
    .matches(/^[0-9]{10}$/, "Contact number must be 10 digits")
    .required("Contact number is required"),

  employee_id: yup
    .string()
    .trim()
    .required("Employee ID is required"),

  date_of_birth: yup
    .date()
    .typeError("Invalid date format")
    .required("Date of birth is required"),

  date_of_wedding: yup
    .date()
    .typeError("Invalid date format")
    .nullable(),

  date_of_joining: yup
    .date()
    .typeError("Invalid date format")
    .required("Date of joining is required"),

  weekly_off: yup
    .string()
    .trim()
    .required("Weekly off is required"),

  state_name: yup
    .string()
    .trim()
    .required("State name is required"),

  district_name: yup
    .string()
    .trim()
    .required("District name is required"),

  city: yup
    .string()
    .trim()
    .required("City is required"),

  pincode: yup
    .string()
    .matches(/^[0-9]{6}$/, "Pincode must be a 6-digit number")
    .required("Pincode is required"),

  address: yup
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .required("Address is required"),

  working_state_name: yup
    .string()
    .trim()
    .required("Working state is required"),

  working_district_name: yup
    .string()
    .trim()
    .required("Working district is required"),
});

// 🧩 Blank Initial Values
const initialValues = {
    login_type: "Loyalty",
    user_type: "SYSTEM",
    designation_id: null,
    designation_name: "",
    name: "",
    email: "",
    contact_01: "",
    employee_id: "",
    date_of_birth: "",
    date_of_wedding: "",
    date_of_joining: "",
    weekly_off: "",
    // assign_user: "",
    state_name: "",
    district_name: "",
    city: "",
    pincode: "",
    address: "",
    working_state_name: "",
    working_district_name: "",
};

// 🧱 Example Options
const weeklyOffOptions = [
    { value: "Sunday", label: "Sunday" },
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
];

const stateOptions = [
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Gujarat", label: "Gujarat" },
];

const designationOptions = [
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Senior Software Engineer", label: "Senior Software Engineer" },
    { value: "Team Lead", label: "Team Lead" },
];

const assignUserOptions = [
    { value: "user1", label: "User 1" },
    { value: "user2", label: "User 2" },
];

const districtOptions = [
    { value: "Pune", label: "Pune" },
    { value: "Mumbai", label: "Mumbai" },
];

export default function UserForm() {
    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(userSchema),
    });


    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation()
    const { mode = "add", initialData } = location.state || {}
    const { mutate: createUserMutate, isPending: isCreating } = useCreateUser()
    const { mutate: updateUserMutate, isPending: isUpdating } = useUpdateUser()
    const navigate = useNavigate();
    const isLoadings = isCreating || isUpdating || isSubmitting;


    const { data: stateList, isLoading } = useStateList();
    const { data: districtList, mutate: fetchDistrictList } = useDistrictList();

    const { data: workingStateList } = useStateList();
    const { data: workingDistrictList, mutate: fetchWorkingDistrictList } = useDistrictList();
    const { roleData, fetchRolesAsync, isPending } = useGetAllDesignationRole();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        reset,
        formState: { errors },
    } = methods;



    const selectedState = watch("state");

    useEffect(() => {
        fetchRolesAsync({ user_type: "System" });
    }, [])

    useEffect(() => {
        if (watch("state")) {
            fetchDistrictList({ state_name: watch("state") })
        }
    }, [selectedState])


    useEffect(() => {
        if (mode === "edit" && initialData) {
            reset(initialData)
            fetchDistrictList({ state_name: initialData?.state_name })
            fetchWorkingDistrictList({ state_name: initialData?.working_state_name })
        }
    }, [mode, initialData, reset])

    const onSubmit = (data) => {

        const request = { ...data, designation_id: Number(data?.designation_id) }
        console.log("Form submitted:", request);

        if (mode === "add") {
            createUserMutate(request, {
                onSuccess: () => {
                    navigate(-1)
                }
            })
        } else {
            console.log(request)
            updateUserMutate(request, {
                onSuccess: () => {
                    navigate(-1)
                }
            })
        }
    };

    const pageTitle = useAddHeader(mode)

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <DataTableHeader pageTitle={pageTitle} />
            <FormProvider {...methods}>
                <div className="px-4">
                    {/* 🧍 Basic Information */}
                    <SectionCard title="Basic Information" icon={<User className="w-4 h-4" />}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <FormSelectField
                                label="Designation Name"
                                name="designation_name"
                                options={roleData?.map(item => ({ label: item?.role_name, value: item?.role_name }))}
                                value={watch("designation_name")}
                                onChange={(val) => setValue("designation_name", val)}
                                error={errors.designation_name}
                                required
                            />

                            <FormInput label="Full Name" name="name" register={register} error={errors.name} required />
                            <FormInput label="Email Address" name="email" type="email" register={register} error={errors.email} required />
                            <FormInput label="Contact Number" maxlength="10" name="contact_01" type="text" register={register} error={errors.contact_01} required />
                            <FormInput label="Employee ID" name="employee_id" register={register} error={errors.employee_id} required />



                            <FormInput label="Designation ID" name="designation_id" type="number" register={register} error={errors.designation_id} required />

                            {/* Assign User Select */}
                            {/* <FormSelectField
                                label="Assign User"
                                name="assign_user"
                                options={assignUserOptions}
                                value={watch("assign_user")}
                                onChange={(val) => setValue("assign_user", val)}
                                error={errors.assign_user}
                                required
                            /> */}

                            {/* Date Inputs */}
                            <FormDatePicker label="Date of Birth" maxDate={new Date()} name="date_of_birth" control={control} error={errors.date_of_birth} required />
                            <FormDatePicker required={false} label="Date of Wedding" maxDate={new Date()} name="date_of_wedding" control={control} error={errors.date_of_wedding} />
                            <FormDatePicker label="Date of Joining" name="date_of_joining" maxDate={new Date()} control={control} error={errors.date_of_joining} required />

                            {/* Weekly Off */}
                            <FormSelectField
                                label="Weekly Off"
                                name="weekly_off"
                                options={weeklyOffOptions}
                                value={watch("weekly_off")}
                                onChange={(val) => setValue("weekly_off", val)}
                                error={errors.weekly_off}
                                required
                            />
                        </div>
                    </SectionCard>

                    {/* 📍 Address Info */}
                    <SectionCard title="Address Information" icon={<MapPin className="w-4 h-4" />}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            
                            {/* State Select */}
                            <FormSelectField
                                label="State"
                                name="state_name"
                                options={stateList?.data?.map(item => ({ label: item, value: item }))}
                                value={watch("state_name")}
                                onChange={(val) => { setValue("state_name", val); fetchDistrictList({ state_name: val }) }}
                                error={errors.state_name}
                                required
                            />

                            {/* District Select */}
                            <FormSelectField
                                label="District"
                                name="district_name"
                                options={districtList?.data?.map(item => ({ label: item, value: item }))}
                                value={watch("district_name")}
                                onChange={(val) => setValue("district_name", val)}
                                error={errors.district_name}
                                required
                            />
                            
                            <FormInput label="City" name="city" register={register} error={errors.city} required />
                            
                            <FormInput label="Pincode" name="pincode" type="tel" register={register} error={errors.pincode} required />

                            <FormInput label="Address" name="address" register={register} error={errors.address} required />


                            {/* Working State */}
                            <FormSelectField
                                label="Working State"
                                name="working_state_name"
                                options={workingStateList?.data?.map(item => ({ label: item, value: item }))}
                                value={watch("working_state_name")}
                                onChange={(val) => { setValue("working_state_name", val); fetchWorkingDistrictList({ state_name: val }) }}
                                error={errors.working_state_name}
                                required
                            />

                            {/* Working District */}
                            <FormSelectField
                                label="Working District"
                                name="working_district_name"
                                options={workingDistrictList?.data?.map(item => ({ label: item, value: item }))}
                                value={watch("working_district_name")}
                                onChange={(val) => setValue("working_district_name", val)}
                                error={errors.working_district_name}
                                required
                            />


                        </div>
                    </SectionCard>

                    {/* ✅ Submit Buttons */}
                    <div className="sticky top-0  z-2 py-3 flex justify-end gap-3 ">
                        <FormSubmitButton
                            
                            isLoading={isLoadings}
                            size="sm"
                            className="w-40"
                            variant="add"
                            disabled={isLoadings}
                        >
                            {isLoadings
                                ? mode === "add" ? "Adding..." : "Updating..."
                                : mode === "add" ? "Add User" : "Update User"}
                        </FormSubmitButton>

                        <FormSubmitButton
                            type="button"
                            mode="action"
                            actionLabel="Discard All"
                            variant="orange"
                            size="sm"
                            // isLoading={isSubmitting}
                            onClick={() => reset(initialData)}
                        // loadingLabel="Discarding..."
                        />
                    </div>
                </div>
            </FormProvider>
        </form>
    );
}

/** 🧩 SectionCard Wrapper */
function SectionCard({ title, icon, children }) {
    return (
        <div className=" bg-section-background z-3 mb-3 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                <span className="text-indigo-500">{icon}</span>
                {title}
            </h3>
            {children}
        </div>
    );
}
