"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  DollarSign,
  Copy,
  Clock,
  TrendingUp,
  Activity,
  FileText,
  CheckCircle,
  ArrowUpRight,
  Eye,
} from "lucide-react"
import { athletes } from "@/lib/athlete-data"

interface User {
  email: string
  firstName?: string
  lastName?: string
  userType: string
  isAuthenticated: boolean
}

export default function InvestorSmartContract() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

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

  // Mock smart contract data for investor
  const myContracts = [
    {
      id: "1",
      athlete: athletes[0],
      contractAddress: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8e",
      invested: 5000,
      currentValue: 6200,
      return: 24.0,
      status: "Active",
      deployedDate: "2024-01-15",
      revenueShare: 15,
    },
    {
      id: "2",
      athlete: athletes[3],
      contractAddress: "0x8f3e2b1a9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f",
      invested: 8000,
      currentValue: 8800,
      return: 10.0,
      status: "Active",
      deployedDate: "2024-01-08",
      revenueShare: 12,
    },
    {
      id: "3",
      athlete: athletes[7],
      contractAddress: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
      invested: 3000,
      currentValue: 3450,
      return: 15.0,
      status: "Active",
      deployedDate: "2024-01-05",
      revenueShare: 18,
    },
  ]

  const transactions = [
    {
      id: "1",
      type: "Investment",
      amount: 5000,
      athlete: athletes[0].name,
      date: "2024-01-15",
      status: "completed",
      contractAddress: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8e",
    },
    {
      id: "2",
      type: "Revenue Distribution",
      amount: 750,
      athlete: athletes[3].name,
      date: "2024-01-10",
      status: "completed",
      contractAddress: "0x8f3e2b1a9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f",
    },
    {
      id: "3",
      type: "Investment",
      amount: 8000,
      athlete: athletes[3].name,
      date: "2024-01-08",
      status: "completed",
      contractAddress: "0x8f3e2b1a9c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f",
    },
    {
      id: "4",
      type: "Revenue Distribution",
      amount: 520,
      athlete: athletes[7].name,
      date: "2024-01-05",
      status: "pending",
      contractAddress: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Copied to clipboard!")
  }

  const totalInvested = myContracts.reduce((sum, contract) => sum + contract.invested, 0)
  const totalCurrentValue = myContracts.reduce((sum, contract) => sum + contract.currentValue, 0)
  const totalReturn = totalCurrentValue - totalInvested
  const totalReturnPercentage = ((totalReturn / totalInvested) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Smart Contracts</h1>
            <p className="text-slate-400">Manage your blockchain investments and contracts</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/investor/dashboard">
              <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                Back to Dashboard
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
              <CardTitle className="text-sm font-medium text-slate-400">Active Contracts</CardTitle>
              <FileText className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{myContracts.length}</div>
              <p className="text-xs text-slate-400">Smart contracts deployed</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Invested</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${totalInvested.toLocaleString()}</div>
              <p className="text-xs text-slate-400">Across all contracts</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Current Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${totalCurrentValue.toLocaleString()}</div>
              <p className="text-xs text-green-400 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />+{totalReturnPercentage}% overall
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Return</CardTitle>
              <Shield className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">+${totalReturn.toLocaleString()}</div>
              <p className="text-xs text-slate-400">Unrealized gains</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="contracts" className="space-y-6">
          <TabsList className="bg-slate-900 border-slate-800">
            <TabsTrigger value="contracts" className="data-[state=active]:bg-slate-800">
              <FileText className="h-4 w-4 mr-2" />
              My Contracts
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-slate-800">
              <Activity className="h-4 w-4 mr-2" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-800">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contracts" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Active Smart Contracts</CardTitle>
                <CardDescription className="text-slate-400">
                  Your blockchain-based athlete investment contracts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myContracts.map((contract) => (
                    <div key={contract.id} className="p-6 bg-slate-800 rounded-lg border border-slate-700">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <img
                            src={contract.athlete.image || "/placeholder.svg"}
                            alt={contract.athlete.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="text-white font-semibold">{contract.athlete.name}</h3>
                            <p className="text-slate-400 text-sm capitalize">{contract.athlete.sport}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {contract.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-slate-400 text-sm">Invested</p>
                          <p className="text-white font-semibold">${contract.invested.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Current Value</p>
                          <p className="text-white font-semibold">${contract.currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Return</p>
                          <p className="text-green-400 font-semibold flex items-center">
                            <ArrowUpRight className="h-3 w-3 mr-1" />+{contract.return}%
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Revenue Share</p>
                          <p className="text-white font-semibold">{contract.revenueShare}%</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                        <div className="flex items-center space-x-2">
                          <code className="text-amber-400 text-xs font-mono bg-slate-900 px-2 py-1 rounded">
                            {contract.contractAddress.slice(0, 10)}...{contract.contractAddress.slice(-8)}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(contract.contractAddress)}
                            className="text-slate-400 hover:text-white h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex space-x-2">
                          <Link href={`/athletes/${contract.athlete.id}`}>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-700 text-slate-300 bg-transparent"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Athlete
                            </Button>
                          </Link>
                          <Link href={`https://polygonscan.com/address/${contract.contractAddress}`} target="_blank">
                            <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                              View on Blockchain
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Transaction History</CardTitle>
                <CardDescription className="text-slate-400">
                  All blockchain transactions across your smart contracts
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
                            {transaction.athlete} • {transaction.date}
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

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Contract Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Best Performing Contract</span>
                      <span className="text-green-400 font-semibold">+24.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Average Return</span>
                      <span className="text-white font-semibold">+{totalReturnPercentage}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Total Gas Fees Paid</span>
                      <span className="text-white font-semibold">$127.50</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Revenue Distributions</span>
                      <span className="text-white font-semibold">8 payments</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white">Contract Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Football</span>
                      <span className="text-white font-semibold">31.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Basketball</span>
                      <span className="text-white font-semibold">50.0%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Tennis</span>
                      <span className="text-white font-semibold">18.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Active Contracts</span>
                      <Badge variant="outline" className="border-green-600 text-green-400">
                        {myContracts.length} Live
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
