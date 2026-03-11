import React, { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import Container from "../../../../components/ui/container";
import { DetailHeader } from "../../../../layouts/DataTable/Header";
import { FormInput, FormSubmitButton } from "../../../../components/forms";
import { useCreatePdfCatalogue } from "../useData"; 
import { customSelectStyles } from "../../../../style/reactSelectStyle";
import { toast } from "react-toastify";

const AddPdfCatalogue = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const methods = useForm({
    defaultValues: { type: [] },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = methods;

  
  const { createPdf, isLoading: mutationLoading } = useCreatePdfCatalogue();


  const loading = mutationLoading || isSubmitting;

  const onSubmit = async (data) => {
    if (!selectedFile) {
      toast.error("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", data.title || "");
    formData.append("doc", selectedFile);
  
    const types = (data.type || []).map((t) => t?.value).filter(Boolean).join(",");
    formData.append("type", types);

    try {
   
      await createPdf(formData);
      
      navigate("/pdf");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error(err?.message || "Upload failed");
    }
  };

  const userTypes = [{ label: "System", value: "System" }];

  return (
    <Container>
      <DetailHeader pageTitle="Add New PDF" backPath="/pdf" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-6">
          <FormProvider {...methods}>
            <SectionCard title="Basic Information">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormFieldWrapper label="User Type" required>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={userTypes}
                        isMulti
                        className="w-full"
                        classNamePrefix="select"
                        styles={customSelectStyles}
                        onChange={(selected) => field.onChange(selected)}
                        value={field.value}
                      />
                    )}
                  />
                  {errors.type && (
                    <p className="text-xs text-red-500 mt-1">{errors.type.message}</p>
                  )}
                </FormFieldWrapper>

                <FormFieldWrapper label="Title" required>
                  <FormInput
                    name="title"
                    type="text"
                    className="bg-card border rounded-md p-2 w-full"
                    register={register}
                    error={errors?.title}
                  />
                </FormFieldWrapper>

                <FormFieldWrapper label="Upload PDF" required>
                  <PdfUploader setSelectedFile={setSelectedFile} />
                  {!selectedFile && errors?.doc && (
                    <p className="text-xs text-red-500 mt-1">{errors.doc.message}</p>
                  )}
                </FormFieldWrapper>
              </div>
            </SectionCard>
          </FormProvider>
        </div>

        <div className="flex justify-end mt-6 mr-12">
          <FormSubmitButton
            type="submit"
            isLoading={loading}        
            disabled={loading}         
            variant="add"
            size="sm"
            loadingLabel="Uploading..."
          >
            Add PDF
          </FormSubmitButton>
        </div>
      </form>
    </Container>
  );
};

export default AddPdfCatalogue;


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

function FormFieldWrapper({ label, required, children }) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function PdfUploader({ setSelectedFile }) {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setSelectedFile(selected);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setSelectedFile(null);
  };

  return !file ? (
    <label className="cursor-pointer border-2 border-dashed p-6 rounded-lg text-foreground hover:bg-card">
      <span>Click to upload PDF</span>
      <input type="file" accept="application/pdf" className="hidden" onChange={handleFileUpload} />
    </label>
  ) : (
    <div className="flex items-center justify-between border rounded p-2">
      <span className="truncate">{file.name}</span>
      <button type="button" onClick={handleRemoveFile} className="bg-red-500 text-foreground px-2 py-1 rounded text-sm">
        ✕
      </button>
    </div>
  );
}
