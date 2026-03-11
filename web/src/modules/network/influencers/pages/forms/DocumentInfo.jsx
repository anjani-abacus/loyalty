import { useFormContext } from "react-hook-form";
import { FormInput, FormSelect , FormImageUploader} from "../../../../../components/forms";
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
          type="text"
          maxlength="12"
          register={register}
          error={errors.document_no}
          required
        />
        {/* <FormImageUploader
          label={`${selectedDocType || "Document"} Image Front`}
          name="document_img_front"
          register={register}
          error={errors.document_img_front}
          required
        />
        <FormImageUploader
          label={`${selectedDocType || "Document"} Image Back`}
          name="document_img_back"
          register={register}
          error={errors.document_img_back}
          required
        /> */}
      </div>
    </div>
  );
}
