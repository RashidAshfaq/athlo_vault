"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

interface User {
  email: string
  firstName?: string
  lastName?: string
  userType: string
  isAuthenticated: boolean
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData)
        if (parsedUser.isAuthenticated) {
          setUser(parsedUser)
        }
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/"
  }

  const getDashboardLink = () => {
    if (!user) return "/dashboard"

    switch (user.userType) {
      case "admin":
        return "/admin/dashboard"
      case "investor":
        return "/investor/dashboard"
      case "athlete":
        return "/athlete/dashboard"
      case "fan":
        return "/fan/dashboard"
      default:
        return "/dashboard"
    }
  }

  const sportsCategories = [
    { name: "Football", href: "/sports/football" },
    { name: "Basketball", href: "/sports/basketball" },
    { name: "Soccer", href: "/sports/soccer" },
    { name: "Baseball", href: "/sports/baseball" },
    { name: "Tennis", href: "/sports/tennis" },
    { name: "Golf", href: "/sports/golf" },
    { name: "Track & Field", href: "/sports/track-field" },
    { name: "Swimming", href: "/sports/swimming" },
  ]

  const navigation = [
    { name: "Trending Athletes", href: "/athletes/trending" },
    { name: "Invest By Sports", href: "/sports", dropdown: sportsCategories },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQs", href: "/faq" },
    { name: "Our Team", href: "/team" },
  ]

  return (
    <header
      style={{ backgroundColor: "#050c13" }}
      className="backdrop-blur-sm border-b border-slate-800/50 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
           <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="AthloVault" className="h-16 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger className="text-slate-300 hover:text-white transition-colors duration-200 flex items-center space-x-1">
                    <span>{item.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-slate-800 border-slate-700">
                    {item.dropdown.map((sport) => (
                      <DropdownMenuItem key={sport.name} asChild>
                        <Link href={sport.href} className="text-slate-300 hover:text-white">
                          {sport.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-300 hover:text-white transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
              <Search className="h-5 w-5" />
            </Button>

            {user ? (
              <>
                <Link href={getDashboardLink()}>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold">Dashboard</Button>
                </Link>
                <Button onClick={handleLogout} variant="ghost" className="text-slate-300 hover:text-white">
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" className="text-slate-300 hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">Sign Up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" style={{ backgroundColor: "#050c13" }} className="border-slate-800">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-slate-300 hover:text-white transition-colors duration-200 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-slate-800">
                  {user ? (
                    <>
                      <Link href={getDashboardLink()}>
                        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold mb-2">
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="w-full border-slate-700 text-slate-300 mb-4 bg-transparent"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth/signin">
                        <Button
                          variant="outline"
                          className="w-full border-slate-700 text-slate-300 mb-2 bg-transparent"
                        >
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/auth/signup">
                        <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold mb-4">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                  <div className="flex justify-center">
                    <Button variant="ghost" size="icon" className="text-slate-300">
                      <Search className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
