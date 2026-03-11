"use client"
import {
  BookOpen,
  Bot,
  Send,
  LifeBuoy,
  GalleryVerticalEnd,
  SquareTerminal,
  AudioWaveform,
  Command,
  Settings2,
  Frame,
  PieChart,
  Map,
  QrCodeIcon,
  GiftIcon,
  Printer,
  LayoutDashboard,
  TableOfContents,
  Flag,
  Video,
  Contact,
  Users
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProfile } from "@/components/nav-profile"
import { TeamSwitcher } from "@/components/team-switcher"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { isAction } from "@reduxjs/toolkit"
import { useEffect } from "react"
//  const { data: types = [], isLoading } = useInfluencerTypes()
// This is sample data.
const data = {
  user: {
    name: "abc",
    email: "abc@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "All",
      logo: GalleryVerticalEnd,
      plan: "15 Modules",
    },
    {
      name: "Loyalty",
      logo: AudioWaveform,
      plan: "10 Modules",
    },
    {
      name: "DMS",
      logo: Command,
      plan: "8 Modules",
    },
  ],

navMain: [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    iconColor: "#f54800", // red-orange
  },
  {
    title: "Influencer Network",
    url: "#",
    icon: SquareTerminal,
    iconColor: "#0066ff", // blue
    isActive: true,
    items: [
      { title: "Contractor", url: "/influencer/contractor" },
      { title: "Painter", url: "/influencer/painter" },
    ],
  },
  {
    title: "Customer Network",
    url: "#",
    icon: SquareTerminal,
    iconColor: "#0066ff", // blue
    isActive: true,
    items: [
      { title: "Dealer", url: "/customer/dealer" },
    ],
  },
  {
    title: "Gift Gallery",
    url: "/giftGallery",
    icon: GiftIcon,
    iconColor: "#ff00aa", // pink/magenta
  },
  {
    title: "Bonus",
    url: "#",
    icon: Bot,
    iconColor: "#00cc66", // green
    items: [
      { title: "Bonus Point", url: "/bonus-point" },
      { title: "Badges", url: "/badges" },
      { title: "Spin & Win", url: "/spin-win" },
      { title: "Leaderboard", url: "/leaderboard" },
    ],
  },
  {
    title: "QR Code Label",
    url: "/QrCode",
    icon: QrCodeIcon,
    iconColor: "#ff8800", // orange
  },
  {
    title: "Reprint Coupon",
    url: "/reprintCouponCode",
    icon: Printer,
    iconColor: "#9933ff", // purple
  },
  {
    title: "Redeem Request",
    url: "/redeem-request/gift",
    icon: BookOpen,
    iconColor: "#009999", // teal
    // items: [
    //   // { title: "Cash", url: "/redeem-request/cash" },
    //   { title: "Gift", url: "/redeem-request/gift" },
    // ],
  },
  {
    title: "Ticket",
    url: "/ticket",
    icon: SquareTerminal,
    iconColor: "#ff4444", // red
  },
  {
    title: "Streak",
    url: "/streak-list",
    icon: SquareTerminal,
    iconColor: "#ffaa00", // amber
  },
  {
    title: "Post & Earn",
    url: "/post-earn-list",
    icon: SquareTerminal,
    iconColor: "#33ccff", // sky blue
  },
  {
    title: "Masters",
    url: "#",
    icon: BookOpen,
    iconColor: "#ff33cc", // hot pink
    items: [
      { title: "Products", url: "/product" },
      { title: "Category", url: "/category" },
      { title: "Sub Category", url: "/subcategory" },
      { title: "Point Category", url: "/point-category" },
      { title: "Referral Point Master", url: "/referral-point-master" },
      { title: "Pdf Catalogue", url: "/pdf" },
    ],
  },
]
,
  reports: [
    {
    title: "General Reports",
    url: "#",
    icon: BookOpen,
    iconColor: "#009999",
    items: [
      { title: "Redemption Report", url: "/reports/redemption" },
      { title: "User Scan Report", url: "/reports/user-scan" },
      { title: "Seven Days Not Scanned", url: "/reports/seven-days-not-scanned" },
      { title: "Coupon History", url: "/reports/coupon-history" },

    ],
  },
  {
    title: "Other Reports",
    url: "#",
    icon: BookOpen,
    iconColor: "#009999",
    items: [
      { title: "Category Wise Scan Report", url: "/reports/category-wise-scan" },
      { title: "Points Summary", url: "/reports/point-summary" },
      { title: "Scan Point Report", url: "/reports/scan-point" },
      { title: "User Bonus Points", url: "/reports/user-bonus-points" },
      { title: "Influencer Scan Login", url: "/reports/influencer-scan-login" },
      { title: "User Rewards Point", url: "/reports/user-rewards-points" },
      { title: "State Wise Login Aging", url: "/reports/state-wise-login-aging" },
      { title: "State Kyc Status", url: "/reports/state-kyc-status" },
      { title: "Monthly Scan Aging", url: "/reports/monthly-scan-aging" },
      { title: "Month Wise Scan", url: "/reports/month-wise-scan" },
      { title: "Wallet Balance", url: "/reports/wallet-balance" },
    ],
  }
  ],
  users: [
    {
      title: "Users List",
      url: "/users",
      icon: Frame,
    },
    {
      title: "Roles & Permissions",
      url: "/role-and-permission",
      icon: PieChart,
    },
    
  // 5. Help & learning
  {
    title: "Video Tutorial",
    url: "/video-tutorial",
    icon: SquareTerminal
  },
  ],
  apps:[
    {
      title: "Banner",
      url: "/banner",
      icon: Flag,
    },
    {
      title: "Video List",
      url: "/video-list",
      icon: Video ,
    },
    {
      title: "Contact ",
      url: "/contact",
      icon:  Contact ,
    },
    {
      title: "FAQ",
      url: "/faq",
      icon: TableOfContents ,
    },
  ]
}

function AppSidebar({ ...props }) {
  
  const moduleData = JSON.parse(localStorage.getItem("modules"))

  useEffect(()=>{
    console.log(moduleData)
  }, [])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {/* <NavMain dropdownLabel="CRM" items={moduleData}/> */}
        <NavMain dropdownLabel="CRM" items={data.navMain}/>
        <NavMain dropdownLabel="REPORTS" items={data.reports} />
        <NavMain dropdownLabel="USER MANAGEMENT" items={data.users} />
        <NavMain dropdownLabel="APP MANAGEMENT" items={data.apps} />

      </SidebarContent>
      <SidebarFooter>
        <NavProfile data={data.reports} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
export default AppSidebar