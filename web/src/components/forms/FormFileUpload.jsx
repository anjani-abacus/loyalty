import { useState } from "react";

export const FormFileUpload = ({
  label,
  name,
  register,
  error,
  accept,
  selectedFiles = [], setSelectedFiles,
  multiple = false,
  required = false,
  disabled = false,
  maxSize, // in MB
  className = "h-32",
  ...props
}) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // ✅ Optional: size validation
    if (maxSize) {
      const filteredFiles = files.filter(
        (file) => file.size / (1024 * 1024) <= maxSize
      );
      setSelectedFiles(filteredFiles);
    } else {
      setSelectedFiles(files);
    }
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-section-background">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex items-center justify-center w-full">
        <label
          className={`${className} flex flex-col items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer bg-background-50 hover:bg-secondary-100 ${error ? "border-red-500" : "border-section-background"
            } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
          {!selectedFiles ? <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag & drop
            </p>
            {accept && <p className="text-xs text-gray-500">{accept}</p>}
          </div> :
            selectedFiles.length > 0 &&
            selectedFiles.map((file, idx) => (
              <div key={idx} className="mt-2">
                {file.type.startsWith("image/") ? (
                  <img
                    style={{ height: "100px", width: "130px" }}
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="object-cover rounded"
                  />
                ) : (
                  <p className="text-sm text-gray-600">{file.name}</p>
                )}
              </div>
            ))
          }


          <input
            type="file"
            {...register(name)}
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            className="hidden"
            onChange={(e) => {
              handleFileChange(e);
              // keep react-hook-form in sync
              if (props.onChange) props.onChange(e);
            }}
            {...props}
          />
        </label>
      </div>

      {/* ✅ Show selected files */}
      {selectedFiles.length > 0 && (
        <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
          {selectedFiles.map((file, idx) => (
            <li key={idx}>
              {file.name}{" "}
              <span className="text-xs text-gray-400">
                ({(file.size / (1024 * 1024)).toFixed(2)} MB)
              </span>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
