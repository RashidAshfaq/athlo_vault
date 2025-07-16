"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AthleteLayout } from "@/components/athlete-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, DollarSign, TrendingUp, Globe, MapPin, Calendar, Shield, Info } from "lucide-react"

interface AthleteUser {
  email: string
  firstName?: string
  lastName?: string
  userType: string
  isAuthenticated: boolean
}

export default function AthleteInvestors() {
  const router = useRouter()
  const [user, setUser] = useState<AthleteUser | null>(null)

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
  }, [router])

  if (!user) {
    return (
      <AthleteLayout title="Investor Overview" description="Loading your investor overview...">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
        </div>
      </AthleteLayout>
    )
  }

  // Mock data - in real app this would come from API
  const investorStats = {
    totalInvestors: 24,
    totalFunding: 187500,
    fundingGoal: 250000,
    averageInvestment: 7812,
    newInvestorsThisMonth: 3,
    topInvestorStates: [
      { state: "California", count: 8 },
      { state: "New York", count: 5 },
      { state: "Texas", count: 4 },
      { state: "Florida", count: 3 },
      { state: "Other", count: 4 },
    ],
    investorTypes: [
      { type: "Individual", count: 18, percentage: 75 },
      { type: "Corporate", count: 4, percentage: 17 },
      { type: "Institutional", count: 2, percentage: 8 },
    ],
    monthlyGrowth: [
      { month: "Jan", investors: 8 },
      { month: "Feb", investors: 12 },
      { month: "Mar", investors: 18 },
      { month: "Apr", investors: 21 },
      { month: "May", investors: 24 },
    ],
  }

  const fundingPercentage = (investorStats.totalFunding / investorStats.fundingGoal) * 100

  return (
    <AthleteLayout title="Investor Overview" description="View your investor statistics and funding progress">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
            <Users className="h-8 w-8 mr-3" />
            Investor Overview
          </h1>
          <p className="text-slate-400">Track your funding progress and investor statistics</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Investors</p>
                <p className="text-2xl font-bold text-white">{investorStats.totalInvestors}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />+{investorStats.newInvestorsThisMonth} this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Funding</p>
                <p className="text-2xl font-bold text-white">${investorStats.totalFunding.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-400">Progress</span>
                <span className="text-slate-300">{fundingPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={fundingPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Average Investment</p>
                <p className="text-2xl font-bold text-white">${investorStats.averageInvestment.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-2">Per investor</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Funding Goal</p>
                <p className="text-2xl font-bold text-white">${investorStats.fundingGoal.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-amber-400" />
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-2">Target amount</p>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Geographic Distribution
            </CardTitle>
            <CardDescription className="text-slate-400">Where your investors are located</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investorStats.topInvestorStates.map((location, index) => (
                <div key={location.state} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                      <span className="text-slate-300 text-sm font-medium">{index + 1}</span>
                    </div>
                    <span className="text-slate-300">{location.state}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{location.count}</span>
                    <span className="text-slate-400 text-sm">investors</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Investor Types
            </CardTitle>
            <CardDescription className="text-slate-400">Breakdown by investor category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investorStats.investorTypes.map((type) => (
                <div key={type.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">{type.type}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{type.count}</span>
                      <span className="text-slate-400 text-sm">({type.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={type.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Privacy Notice */}
      <Card className="bg-blue-500/10 border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <Shield className="h-6 w-6 text-blue-400 mt-0.5" />
            <div>
              <h3 className="text-blue-400 font-semibold mb-2">Privacy & Communication</h3>
              <p className="text-slate-300 text-sm mb-3">
                For privacy and compliance reasons, individual investor information is not displayed. All communication
                between athletes and investors is managed through AthloVault administrators.
              </p>
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300 text-sm">
                  Need to communicate with investors? Contact your AthloVault representative.
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AthleteLayout>
  )
}
