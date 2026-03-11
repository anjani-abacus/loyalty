import { toast } from "react-toastify";

export const copyContent = (text) => {
  if (!text) return;
  navigator.clipboard.writeText(text)
    .then(() => toast.success("Copied"))
    .catch((err) => console.error("Failed to copy:", err));
};