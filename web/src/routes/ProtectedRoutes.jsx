// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({children}) {
//   const token = localStorage.getItem("token");
  
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }
  
  
//   // if (token) {
//   //   return <Navigate to="/dashboard" replace />;
//   // }

//   return children
// }


import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
