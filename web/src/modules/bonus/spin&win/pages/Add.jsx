import { Trash2 } from "lucide-react";
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

import { useAddHeader } from "../../../../layouts/DataTable/Header"
// import { useCreateInfluencer, useUpdateInfluencer } from "../useData"
import { useLocation } from "react-router-dom"
import StateAreaChecklist from "../../../../components/forms/FormCheckList"
import { useCreateSpinSlab, useUpdateSpinDetails } from "../useData";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import FormSelectField from "../../../../components/forms/FormSelectField";
import { ChartPieLabelList } from "./Chart";

// ------------------- Constants -------------------
const INITIAL_VALUES = {
    "point_section": "",
    // "eligible_days": "",
    "new_slab_point": "",
};


export default function SpinWinAdd() {
    const [slabPointsList, setSlabPointsList] = useState([])
    const navigate = useNavigate();
    const addToListHandler = (slab) => {

        setSlabPointsList((prev) => [...prev, slab.new_slab_point])
        console.log('slabPointsList ===> ', slabPointsList)

    }

    const stateAreas = {
        Maharashtra: ["Mumbai", "Pune", "Nagpur"],
        Delhi: ["Dwarka", "Saket", "Karol Bagh"],
        Karnataka: ["Bangalore", "Mysore"],
        Gujarat: ["Ahmedabad", "Surat"],
    };

    const methods = useForm({
        defaultValues: INITIAL_VALUES,
        // resolver: yupResolver(schema),
    })

    const {
        handleSubmit,
        reset,
        register,
        setValue,
        watch,
        control,
        formState: { errors, isSubmitting },
    } = methods

    const location = useLocation()
    const { mode = "add", initialData } = location.state || {}

    const { new_slab_point, point_section } = watch()


    const { mutateAsync: createSpinSlab, isPending: isCreating } = useCreateSpinSlab()
    const { mutate: updateSpinDetails } = useUpdateSpinDetails()

    const isLoading = isSubmitting || isCreating;
    const onSubmit = (data) => {
        const request = {
            // eligible_days: Number(data.eligible_days),
            point_section: Number(data.point_section),
            slab_point: slabPointsList.map(slab => Number(slab))
        }
        if (mode == 'edit') {
            updateSpinDetails({ id: initialData?.id, payload: request }, {
                onSuccess: () => {
                    navigate(-1)
                }
            })
        } else {
            createSpinSlab(request, {
                onSuccess: () => {
                    navigate(-1)
                }
            })
        }
    }

    // Reset form when editing and data changes
    useEffect(() => {
        if (mode === "edit" && initialData) {
            setSlabPointsList(initialData?.slab_point)
            reset({ point_section: String(initialData?.point_section) })
        }
    }, [mode, initialData, reset])

    const pageTitle = useAddHeader(mode)

    return (
        <>
            <DataTableHeader pageTitle={pageTitle} />

            <div className="px-4 ">
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-2 mt-3 ">
                        {/* Basic Information */}
                        <SectionCard title="Basic Information" icon={<User className="w-4 h-4" />}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="col-span-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <FormSelectField
                                            label="Point Section"
                                            name="point_section"
                                            options={[{ label: "4", value: "4" }, { label: "6", value: "6" }, { label: "8", value: "8" }, { label: "10", value: "10" }]}
                                            value={watch("point_section")}
                                            onChange={(val) => { setValue("point_section", val) }}
                                            error={errors.point_section}
                                            required
                                        />

                                        <div className="flex items-end gap-3">
                                            <div className="flex-1">
                                                <FormInput
                                                    label="Enter new slab point"
                                                    name="new_slab_point"
                                                    type="text"
                                                    register={register}
                                                    error={errors?.new_slab_point}
                                                    required
                                                />
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const max = Number(point_section);
                                                    if (slabPointsList?.length >= max) return toast("Can't Add More!");
                                                    addToListHandler({ new_slab_point });
                                                }}
                                                className="px-4 py-2 
                                                        rounded-md 
                                                        bg-indigo-600 
                                                        text-white 
                                                        font-medium 
                                                        shadow-sm 
                                                        transition
                                                        hover:bg-indigo-700
                                                        active:scale-95
                                                        disabled:bg-gray-400">
                                                Add
                                            </button>
                                        </div>
                                    </div>

                                    <SectionCard title="Slab List">
                                        <div className="mt-5 h-70 overflow-y-scroll overflow-x-auto rounded-lg">
                                            <table className="min-w-full border-collapse text-foreground rounded-lg overflow-hidden">
                                                <thead>
                                                    <tr className="text-foreground bg-card   text-sm uppercase tracking-wide">
                                                        <th className="px-6 py-3 text-left border-b">Sr. No.</th>
                                                        <th className="px-6 py-3 text-left border-b">Slab Points</th>
                                                        <th className="px-6 py-3 text-center border-b">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {slabPointsList.length > 0 ? (
                                                        slabPointsList.map((slab, index) => (
                                                            <tr
                                                                key={index}
                                                                className="odd:bg-section-background even:bg-card hover:bg-card transition-colors"
                                                            >
                                                                <td className="px-6 py-3 text-center border-b text-card-foreground font-medium">
                                                                    {index + 1}
                                                                </td>
                                                                <td className="px-6 py-3 text-center border-b text-card-foreground">
                                                                    {slab}
                                                                </td>
                                                                <td className="px-6 py-3 text-center border-b">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            if (slabPointsList?.length == watch("point_section")) {
                                                                                toast("Can't delete less than point sections!")
                                                                            } else {
                                                                                setSlabPointsList((prev) =>
                                                                                    prev.filter((_, i) => i !== index)
                                                                                );
                                                                            }


                                                                        }}
                                                                        className="hover:text-red-600 transition-colors"
                                                                    >
                                                                        <Trash2 className="w-5 h-5 text-red-500" />
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td
                                                                colSpan={3}
                                                                className="px-6 py-4 text-center text-gray-500 border-b"
                                                            >
                                                                No slab points added yet.
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </SectionCard>
                                </div>


                                <ChartPieLabelList slabList={slabPointsList} />

                            </div>
                        </SectionCard>

                        {/* Buttons */}
                        <div className="sticky top-0  z-20 py-3 flex justify-end gap-3 shadow-sm">

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
        </>
    )
}

/** Section Card wrapper */
function SectionCard({ title, icon, children }) {
    return (
        <div className="bg-card  text-foreground rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
            {(title || icon) && <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                <span className="text-indigo-500">{icon}</span>
                {title}
            </h3>}
            <div className="space-y-4">{children}</div>
        </div>
    )
}

function EditablePointsTable({ name, control, title, register }) {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[
                { id: 1, category: "Design", points: "" },
                { id: 2, category: "Development", points: "" },
                { id: 3, category: "Testing", points: "" },
            ]}
            render={({ field }) => {
                const handlePointsChange = (id, value) => {
                    const updated = field.value.map((row) =>
                        row.id === id ? { ...row, points: value } : row
                    );
                    field.onChange(updated);
                };

                return (
                    <div className="overflow-auto bg-background text-foreground border-[#E8EDF7]">
                        <h3 className="flex items-center gap-2 text-sm font-semibold  mb-2">
                            {title}
                        </h3>
                        <Table className="table-auto  w-full border-collapse rounded-lg border min-h-[200px]">
                            {/* Table Header */}
                            <TableHeader className="text-foreground bg-card border-b">
                                <TableRow>
                                    <TableHead className="px-3 py-2 text-left">Sr.No.</TableHead>
                                    <TableHead className="px-3 py-2 text-left">Point Category</TableHead>
                                    <TableHead className="px-3 py-2 text-left">Points</TableHead>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody>
                                {field.value.length > 0 ? (
                                    field.value.map((row, index) => (
                                        <TableRow key={row.id} className="odd:bg-card even:bg-card">
                                            <TableCell className="px-3 py-2 text-center">{index + 1}</TableCell>
                                            <TableCell className="px-3 py-2">{row.category}</TableCell>
                                            <TableCell className="px-3 py-2 w-34">
                                                <FormInput
                                                    label="Enter Point"
                                                    type="tel"
                                                    register={register}
                                                    name={`point-${row.id}`}
                                                    value={row.points}
                                                    onChange={(e) => handlePointsChange(row.id, e.target.value)}
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

