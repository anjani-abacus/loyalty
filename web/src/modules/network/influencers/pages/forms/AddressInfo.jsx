import { useFormContext } from "react-hook-form";
import { FormInput, FormSelect, FormTextArea } from "../../../../../components/forms";
import { categoryOptions } from "./formOptions";
import { useStateList, useDistrictList } from "../../../../../reactQuery/services/commonApi/useCommon";
import Skeleton from "@mui/material/Skeleton";
import { useEffect } from "react";
import FormSelectField from "../../../../../components/forms/FormSelectField";

export default function AddressInfo({initialData, selectedState, selectedDistrict }) {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext();
  const { data: stateList, isLoading } = useStateList();
  const { data: districtList, mutate: fetchDistrictList } = useDistrictList();


  useEffect(() => {
    if (watch("state") || initialData?.state) {
      console.log(initialData?.state)
      fetchDistrictList({ state_name: (watch("state") || initialData?.state) })
    }
  }, [selectedState])

  return (
    <>
    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> */}
      {/* Left side (2x3 grid) */}
      <div className="grid grid-cols-4 gap-4">
        {/* Row 1 */}
        <FormInput
          label="Pincode"
          name="pincode"
          type="tel"
          register={register}
          error={errors.pincode}
          required
        />
        {/* {!isLoading ? <FormSelect
          label="State"
          name="state"
          control={control}
          error={errors.state}
          options={stateList?.data?.map(item => ({ state: item }))}
          optionValue="state"
          optionLabel="state"
          value={selectedState}
          register={register}
          required
          
        /> : (
          <Skeleton className="h-10 w-full" /> // or loader
        )} */}

        <FormSelectField
          label="State"
          name="state"
          options={stateList?.data?.map(item => ({ label: item, value: item }))}
          value={watch("state")}
          onChange={(val) => { setValue("state", val); fetchDistrictList({ state_name: val }) }}
          error={errors.state}
          required
        />

        {/* District Select */}
        <FormSelectField
          label="District"
          name="district"
          options={districtList?.data?.map(item => ({ label: item, value: item }))}
          value={watch("district")}
          onChange={(val) => setValue("district", val)}
          error={errors.district}
          required
        />
        {/* Row 2 */}
        {/* {stateList?.data?.length ? <FormSelect
          label="District"
          name="district"
          control={control}
          error={errors.district}
          options={districtList?.data?.map(item => ({ district: item }))}
          optionValue="district"
          optionLabel="district"
          value={selectedDistrict}
          register={register}
          required
        /> : (
          <Skeleton className="h-10 w-full" /> // or loader
        )} */}

        <FormInput
          label="City"
          name="city"
          register={register}
          error={errors.city}
          required
        />

        {/* Row 3 */}
        <FormInput
          label="Area"
          name="area"
          register={register}
          error={errors.area}
          required
        />

        <FormInput
          label="Country"
          name="country"
          register={register}
          error={errors.country}
          required
        />
      </div>

      {/* Right side (addresses) */}
      {/* <div className="flex flex-col gap-4">
        <FormTextArea
          label="Address"
          name="address"
          register={register}
          error={errors.address}
          rows={3}
          maxLength={500}
          className="h-24"
          required
        /> */}
        {/* <FormTextArea
          label="Office Address"
          name="office_address"
          register={register}
          error={errors.office_address}
          rows={3}
          maxLength={500}
          className="h-24"
          required
        /> */}
      {/* </div> */}
    {/* </div> */}
    </>
  );
}