"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AthleteLayout } from "@/components/athlete-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Users,
  DollarSign,
  Edit,
  Eye,
  Bell,
  Settings,
  Star,
  Target,
  FileCodeIcon as FileContract,
  ShoppingCart,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

interface AthleteUser {
  userId: number
  id: number
  created_at: number
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  dob: string
  accountType: string
  profile_picture: string
  coverPhoto: string
  city: string
  state?: string | null
  country?: string | null
  zip?: string | null
  role: string
  isApproved: boolean
  isProfileCompleted: boolean
  location: string
  primarySport: string
  positionOrSpeciality: string
  organizationName: string
  yearOfExperience: number
  keyAchievements: string
  currentPerformance: string
  felonyConviction: boolean
  felonyDescription: string
  height: number
  weight: number
  biography?: string | null
  about: string
  access_token: string
  refresh_token: string

  fundingGoal?: {
    id: number
    created_at: number
    fundUses: string
    revenueSharePercentage: number
    currentGoalsTimelines: string
  }

  socialMedia?: {
    id: number
    created_at: number
    twitterFollowers: number
    instagramFollowers: number
    linkedFollowers: number
    personalWebsiteUrl: string
  }

  coach?: {
    id: number
    created_at: number
    name: string
    email: string
    phone: string
    yearOfWorkTogether: number
    achievementAndBackground: string
  }
}


export default function AthleteDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<AthleteUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user")

      if (!userData) {
        console.log("No user data found in localStorage, redirecting to signin")
        router.replace("/auth/signin")
        return
      }

      const parsedUser: AthleteUser = JSON.parse(userData)

      if (parsedUser.role !== "athlete") {
        console.log("User is not an athlete, redirecting to signin")
        router.replace("/auth/signin")
        return
      }

      setUser(parsedUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.replace("/auth/signin")
    } finally {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400"></div>
        <span className="ml-4">Loading Dashboard...</span>
      </div>
    )
  }

  if (!user) return null

  const profileCompletion = user.isProfileCompleted
  const currentFunding = user.fundingGoal?.currentGoalsTimelines || 0

  const fundingPercentage = user.fundingGoal?.revenueSharePercentage ? Math.min(user.fundingGoal.revenueSharePercentage, 100) : 0

  return (
    <AthleteLayout title="Dashboard" description="Welcome back! Here's your performance overview.">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, {user.firstName || user.fullName || "Athlete"}! 👋
            </h1>
            <p className="text-slate-400 text-lg">Here's what's happening with your profile today.</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/settings">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/profile/preview">
                <Eye className="h-4 w-4 mr-2" />
                Preview Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Completion Status */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-lg">Profile Completion</h3>
              <p className="text-slate-300 text-sm">Complete your profile to attract more investors</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">{profileCompletion}%</div>
              <div className="text-slate-400 text-sm">Complete</div>
            </div>
          </div>
          <Progress value={profileCompletion ? 100 : 50} className="mb-4" />
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <CheckCircle className="h-3 w-3 mr-1" />
              Basic Info
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <CheckCircle className="h-3 w-3 mr-1" />
              Athletic Details
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Clock className="h-3 w-3 mr-1" />
              Coach Information
            </Badge>
            <Badge variant="secondary" className="bg-slate-500/20 text-slate-400 border-slate-500/30">
              <AlertCircle className="h-3 w-3 mr-1" />
              Media Upload
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Current Funding</p>
                <p className="text-2xl font-bold text-white">{currentFunding.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Rvenue Share Percentage</p>
                <p className="text-2xl font-bold text-white">{fundingPercentage.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Investors</p>
                <p className="text-2xl font-bold text-white">24</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +3 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Profile Views</p>
                <p className="text-2xl font-bold text-white">1,247</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Fan Engagement</p>
                <p className="text-2xl font-bold text-white">89%</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Excellent rating
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Smart Contract */}
      {/* Keeping as-is since you already have these correctly configured */}
      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-slate-400">Manage your profile and engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/goals">
                <Target className="h-4 w-4 mr-2" />
                Update Career Goals
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/settings">
                <Settings className="h-4 w-4 mr-2" />
                Profile Settings
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/notifications">
                <Bell className="h-4 w-4 mr-2" />
                View Notifications
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FileContract className="h-5 w-5 mr-2" />
              Smart Contract & Requests
            </CardTitle>
            <CardDescription className="text-slate-400">Manage your blockchain contracts and purchases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/smart-contract">
                <FileContract className="h-4 w-4 mr-2" />
                View Smart Contract
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/purchase-request">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Request Purchase
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AthleteLayout>
  )
}
