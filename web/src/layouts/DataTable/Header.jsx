// import { SidebarTrigger } from "@/components/ui/sidebar";
// import logo from "../../../public/logo1.png";
// import { ModeToggle } from "../../utils/ModeToggle";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { ChevronLeft } from "lucide-react";


// export const useDetailHeader = () => {
//   const { influencerCategory } = useParams();
//     const location = useLocation();
//     const { user } = location.state || {};

//     const pageTitle = influencerCategory
//         ? `${influencerCategory} - ${user?.name}`
//         : "Details";

//     return pageTitle;
// }

// export const useAddHeader = (type='add') => {
//     const location = useLocation();
//     const { pageTitle } = location.state || {pageTitle:''};
//     return pageTitle +' | '+ type;
// }

// export const DataTableHeader = ({ pageTitle }) => {
//   const navigate = useNavigate();
//   const handleGoBack = () => navigate(-1);
//   return (
//   <header className="flex bg-background text-foreground h-14 shrink-0 items-center gap-2">
//     <div className="flex justify-between w-full items-center gap-2 px-4">
//       <div className="flex items-center">
//         <SidebarTrigger className="-ml-1 cursor-pointer" />
//         <button onClick={handleGoBack} className="cursor-pointer flex items-center justify-center px-2">
//           <ChevronLeft className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//           <span>Go Back</span>
//         </button>
//         <h1 className="text-xl p-4 font-bold capitalize">{pageTitle}</h1>
//       </div>
//       <div className="flex gap-4 items-center">
//         <img src={logo} alt="Logo" className="h-28 w-40" />
//         <ModeToggle />
//       </div>
//     </div>
//   </header>
// );}


// export const DetailHeader = ({ pageTitle }) => {
//   const navigate = useNavigate();
//   const handleGoBack = () => navigate(-1);

//   return (
//   <header className="flex bg-background text-foreground h-14 shrink-0 items-center gap-2">
//     <div className="flex justify-between w-full items-center gap-2 px-4">
//       <div className="flex items-center">
//         <SidebarTrigger className="-ml-1 cursor-pointer" />
//         <button onClick={handleGoBack} className="cursor-pointer flex items-center justify-center px-2">
//           <ChevronLeft className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
//           <span>Go Back</span>
//         </button>
//         <h1 className="text-xl p-4 font-bold capitalize">{pageTitle}</h1>
//       </div>
//       <div className="flex gap-2 items-center">
//         <img src={logo} alt="Logo" className="w-auto h-4" />
//         <ModeToggle />
//       </div>
//     </div>
//   </header>
// );}



import { SidebarTrigger } from "@/components/ui/sidebar";
import logoLight from "../../../public/logo.png";
import logoDark from "../../../public/logo-White.png";
import { ModeToggle } from "../../utils/ModeToggle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useTheme } from "../../../src/utils/ThemeProvider";



export const useDetailHeader = () => {
  const { influencerCategory } = useParams();
  const location = useLocation();
  console.log(location.state);
  
  const { user } = location.state || {};

  const pageTitle = influencerCategory
    ? `${influencerCategory}`
    : "Details";

  return pageTitle;
};

export const useAddHeader = (type = "add") => {
  const location = useLocation();
  const { pageTitle } = location.state || { pageTitle: "" };
  return pageTitle + " | " + type;
};

export const DataTableHeader = ({ pageTitle }) => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const { theme } = useTheme(); 

  const logoSrc = theme === "dark" ? logoDark : logoLight;

  return (
    <header className="flex bg-background text-foreground h-14 shrink-0 items-center gap-2">
      <div className="flex justify-between w-full items-center gap-2 px-4">
        <div className="flex items-center">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <button
            onClick={handleGoBack}
            className="cursor-pointer flex items-center justify-center px-2"
          >
            <ChevronLeft className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            <span>Go Back</span>
          </button>
          <h1 className="text-xl p-4 font-bold capitalize">{pageTitle}</h1>
        </div>
        <div className="flex gap-6 items-center">
          <img src={logoSrc} alt="Logo" className="h-8 w-28" />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export const DetailHeader = ({ pageTitle }) => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);
  const { theme } = useTheme(); 

  const logoSrc = theme === "dark" ? logoDark : logoLight;

  return (
    <header className="flex bg-background text-foreground h-14 shrink-0 items-center gap-2">
      <div className="flex justify-between w-full items-center gap-2 px-4">
        <div className="flex items-center">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
          <button
            onClick={handleGoBack}
            className="cursor-pointer flex items-center justify-center px-2"
          >
            <ChevronLeft className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            <span>Go Back</span>
          </button>
          <h1 className="text-xl p-4 font-bold capitalize">{pageTitle}</h1>
        </div>
        <div className="flex gap-2 items-center">
          <img src={logoSrc} alt="Logo" className="w-auto h-4" />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
