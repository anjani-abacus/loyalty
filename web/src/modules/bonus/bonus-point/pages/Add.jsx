import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect, useState } from "react"
import ImageUploader from "../../../../components/forms/FormImageUploader"
import { DataTableHeader } from "../../../../layouts/DataTable/Header"
import { FormDatePicker, FormSelect, FormSubmitButton, FormTextArea } from "../../../../components/forms"
import { FormInput } from "../../../../components/forms"
import { Controller } from "react-hook-form";
import { User } from "lucide-react"
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { useCreateBonusPoints } from "../useData"
import { useAddHeader } from "../../../../layouts/DataTable/Header"
// import { useCreateInfluencer, useUpdateInfluencer } from "../useData"
import { useLocation } from "react-router-dom"
import StateAreaChecklist from "../../../../components/forms/FormCheckList"
import { useNavigate } from "react-router-dom"
import { usePointCategory } from "../../../Master/pointCategoryList/useData"
import { useDistrictList, useStateList } from "../../../../reactQuery/services/commonApi/useCommon"
// ------------------- Constants -------------------
const INITIAL_VALUES = {
    "user_type": "Influencer",
    "influencer_type": "",
    "title": "",
    "start_date": null,
    "end_date": null
};

const stateAreas = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Delhi: ["Dwarka", "Saket", "Karol Bagh"],
    Karnataka: ["Bangalore", "Mysore"],
    Gujarat: ["Ahmedabad", "Surat"],
};

const schema = yup.object().shape({
    user_type: yup.string()
        .required("This field is required"),

    influencer_type: yup.string()
        .required("This field is required"),

    title: yup.string()
        .required("This field is required"),

    start_date: yup.date()
        .required("This field is required"),

    end_date: yup.date()
        .required("This field is required"),
});

// ------------------- Component -------------------
export default function BonusPointAdd() {
    const navigate = useNavigate()

    const { data: stateList } = useStateList();
    const { data: districtList, mutate: fetchDistrictList } = useDistrictList();


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

    const { start_date, end_date } = watch()

    const location = useLocation()
    const { mode = "add", initialData } = location.state || {}

    const selectedDocType = watch("documentType")
    const bankOption = watch("user_redeemption_prefrence")

    const { mutate: createBonusPoints ,isPending:isCreating } = useCreateBonusPoints()
    // const { mutate: updateInfluencer } = useUpdateInfluencer()

    const isLoading = isSubmitting || isCreating;
    const onSubmit = (data) => {

        // console.log('submitted data ===> ', data)
        // return;

        const request = {
            user_type: data?.user_type,
            influencer_type: data?.influencer_type,
            title: data?.title,
            start_date: data?.start_date,
            end_date: data?.end_date,
            points: data?.pointsTable?.filter((item) => item?.points > 0)?.map(elem => ({ point_category_name: elem.point_category_name, point_category_id: elem.id, point: elem.points })),
        }

        createBonusPoints(request, {
            onSuccess: () => {
                navigate(-1)
            },

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
                        <SectionCard title="Basic Information" icon={<User className="w-4 h-4" />}>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <FormSelect
                                    label="User Type"
                                    name="user_type"
                                    control={control}
                                    error={errors?.user_type}
                                    options={[{ type: "Influencer" }]}
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
                                    type="text"
                                    register={register}
                                    error={errors?.title}
                                    required
                                />

                                <FormDatePicker
                                    label="Start Date"
                                    name="start_date"
                                    control={control}
                                    error={errors?.start_date}
                                    required
                                    minDate={new Date()}
                                    maxDate={new Date(end_date)}
                                />

                                <FormDatePicker
                                    label="End Date"
                                    name="end_date"
                                    control={control}
                                    error={errors?.end_date}
                                    required
                                    minDate={new Date(start_date)}
                                />
                            </div>
                        </SectionCard>

                        <SectionCard>
                            <div className="flex gap-10">
                                <div>
                                    <StateAreaChecklist stateList={stateList?.data} districtList={districtList?.data} fetchDistrictList={fetchDistrictList} control={control} stateAreas={stateAreas} />
                                </div>
                                <div className="flex-1">
                                    {/* <EditablePointsTable title={'Category Bonus Point'} /> */}
                                    <EditablePointsTable
                                        name="pointsTable"
                                        control={control}
                                        title="Editable Points"
                                        register={register}
                                    />
                                </div>
                            </div>
                        </SectionCard>


                        {/* Buttons */}
                        <div className="sticky top-0 z-20 py-3 flex justify-end gap-3 shadow-sm">
                           
                            <FormSubmitButton
                                mode={mode}
                                isLoading={isLoading} 
                                variant="add" 
                                size="sm"
                                className="w-40"
                                disabled={isLoading}
                                
                            >
                                {mode === "add" ? "Add Bonus Point" : "Update Bonus Point"}
                            </FormSubmitButton>

                            {/* DISCARD BUTTON */}
                            <FormSubmitButton
                                type="button"
                                mode="action"
                                actionLabel="Discard All"
                                variant="discard"
                                size="sm"
                                className="w-40"
                                onClick={() => reset(initialData || INITIAL_VALUES)}
                            >
                                Discard All
                            </FormSubmitButton>
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
        <div className=" bg-card text-foreground rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            {(title || icon) && <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <span className="text-indigo-500">{icon}</span>
                {title}
            </h3>}
            <div className="space-y-4">{children}</div>
        </div>
    )
}

function EditablePointsTable({ name, control, title, register }) {

    const {
        pointCategoryData,
        tabListData,
        total,
        fetchPointCategoryData,
        isPending,
        error,
    } = usePointCategory();

    useEffect(() => {
        fetchPointCategoryData({ page: 1, limit: 50, status: true, filters: {} })
    }, [])

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={pointCategoryData}
            render={({ field }) => {
                const handlePointsChange = (id, value) => {
                    const updated = pointCategoryData.map((row) =>
                        row.id === id ? { ...row, points: value } : row
                    );
                    console.log('udpated ===> ', updated)
                    field.onChange(updated);
                };

                return (
                    <div className="overflow-auto border-[#E8EDF7] max-h-96 ">
                        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                            {title}
                        </h3>
                        <Table className="table-auto w-full border-collapse rounded-lg border min-h-[200px]">
                            {/* Table Header */}
                            <TableHeader className="bg-card text-foreground border-b">
                                <TableRow>
                                    <TableHead className="px-3 py-2 text-left font-bold">Sr.No.</TableHead>
                                    <TableHead className="px-3 py-2 text-left font-bold">Point Category</TableHead>
                                    <TableHead className="px-3 py-2 text-left font-bold">Points</TableHead>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody>
                                {pointCategoryData.length > 0 ? (
                                    pointCategoryData?.map((row, index) => (
                                        <TableRow key={row.id} className="odd:bg-card text-foreground  even:bg-card">
                                            <TableCell className="px-3 py-2">{index + 1}</TableCell>
                                            <TableCell className="px-3 py-2">{row.point_category_name}</TableCell>
                                            <TableCell className="px-3 py-2 w-34">
                                                <FormInput
                                                    label="Enter Point"
                                                    type="tel"
                                                    register={register}
                                                    name={`point-${row.id}`}
                                                    value={row.points}
                                                    onChange={(e) => { row.points = e.target.value; handlePointsChange(row.id, e.target.value) }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center py-4">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                );
            }}
        />
    );
}

