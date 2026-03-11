import { useFormContext } from "react-hook-form";
import { FormDatePicker, FormInput, FormSelect } from "../../../../../components/forms";
import { categoryOptions, redemptionOptions } from "./formOptions";

export default function BasicInfo() {
  const { register, control, formState: { errors } } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
      <FormInput
        label="Full Name"
        
        name="name"
        register={register}
        error={errors.name}
        required
      />
      <FormInput
        label="Mobile Number"
        name="mobile"
        type="tel"
        register={register}
        error={errors.mobile}
        required
      />
      <FormInput
        label="Email Address"
        name="email"
        type="email"
        register={register}
        error={errors.email}
        required
      />

      <FormDatePicker label="Date of Birth" name="birth_date" control={control} error={errors.date_of_birth} required />
      {/* <FormDatePicker label="Work Anniversary Date" name="work_anniversary_date" control={control} error={errors.date_of_birth} required /> */}
      {/* <FormDatePicker label="Wedding Date" name="wedding_date" control={control} error={errors.date_of_birth} required /> */}

    </div>
  );
}
