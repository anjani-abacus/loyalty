import React from "react";
import { cn } from "@/lib/utils";

const StatusDot = ({ active }) => {
  return (
    <div
      className={cn(
        "h-2 w-2 rounded-full inline-block cursor-pointer transition",
        active ? "bg-green-400  hover:bg-green-500" : "bg-red-400 hover:bg-red-500"
      )}
      title={active ? "Active" : "Inactive"}
    />
  );
};

export default StatusDot;
