// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




//   const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJ1c2VyX3R5cGUiOiJTeXN0ZW0iLCJkYXRlX2NyZWF0ZWQiOiIyMDI1LTA5LTE1VDA1OjU4OjEyLjk0NloiLCJuYW1lIjoiQW5qYW5pIE5hZ2FyIiwiZW1haWwiOiJBbmphbmkuTmFnYXJAZXhhbXBsZS5jb20iLCJhY2Nlc3NfbGV2ZWwiOm51bGwsImRlc2lnbmF0aW9uX2lkIjoxMDEsImRlc2lnbmF0aW9uX25hbWUiOiJTb2Z0d2FyZSBFbmdpbmVlciIsImJyYW5jaF9jb2RlIjpudWxsLCJ1c2VybmFtZSI6ImFuamFuaV8xNzU3OTE1ODkyNzMyIiwicGFzc3dvcmQiOiIkMmIkMTAkZS5hQjFzUnVMa1UyUHdJU1dpQTBMZXFkV0JQRkN5Z0ZUS0t5SDBvRHhOZnZudlNrQ0FTaHUiLCJjb250YWN0XzAxIjoiKzkxOTcxODI4NjQ2NyIsImNvbnRhY3RfMDIiOm51bGwsInBheXRtX21vYmlsZW5vIjpudWxsLCJlbXBsb3llZV9pZCI6IkVNUDEyMyIsImRhdGVfb2Zfam9pbmluZyI6IjIwMjMtMDYtMDFUMDA6MDA6MDAuMDAwWiIsImFkZHJlc3MiOiIxMjMsIE1HIFJvYWQsIFB1bmUiLCJzdGF0ZV9uYW1lIjoiTWFoYXJhc2h0cmEiLCJ3b3JraW5nX3N0YXRlX25hbWUiOiJNYWhhcmFzaHRyYSIsIndvcmtpbmdfZGlzdHJpY3RfbmFtZSI6Ik11bWJhaSIsImRpc3RyaWN0X25hbWUiOiJQdW5lIiwicGluY29kZSI6IjQxMTAwMSIsImNpdHkiOiJQdW5lIiwiYXJlYSI6bnVsbCwid2Vla2x5X29mZiI6IlN1bmRheSIsImltYWdlIjpudWxsLCJzdGF0dXMiOm51bGwsInVzZXJfdG9rZW4iOm51bGwsInVuaXF1ZV90b2tlbiI6bnVsbCwiZmNtX3Rva2VuIjpudWxsLCJicmFuZCI6bnVsbCwibGFzdF91cGRhdGVkX2J5IjpudWxsLCJsYXN0X3VwZGF0ZWRfYnlfbmFtZSI6bnVsbCwibGFzdF91cGRhdGVkX29uIjpudWxsLCJmaXJzdF9sb2dpbiI6bnVsbCwibGF0ZXN0X2xvZ2luIjpudWxsLCJhcHBfdmVyc2lvbiI6bnVsbCwiZGV2aWNlX3VuaXF1ZV9pZCI6bnVsbCwiZGV2aWNlX2luZm8iOm51bGwsInRlc3RfdXNlcl9mbGFnIjpudWxsLCJvcmRlcl90eXBlIjpudWxsLCJ0aGlyZF9wYXJ0eV9kaXNhYmxlIjpudWxsLCJ0aGlyZF9wYXJ0eV9hcHAiOm51bGwsImNhbWVyYV9mbGFnIjpudWxsLCJub3RpZmljYXRpb25fZmxhZyI6bnVsbCwiYXNzaWduX3VuaXQiOm51bGwsImFzc2lnbl9jb21wYW55IjpudWxsLCJjb21wYW55X2Rpc3BhdGNoX3R5cGUiOm51bGwsIndhcmVob3VzZV9pZCI6bnVsbCwibGF0IjpudWxsLCJsbmciOm51bGwsImdwc19hZGRyZXNzIjpudWxsLCJkb3dubG9hZCI6ZmFsc2UsImRlbCI6ZmFsc2UsImRhdGVfb2ZfYmlydGgiOiIxOTk5LTA4LTE0VDAwOjAwOjAwLjAwMFoiLCJkYXRlX29mX3dlZGRpbmciOiIyMDI0LTAyLTE0VDAwOjAwOjAwLjAwMFoiLCJpbmZsdWVuY2VyX2FwcHJvdmFsX2xldmVsIjpudWxsLCJmb3JjZV9sb2dvdXQiOmZhbHNlfSwiaWF0IjoxNzU3OTM3ODEzLCJleHAiOjE3NTg1NDI2MTN9.ZsoVF6vJQcO8h_H2yXdSbtBosJYw8edJoPARd-F2JtM"
  
//   const baseQuery = fetchBaseQuery({
//   baseUrl: import.meta.env.VITE_BASE_URL,
//   prepareHeaders: (headers, { getState }) => {
  
//     const stateToken = getState()?.auth?.token;


//     const localToken = localStorage.getItem("token");
//  console.log(localToken);
 

//     const token = stateToken || localToken || TOKEN;

//     if (token && token !== "undefined") {
//       headers.set("Authorization", `Bearer ${token}`);
//     }
//     // localStorage.setItem("token", data.token); 

//         return headers;
//   },
// });



// export const baseApi = createApi({
//   reducerPath: "api",
//   baseQuery,
//   endpoints: () => ({}),
//   tagTypes: ["user", "product", "influencers" ,"Auth" ,"Modules", "Roles", "DesignationModules","Category" ,"bonus"],
// });
