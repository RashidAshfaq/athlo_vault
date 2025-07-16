"use client"

import { CardDescription } from "@/components/ui/card"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AthleteLayout } from "@/components/athlete-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Shield, Users, DollarSign, Copy, Clock, TrendingUp, Activity, FileText, CheckCircle } from "lucide-react"
import Link from "next/link"

interface AthleteUser {
  email: string
  firstName?: string
  lastName?: string
  userType: string
  isAuthenticated: boolean
}

export default function SmartContractClient() {
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
      <AthleteLayout title="Smart Contract" description="Loading your smart contract...">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
        </div>
      </AthleteLayout>
    )
  }

  const contractAddress = "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8e"
  const totalInvestors = 24
  const totalFunding = 187500
  const revenueShare = 15 // percentage

  const transactions = [
    {
      id: "1",
      type: "Investment",
      amount: 5000,
      investor: "John Smith",
      date: "2024-01-15",
      status: "completed",
    },
    {
      id: "2",
      type: "Revenue Distribution",
      amount: 2500,
      date: "2024-01-10",
      status: "completed",
    },
    {
      id: "3",
      type: "Investment",
      amount: 10000,
      investor: "Sarah Johnson",
      date: "2024-01-08",
      status: "completed",
    },
    {
      id: "4",
      type: "Investment",
      amount: 7500,
      investor: "Mike Davis",
      date: "2024-01-05",
      status: "pending",
    },
  ]

  const statusColors = {
    Active: "bg-green-600",
    Pending: "bg-amber-500",
    Error: "bg-red-600",
  } as const

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h1 className="text-4xl font-bold text-white text-center">Smart Contract Details</h1>

          <Card className="bg-slate-800/60 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-amber-400" />
                Contract Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-300">
              <div className="flex items-center justify-between">
                <span>Address:</span>
                <code className="text-white font-mono">{contractAddress}</code>
              </div>
              <div className="flex items-center justify-between">
                <span>Network:</span>
                <span>Polygon (Mainnet)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Date Deployed:</span>
                <span>December 15, 2023</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <Badge className={`${statusColors["Active"]} text-white`}>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Tx Hash:</span>
                <Link
                  href="https://polygonscan.com/address/0x742d35Cc6634C0532925a3b8D4C9db96590b5b8e"
                  target="_blank"
                  className="text-amber-400 hover:underline break-all"
                >
                  0x742d35Cc6634C0532925a3b8D4C9db96590b5b8e
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span>IPFS Manifest:</span>
                <Link href="ipfs://QmXYZ" target="_blank" className="text-amber-400 hover:underline break-all">
                  ipfs://Qm…XYZ
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Contract Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Contract Status</p>
                    <p className="text-lg font-bold text-green-400">Active</p>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Total Investors</p>
                    <p className="text-2xl font-bold text-white">{totalInvestors}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Total Funding</p>
                    <p className="text-2xl font-bold text-white">${totalFunding.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-amber-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm font-medium">Revenue Share</p>
                    <p className="text-2xl font-bold text-white">{revenueShare}%</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contract Details */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-slate-900/50 border-slate-800/50">
              <TabsTrigger value="overview" className="data-[state=active]:bg-slate-800">
                <Shield className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="transactions" className="data-[state=active]:bg-slate-800">
                <Activity className="h-4 w-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger value="investors" className="data-[state=active]:bg-slate-800">
                <Users className="h-4 w-4 mr-2" />
                Investors
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Contract Information</CardTitle>
                  <CardDescription className="text-slate-400">
                    Your smart contract details on the Polygon blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">Contract Address</h4>
                      <div className="flex items-center space-x-2 p-3 bg-slate-800 rounded-lg">
                        <code className="text-amber-400 text-sm flex-1 font-mono">{contractAddress}</code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(contractAddress)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Network</h4>
                      <div className="flex items-center space-x-2 p-3 bg-slate-800 rounded-lg">
                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Polygon</Badge>
                        <span className="text-slate-300 text-sm">Mainnet</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-medium mb-2">Contract Type</h4>
                      <p className="text-slate-300">Athlete Revenue Sharing Contract</p>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-2">Created</h4>
                      <p className="text-slate-300">December 15, 2023</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-2">Contract Terms</h4>
                    <div className="space-y-2 text-slate-300 text-sm">
                      <p>• Revenue sharing: {revenueShare}% of earnings distributed to investors</p>
                      <p>• Distribution frequency: monthly</p>
                      <p>• Contract duration: 5 years</p>
                      <p>• Minimum investment: $1,000</p>
                      <p>• Maximum total funding: $250,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Recent Transactions</CardTitle>
                  <CardDescription className="text-slate-400">
                    All blockchain transactions related to your contract
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                            {transaction.type === "Investment" ? (
                              <DollarSign className="h-5 w-5 text-green-400" />
                            ) : (
                              <TrendingUp className="h-5 w-5 text-blue-400" />
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium">{transaction.type}</p>
                            <p className="text-slate-400 text-sm">
                              {transaction.investor && `From ${transaction.investor} • `}
                              {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">${transaction.amount.toLocaleString()}</p>
                          <Badge
                            variant={transaction.status === "completed" ? "default" : "secondary"}
                            className={
                              transaction.status === "completed"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                            }
                          >
                            {transaction.status === "completed" ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <Clock className="h-3 w-3 mr-1" />
                            )}
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="investors" className="space-y-6">
              <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Your Investors</CardTitle>
                  <CardDescription className="text-slate-400">
                    People who have invested in your athletic career
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "John Smith", amount: 15000, percentage: 8.0, joined: "Dec 2023" },
                      { name: "Sarah Johnson", amount: 25000, percentage: 13.3, joined: "Jan 2024" },
                      { name: "Mike Davis", amount: 12000, percentage: 6.4, joined: "Jan 2024" },
                      { name: "Emily Chen", amount: 18000, percentage: 9.6, joined: "Jan 2024" },
                    ].map((investor, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {investor.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{investor.name}</p>
                            <p className="text-slate-400 text-sm">Joined {investor.joined}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">${investor.amount.toLocaleString()}</p>
                          <p className="text-slate-400 text-sm">{investor.percentage}% share</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
