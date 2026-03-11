import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useEffect } from "react"

import { DataTableHeader } from "../../../../layouts/DataTable/Header"
import { FormSubmitButton } from "../../../../components/forms"

import BasicInfo from "./forms/BasicInfo"
import AddressInfo from "./forms/AddressInfo"
import DocumentInfo from "./forms/DocumentInfo"
// import BankInfo from "./forms/BankInfo"

import { User, MapPin, FileText, Landmark, LoaderIcon } from "lucide-react"

import { useAddHeader } from "../../../../layouts/DataTable/Header"
import { useCreateInfluencer, useUpdateInfluencer } from "../useData"
import { useLocation, useNavigate } from "react-router-dom"
// import DealerInfo from "./forms/DealerInfo"


// ------------------- Constants -------------------
const INITIAL_VALUES = {
  name: "",
  // email: "",
  mobile: "",
  country: "",
  birth_date: null,                 // date picker field
  // work_anniversary_date: null,      // date picker field
  // wedding_date: null,               // date picker field
  pincode: "",
  state: "",
  district: "",
  city: "",
  area: "",
  // address: "",
  kyc_document_type: "",
  document_no: "",
  // pan_no: "",
  // user_redeemption_prefrence: "",
  // upi_id: "",
  // account_holder_name: "",
  // bank_name: "",
  // ifsc_code: "",
  // account_no: "",
  // influencer_type_name: "",

};

const schema = yup.object().shape({
  influencer_type_name: yup.string()
    .max(50)
    .required("Influencer type name is required"),

  name: yup.string()
    .max(250)
    .required("Name is required"),

  // email: yup.string()
  //   .email("Invalid email")
  //   .required("Email is required"),

  mobile: yup
    .string()
    .matches(
      /^(\+\d{1,3})?\d{10,12}$/,
      "Mobile must be 10-12 digits, optionally prefixed with country code like +91"
    )
    .required("Mobile number is required"),

  country: yup.string()
    .max(100)
    .required("Country is required"),

  state: yup.string()
    .max(150)
    .required("State is required"),

  district: yup.string()
    .max(150)
    .required("District is required"),

  city: yup.string()
    .max(150)
    .required("City is required"),

  area: yup.string()
    .max(400)
    .required("Area is required"),

  pincode: yup.string()
    .max(10)
    .required("Pincode is required"),

  // address: yup.string()
  //   .required("Address is required"),

  kyc_document_type: yup.string()
    .oneOf(['AADHAAR'])
    .required("Document type is required"),

  // document_no: yup.string()
  //   .max(20)
    // .required("Document number is required"),

  document_no: yup.string()
    .matches(/^[2-9]{1}[0-9]{11}$/, "Enter a valid 12-digit Aadhaar number")
    .required("Aadhaar number is required"),

  // pan_no: yup.string()
  //   .max(14)
  //   .required("PAN number is required"),

  // user_redeemption_prefrence: yup.string()
  //   .oneOf(['UPI', 'BANK'])
  //   .required("Redemption preference is required"),

  // upi_id: yup.string().nullable(),
  // account_holder_name: yup.string()
  //   .max(150)
  //   .nullable(),
  // bank_name: yup.string()
  //   .max(150)
  //   .nullable(),
  // ifsc_code: yup.string()
  //   .max(30)
  //   .nullable(),
  // account_no: yup.string()
  //   .max(30)
  //   .nullable(),

  birth_date: yup.date().required(),
  // work_anniversary_date: yup.date().required(),
  // wedding_date: yup.date().required(),
});

// ------------------- Component -------------------
export default function InfluencerForm() {
  const methods = useForm({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(schema),
  })

  const {
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methods

  const location = useLocation()
  const { mode = "add", initialData } = location.state || {}
  const navigate = useNavigate();
  //  console.log();

  const selectedDocType = initialData?.kyc_document_type
  // const selectedPreference = initialData?.user_redeemption_prefrence
  const selectedState = initialData?.state
  const selectedDistrict = initialData?.district

  // const selectedDocType = watch("kyc_document_type")
  // const bankOption = watch("user_redeemption_prefrence")

  const { mutate: createInfluencer, isPending: creating } = useCreateInfluencer()
  const { mutate: updateInfluencer, isPending: updating } = useUpdateInfluencer()
  // const { mutate: updateInfluencerShipping, isPending: updatingShipping } = useUpdateInfluencerShipping()

  const onSubmit = (data) => {
    console.log('submit form ===> ', data)
    if (mode === "add") {
      createInfluencer(data, {
        onSuccess: () => {
          navigate(-1)
        }
      })
    } else {
      console.log('update request', { id: initialData?.id, ...data })
      updateInfluencer({ id: initialData?.id, ...data }, {
        onSuccess: () => {
          navigate(-1)
        }
      })
    }
  }


  // Reset form when editing and data changes
  useEffect(() => {
    if (mode === "edit" && initialData) {

      reset(initialData)
    }
  }, [mode, initialData, reset])


  const pageTitle = useAddHeader(mode)


  useEffect(() => {
    setValue('influencer_type_name', location.state?.pageTitle?.toUpperCase() || '');
}, [])



  return (
    <>
      <DataTableHeader pageTitle={pageTitle} />

      <div className="px-4">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} method="POST" className="space-y-2 mt-3">
            {/* Basic Information */}
            <SectionCard title="Basic Information" icon={<User className="w-4 h-4" />}>
              <BasicInfo />
            </SectionCard>

            {/* Address Information */}
            <SectionCard title="Address Information" icon={<MapPin className="w-4 h-4" />}>
              <AddressInfo initialData={initialData} selectedState={selectedState} selectedDistrict={selectedDistrict} />
            </SectionCard>
            <SectionCard title="Dealer Information" icon={<MapPin className="w-4 h-4" />}>
              {/* <DealerInfo/>           */}
                </SectionCard>

            {/* Document Information */}
            <SectionCard title="Document Information" icon={<FileText className="w-4 h-4" />}>
              <DocumentInfo selectedDocType={selectedDocType} />
            </SectionCard>

            {/* Bank Information */}
            {/* <SectionCard title="Bank Information" icon={<Landmark className="w-4 h-4" />}>
              <BankInfo bankOption={bankOption} selectedPreference={selectedPreference} />
            </SectionCard> */}

            {/* Buttons */}
            <div className="sticky top-0  z-20 py-3 flex justify-end gap-3 shadow-sm">

              {/* <FormSubmitButton
                isLoading={isSubmitting}
                variant="primary"
                size="sm"
                className="w-40"
              >
                {isSubmitting
                  ? mode === "add"
                    ? "Adding..."
                    : "Updating..."
                  : mode === "add"
                  ? "Add Influencer"
                  : "Update Influencer"}
              </FormSubmitButton> */}


              <FormSubmitButton
                mode={mode === "add" ? "add" : "edit"}
                isLoading={creating || updating}
                size="sm"
                className="w-40"
              />


              <FormSubmitButton
                mode="action"
                actionLabel="Discard"
                type="button"
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
    <div className="bg-section-background  text-foreground rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
        <span className="text-indigo-500">{icon}</span>
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}
