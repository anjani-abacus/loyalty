// "use client"

// import * as React from "react"
// import { ChevronsUpDown, Plus } from "lucide-react"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
// import { useEffect } from "react"
// import { useState } from "react"

// export function TeamSwitcher({ teams }) {
//   const { isMobile } = useSidebar()
//   const [activeTeam, setActiveTeam] = React.useState(teams[0])
//   const userDetails = JSON.parse(localStorage.getItem("loginDetails"))
//   const [loggedInUser, setLoggedInUser] = useState(null)

//   useEffect(()=>{
//     setLoggedInUser(userDetails)
//   }, [])

//   if (!activeTeam) {
//     return null
//   }

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//           {/* <DropdownMenuTrigger asChild> */}
//           <SidebarMenuButton
//             size="lg"
//             className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//           >
//             <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
//               {/* <activeTeam.logo className="size-4" /> */}
//               <span>{loggedInUser?.name
//                 ?.split(' ')
//                 .map(word => word[0]?.toUpperCase())
//                 .join('.')}</span>
//             </div>
//             <div className="grid flex-1 text-left text-sm leading-tight">
//               <span className="truncate font-semibold">{loggedInUser?.name?.toUpperCase() || 'User'}</span>
//               <span className="truncate text-xs">{loggedInUser?.designation_name}</span>
//             </div>
//             {/* <ChevronsUpDown className="ml-auto" /> */}
//           </SidebarMenuButton>
//           {/* </DropdownMenuTrigger> */}
//           <DropdownMenuContent
//             className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
//             align="start"
//             side={isMobile ? "bottom" : "right"}
//             sideOffset={4}
//           >
//             <DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
//             {teams.map((team, index) => (
//               <DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className="gap-2 p-2">
//                 <div className="flex size-6 items-center justify-center rounded-sm border">
//                   <team.logo className="size-4 shrink-0" />
//                 </div>
//                 {team.name}
//                 <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   )
// }


"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut } from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"

export function TeamSwitcher({ teams = [] }) {
  const { isMobile } = useSidebar()

  // keep a normalized user object in state
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

  // helper to normalize various shapes into { name, designation_name, ... }
  function normalizeUser(parsed) {
    if (!parsed) return null
    const name = parsed.name || parsed.user?.name || parsed.user?.fullName || parsed.full_name || ""
    const designation =
      parsed.designation_name ||
      parsed.user?.designation ||
      parsed.data?.designation ||
      parsed.role ||
      ""
    return { ...parsed, name, designation_name: designation }
  }

  useEffect(() => {
    function readFromLocalStorage() {
      try {
        const raw = localStorage.getItem("loginDetails")
        console.log("loginDetails (raw):", raw)
        if (!raw) {
          setLoggedInUser(null)
          return
        }
        const parsed = JSON.parse(raw)
        console.log("loginDetails (parsed):", parsed)
        setLoggedInUser(normalizeUser(parsed))
      } catch (err) {
        console.error("Error reading/parsing loginDetails:", err)
        setLoggedInUser(null)
      } finally {
        setLoadingUser(false)
      }
    }

    readFromLocalStorage()

    // listen for storage events (if login flow writes from another tab/window)
    function onStorage(e) {
      if (e.key === "loginDetails") {
        try {
          const newVal = e.newValue ? normalizeUser(JSON.parse(e.newValue)) : null
          setLoggedInUser(newVal)
        } catch {
          setLoggedInUser(null)
        }
      }
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const initials = loggedInUser?.name
    ? loggedInUser.name
        .split(" ")
        .map(word => word[0]?.toUpperCase())
        .join(".")
    : "U"

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <SidebarMenuButton
            size="lg"
            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground profile-card"
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <span>{initials}</span>
            </div>

            <div className="grid flex-1 text-left text-sm leading-tight z-20">
              <span className="truncate font-semibold">
                {loadingUser ? "Loading…" : (loggedInUser?.name ? loggedInUser.name.toUpperCase() : "User")}
              </span>
              <span className="truncate text-xs">
                {loadingUser ? "" : (loggedInUser?.designation_name || "")}
              </span>

              {/* TEMP debug: shows the actual state object. Remove this after confirming. */}
              {/* <pre className="text-xs mt-1 max-w-xs overflow-auto">{JSON.stringify(loggedInUser, null, 2)}</pre> */}
            </div>
          </SidebarMenuButton>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground profile-card">Teams</DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem key={team.name} onClick={() => {/* setActiveTeam if needed */}} className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <team.logo className="size-4 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}


// "use client"

// import * as React from "react"
// import { ChevronsUpDown, Plus } from "lucide-react"

// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuShortcut,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
// import { useEffect, useState } from "react"

// export function TeamSwitcher({ teams }) {
//   const { isMobile } = useSidebar()
//   const [activeTeam, setActiveTeam] = React.useState(teams[0])
//   const [loggedInUser, setLoggedInUser] = useState(null)

//   useEffect(() => {
//     // Read from localStorage only after component mounts (client-side)
//     const userDetails = localStorage.getItem("loginDetails")
//     // console.log("user details===>",userDetails);
//     if (userDetails) {
//       try {
//         setLoggedInUser(JSON.parse(userDetails))
//         // console.log("===>",  setLoggedInUser);

//       } catch (error) {
//         console.error("Failed to parse user details:", error)
//       }
//     }
//   }, [])
//   useEffect(() => {
//     // console.log("loggedInUser state updated:", loggedInUser)
//   }, [loggedInUser])

//   // console.log("Component rendering with loggedInUser:", loggedInUser)


  
//   if (!activeTeam) {
//     return null
//   }

//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <DropdownMenu>
//           <SidebarMenuButton
//             size="lg"
//             className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground profile-card"
//           >
//             <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
//               <span>{loggedInUser?.name
//                 ?.split(' ')
//                 .map(word => word[0]?.toUpperCase())
//                 .join('.')}</span>
//             </div>
//             <div className="grid flex-1 text-left text-sm leading-tight">
//               <span className="truncate font-semibold">{loggedInUser?.name?.toUpperCase() || 'User'}</span>
//               <span className="truncate text-xs">{loggedInUser?.designation_name}</span>
//             </div>
//           </SidebarMenuButton>
//           <DropdownMenuContent
//             className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
//             align="start"
//             side={isMobile ? "bottom" : "right"}
//             sideOffset={4}
//           >
//             <DropdownMenuLabel className="text-xs text-muted-foreground profile-card">Teams</DropdownMenuLabel>
//             {teams.map((team, index) => (
//               <DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className="gap-2 p-2">
//                 <div className="flex size-6 items-center justify-center rounded-sm border">
//                   <team.logo className="size-4 shrink-0" />
//                 </div>
//                 {team.name}
//                 <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
//               </DropdownMenuItem>
//             ))}
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   )
// }