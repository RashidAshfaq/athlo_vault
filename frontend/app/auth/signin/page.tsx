"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Eye, EyeOff } from "lucide-react"

export default function SignInPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, validate against backend
    const mockUsers = [
      { email: "admin@athlovault.com", userType: "admin", firstName: "Admin", lastName: "User" },
      { email: "investor@example.com", userType: "investor", firstName: "John", lastName: "Investor" },
      { email: "athlete@example.com", userType: "athlete", firstName: "Marcus", lastName: "Johnson" },
      { email: "fan@example.com", userType: "fan", firstName: "Sarah", lastName: "Fan" },
    ]

    const user = mockUsers.find((u) => u.email === formData.email)

    if (!user || formData.password !== "password123") {
      setError("Invalid email or password")
      setIsLoading(false)
      return
    }

    // Store user data in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
        isAuthenticated: true,
      }),
    )

    // Redirect based on user type
    switch (user.userType) {
      case "admin":
        router.push("/admin/dashboard")
        break
      case "investor":
        router.push("/investor/dashboard")
        break
      case "athlete":
        router.push("/athlete/dashboard")
        break
      case "fan":
        router.push("/fan/dashboard")
        break
      default:
        router.push("/dashboard")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md bg-slate-900 border-slate-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-slate-400">Sign in to your AthloVault account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {error && <div className="text-red-400 text-sm text-center">{error}</div>}

              <div className="text-center text-sm text-slate-400 mb-4">
                Demo credentials: Use any email above with password "password123"
              </div>

              <Button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              <div className="text-center text-sm text-slate-400">
                Don't have an account?{" "}
                <Link href="/auth/signup" className="text-amber-400 hover:text-amber-300">
                  Sign up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
