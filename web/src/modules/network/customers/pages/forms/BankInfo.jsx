// import { useState } from "react";
// import { useFormContext, Controller } from "react-hook-form";
// import { FormInput, FormSelect, FormFileUpload } from "../../../../../components/forms";
// import { redemptionOptions } from "./formOptions";

// export default function BankInfo({selectedPreference}) {
//   const { control, register, watch, formState: { errors } } = useFormContext();
//   const [selectedProfileImage, setSelectedProfileImage] = useState([]);

//   // Watch the redemption preference
//   const bankOption = watch("user_redeemption_prefrence");

//   return (
//     <div>
//       {/* Left Section - Bank / UPI Fields */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* Redemption Preference */}
//         <Controller
//           control={control}
//           name="user_redeemption_prefrence"
//           render={({ field }) => (
//             <FormSelect
//               label="Select Redemption Preference"
//               name="user_redeemption_prefrence"
//               control={control}
//               options={redemptionOptions}
//               optionLabel="value"
//               optionValue="label"
//               value={selectedPreference}
//               onChange={field.onChange}
//               error={errors.user_redeemption_prefrence}
//               required
//             />
//           )}
//         />

//         {/* UPI Option */}
        
//           <FormInput
//             label="UPI ID"
//             name="upi_id"
//             register={register}
//             error={errors.upi_id}
//             required
//           />
        

//         {/* Bank Option */}
        
//           <>
//             <FormInput
//               label="Account Number"
//               name="account_no"
//               register={register}
//               error={errors.account_no}
//               required
//             />
//             <FormInput
//               label="IFSC Code"
//               name="ifsc_code"
//               register={register}
//               error={errors.ifsc_code}
//               required
//             />
//             <FormInput
//               label="Bank Name"
//               name="bank_name"
//               register={register}
//               error={errors.bank_name}
//               required
//             />
//             <FormInput
//               label="Account Holder Name"
//               name="account_holder_name"
//               register={register}
//               error={errors.account_holder_name}
//               required
//             />

//             {/* Optional Profile Picture */}
//             {/* <FormFileUpload
//               label="Upload Profile Picture"
//               name="profileImage"
//               register={register}
//               error={errors.profileImage}
//               accept="image/*"
//               maxSize={8}
//               selectedFiles={selectedProfileImage}
//               setSelectedFiles={setSelectedProfileImage}
//             /> */}
//           </>
        
//       </div>
//     </div>
//   );
// }
