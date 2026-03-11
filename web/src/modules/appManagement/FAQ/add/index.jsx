
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../../../components/ui/container";
import { Button } from "../../../../components/ui/button";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Select from "react-select";
import { customSelectStyles } from "../../../../style/reactSelectStyle";

import { useFaqList, useUserList ,useCreateFaq, useEditFaq} from "../useData"; 
import { DetailHeader } from "../../../../layouts/DataTable/Header";
import { toast } from "react-toastify";
import { FormSubmitButton } from "../../../../components/forms";

const AddEditFaq = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const { createFaq, isLoading: creating } = useCreateFaq();
  const { editFaq, isLoading: editing } = useEditFaq();


  const { data: faqList = [] } = useFaqList();
  const { data: userOptions = [], isLoading: usersLoading } = useUserList();

  const userTypes = [
    { label: "ALL", value: "ALL" },
    { label: "Influencer", value: "Influencer" },
  ];

  const faqTypeOptions = [
    { value: "REGISTRATION", label: "Registration" },
    { value: "PRODUCT", label: "Product" },
  ];

  // form state
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedFaqType, setSelectedFaqType] = useState(null);

  // populate when editing
  useEffect(() => {
    if (isEdit && faqList.length > 0) {
      const currentFaq = faqList.find((f) => f.id === Number(id));
      if (currentFaq) {
        setQuestion(currentFaq.question || "");
        setAnswer(currentFaq.answer || "");
        const matchedUser = userTypes.find((opt) => opt.value === currentFaq.user_type) ||
                            userOptions.find((opt) => opt.value === currentFaq.user_type);
        if (matchedUser) setSelectedUser(matchedUser);

        const matchedFaqType = faqTypeOptions.find((opt) => opt.value === currentFaq.faq_type);
        if (matchedFaqType) setSelectedFaqType(matchedFaqType);
      }
    }
  }, [isEdit, id, faqList, userOptions]);

  const getTextFromHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.innerText.trim();
  };


  const isSaving = creating || editing;


  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!selectedUser || !selectedFaqType) {
      toast.error("Please select user type and FAQ type.");
      return;
    }
    if (!getTextFromHtml(question) || !getTextFromHtml(answer)) {
      toast.error("Please enter both question and answer.");
      return;
    }

    const payload = {
      user_type: selectedUser.value,
      faq_type: selectedFaqType.value,
      question,
      answer,
    };

    try {
      if (isEdit) {
        await editFaq({ id, faq: payload });
        toast.success("FAQ updated successfully");
      } else {
        const resp = await createFaq(payload);
      
        if (resp?.message) toast.success(resp.message);
        else toast.success("FAQ created");
      }
      navigate("/faq");
    } catch (err) {
      console.error("FAQ save failed:", err);
      toast.error(err?.message || "Save failed");
    }
  };

  return (
    <Container>
      <DetailHeader pageTitle={isEdit ? "Edit FAQ" : "Add New FAQ"} backPath="/faq" />

      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 flex flex-col gap-4 bg-section-background text-foreground rounded-lg shadow-md"
      >
        <div className="flex gap-10 text-foreground">
          <div>
            <label className="block mb-2 font-medium text-md">Select User Type</label>
            <Select
              className="w-50"
              value={selectedUser}
              onChange={setSelectedUser}
              options={userTypes}
              isLoading={usersLoading}
              placeholder="Choose User Type"
              styles={customSelectStyles}
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-md">Select FAQ Type</label>
            <Select
              className="w-50"
              value={selectedFaqType}
              onChange={setSelectedFaqType}
              options={faqTypeOptions}
              placeholder="Choose FAQ Type"
              styles={customSelectStyles}
            />
          </div>
        </div>

        <div className="text-foreground">
          <label className="block mb-2 font-medium text-xl">Question</label>
          <ReactQuill
            value={question}
            onChange={setQuestion}
            placeholder="Type your question..."
            className="min-h-[120px] bg-card border-2 text-foreground rounded-md [&_.ql-container]:border-none [&_.ql-editor]:focus:outline-none [&_.ql-editor]:focus:shadow-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-xl">Answer</label>
          <ReactQuill
            value={answer}
            onChange={setAnswer}
            placeholder="Type your answer..."
            className="min-h-[120px] bg-card border-2 text-foreground rounded-md [&_.ql-container]:border-none [&_.ql-editor]:focus:outline-none [&_.ql-editor]:focus:shadow-none "
          />
        </div>

    
         
          <div className="flex gap-2">
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
    {isEdit ? "Update FAQ" : "Save FAQ"}
  </FormSubmitButton>

  <Button type="button" variant="secondary" onClick={() => navigate("/faq")}>
    Cancel
  </Button>
</div>

      
      </form>
    </Container>
  );
};

export default AddEditFaq;
