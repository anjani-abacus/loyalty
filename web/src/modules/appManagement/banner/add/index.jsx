import React, { useState, useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Container from "../../../../components/ui/container";
import { DetailHeader } from "../../../../layouts/DataTable/Header";
import { toast } from 'react-toastify';
import { useCreateBanner, useUpdateBanner, useGetBannerById } from "../useData";
import { customSelectStyles } from "../../../../style/reactSelectStyle";
import { Trash2, Upload } from "lucide-react";
import { FormSubmitButton } from "../../../../components/forms";
import { Button } from "../../../../components/ui/button";

const AddBanner = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [selectedImage, setSelectedImage] = useState(null);

  const methods = useForm({
    defaultValues: {
      banner_name: "",
      user_type: [],
    },
  });

  const { handleSubmit, control, reset, setValue, formState: { errors } } = methods;


  const { createBanner, isLoading: creating } = useCreateBanner();
  const { updateBanner, isLoading: updating } = useUpdateBanner();
  const { banner, isFetching } = useGetBannerById(id);

  const isSaving = creating || updating;

  const userTypes = [
    { label: "ALL", value: "ALL" },
    // { label: "Sales_user", value: "Sales_user" },
    { label: "Influencer", value: "Influencer" },
  ];

  // Prefill form when editing
  useEffect(() => {
    if (banner) {
      console.log("Prefill banner:", banner);
      reset({
        banner_name: banner.banner_name || "",
        user_type: banner.user_type
          ? { label: banner.user_type, value: banner.user_type }
          : null,
      });

      setSelectedImage(banner.banner_image || null);
    }
  }, [banner, reset]);


  const onSubmit = (data) => {
    if (!selectedImage) {
      toast.error("Please upload a banner image")
      return;
    }

    const payload = {
      banner_name: data.banner_name,
      user_type: data.user_type?.value || "ALL",
      banner_image: selectedImage instanceof File ? selectedImage : null,
    };

    if (isEdit) {
      updateBanner(
        { id, data: payload },
        {
          onSuccess: () => {
            toast.success("Banner updated successfully!");
            navigate("/banner");
          },
          onError: (err) => alert(err.message || "Update failed"),
        }
      );
    } else {
      createBanner(payload, {
        onSuccess: () => {
          toast.success("Banner added successfully!");
          navigate("/banner");
        },
        onError: (err) => alert(err.message || "Creation failed"),
      });
    }
  };


  return (
    <Container>
      <DetailHeader pageTitle={isEdit ? "Edit Banner" : "Add Banner"} backPath="/banner" />

      {isFetching ? (
        <p className="p-6">Loading banner data...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <FormProvider {...methods}>
              <SectionCard title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Banner Name */}
                  <FormFieldWrapper label="Banner Name" required>
                    <Controller
                      name="banner_name"
                      control={control}
                      rules={{ required: "Banner name is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter banner name"
                          className="border-2 rounded-lg w-full bg-card"
                        />
                      )}
                    />
                    {errors.banner_name && <p className="text-xs text-red-500 mt-1">{errors.banner_name.message}</p>}
                  </FormFieldWrapper>

                  {/* User Type */}
                  <FormFieldWrapper label="User Type" required>
                    <Controller
                      name="user_type"
                      control={control}
                      rules={{ required: "Select a user type" }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          options={userTypes}
                          isClearable
                          className="w-full"
                          styles={customSelectStyles}
                          onChange={(selected) => field.onChange(selected)}
                          value={field.value}
                        />
                      )}
                    />


                    {errors.user_type && <p className="text-xs text-red-500 mt-1">{errors.user_type.message}</p>}
                  </FormFieldWrapper>
                </div>

                {/* Upload Image */}
                <FormFieldWrapper label="Upload Image" required>
                  <ImageUploader selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                  <p className="text-xs text-gray-400 mt-1">Dimensions (1600X900px)</p>
                </FormFieldWrapper>
              </SectionCard>
            </FormProvider>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6 mr-12 gap-4">
            <FormSubmitButton
              type="submit"
              isLoading={isSaving}
              disabled={isSaving}
              mode={isEdit ? "edit" : "add"}
              variant={isEdit ? "edit" : "add"}
              size="sm"
              loadingLabel="Saving..."
              className="flex items-center gap-2"
            >
              {isEdit ? "Update Banner" : "Save Banner"}
            </FormSubmitButton>

            <Button type="button" variant="secondary" onClick={() => navigate("/banner")}>
              Cancel
            </Button>

          </div>
        </form>
      )}
    </Container>
  );
};

export default AddBanner;

/* SectionCard Component */
function SectionCard({ title, icon, children }) {
  return (
    <div className="bg-section-background text-foreground rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      {(title || icon) && (
        <h3 className="flex items-center gap-2 text-sm font-semibold mb-2">
          {icon && <span className="text-indigo-500">{icon}</span>}
          {title}
        </h3>
      )}
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* FormFieldWrapper Component */
function FormFieldWrapper({ label, required, children }) {
  return (
    <div className="flex flex-col ">
      <label className="text-sm font-medium mb-1 ">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

/* ImageUploader Component */
function ImageUploader({ selectedImage, setSelectedImage }) {
  // const [preview, setImage] = useState(selectedImage);
  const [image, setImage] = useState(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Only JPG and PNG images are allowed!");
      e.target.value = ""; // reset input
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      const { width, height } = img;

      if (width === 1600 && height === 900) {
        // ✅ Valid image
        setImage({ file, preview: URL.createObjectURL(file) });
        setSelectedImage(file);
      } else {
        toast.error(`Invalid image size! Please upload an image of 1600x900 px. (Your image is ${width}x${height} px)`, {
          autoClose: 5000, // stays for 3 seconds
        });
        // alert(`Invalid image size! Please upload an image of 1600x900 px. (Your image is ${width}x${height} px)`);
        e.target.value = ""; // reset input
        setImage(null);
        setSelectedImage(null);
      }

      // Cleanup the object URL
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      alert("Error loading image file.");
      e.target.value = "";
    };
  };


  const handleRemoveImage = () => {
    setImage(null);
    setSelectedImage(null);
  };

  return !image ? (
    <label className="
      cursor-pointer 
      border-2 border-dashed border-gray-300 
      rounded-2xl 
      p-6 
      flex flex-col items-center justify-center 
      w-[350px] h-[196px]
      bg-gradient-to-br from-gray-50 to-gray-100 
      hover:from-gray-100 hover:to-gray-200
      transition-all duration-300 ease-in-out
      hover:shadow-lg
      hover:border-blue-400
      text-gray-600
    ">
      <div className="flex flex-col items-center space-y-3">
        <div className="
          p-3 bg-blue-50 rounded-full border border-blue-200 
          text-blue-500 transition-transform duration-300 
          group-hover:scale-110
        ">
          <Upload size={28} />
        </div>
        <span className="text-sm font-medium">Click to upload image</span>
        <span className="text-xs text-gray-400">Recommended: 1600x900 px</span>
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
        rounded-2xl 
        overflow-hidden 
        w-[350px] h-[196px] 
        shadow-sm 
        hover:shadow-md 
        transition-shadow duration-300
        bg-gray-50
      "
    >
      <img
        src={image.preview}
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
