"use client"

import { AthleteLayout } from "@/components/athlete-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Users, Target, BarChart3, ArrowUp } from "lucide-react"

export default function AthleteOverview() {
  const overviewData = {
    earnings: {
      total: 187500,
      thisMonth: 15000,
      lastMonth: 12500,
      growth: 20,
    },
    valuation: {
      current: 2500000,
      previous: 2200000,
      growth: 13.6,
    },
    fundingRounds: [
      { round: "Seed", amount: 50000, date: "Jan 2024", investors: 25 },
      { round: "Series A", amount: 137500, date: "Mar 2024", investors: 89 },
      { round: "Current", amount: 0, date: "Ongoing", investors: 120 },
    ],
    milestones: [
      { title: "Reach $200K funding", target: 200000, current: 187500, deadline: "Jun 2024" },
      { title: "100 new investors", target: 100, current: 85, deadline: "Jul 2024" },
      { title: "Complete profile", target: 100, current: 85, deadline: "May 2024" },
    ],
    monthlyData: [
      { month: "Jan", earnings: 8000, investors: 25, valuation: 1800000 },
      { month: "Feb", earnings: 12000, investors: 45, valuation: 2000000 },
      { month: "Mar", earnings: 18000, investors: 89, valuation: 2200000 },
      { month: "Apr", earnings: 15000, investors: 120, valuation: 2500000 },
    ],
  }

  return (
    <AthleteLayout title="Overview" description="High-level stats and performance metrics">
      {/* Header */}
      <div className="space-y-1 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Overview</h1>
        <p className="text-slate-400">High-level stats and performance metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${overviewData.earnings.total.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
              <span className="text-green-400">+{overviewData.earnings.growth}% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Current Valuation</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${(overviewData.valuation.current / 1000000).toFixed(1)}M
            </div>
            <div className="flex items-center text-xs">
              <ArrowUp className="h-3 w-3 text-green-400 mr-1" />
              <span className="text-green-400">+{overviewData.valuation.growth}% this quarter</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Investors</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">234</div>
            <p className="text-xs text-blue-400">Across all funding rounds</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Milestones</CardTitle>
            <Target className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-amber-400">In progress</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="earnings" className="space-y-6">
        <TabsList className="bg-slate-900/50 border-slate-800/50">
          <TabsTrigger value="earnings" className="data-[state=active]:bg-slate-800">
            Earnings
          </TabsTrigger>
          <TabsTrigger value="valuation" className="data-[state=active]:bg-slate-800">
            Valuation
          </TabsTrigger>
          <TabsTrigger value="funding" className="data-[state=active]:bg-slate-800">
            Funding Rounds
          </TabsTrigger>
          <TabsTrigger value="milestones" className="data-[state=active]:bg-slate-800">
            Milestones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="earnings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Monthly Earnings</CardTitle>
                <CardDescription className="text-slate-400">Track your funding progress over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {overviewData.monthlyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{data.month} 2024</p>
                        <p className="text-slate-400 text-sm">{data.investors} investors</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">${data.earnings.toLocaleString()}</p>
                        <p className="text-slate-400 text-sm">${(data.valuation / 1000000).toFixed(1)}M valuation</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Earnings Breakdown</CardTitle>
                <CardDescription className="text-slate-400">Current month vs previous</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">This Month</span>
                    <span className="text-white font-semibold">
                      ${overviewData.earnings.thisMonth.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Last Month</span>
                    <span className="text-white font-semibold">
                      ${overviewData.earnings.lastMonth.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                    <span className="text-slate-400">Growth</span>
                    <div className="flex items-center">
                      <ArrowUp className="h-4 w-4 text-green-400 mr-1" />
                      <span className="text-green-400 font-semibold">+{overviewData.earnings.growth}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="valuation" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Valuation Graph
              </CardTitle>
              <CardDescription className="text-slate-400">Your market value over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-slate-950/50 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-400">Valuation chart visualization</p>
                  <p className="text-slate-500 text-sm">Interactive chart coming soon</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-slate-400 text-sm">Current Valuation</p>
                  <p className="text-white text-xl font-bold">
                    ${(overviewData.valuation.current / 1000000).toFixed(1)}M
                  </p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <p className="text-slate-400 text-sm">Growth Rate</p>
                  <p className="text-green-400 text-xl font-bold">+{overviewData.valuation.growth}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funding" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Funding Rounds History</CardTitle>
              <CardDescription className="text-slate-400">Track your fundraising journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overviewData.fundingRounds.map((round, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{round.round}</h3>
                        <p className="text-slate-400 text-sm">{round.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">
                        {round.amount > 0 ? `$${round.amount.toLocaleString()}` : "Active"}
                      </p>
                      <p className="text-slate-400 text-sm">{round.investors} investors</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Upcoming Milestones</CardTitle>
              <CardDescription className="text-slate-400">Track progress towards your goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {overviewData.milestones.map((milestone, index) => {
                  const progress = (milestone.current / milestone.target) * 100
                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h3 className="text-white font-medium">{milestone.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {milestone.deadline}
                          </Badge>
                          <span className="text-slate-400 text-sm">
                            {milestone.current.toLocaleString()} / {milestone.target.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-slate-400 text-sm">{Math.round(progress)}% complete</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AthleteLayout>
  )
}
