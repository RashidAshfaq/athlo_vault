"use client"

import { useRouter, usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  BarChart3,
  Target,
  Bell,
  Settings,
  LogOut,
  Eye,
  FileCodeIcon as FileContract,
  ShoppingCart,
} from "lucide-react"
import Link from "next/link"

const menuItems = [
  {
    title: "Dashboard",
    url: "/athlete/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Overview",
    url: "/athlete/overview",
    icon: BarChart3,
  },
  {
    title: "Smart Contract",
    url: "/athlete/smart-contract",
    icon: FileContract,
  },
  {
    title: "Purchase Request",
    url: "/athlete/purchase-request",
    icon: ShoppingCart,
  },
  {
    title: "Career Goals",
    url: "/athlete/goals",
    icon: Target,
  },
  {
    title: "Notifications",
    url: "/athlete/notifications",
    icon: Bell,
  },
  {
    title: "Profile Settings",
    url: "/athlete/settings",
    icon: Settings,
  },
]

export function AthleteSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <Sidebar
      className="border-slate-800 bg-slate-900/95 backdrop-blur-sm"
      collapsible="icon"
      variant="sidebar"
      side="left"
    >
      <SidebarHeader className="border-b border-slate-800/50 p-4">
        <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="AthloVault" className="h-16 w-auto" />
          </Link>
      </SidebarHeader>

      <SidebarContent className="bg-slate-900/95 backdrop-blur-sm">
        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className="text-slate-400 text-xs uppercase tracking-wider font-semibold px-3 py-2 mb-2">
            Athlete Portal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="text-slate-300 hover:text-white hover:bg-slate-800/80 data-[active=true]:bg-gradient-to-r data-[active=true]:from-blue-500 data-[active=true]:to-blue-600 data-[active=true]:text-white data-[active=true]:font-semibold data-[active=true]:shadow-lg transition-all duration-200 mx-1 rounded-lg h-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10"
                    tooltip={item.title}
                  >
                    <Link href={item.url} className="flex items-center w-full">
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      <span className="ml-3 group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className="text-slate-400 text-xs uppercase tracking-wider font-semibold px-3 py-2 mb-2">
            Quick Actions
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all duration-200 mx-1 rounded-lg h-10 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10"
                  tooltip="Preview Profile"
                >
                  <Link href="/athlete/profile/preview" className="flex items-center w-full">
                    <Eye className="h-4 w-4 flex-shrink-0" />
                    <span className="ml-3 group-data-[collapsible=icon]:hidden">Preview Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-800/50 p-4">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-red-900/20 hover:border-red-500/20 transition-all duration-200 group-data-[collapsible=icon]:justify-center h-10 rounded-lg border border-transparent"
        >
          <LogOut className="h-4 w-4 group-data-[collapsible=icon]:mr-0 mr-3 flex-shrink-0" />
          <span className="group-data-[collapsible=icon]:hidden">Logout</span>
        </Button>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
