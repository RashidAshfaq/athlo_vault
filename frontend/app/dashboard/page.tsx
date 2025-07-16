"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  DollarSign,
  Users,
  Activity,
  Bell,
  Settings,
  PlusCircle,
  BarChart3,
  Wallet,
  Star,
} from "lucide-react"
import Link from "next/link"

// Mock user data - in real app this would come from authentication
const mockUser = {
  name: "John Investor",
  role: "investor", // could be "athlete", "investor", "institution", "fan"
  avatar: "/placeholder.svg?height=40&width=40",
  verified: true,
}

export default function DashboardPage() {
  const [activeRole, setActiveRole] = useState("investor")

  // Mock data for different dashboard types
  const investorData = {
    portfolio: {
      totalValue: "$125,430",
      totalGrowth: "+12.5%",
      activeInvestments: 8,
      totalReturn: "$15,430",
    },
    investments: [
      {
        id: 1,
        athleteName: "Marcus Johnson",
        sport: "Basketball",
        invested: "$5,000",
        currentValue: "$6,250",
        growth: "+25%",
        image: "/placeholder.svg?height=60&width=60",
      },
      {
        id: 2,
        athleteName: "Sarah Chen",
        sport: "Tennis",
        invested: "$3,000",
        currentValue: "$3,660",
        growth: "+22%",
        image: "/placeholder.svg?height=60&width=60",
      },
    ],
    alerts: [
      { id: 1, message: "Marcus Johnson scored 35 points last night!", type: "performance" },
      { id: 2, message: "New payout available: $125.50", type: "payout" },
      { id: 3, message: "Sarah Chen advanced to semifinals", type: "achievement" },
    ],
  }

  const athleteData = {
    profile: {
      valuation: "$2.5M",
      growth: "+15%",
      followers: "125K",
      tokensSold: "75%",
    },
    stats: {
      performance: [
        { metric: "Points per Game", value: "24.5", change: "+2.1" },
        { metric: "Assists", value: "8.2", change: "+0.8" },
        { metric: "Field Goal %", value: "48.5%", change: "+3.2%" },
      ],
    },
    earnings: {
      totalRaised: "$1,875,000",
      nextPayout: "$12,500",
      investors: 156,
    },
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {mockUser.name}</h1>
              <p className="text-slate-400">Here's what's happening with your investments today.</p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Role Switcher */}
          <Tabs value={activeRole} onValueChange={setActiveRole} className="mb-8">
            <TabsList className="bg-slate-800 border-slate-700">
              <TabsTrigger
                value="investor"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900"
              >
                Investor Dashboard
              </TabsTrigger>
              <TabsTrigger
                value="athlete"
                className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900"
              >
                Athlete Dashboard
              </TabsTrigger>
              <TabsTrigger value="fan" className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900">
                Fan Dashboard
              </TabsTrigger>
            </TabsList>

            {/* Investor Dashboard */}
            <TabsContent value="investor" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Portfolio Value</p>
                        <p className="text-2xl font-bold text-white">{investorData.portfolio.totalValue}</p>
                        <p className="text-green-400 text-sm">{investorData.portfolio.totalGrowth}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total Return</p>
                        <p className="text-2xl font-bold text-white">{investorData.portfolio.totalReturn}</p>
                        <p className="text-amber-400 text-sm">+12.5% this month</p>
                      </div>
                      <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-amber-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Active Investments</p>
                        <p className="text-2xl font-bold text-white">{investorData.portfolio.activeInvestments}</p>
                        <p className="text-blue-400 text-sm">Across 5 sports</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Performance</p>
                        <p className="text-2xl font-bold text-white">Excellent</p>
                        <p className="text-purple-400 text-sm">Top 10% investors</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Activity className="h-6 w-6 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Portfolio */}
                <div className="lg:col-span-2">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-white">Your Investments</CardTitle>
                      <Link href="/athletes">
                        <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Invest More
                        </Button>
                      </Link>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {investorData.investments.map((investment) => (
                        <div
                          key={investment.id}
                          className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <img
                              src={investment.image || "/placeholder.svg"}
                              alt={investment.athleteName}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h4 className="text-white font-semibold">{investment.athleteName}</h4>
                              <p className="text-slate-400 text-sm">{investment.sport}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-semibold">{investment.currentValue}</p>
                            <p className="text-green-400 text-sm">{investment.growth}</p>
                          </div>
                        </div>
                      ))}
                      <Link href="/portfolio">
                        <Button
                          variant="outline"
                          className="w-full border-slate-700 text-slate-300 hover:text-white bg-transparent"
                        >
                          View Full Portfolio
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Recent Activity */}
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {investorData.alerts.map((alert) => (
                        <div key={alert.id} className="flex items-start space-x-3 p-3 bg-slate-900/50 rounded-lg">
                          <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-slate-300 text-sm">{alert.message}</p>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full border-slate-700 text-slate-300 hover:text-white text-sm bg-transparent"
                      >
                        View All Activity
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Link href="/simulator">
                        <Button
                          variant="outline"
                          className="w-full border-slate-700 text-slate-300 hover:text-white justify-start bg-transparent"
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Investment Simulator
                        </Button>
                      </Link>
                      <Link href="/wallet">
                        <Button
                          variant="outline"
                          className="w-full border-slate-700 text-slate-300 hover:text-white justify-start bg-transparent"
                        >
                          <Wallet className="h-4 w-4 mr-2" />
                          Manage Wallet
                        </Button>
                      </Link>
                      <Link href="/athletes/trending">
                        <Button
                          variant="outline"
                          className="w-full border-slate-700 text-slate-300 hover:text-white justify-start bg-transparent"
                        >
                          <Star className="h-4 w-4 mr-2" />
                          Discover Athletes
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Athlete Dashboard */}
            <TabsContent value="athlete" className="space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Current Valuation</p>
                        <p className="text-2xl font-bold text-white">{athleteData.profile.valuation}</p>
                        <p className="text-green-400 text-sm">{athleteData.profile.growth}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Total Raised</p>
                        <p className="text-2xl font-bold text-white">{athleteData.earnings.totalRaised}</p>
                        <p className="text-amber-400 text-sm">75% of goal</p>
                      </div>
                      <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                        <DollarSign className="h-6 w-6 text-amber-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Investors</p>
                        <p className="text-2xl font-bold text-white">{athleteData.earnings.investors}</p>
                        <p className="text-blue-400 text-sm">+12 this week</p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-400 text-sm">Followers</p>
                        <p className="text-2xl font-bold text-white">{athleteData.profile.followers}</p>
                        <p className="text-purple-400 text-sm">+5.2% growth</p>
                      </div>
                      <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <Activity className="h-6 w-6 text-purple-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance & Earnings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Performance Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {athleteData.stats.performance.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                        <span className="text-slate-300">{stat.metric}</span>
                        <div className="text-right">
                          <span className="text-white font-semibold">{stat.value}</span>
                          <span className="text-green-400 text-sm ml-2">{stat.change}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Token Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-slate-900/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-300">Tokens Sold</span>
                        <span className="text-white font-semibold">75%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div className="p-4 bg-slate-900/50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Next Payout</span>
                        <span className="text-white font-semibold">{athleteData.earnings.nextPayout}</span>
                      </div>
                      <p className="text-slate-400 text-sm mt-1">Scheduled for next week</p>
                    </div>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                      Update Performance Data
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Fan Dashboard */}
            <TabsContent value="fan" className="space-y-8">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold text-white mb-4">Fan Dashboard</h3>
                <p className="text-slate-400 mb-6">Follow your favorite athletes and join the community</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                    Follow Athletes
                  </Button>
                  <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white bg-transparent">
                    Upgrade to Investor
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
