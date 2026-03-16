"use client"

import { LogOut } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar"
import { handleLogout } from "../modules/Auth/Logout"

export function NavProfile({ data }) {
  const initials = data?.name
    ? data.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-sidebar-accent transition-colors">
          <Avatar className="h-9 w-9 rounded-lg shrink-0">
            <AvatarImage src={data?.avatar || "/placeholder.svg"} alt={data?.name} />
            <AvatarFallback className="rounded-lg bg-primary text-primary-foreground font-semibold text-sm">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate leading-tight">{data?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate leading-tight">{data?.email || data?.username || ""}</p>
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            className="shrink-0 p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
