// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useUserLogoutMutation } from "../../store/services/auth/authApi";

// const Logout = () => {
//   const navigate = useNavigate();
//   const [logout, { isLoading }] = useUserLogoutMutation();

//   const handleLogout = async () => {
//     try {
//       await logout().unwrap();   
//       localStorage.removeItem("token"); 
//       navigate("/login");        
//     } catch (err) {
//       console.error("Logout failed:", err);
//     }
//   };

//   return (
//       <span
//       onClick={handleLogout}
//       className="cursor-pointer text-red-600 hover:text-red-800"
//     >
//       Logout
//     </span>
//   );
// };

// export default Logout;
// src/components/auth/Logout.jsx
import { Navigate, useNavigate } from "react-router-dom";
import { useLogout } from "./useData";

export default function Logout() {
  const navigate = useNavigate();
  const { mutate: logout, isLoading } = useLogout();

  return (
    <span
      onClick={()=>handleLogout()}
      className={`cursor-pointer text-red-600 hover:text-red-800 ${
        isLoading ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      {isLoading ? "Logging out..." : "Logout"}
    </span>
  );
}

  export const handleLogout = () => {
    localStorage.clear();
    location.reload();
  };