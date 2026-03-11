import { useFormContext } from "react-hook-form";
import { FormInput, FormSelect } from "../../../../../components/forms";
import { documentOption } from "./formOptions";

export default function DocumentInfo({selectedDocType}) {
  const { register, control, watch, formState: { errors } } = useFormContext();

  // Watch the selected document type directly from RHF
  // const selectedDocType = watch("kyc_document_type");

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* <FormInput
          label="PAN Number"
          name="pan_no"
          register={register}
          error={errors.pan_no}
          required
        />  */}

        <FormSelect
          label="Select Document Type"
          name="kyc_document_type"
          control={control}
          register={register}
          error={errors.kyc_document_type}
          options={documentOption}
          optionLabel="label"
          optionValue="value"
          value={selectedDocType}
          required
        />

        <FormInput
          label={`${selectedDocType || "Document"} Number`}
          name="document_no"
          register={register}
          error={errors.document_no}
          required
        />
      </div>
    </div>
  );
}
