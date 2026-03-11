
import React, { useEffect, useState } from "react";
import Container from "../../../components/ui/container";
import { DetailHeader } from "../../../layouts/DataTable/Header";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useAboutData } from "./useData"; 
import { AboutUsSkeleton } from "../../../skeleton/tableSkeleton";

const AboutUs = ({ companyId = 1 }) => {
  const { aboutData, isLoading, updateAboutData } = useAboutData(companyId);
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");

  // Sync hook data to local state
  useEffect(() => {
    if (aboutData) {
      setLogo(aboutData.logo || "");
      setDescription(aboutData.description || "");
    }
  }, [aboutData]);

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo(url);
    }
  };

  const handleRemoveLogo = () => setLogo("");

  // Update About Us
  const handleUpdate = () => {
    if (!description.trim()) return alert("Description cannot be empty");

  updateAboutData({
  payload: { logo, description },
  onSuccess: () => alert("About Us updated successfully!"),
  onError: (err) => alert(err.message),
});
  };

  if (isLoading) return <p className="p-6"><AboutUsSkeleton/></p>;

  return (
    <Container>
      <DetailHeader pageTitle="About Us" backPath="/" />

      <form onSubmit={(e) => e.preventDefault()} className="p-6">
        <div className="flex flex-col gap-4 bg-section-background p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-foreground">
            About Us Information
          </h2>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Logo Upload */}
            <div className="flex flex-col items-center">
              <div className="relative">
                {logo ? (
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-32 w-32 object-contain rounded-full border"
                  />
                ) : (
                  <div className="h-32 w-32 flex items-center justify-center border rounded-full text-gray-400">
                    No Logo
                  </div>
                )}

                <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                  ✏️
                </label>

                {logo && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="mt-2 bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Description Editor */}
            <div className="flex-1">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                className="h-60"
                modules={{
                  toolbar: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "link", "code-block"],
                    ["clean"],
                  ],
                }}
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-end mt-12">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default AboutUs;

/* --- Reusable Component --- */
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
