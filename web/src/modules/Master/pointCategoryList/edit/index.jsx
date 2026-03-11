import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormSubmitButton } from "../../../../components/forms";

const Modal = ({ modalType, open, setSelected, setOpen, listData, onSave, reloadData, isLoading }) => {
  const INITIAL_VALUES = {

    point_category_name: "",
    contractor_point: "",
    painter_point: ""
  };

  const schema = Yup.object().shape({
    point_category_name: Yup.string().required("Point category name is required"),
    contractor_point: Yup.number()
      .typeError("Contractor point must be a number")
      .required("Contractor point is required"),
    painter_point: Yup.number()
      .typeError("Painter point must be a number")
      .required("Painter point is required"),
  });

  const methods = useForm({
    defaultValues: INITIAL_VALUES,
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, touchedFields },
  } = methods;

  useEffect(() => {
    if (!open) {
      setSelected(null);
      reloadData();
      reset(INITIAL_VALUES);
    }
  }, [open]);

  useEffect(() => {
    if (listData) {
      reset({
        point_category_name: listData.point_category_name || "",
        contractor_point: listData.contractor_point || "",
        painter_point: listData.painter_point || "",
      });
    }
  }, [listData, reset]);

  const onSubmit = (data) => {
    console.log(data)
    if (modalType === "add") {
      onSave(data);
    } else if (modalType === "edit" && listData?.id) {
      onSave({ id: listData.id, ...data });
    }

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {modalType === "add" ? "Add" : "Update"} Point Category
          </DialogTitle>
        </DialogHeader>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-4 flex flex-col gap-4  text-foreground rounded-lg "
          >
            <div className="grid grid-cols-2 gap-4 py-4">
              <div>
                <label className="text-sm font-medium">Category Name*</label>
                <Input {...register("point_category_name")} required />
                {errors.point_category_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.point_category_name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Contractor Point*</label>
                <Input type="number" {...register("contractor_point")} required />
                {errors.contractor_point && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contractor_point.message}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium">Painter Point*</label>
                <Input type="number" {...register("painter_point")} required />
                {errors.painter_point && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.painter_point.message}
                  </p>
                )}
              </div>
            </div>

            <DialogFooter>
              <FormSubmitButton variant="action" className="bg-gray-400 hover:bg-gray-500 " onClick={() => setOpen(false)}>Cancel</FormSubmitButton>
              <FormSubmitButton
                type="submit"
                mode={modalType === "add" ? "add" : "edit"}
                isLoading={isLoading}
                onClick={handleSubmit(onSubmit)}
                className="bg-green-600 hover:bg-green-700"
              >
                {modalType === 'add' ? 'Add' : 'Update'}
              </FormSubmitButton>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
