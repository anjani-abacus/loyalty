
// import React, { useEffect } from "react";
// import { usePdfCatalogue, useDeletePdfCatalogue } from "./useData";
// import { DetailHeader, } from "../../../layouts/DataTable/Header";
// import { FileText, Trash2 } from "lucide-react";
// import Container from "../../../components/ui/container";

// const PdfCatalogue = () => {
//   const { fetchPdfCatalogue, pdfCatalogueData, isLoading, isError, error } =
//     usePdfCatalogue();

//   const {
//     deletePdfCatalogue,
//     isDeleting,
//     isError: deleteError,
//     error: deleteErrorMsg,
//   } = useDeletePdfCatalogue();

//   useEffect(() => {
//     fetchPdfCatalogue({ status: "active", page: 1, limit: 10 });
//   }, []);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this PDF?")) {
//       deletePdfCatalogue(id, {
//         onSuccess: () => {
//           fetchPdfCatalogue({ status: "active", page: 1, limit: 10 });
//         },
//       });
//     }
//   };

//   if (isLoading) return <p>Loading PDFs...</p>;
//   if (isError) return <p>Error: {error.message}</p>;

//   return (

    
//     <Container>

//     <DetailHeader pageTitle={"pdf Catalogue"} />     
//       <div className="flex flex-wrap gap-4 mt-6 bg-background " >

        
//         {pdfCatalogueData.map((pdf) => (
//           <div
//             key={pdf.id}
//             className="flex items-center justify-between  shadow rounded-xl p-3 w-[300px] border hover:shadow-md transition cursor-pointer"
//           >
      
//             <a
//               href={`/pdfs/${pdf.doc}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-3 flex-1"
//             >
//               <div className=" p-2 rounded-md text-pdf-icon">
//                 <FileText className=" w-6 h-5 " />
//               </div>
//               <div>
//                 <h3 className=" text-sm  line-clamp-2">
//                   {pdf.title}
//                 </h3>
//                 <p className="text-xs text-pdf-title">
//                   ({pdf.type} - {pdf.created_by_name})
//                 </p>
//               </div>
//             </a>

           
//             <button
//               onClick={() => handleDelete(pdf.id)}
//               className="ml-2 text-destructive hover:text-destructive"
//               disabled={isDeleting}
//             >
//               <Trash2 className="w-5 h-5" />
//             </button>
//           </div>
//         ))}
//       </div>

//       {deleteError && (
//         <p className="text-red-500 mt-2">
//           Error deleting PDF: {deleteErrorMsg?.message}
//         </p>
//       )}
//     </Container>
//   );
// };

// export default PdfCatalogue;


import React, { useEffect, useState } from "react";
import { usePdfCatalogue, useDeletePdfCatalogue, useCreatePdfCatalogue } from "./useData";
import { DetailHeader } from "../../../layouts/DataTable/Header";
import { FileText, Plus, Trash2 } from "lucide-react";
import Container from "../../../components/ui/container";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { ConfirmationBox } from "../../../components/confirmationDialog"; 
import { PdfSkeleton } from "../../../skeleton/tableSkeleton";

const PdfCatalogue = () => {
  const navigate = useNavigate();

  const { fetchPdfCatalogue, pdfCatalogueData, isLoading, isError, error, page, limit } =
    usePdfCatalogue();

  const { deletePdfCatalogue, isDeleting, isError: deleteError, error: deleteErrorMsg } =
    useDeletePdfCatalogue();

  const { createPdfCatalogue, isLoading: isCreating } = useCreatePdfCatalogue();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchPdfCatalogue({ status: "active", page, limit });
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDialogResult = (action) => {
    if (action === "continue" && selectedId) {
      deletePdfCatalogue(selectedId, {
        onSuccess: () => {
          setOpenDialog(false);
          setSelectedId(null);
          fetchPdfCatalogue({ status: "active", page, limit });
        },
      });
    } else {
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const handleAdd = () => {
    navigate("add-pdf");
  };


  if (isLoading) {
    return (
      <Container>
        <DetailHeader pageTitle="PDF Catalogue" />
        <div className="flex justify-end mr-10 items-center">
          <Button disabled>
            <Plus className="w-4 h-4 mr-1" /> Add PDF
          </Button>
        </div>
        <PdfSkeleton /> 
      </Container>
    );
  }
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <DetailHeader pageTitle="PDF Catalogue" />
      <div className="flex justify-end mr-10 items-center">
        <Button onClick={()=>navigate("add-pdf")}>
          <Plus className="w-4 h-4 mr-1" /> Add PDF
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 mt-6 p-2">
        {pdfCatalogueData.map((pdf) => (
          <div
            key={pdf.id}
            className="flex items-center justify-between shadow rounded-xl p-3 w-[300px] border hover:shadow-md transition cursor-pointer bg-section-background"
          >
            <a
              href={`${pdf.doc}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 flex-1"
            >
              <div className="p-2 rounded-md text-pdf-icon">
                <FileText className="w-6 h-5" />
              </div>
              <div>
                <h3 className="text-sm line-clamp-2">{pdf.title}</h3>
                <p className="text-xs text-pdf-title">
                  ({pdf.type} - {pdf.created_by_name})
                </p>
              </div>
            </a>

            <button
              onClick={() => handleDeleteClick(pdf.id)}
              className="ml-2 text-destructive hover:text-destructive"
              disabled={isDeleting}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      {deleteError && (
        <p className="text-red-500 mt-2">
          Error deleting PDF: {deleteErrorMsg?.message}
        </p>
      )}

      {/* ✅ Confirmation Box */}
      <ConfirmationBox
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title="Delete PDF"
        message="Are you sure ? This action cannot be undone."
        onResult={handleDialogResult}
      />
    </Container>
  );
};

export default PdfCatalogue;