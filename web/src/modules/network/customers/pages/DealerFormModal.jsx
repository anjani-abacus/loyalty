import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FormSubmitButton } from "../../../../components/forms";

const DealerFormModal = ({ modalType, open, setOpen, dealer, onSave, isLoading, setSelectedDealer }) => {
  const [formData, setFormData] = useState({
    dealer_code: "",
    dealer_name: "",
    dealer_mobile: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setSelectedDealer?.(null);
      setErrors({});
    }
  }, [open]);

  useEffect(() => {
    if (dealer) {
      setFormData({
        dealer_code: dealer.dealer_code || "",
        dealer_name: dealer.dealer_name || "",
        dealer_mobile: dealer.dealer_mobile || "",
      });
    } else {
      setFormData({ dealer_code: "", dealer_name: "", dealer_mobile: "" });
    }
  }, [dealer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.dealer_code.trim()) newErrors.dealer_code = "Dealer code is required";
    if (!formData.dealer_name.trim()) newErrors.dealer_name = "Dealer name is required";
    if (!formData.dealer_mobile.trim()) {
      newErrors.dealer_mobile = "Mobile number is required";
    } else if (!/^\d{10,12}$/.test(formData.dealer_mobile.trim())) {
      newErrors.dealer_mobile = "Mobile must be 10–12 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    if (modalType === "add") {
      await onSave(formData);
    } else if (modalType === "edit" && dealer?.id) {
      await onSave({ id: dealer.id, ...formData });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md sm:w-full">
        <DialogHeader>
          <DialogTitle>{modalType === "add" ? "Add" : "Edit"} Dealer</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-4 py-4">
          <div>
            <label className="text-sm font-medium">Dealer Code <span className="text-red-500">*</span></label>
            <Input
              name="dealer_code"
              value={formData.dealer_code}
              onChange={handleChange}
              placeholder="e.g. DLR001"
              className="mt-1 bg-section-background"
            />
            {errors.dealer_code && <p className="text-xs text-red-500 mt-1">{errors.dealer_code}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Dealer Name <span className="text-red-500">*</span></label>
            <Input
              name="dealer_name"
              value={formData.dealer_name}
              onChange={handleChange}
              placeholder="Full name"
              className="mt-1 bg-section-background"
            />
            {errors.dealer_name && <p className="text-xs text-red-500 mt-1">{errors.dealer_name}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Mobile Number <span className="text-red-500">*</span></label>
            <Input
              name="dealer_mobile"
              value={formData.dealer_mobile}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className="mt-1 bg-section-background"
            />
            {errors.dealer_mobile && <p className="text-xs text-red-500 mt-1">{errors.dealer_mobile}</p>}
          </div>
        </div>

        <DialogFooter>
          <div className="flex gap-3">
            <FormSubmitButton
              variant="action"
              className="bg-gray-400 hover:bg-gray-500"
              onClick={() => setOpen(false)}
            >
              Cancel
            </FormSubmitButton>
            <FormSubmitButton
              type="button"
              mode={modalType === "add" ? "add" : "edit"}
              isLoading={isLoading}
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              {modalType === "add" ? "Add" : "Update"}
            </FormSubmitButton>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DealerFormModal;
