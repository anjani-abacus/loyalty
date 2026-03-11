"use client";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FormTextArea } from "./forms";
import { FormProvider, useForm } from "react-hook-form";

export function ConfirmationDialog({ openDialog, setOpenDialog, value = '', onResult, submitHanlder }) {

  const handleClose = () => setOpenDialog(false);

  const handleClick = (action = "") => {
    handleClose();
    onResult?.(action);
  };


  return (
    <AlertDialog open={openDialog} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You want to change influencer type to {value}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleClick("cancel")}>Cancel</AlertDialogCancel>
          <AlertDialogAction className={"text-background"} onClick={() => handleClick("continue")}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const INITIAL_VALUES = { remark: "" }
const schema = yup.object().shape({
  remark: yup.string()
    .max(50, "Maximum 50 characters allowed")
    .when("$remarkEnabled", {
      is: true,
      then: (schema) => schema.required("Remark is required"),
      otherwise: (schema) => schema.notRequired(),
    })
});

export function ConfirmationBox({
  openDialog,
  setOpenDialog,
  title = "",
  message = "",
  onResult,
  onCancel,
  remarkEnabled = false
}) {
  const handleClose = () => setOpenDialog(false);

const methods = useForm({
  defaultValues: INITIAL_VALUES,
  resolver: yupResolver(schema),
  context: { remarkEnabled },  
});
  const { handleSubmit, register, control, watch, formState: { errors } } = methods;

  const values = watch()


  const handleClick = (action = "") => {
    handleClose();
    if (action === "continue") {
      onResult?.(action, values);
    } else if (action === "cancel") {
      onCancel?.();
    }
  };

  const onsubmit = () => {
    handleClick("continue")
  }



  return (
    <AlertDialog open={openDialog}>
      <AlertDialogContent className="w-[380px] flex flex-col justify-between">

        <form onSubmit={handleSubmit(onsubmit)}>
          <FormProvider {...methods}>
            <AlertDialogHeader>
              <AlertDialogTitle>{title || "Are You Sure?"}</AlertDialogTitle>
              <AlertDialogDescription>{message}</AlertDialogDescription>

              {remarkEnabled && <div className="mb-4">
              <FormTextArea
                label="Remark"
                name="remark"
                register={register}
                error={errors.remark}
                rows={3}
                maxLength={500}
                className="h-24"
                required
              />
               {errors?.remark?.message && (
                <p className="text-red-500 text-sm">
                  {errors.remark.message}
                </p>
              )}
              </div>
              }

             
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-center space-x-4">
              <AlertDialogCancel onClick={() => handleClick("cancel")}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="text-background"
                type="submit"
              // onClick={() => handleClick("continue")}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </FormProvider>
        </form>

      </AlertDialogContent>
    </AlertDialog>
  );
}
