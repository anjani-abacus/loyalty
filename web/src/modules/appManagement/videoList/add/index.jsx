// import React, { useState, useEffect } from "react";
// import { useForm, Controller, FormProvider } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import Select from "react-select";
// import Container from "../../../../components/ui/container";
// import { DetailHeader } from "../../../../layouts/DataTable/Header";
// import { useCreateVideo, useUpdateVideo, useGetVideoById } from "../useData";
// import { customSelectStyles } from "../../../../style/reactSelectStyle";

// const AddVideo = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEdit = Boolean(id);

//   const methods = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//       users: [],
//       video_url: "",
//     },
//   });

//   const {
//     handleSubmit,
//     control,
//     reset,
//     formState: { errors },
//   } = methods;

//   // Mock hooks
//   const { mutate: createVideo, isLoading: isCreating } = useCreateVideo();
//   const { updateVideo, isLoading: isUpdating } = useUpdateVideo();
//   const { video, isFetching } = useGetVideoById(id);

//   const userTypes = [
//     // { label: "Sales_user", value: "Sales_user" },
//     { label: "Influencer", value: "Influencer" },
//   ];

//   useEffect(() => {
//     if (video) {
//       reset({
//         title: video.title || "",
//         description: video.description || "",
//         video_url: video.video_url || "",
//         users:
//           video.user_type?.map((u) => ({
//             label: u,
//             value: u,
//           })) || [],
//       });
//     }
//   }, [video, reset]);

//   const onSubmit = async (data) => {
//     if (!data.video_url.includes("youtube.com") && !data.video_url.includes("youtu.be")) {
//       alert("Please enter a valid YouTube URL");
//       return;
//     }

//     const payload = {
//       video_title: data?.title,
//       video_desc: data?.description,
//       video_url: data?.video_url?.trim(),
//       // user_type: data.users.map((t) => t.value),
//     };

//     try {

//       createVideo(payload, {
//         onSuccess: () => {
//           alert("Video added successfully!");
//           navigate("/video-list");
//         },
//       });

//     } catch (err) {
//       console.error("Error saving video:", err);
//       alert(err.message);
//     }
//   };

//   return (
//     <Container>
//       <DetailHeader pageTitle={isEdit ? "Edit Video" : "Add New Video"} backPath="/video-list" />

//       {isFetching ? (
//         <p className="p-6">Loading video data...</p>
//       ) : (
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="p-6">
//             <FormProvider {...methods}>
//               <SectionCard title="Video Information" >
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                   {/* Left Column */}
//                   <div className="space-y-4">
//                     {/* Title */}
//                     <FormFieldWrapper label="Video Title" required>
//                       <Controller
//                         name="title"
//                         control={control}
//                         rules={{ required: "Title is required" }}
//                         render={({ field }) => (
//                           <input
//                             {...field}
//                             type="text"
//                             placeholder="Enter video title"
//                             className="border rounded-md p-2 bg-card text-foreground w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         )}
//                       />
//                       {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
//                     </FormFieldWrapper>

//                     {/* User Type */}
//                     <FormFieldWrapper label="User Type" required>
//                       <Controller
//                         name="users"
//                         control={control}
//                         rules={{ required: "Select at least one user type" }}
//                         render={({ field }) => (
//                           <Select
//                             {...field}
//                             options={userTypes}
//                             isMulti
//                             className="w-full"
//                             classNamePrefix="select"
//                             styles={customSelectStyles}
//                             onChange={(selected) => field.onChange(selected)}
//                           />
//                         )}
//                       />
//                       {errors.users && <p className="text-xs text-red-500 mt-1">{errors.users.message}</p>}
//                     </FormFieldWrapper>

//                     {/* YouTube URL */}
//                     <FormFieldWrapper label="YouTube URL" required>
//                       <Controller
//                         name="video_url"
//                         control={control}
//                         rules={{
//                           required: "YouTube URL is required",
//                           // pattern: {
//                           //   value: /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/,
//                           //   message: "Enter a valid YouTube URL",
//                           // },
//                         }}
//                         render={({ field }) => (
//                           <>
//                             <input
//                               {...field}
//                               type="url"
//                               placeholder="https://www.youtube.com/watch?v=example"
//                               className="border bg-card text-foreground rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             />
//                             {/* Preview Section */}
//                             {field.value && getYouTubeVideoID(field.value) && (
//                               <div className="mt-3 w-full flex justify-center">
//                                 <iframe
//                                   width="400"
//                                   height="225"
//                                   src={`https://www.youtube.com/embed/${getYouTubeVideoID(field.value)}`}
//                                   title="YouTube preview"
//                                   frameBorder="0"
//                                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                                   allowFullScreen
//                                   className="rounded-md shadow-md"
//                                 ></iframe>
//                               </div>
//                             )}
//                           </>
//                         )}
//                       />
//                       {errors.video_url && <p className="text-xs text-red-500 mt-1">{errors.video_url.message}</p>}
//                     </FormFieldWrapper>
//                   </div>

//                   {/* Right Column */}
//                   <div className="space-y-4">
//                     {/* Description */}
//                     <FormFieldWrapper label="Description" required>
//                       <Controller
//                         name="description"
//                         control={control}
//                         rules={{ required: "Description is required" }}
//                         render={({ field }) => (
//                           <textarea
//                             {...field}
//                             rows={8}
//                             placeholder="Write a short description about this video..."
//                             className="border bg-card text-foreground rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                           />
//                         )}
//                       />
//                       {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
//                     </FormFieldWrapper>
//                   </div>
//                 </div>
//               </SectionCard>

//             </FormProvider>
//           </div>

//           {/* Save Button */}
//           <div className="flex justify-end mt-6 mr-12">
//             <button
//               type="submit"
//               className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
//               disabled={isCreating || isUpdating}
//             >
//               {isCreating || isUpdating
//                 ? "Saving..."
//                 : isEdit
//                   ? "Update"
//                   : "Save"}
//             </button>
//           </div>
//         </form>
//       )}
//     </Container>
//   );
// };

// export default AddVideo;


// function SectionCard({ title, icon, children }) {
//   return (
//     <div className="bg-section-background text-foreground rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
//       {(title || icon) && (
//         <h3 className="flex items-center gap-2 text-sm font-semibold mb-2">
//           {icon && <span className="text-indigo-500">{icon}</span>}
//           {title}
//         </h3>
//       )}
//       <div className="space-y-4">{children}</div>
//     </div>
//   );
// }

// function FormFieldWrapper({ label, required, children }) {
//   return (
//     <div className="flex flex-col ">
//       <label className="text-sm text-foreground font-medium mb-1">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       {children}
//     </div>
//   );
// }


// function getYouTubeVideoID(url) {
//   const regExp =
//     /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
//   const match = url.match(regExp);
//   return match && match[7].length === 11 ? match[7] : null;
// }


import React, { useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import Container from "../../../../components/ui/container";
import { DetailHeader } from "../../../../layouts/DataTable/Header";
import { customSelectStyles } from "../../../../style/reactSelectStyle";

import { useGetVideoById ,useCreateVideo, useUpdateVideo} from "../useData"; // your existing query hook
import { FormSubmitButton } from "../../../../components/forms"; // use your form button
import { toast } from "react-toastify";

const userTypes = [
  { label: "Influencer", value: "Influencer" },
  // add more as needed
];

export default function AddVideo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const methods = useForm({
    defaultValues: {
      title: "",
      description: "",
      users: [],
      video_url: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = methods;

  // mutations (mutateAsync + robust isLoading)
  const { createVideo, isLoading: creating } = useCreateVideo();
  const { updateVideo, isLoading: updating } = useUpdateVideo();

  // query to fetch single video for editing
  const { video, isFetching } = useGetVideoById(id);

  useEffect(() => {
    if (video) {
      reset({
        title: video.title || "",
        description: video.description || "",
        video_url: video.video_url || "",
        users:
          video.user_type?.map((u) => ({ label: u, value: u })) || [],
      });
    }
  }, [video, reset]);

  function getYouTubeVideoID(url) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  }

  const onSubmit = async (data) => {
    // basic validation
    if (!data.video_url || (!data.video_url.includes("youtube.com") && !data.video_url.includes("youtu.be"))) {
      toast("Please enter a valid YouTube URL");
      return;
    }

    const payload = {
      video_title: data?.title,
      video_desc: data?.description,
      video_url: data?.video_url?.trim(),
      user_type: (data.users || []).map((t) => t.value),
    };

    try {
      if (isEdit) {
        await updateVideo({ id, payload });
        toast("Video updated successfully!");
      } else {
        await createVideo(payload);
        toast("Video added successfully!");
      }
      navigate("/video-list");
    } catch (err) {
      console.error("Error saving video:", err);
      toast(err?.message || "Save failed");
    }
  };

  // Combine loading states so button reflects either mutation or form-submission
  const mutationLoading = creating || updating;
  const loading = mutationLoading || isSubmitting;

  return (
    <Container>
      <DetailHeader pageTitle={isEdit ? "Edit Video" : "Add New Video"} backPath="/video-list" />

      {isFetching ? (
        <p className="p-6">Loading video data...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6">
            <FormProvider {...methods}>
              <SectionCard title="Video Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <FormFieldWrapper label="Video Title" required>
                      <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Title is required" }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="Enter video title"
                            className="border rounded-md p-2 bg-card text-foreground w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      />
                      {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
                    </FormFieldWrapper>

                    <FormFieldWrapper label="User Type" required>
                      <Controller
                        name="users"
                        control={control}
                        rules={{ required: "Select at least one user type" }}
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
                      {errors.users && <p className="text-xs text-red-500 mt-1">{errors.users.message}</p>}
                    </FormFieldWrapper>

                    <FormFieldWrapper label="YouTube URL" required>
                      <Controller
                        name="video_url"
                        control={control}
                        rules={{ required: "YouTube URL is required" }}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="url"
                              placeholder="https://www.youtube.com/watch?v=example"
                              className="border bg-card text-foreground rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {field.value && getYouTubeVideoID(field.value) && (
                              <div className="mt-3 w-full flex justify-center">
                                <iframe
                                  width="400"
                                  height="225"
                                  src={`https://www.youtube.com/embed/${getYouTubeVideoID(field.value)}`}
                                  title="YouTube preview"
                                  frameBorder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="rounded-md shadow-md"
                                />
                              </div>
                            )}
                          </>
                        )}
                      />
                      {errors.video_url && <p className="text-xs text-red-500 mt-1">{errors.video_url.message}</p>}
                    </FormFieldWrapper>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <FormFieldWrapper label="Description" required>
                      <Controller
                        name="description"
                        control={control}
                        rules={{ required: "Description is required" }}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            rows={8}
                            placeholder="Write a short description about this video..."
                            className="border bg-card text-foreground rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )}
                      />
                      {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
                    </FormFieldWrapper>
                  </div>
                </div>
              </SectionCard>
            </FormProvider>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-6 mr-12">
            <FormSubmitButton
              type="submit"
              isLoading={loading}
              disabled={loading}
              mode={isEdit ? "edit" : "add"}
              loadingLabel="Saving..."
              size="sm"
              className="w-40"
            >
              {isEdit ? "Update" : "Save"}
            </FormSubmitButton>
          </div>
        </form>
      )}
    </Container>
  );
}

/* --- Small helpers --- */
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
    <div className="flex flex-col ">
      <label className="text-sm text-foreground font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
