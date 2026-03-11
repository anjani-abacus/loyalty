import AppSidebar from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Outlet, useLocation } from "react-router-dom"
import { DataTableHeader } from "./DataTable/Header"

export default function Page() {
  const location = useLocation()
  const pathname = location.pathname

  // list of routes where sidebar should not appear
  const hideSidebarRoutes = ["/login" , "/otpverification"] 

  const shouldHideSidebar = hideSidebarRoutes.includes(pathname)

  return (
    <SidebarProvider>
      {!shouldHideSidebar && <AppSidebar />}
      <SidebarInset className=" w-[80%]">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
