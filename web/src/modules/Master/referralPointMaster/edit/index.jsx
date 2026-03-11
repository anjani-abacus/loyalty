import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Modal = ({modalType, open, setSelected, setOpen, listData, onSave, reloadData }) => {
  const [formData, setFormData] = useState({
    point_category_name: "",
    influencer_point: 0
  });

  useEffect(()=>{
    if(!open){
      setSelected(null);
      reloadData()
    }
  }, [open])

  useEffect(() => {
    if (listData) {
      setFormData({
        point_category_name: listData.point_category_name || "",
        influencer_point: listData.influencer_point || 0,
      });
    }
  }, [listData]);

const handleChange = (e) => {
  const { name, value, type } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: type === "number" ? Number(value) : value,
  }));
};

  const handleSubmit = () => {
    if(modalType==='add'){
      onSave(formData);
      setOpen(false);
    }

    if(modalType==='edit' && listData?.id){
      onSave({ id: listData.id, ...formData });
      setOpen(false);
    }
  };
// console.log(formData)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{modalType=='add'?'Add':'Update'} Point Category</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div>
            <label className="text-sm font-medium">Category Name*</label>
            <Input
              name="point_category_name"
              value={formData.point_category_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Influencer Point</label>
            <Input
              name="influencer_point"
              type="number"
              value={formData.influencer_point}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="destructive" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">{modalType=='add'?'Add':'Update'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
