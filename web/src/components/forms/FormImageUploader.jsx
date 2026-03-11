// import { useEffect, useState } from "react"

// export const ImageUploader=({setSelectedImage, uploadedImage})=>{
//   const [image, setImage] = useState(null);
//   useEffect(()=>{
//     if(uploadedImage){
//       setImage({preview:uploadedImage})
//     }
//   }, [])
  
//   // handle file selection
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage({
//         file,
//         preview: URL.createObjectURL(file),
//       });
//     }

//     setSelectedImage(e.target.files[0])
//   };

//   // remove uploaded image
//   const handleRemoveImage = () => {
//     setImage(null);
//   };

//   return (
//       !image ? (
//         <label className="cursor-pointer border-2 border-dashed p-6 rounded-lg text-muted-foreground bg-section-background hover:bg-background ">
//           <span>Click to upload image</span>
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleImageUpload}
//           />
//         </label>
//       ) : (
//         <div className="relative">
//           <img
//             src={image.preview}
//             alt="Uploaded Preview"
//             className="w-40 h-40 object-cover rounded-lg border"
//           />
//           <button
//             onClick={handleRemoveImage}
//             className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-sm"
//           >
//             ✕
//           </button>
//         </div>
//       )
//   );
// }
import { useEffect, useState } from "react";

export default function FormImageUploader({ setSelectedImage, uploadedImage }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (uploadedImage) {
      setImage({ preview: uploadedImage });
    }
  }, [uploadedImage]);

  const handleImageUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    setImage({
      file,
      preview: URL.createObjectURL(file),
    });

    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setSelectedImage(null);
  };

  return !image ? (
    <label className="cursor-pointer border-2 border-dashed p-6 rounded-lg text-muted-foreground bg-section-background hover:bg-background">
      <span>Click to upload image</span>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />
    </label>
  ) : (
    <div className="relative">
      <img
        src={image.preview}
        alt="Uploaded Preview"
        className="w-40 h-40 object-cover rounded-lg border"
      />
      <button
        onClick={handleRemoveImage}
        className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 rounded text-sm"
      >
        ✕
      </button>
    </div>
  );
}
