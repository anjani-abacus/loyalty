import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormSubmitButton } from "../../../../components/forms";

const EditCategory = ({modalType, open,setSelectedCategory, setOpen, category, onSave, reloadData ,isLoading }) => {
  const [formData, setFormData] = useState({
    category: "",
    direct_dealer_discount: 0,
    retailer_discount: 0,
    gst: 0,
  });

  useEffect(()=>{
    if(!open){
      setSelectedCategory(null);
      reloadData()
    }
  }, [open])

  useEffect(() => {
    if (category) {
      setFormData({
        category: category.category || "",
        direct_dealer_discount: category.direct_dealer_discount || 0,
        retailer_discount: category.retailer_discount || 0,
        gst: category.gst || 0,
      });
    }
  }, [category]);
const handleChange = (e) => {
  const { name, value, type } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: type === "number" ? Number(value) : value,
  }));
};

 const handleSubmit = async () => {
  if (modalType === 'add') {
    await onSave(formData);
  } else if (modalType === 'edit' && category?.id) {
    await onSave({ id: category.id, ...formData });
  }
  setOpen(false);
};

// console.log(formData)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md sm:w-full flex flex-col items-center">
        <DialogHeader>
          <DialogTitle>{modalType=='add'?'Add':'Update'} Category</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4 ">
          <div>
            <label className="text-sm font-medium">Category *</label>
            <Input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-3 bg-section-background"
            />
          </div>

          {/* <div>
            <label className="text-sm font-medium">Primary Customer Discount (%)</label>
            <Input
              name="direct_dealer_discount"
              type="number"
              value={formData.direct_dealer_discount}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Secondary Customer Discount (%)</label>
            <Input
              name="retailer_discount"
              type="number"
              value={formData.retailer_discount}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">GST (%)</label>
            <Input
              name="gst"
              type="number"
              value={formData.gst}
              onChange={handleChange}
            />
          </div> */}
        </div>

        <DialogFooter>
          <div className=" flex gap-3">

       
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
   </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
