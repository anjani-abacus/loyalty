
// import axios from 'axios';
// import { toast } from 'react-toastify';
// const client = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/loyalty/",
//   // timeout: 10000,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//     // Authorization: token ? `Bearer ${token}` : "", 
//   },
// });


// client.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );



// client.interceptors.response.use(
//   (response) => {
//     const method = response.config.method?.toLowerCase();

//     if (["put", "delete"].includes(method)) {
//       const msg = response?.data?.message || "Success!";
//       toast.success(msg);
//     }
//     return response
//   },
//   (error) => {
//     toast.error(error.response?.data?.error ||error.response?.data?.message|| "Something went wrong!");

//     if (error.response?.status === 401 || error.response.data.message == 'Token expired or invalid') {
//       localStorage.clear();

//     }
//     return Promise.reject(error);
//   }

// );

// export default client; 


import axios from "axios";
import { toast } from "react-toastify";

const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000/loyalty/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


client.interceptors.response.use(
  (response) => {
    const method = response.config.method?.toLowerCase();

    if (["put", "delete"].includes(method)) {
      const msg = response?.data?.message || "Success!";
      toast.success(msg);
    }
    return response;
  },
  (error) => {
   
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Something went wrong!";

    toast.error(message);


    if (
      error?.response?.status === 401 ||
      message?.toLowerCase()?.includes("token expired") ||
      message?.toLowerCase()?.includes("invalid token") ||
      message?.toLowerCase()?.includes("invalid access token")
    ) {
      localStorage.clear();

   
      if (window.location.pathname !== "/login") {
        window.location.replace("/login"); 
      }
    }

    return Promise.reject(error);
  }
);

export default client;
