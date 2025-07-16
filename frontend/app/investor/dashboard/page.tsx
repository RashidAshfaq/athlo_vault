"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  PieChart,
  Target,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  ExternalLink,
  Settings,
} from "lucide-react"
import { athletes } from "@/lib/athlete-data"
import { Footer } from "@/components/footer"

interface Investor {
  email: string
  firstName?: string
  lastName?: string
  userType: string
  isAuthenticated: boolean
}

export default function InvestorDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<Investor | null>(null)
  const [portfolio, setPortfolio] = useState({
    totalInvested: 45000,
    currentValue: 52300,
    totalReturn: 7300,
    returnPercentage: 16.2,
    activeInvestments: 8,
  })

  // Mock investment data
  const myInvestments = [
    { athlete: athletes[0], invested: 5000, currentValue: 6200, return: 24.0 },
    { athlete: athletes[3], invested: 8000, currentValue: 8800, return: 10.0 },
    { athlete: athletes[7], invested: 3000, currentValue: 3450, return: 15.0 },
    { athlete: athletes[12], invested: 10000, currentValue: 11200, return: 12.0 },
  ]

  // Mock smart contract data
  const smartContracts = [
    {
      id: "SC001",
      athleteName: "Marcus Johnson",
      contractAddress: "0x1234...5678",
      status: "Active",
      investmentAmount: 5000,
      currentValue: 6200,
      createdDate: "2024-01-15",
      expiryDate: "2026-01-15",
      returns: 24.0,
      sport: "Football",
    },
    {
      id: "SC002",
      athleteName: "Sarah Williams",
      contractAddress: "0x8765...4321",
      status: "Active",
      investmentAmount: 8000,
      currentValue: 8800,
      createdDate: "2024-02-20",
      expiryDate: "2026-02-20",
      returns: 10.0,
      sport: "Tennis",
    },
    {
      id: "SC003",
      athleteName: "David Chen",
      contractAddress: "0x9876...1234",
      status: "Pending",
      investmentAmount: 3000,
      currentValue: 3000,
      createdDate: "2024-12-01",
      expiryDate: "2026-12-01",
      returns: 0.0,
      sport: "Basketball",
    },
  ]

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/signin")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.userType !== "investor") {
      router.push("/auth/signin")
      return
    }

    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Investor Dashboard</h1>
            <p className="text-slate-400">Welcome back, {user.firstName || "Investor"}</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/athletes">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                <Plus className="h-4 w-4 mr-2" />
                Find Athletes
              </Button>
            </Link>
            <Link href="/investor/profile/edit">
              <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
              Logout
            </Button>
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${portfolio.totalInvested.toLocaleString()}</div>
              <p className="text-xs text-slate-400">Across {portfolio.activeInvestments} athletes</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Current Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${portfolio.currentValue.toLocaleString()}</div>
              <p className="text-xs text-green-400 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />+{portfolio.returnPercentage}% overall
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Return</CardTitle>
              <PieChart className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">+${portfolio.totalReturn.toLocaleString()}</div>
              <p className="text-xs text-slate-400">Unrealized gains</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Active Investments</CardTitle>
              <Target className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{portfolio.activeInvestments}</div>
              <p className="text-xs text-slate-400">Athletes in portfolio</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="bg-slate-900 border-slate-800">
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-slate-800">
              My Portfolio
            </TabsTrigger>
            <TabsTrigger value="opportunities" className="data-[state=active]:bg-slate-800">
              New Opportunities
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-800">
              Performance
            </TabsTrigger>
            <TabsTrigger value="smart-contracts" className="data-[state=active]:bg-slate-800">
              Smart Contracts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">My Investments</CardTitle>
                <CardDescription className="text-slate-400">
                  Track your athlete investments and performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myInvestments.map((investment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={investment.athlete.image || "/placeholder.svg"}
                          alt={investment.athlete.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-white font-medium">{investment.athlete.name}</p>
                          <p className="text-slate-400 text-sm capitalize">{investment.athlete.sport}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">${investment.currentValue.toLocaleString()}</p>
                        <p
                          className={`text-sm flex items-center ${investment.return > 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {investment.return > 0 ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                          )}
                          {investment.return > 0 ? "+" : ""}
                          {investment.return}%
                        </p>
                      </div>
                      <Link href={`/athletes/${investment.athlete.id}`}>
                        <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Trending Investment Opportunities</CardTitle>
                <CardDescription className="text-slate-400">
                  Discover promising athletes seeking funding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {athletes.slice(0, 6).map((athlete) => (
                    <div key={athlete.id} className="bg-slate-800 rounded-lg p-4">
                      <img
                        src={athlete.image || "/placeholder.svg"}
                        alt={athlete.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="text-white font-semibold">{athlete.name}</h3>
                      <p className="text-slate-400 text-sm capitalize mb-2">{athlete.sport}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Goal:</span>
                          <span className="text-white">${athlete.funding.goal.toLocaleString()}</span>
                        </div>
                        <Progress value={(athlete.funding.raised / athlete.funding.goal) * 100} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Min Investment:</span>
                          <span className="text-white">${athlete.funding.minInvestment}</span>
                        </div>
                      </div>
                      <Link href={`/invest/${athlete.id}`}>
                        <Button className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-slate-900">
                          Invest Now
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Best Performing</span>
                      <span className="text-green-400 font-semibold">+24.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Average Return</span>
                      <span className="text-white font-semibold">+15.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Risk Score</span>
                      <Badge variant="outline" className="border-amber-600 text-amber-400">
                        Medium
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Investment Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Football</span>
                      <span className="text-white font-semibold">35%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Basketball</span>
                      <span className="text-white font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Tennis</span>
                      <span className="text-white font-semibold">20%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Other Sports</span>
                      <span className="text-white font-semibold">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="smart-contracts" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Smart Contracts</CardTitle>
                <CardDescription className="text-slate-400">
                  View and manage your investment smart contracts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {smartContracts.map((contract) => (
                    <div key={contract.id} className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-amber-400" />
                          <div>
                            <h3 className="text-white font-semibold">{contract.athleteName}</h3>
                            <p className="text-slate-400 text-sm">
                              {contract.sport} • Contract ID: {contract.id}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`${
                            contract.status === "Active"
                              ? "border-green-600 text-green-400"
                              : "border-yellow-600 text-yellow-400"
                          }`}
                        >
                          {contract.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-slate-400 text-xs">Investment</p>
                          <p className="text-white font-semibold">${contract.investmentAmount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Current Value</p>
                          <p className="text-white font-semibold">${contract.currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Returns</p>
                          <p className={`font-semibold ${contract.returns > 0 ? "text-green-400" : "text-slate-400"}`}>
                            {contract.returns > 0 ? "+" : ""}
                            {contract.returns}%
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-xs">Expires</p>
                          <p className="text-white font-semibold">
                            {new Date(contract.expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                        <div className="flex items-center space-x-2">
                          <span className="text-slate-400 text-sm">Contract:</span>
                          <code className="text-amber-400 text-sm bg-slate-900 px-2 py-1 rounded">
                            {contract.contractAddress}
                          </code>
                        </div>
                        <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View on Blockchain
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  )
}
