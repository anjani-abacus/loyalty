import { toast } from "sonner"

export function showToast(type = "success", message, description) {
  const options = {
    description,
    duration: type == "success" ? 2000 : 3000, 
  }

  switch (type) {
    case "success":
      toast.success(message, { 
        ...options, 
        className: "border border-green-500 text-green-700 font-medium" 
      })
      break
    case "error":
      toast.error(message, { 
        ...options, 
        className: "border border-red-500 text-red-700 font-medium" 
      })
      break
    case "warning":
      toast.warning(message, { 
        ...options, 
        className: "border border-yellow-400 text-yellow-700 font-medium" 
      })
      break
    default:
      toast(message, options) // fallback normal toast
  }
}