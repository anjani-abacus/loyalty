import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Select from "react-select";
import { customSelectStyles } from "../../../style/reactSelectStyle";
import { FormSubmitButton } from "../../../components/forms";

const EditModal = ({
  modalType,
  open,
  setSelectedRole = () => { },
  setOpen,
  data,
  onSave,
  reloadData,
  isLoading
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user_type: null,
      role_name: "",
    },
  });

  const options = [{ value: "System", label: "System User" }];


  useEffect(() => {
    if (data && open) {
      reset({
        user_type: options.find((opt) => opt.value === data?.user_type) || null,
        role_name: data.role_name || "",
      });
    }
  }, [data, open, reset]);


  const handleDialogChange = (isOpen) => {
    setOpen(isOpen);
    if (!isOpen) {
      reset({
        user_type: null,
        role_name: "",
      });
      setSelectedRole(null);
      reloadData();
    }
  };


  const onSubmit = (submittedData) => {
    const formattedData = {
      user_type: submittedData.user_type?.value || "",
      role_name: submittedData.role_name,
    };

    if (modalType === "add") {
      onSave(formattedData);
    } else if (modalType === "edit" && data?.id) {
      onSave({ id: data.id, ...formattedData });
    }

    handleDialogChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {modalType === "add" ? "Add" : "Update"} Designation
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4 py-4">

          <div>
            <label className="text-sm font-medium">User Type*</label>
            <Controller
              name="user_type"
              control={control}
              rules={{ required: "Please select a user type" }}

              render={({ field }) => (
                <Select
                  {...field}
                  options={options}
                  placeholder="Select user type"
                  onChange={(selected) => field.onChange(selected)}
                  value={field.value}
                  styles={customSelectStyles}
                />
              )}
            />
            {errors.user_type && (
              <p className="text-xs text-red-600 mt-1">
                {errors.user_type.message}
              </p>
            )}
          </div>


          <div>
            <label className="text-sm font-medium">Designation*</label>
            <Controller
              name="role_name"
              control={control}
              rules={{ required: "Designation name is required" }}
              render={({ field }) => (
                <Input {...field} placeholder="Enter designation" className="mt-2 bg-section-background" />
              )}
            />
            {errors.role_name && (
              <p className="text-xs text-red-600 mt-1">
                {errors.role_name.message}
              </p>
            )}
          </div>

          <DialogFooter className="col-span-2 mt-2 flex justify-end gap-2">
            <div className=" flex gap-3">


              <FormSubmitButton variant="action" className="bg-gray-400 hover:bg-gray-500 " onClick={() => setOpen(false)}>Cancel</FormSubmitButton>
              <FormSubmitButton
                type="submit"
                mode={modalType === "add" ? "add" : "edit"}
                isLoading={isLoading}
               
                className="bg-green-600 hover:bg-green-700"
              >
                {modalType === 'add' ? 'Add' : 'Update'}
              </FormSubmitButton>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
