

import { useState, useEffect } from "react";
import Select from "react-select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { customSelectStyles } from "../../../../style/reactSelectStyle";
import { useCategory } from "../../category/useData";
import { FormSubmitButton } from "../../../../components/forms";

const EditSubCategory = ({ modalType, open, setOpen, subCategory, onSave ,isLoading}) => {
  const [formData, setFormData] = useState({
    master_category_id: "",
    master_category_name: "",
    sub_category_name: "",
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);

  const { fetchCategoryAsync } = useCategory();

  // Load initial 15 categories when modal opens
  useEffect(() => {
    if (open) {
      loadInitialCategories();
    }
  }, [open]);

  const loadInitialCategories = async () => {
    try {
      setIsLoadingOptions(true);
      const response = await fetchCategoryAsync({ 
        page: 1, 
        limit: 15 
      });
      const options = response.category.map((cat) => ({
        value: Number(cat.id),
        label: cat.category,
      }));
      setCategoryOptions(options);
    } catch (error) {
      console.error("Error loading categories:", error);
      setCategoryOptions([]);
    } finally {
      setIsLoadingOptions(false);
    }
  };


  const handleSearchCategory = async (inputValue) => {
    if (!inputValue || inputValue.trim().length < 2) {
    
      loadInitialCategories();
      return;
    }

    try {
      setIsLoadingOptions(true);
      const response = await fetchCategoryAsync({
        page: 1,
        limit: 50, // Show more results on search
        filters: {
          category: inputValue.trim(),
        },
      });

      const options = response.category.map((cat) => ({
        value: cat.id,
        label: cat.category,
      }));

      setCategoryOptions(options);
    } catch (error) {
      console.error("Error searching categories:", error);
      setCategoryOptions([]);
    } finally {
      setIsLoadingOptions(false);
    }
  };

  // Pre-populate form data when editing
  useEffect(() => {
    if (subCategory) {
      setFormData({
        master_category_id: Number(subCategory.master_category_id) || "",
        master_category_name: subCategory.category_name || "",
        sub_category_name: subCategory.sub_category_name || "",
      });

      // Add the selected category to options if not already present
      if (subCategory.category_id && subCategory.category_name) {
        setCategoryOptions((prev) => {
          const exists = prev.some((opt) => opt.value === subCategory.category_id);
          if (!exists) {
            return [
              { value: subCategory.category_id, label: subCategory.category_name },
              ...prev,
            ];
          }
          return prev;
        });
      }
    } else {
      setFormData({
        master_category_id: "",
        master_category_name: "",
        sub_category_name: "",
      });
    }
  }, [subCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (selectedOption) => {
    setFormData((prev) => ({
      ...prev,
      master_category_id: selectedOption?.value || "",
      master_category_name: selectedOption?.label || "",
    }));
  };

  const handleSubmit = () => {
    if (!formData.master_category_id || !formData.sub_category_name) {
      alert("Please fill all required fields");
      return;
    }

    const payload =
      modalType === "edit" && subCategory?.id
        ? { id: subCategory.id, ...formData }
        : formData;

    onSave(payload);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {modalType === "add" ? "Add" : "Update"} Sub Category
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="col-span-2">
            <label className="text-sm font-medium">Category *</label>
            <Select
            className="mt-2 "
              options={categoryOptions}
              value={
                categoryOptions.find(
                  (opt) => opt.value === formData.master_category_id
                ) || null
              }
              onChange={handleCategoryChange}
              onInputChange={(inputValue, { action }) => {
                // Only search on user input, not on menu open/close
                if (action === "input-change") {
                  handleSearchCategory(inputValue);
                }
              }}
              placeholder={isLoadingOptions ? "Loading..." : "Select or search category"}
              isClearable
              isLoading={isLoadingOptions}
              noOptionsMessage={() => "No categories found"}
              styles={customSelectStyles}
              filterOption={null} // Disable client-side filtering since we're doing server-side
            />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium ">Sub Category *</label>
            <Input
              name="sub_category_name"
              value={formData.sub_category_name}
              onChange={handleChange}
              className="mt-2 bg-section-background"
            />
          </div>
        </div>

        <DialogFooter>
           <FormSubmitButton variant="action"className="bg-gray-400 hover:bg-gray-500 " onClick={() => setOpen(false)}>Cancel</FormSubmitButton>
          <FormSubmitButton
          type="button"
            mode={modalType === "add" ? "add" : "edit"}
            isLoading={isLoading}
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700"
          >
            {modalType === 'add' ? 'Add' : 'Update'}
          </FormSubmitButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditSubCategory;