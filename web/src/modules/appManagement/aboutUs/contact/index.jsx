import React, { useEffect, useState } from "react";
import Container from "../../../../components/ui/container";
import { DetailHeader } from "../../../../layouts/DataTable/Header";
import { Button } from "../../../../components/ui/button";
import { useContactData } from "../useData";
import { Skeleton } from "../../../../components/ui/skeleton";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FormInput, FormSubmitButton, FormTextArea } from "../../../../components/forms";
import { toast } from 'react-toastify';
import { Trash2, Upload } from "lucide-react";


/* --- ✅ Yup Validation Schema --- */
const contactSchema = Yup.object().shape({
  contact_number: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9]{10}$/, "Enter a valid 10-digit contact number"),
  contact_number_2: Yup.string()
    .nullable()
    .optional()
    .matches(/^[0-9]{10}$/, { message: "Enter a valid 10-digit number", excludeEmptyString: true }),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  website_url: Yup.string()
    .required("Website URL is required"),
  address: Yup.string().required("Address is required"),
  iframe_url_map: Yup.string()
    .required("Google Map URL is required"),
  instagram_url: Yup.string().nullable().optional(),
  facebook_url: Yup.string().nullable().optional(),
  linkedin_url: Yup.string().nullable().optional(),
  twitter_url: Yup.string().nullable().optional(),
  youtube_url: Yup.string().nullable().optional(),
  about_us: Yup.string().nullable().optional(),
});

export const Contact = () => {
  const { contactData, isLoading:isLoading, updateContactData } = useContactData();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // file or URL
  

  const methods = useForm({
    resolver: yupResolver(contactSchema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods;
  /* --- Auto-select first company --- */
  useEffect(() => {
    const company = contactData;
    console.log(company)
    setSelectedCompany(company);
    setSelectedImage(company?.profile_img);
    reset(company ?? {});
  }, [contactData, reset]);

  /* --- Update Handler --- */
  const onSubmit = async (data) => {

    console.log('update data == ', data)

    const formData = new FormData();
    for (const key in data) {
      // Skip null/undefined keys if not needed
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    }

    // Example: if you want to append an image file later
    formData.append("profile_img", selectedImage);

    // ✅ Log to see what’s appended
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    updateContactData({
      id: selectedCompany?.id,
      payload: formData,
      onSuccess: () => toast.success("Contact details updated successfully!"),
      onError: (err) => toast.error(err?.message || "Update failed"),
    });
  };

  if (isLoading) return <Skeleton className="h-64 w-full" />;

  return (
    <Container>
      <DetailHeader pageTitle="Contact Us" backPath="/" />

      <form onSubmit={handleSubmit(onSubmit, (errs) => console.log('VALIDATION ERRORS:', errs))} className="p-6">
        <FormProvider {...methods}>
          <div className=" rounded-lg shadow-md flex flex-col gap-4">
            <div className="p-6 mb-5 rounded-lg bg-section-background ">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                About Information
              </h2>
              <div className="flex gap-8">
                <div>
                  <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                </div>
                <FormTextArea
                  label="About Us"
                  name="about_us"
                  register={register}
                  error={errors.about_us}
                  rows={4}
                  maxLength={500}
                  className="h-35 flex-1"
                  required
                />
              </div>
            </div>


            <div className="rounded-lg p-6 bg-section-background ">
              {/* --- Contact Info --- */}
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormInput
                  label="Contact Number 1"
                  name="contact_number"
                  type="text"
                  register={register}
                  error={errors.contact_number}
                  required
                />

                <FormInput
                  label="Contact Number 2"
                  name="contact_number_2"
                  type="text"
                  register={register}
                  error={errors.contact_number_2}
                  required
                />

                <FormInput
                  label="Email ID"
                  name="email"
                  type="email"
                  register={register}
                  error={errors.email}
                  required
                />

                <FormInput
                  label="Website URL"
                  name="website_url"
                  type="text"
                  register={register}
                  error={errors.website_url}
                  required
                />
              </div>

              <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <FormTextArea
                  label="Address"
                  name="address"
                  register={register}
                  error={errors.address}
                  rows={3}
                  maxLength={500}
                  className="h-24"
                  required
                />

                <FormTextArea
                  label="Google Map (URL)"
                  name="iframe_url_map"
                  register={register}
                  error={errors.iframe_url_map}
                  rows={3}
                  maxLength={500}
                  className="h-24"
                  required
                />
              </div>
              {/* --- Social Links --- */}
              <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormInput
                  label="Instagram URL"
                  name="instagram_url"
                  type="text"
                  register={register}
                  error={errors.instagram_url}
                  required
                />
                <FormInput
                  label="Facebook URL"
                  name="facebook_url"
                  type="text"
                  register={register}
                  error={errors.facebook_url}
                  required
                />
                <FormInput
                  label="Linkedin URL"
                  name="linkedin_url"
                  type="text"
                  register={register}
                  error={errors.linkedin_url}
                  required
                />
                <FormInput
                  label="Twitter URL"
                  name="twitter_url"
                  type="text"
                  register={register}
                  error={errors.twitter_url}
                  required
                />
                <FormInput
                  label="Youtube URL"
                  name="youtube_url"
                  type="text"
                  register={register}
                  error={errors.youtube_url}
                  required
                />
              </div>

              <div className="flex justify-end mt-4">
                <FormSubmitButton
                  type="submit"
                  disabled={isSubmitting}
                  isLoading={isLoading}

                  className={`px-6 text-white ${isSubmitting
                    ? "bg-green-500 opacity-70 cursor-not-allowed"
                    : "bg-green-700 hover:bg-green-800"
                    }`}
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </FormSubmitButton>
              </div>
            </div>


          </div>
        </FormProvider>
      </form>
    </Container>
  );
};

function ImageUploader({ selectedImage, setSelectedImage }) {
  // const [preview, setImage] = useState(selectedImage);
  const [image, setImage] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG and PNG images are allowed!");
      e.target.value = ""; // reset input
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const { width, height } = img;


      
      setImage({ file, preview: URL.createObjectURL(file) });
      setSelectedImage(file);


     
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      toast.error("Error loading image file.");
      e.target.value = "";
    };
  };


  const handleRemoveImage = () => {
    setImage(null);
    setSelectedImage(null);
  };

  return (!image && !selectedImage) ? (
    <label className="
      cursor-pointer 
      border-2 border-dashed border-gray-300 
      rounded-full  
      flex flex-col items-center justify-center 
      w-[150px] h-[150px]
      bg-gradient-to-br from-gray-50 to-gray-100 
      hover:from-gray-100 hover:to-gray-200
      transition-all duration-300 ease-in-out
      hover:shadow-lg
      hover:border-blue-400
      text-gray-600
    ">
      <div className="flex flex-col items-center space-y-3">
        <div className="
          p-1 bg-blue-50 rounded-full border border-blue-200 
          text-blue-500 transition-transform duration-300 
          group-hover:scale-110
        ">
          <Upload size={16} />
        </div>
        <span className="text-xs font-medium">upload Logo</span>
      </div>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </label>
  ) : (
    <div
      className="
        relative 
        border-2 border-gray-200 
        rounded-full 
        overflow-hidden 
        w-[150px] h-[150px] 
        shadow-sm 
        hover:shadow-md 
        transition-shadow duration-300
        bg-gray-50
      "
    >
      <img
        src={image?.preview || selectedImage}
        alt="banner preview"
        className="object-cover w-full h-full"
      />

      {/* Gradient Overlay (optional aesthetic touch) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Delete Button */}
      <button
        type="button"
        onClick={handleRemoveImage}
        className="
          absolute top-3 right-3 
          bg-red-500/90 hover:bg-red-600 
          text-white p-2 rounded-full 
          transition-transform duration-200 
          hover:scale-110 
          shadow-md
          cursor-pointer
        "
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}