"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AthleteSidebar } from "@/components/athlete-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Menu } from "lucide-react"

interface AthleteLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

interface User {
  email: string
  firstName?: string
  lastName?: string
  userType: string
  isAuthenticated: boolean
}

export function AthleteLayout({ children, title, description }: AthleteLayoutProps) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/signin")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.userType !== "athlete") {
      router.push("/auth/signin")
      return
    }

    setUser(parsedUser)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <SidebarProvider defaultOpen={true}>
        <div className="flex h-screen w-full">
          {/* Sidebar - Fixed on desktop, drawer on mobile */}
          <AthleteSidebar />

          {/* Main Content Area */}
          <SidebarInset className="flex-1 flex flex-col min-w-0 overflow-hidden">
            {/* Mobile Header - Only visible on mobile/tablet */}
            <header className="flex h-14 shrink-0 items-center gap-2 border-b border-slate-800/50 px-4 bg-slate-950/95 backdrop-blur-sm sticky top-0 z-10 md:hidden">
              <SidebarTrigger className="text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg p-2 transition-all duration-200">
                <Menu className="h-5 w-5" />
              </SidebarTrigger>
              <Separator orientation="vertical" className="h-6 bg-slate-700" />
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-amber-600 rounded flex items-center justify-center">
                  <span className="text-slate-900 font-bold text-xs">AV</span>
                </div>
                <span className="text-white font-semibold text-sm">{title}</span>
              </div>
            </header>

            {/* Main Content - Scrollable */}
            <main className="flex-1 overflow-auto">
              <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl w-full">{children}</div>
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}
