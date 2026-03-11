


import React, { useState } from "react";
import { Pencil, Trash2, ChevronDown, ChevronUp, Plus, RefreshCcw } from "lucide-react";
import Container from "../../../components/ui/container";
import { Button } from "../../../components/ui/button";
import { ConfirmationBox } from "../../../components/confirmationDialog";
import { BannerSkeleton, FaqSkeleton } from "../../../skeleton/tableSkeleton";
import { useFaqList, useDeleteFaq } from "./useData";
import { useNavigate } from "react-router-dom";
import { DetailHeader } from "../../../layouts/DataTable/Header";
import { DataTable } from "../../../layouts/DataTable";

const FaqList = () => {
  const navigate = useNavigate();
  const { data: faqData, isLoading, refetch:fetchFaqList, isError, error } = useFaqList();
  const { mutate: deleteFaq, isLoading: isDeleting } = useDeleteFaq();

  const [expandedIds, setExpandedIds] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const toggleExpand = (id) =>
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const handleAdd = () => navigate("/add-faq");
  const handleEdit = (id) => navigate(`/edit-faq/${id}`);
  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleDialogResult = (action) => {
    if (action === "continue" && selectedId) {
      deleteFaq(selectedId);
    }
    setOpenDialog(false);
    setSelectedId(null);
  };

    const refreshHandler = () => {
    fetchFaqList()
  }

  if (isLoading) return <FaqSkeleton />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <DetailHeader title="FAQ List" />



      <div className="bg-card rounded shadow p-4 ">
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">FAQ </h2>
          <div className="flex justify-end gap-2 items-center mb-4">
            <button
            onClick={(!isLoading) ? refreshHandler : undefined}
            disabled={(isLoading)}
            className={`p-2 rounded-md transition ${(isLoading) ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
          >
            <RefreshCcw
              size={20}
              className={`${(isLoading) ? "animate-[spin_1s_linear_infinite]" : ""}`}
            />
          </button>
            <Button onClick={handleAdd}>
              <Plus className="w-4 h-4" /> Add FAQ
            </Button>
          </div>
        </div>
        {faqData.map((faq, index) => (
          <div key={faq.id} className="border rounded mb-2 hover:shadow-sm transition-shadow">
            <div
              className="flex justify-between items-center p-3 cursor-pointer bg-section-background"
              onClick={() => toggleExpand(faq.id)}
            >
              <div className="flex gap-1">
                <span className="font-semibold">{index + 1}.</span>{" "}
                <span dangerouslySetInnerHTML={{ __html: faq.question }} />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); handleEdit(faq.id); }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteClick(faq.id); }}
                  className="text-red-500 hover:text-red-700"
                  disabled={isDeleting}
                >
                  <Trash2 size={16} />
                </button>
                {expandedIds.includes(faq.id) ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            {expandedIds.includes(faq.id) && (
              <div className="p-3 border-t bg-card">
                <p className="text-sm" dangerouslySetInnerHTML={{ __html: faq.answer }} />
              </div>
            )}
          </div>
        ))}

      </div>


      <ConfirmationBox
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        title="Delete FAQ"
        message="Are you sure? This action cannot be undone."
        onResult={handleDialogResult}
      />
    </Container>
  );
};

export default FaqList;
