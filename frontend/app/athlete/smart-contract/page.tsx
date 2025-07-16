"use client"

import { AthleteLayout } from "@/components/athlete-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileCodeIcon as FileContract,
  Shield,
  DollarSign,
  Users,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Copy,
  Download,
  Eye,
  TrendingUp,
  Wallet,
  Activity,
} from "lucide-react"

export default function AthleteSmartContract() {
  const contractData = {
    address: "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8e",
    network: "Polygon",
    status: "Active",
    totalFunding: 187500,
    fundingGoal: 250000,
    investors: 24,
    revenueShare: 10,
    duration: 5,
    startDate: "2024-01-15",
    endDate: "2029-01-15",
    totalDistributed: 12500,
    nextDistribution: "2024-05-01",
    gasUsed: "0.0045 MATIC",
    transactions: [
      {
        id: "0x1a2b3c...",
        type: "Investment",
        amount: 5000,
        investor: "0x8f9e1d...",
        date: "2024-04-15",
        status: "Confirmed",
      },
      {
        id: "0x2b3c4d...",
        type: "Revenue Distribution",
        amount: 2500,
        date: "2024-04-01",
        status: "Confirmed",
      },
      {
        id: "0x3c4d5e...",
        type: "Investment",
        amount: 2500,
        investor: "0x7e8f9a...",
        date: "2024-03-28",
        status: "Confirmed",
      },
    ],
  }

  const fundingProgress = (contractData.totalFunding / contractData.fundingGoal) * 100

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <AthleteLayout title="Smart Contract" description="Manage your blockchain-based investment contract">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Smart Contract</h1>
          <p className="text-slate-400">Manage your blockchain-based investment contract</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800">
            <Download className="h-4 w-4 mr-2" />
            Download Contract
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            <Eye className="h-4 w-4 mr-2" />
            View on Explorer
          </Button>
        </div>
      </div>

      {/* Contract Status */}
      <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/20 mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Contract Status: Active</h3>
                <p className="text-slate-300 text-sm">Your smart contract is live and processing transactions</p>
              </div>
            </div>
            <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Contract Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Funding</p>
                <p className="text-2xl font-bold text-white">${contractData.totalFunding.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-400">Progress</span>
                <span className="text-slate-300">{fundingProgress.toFixed(1)}%</span>
              </div>
              <Progress value={fundingProgress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Active Investors</p>
                <p className="text-2xl font-bold text-white">{contractData.investors}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +3 this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Revenue Distributed</p>
                <p className="text-2xl font-bold text-white">${contractData.totalDistributed.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-2">Next: {contractData.nextDistribution}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Gas Used</p>
                <p className="text-2xl font-bold text-white">{contractData.gasUsed}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-amber-400" />
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-2">Network: {contractData.network}</p>
          </CardContent>
        </Card>
      </div>

      {/* Contract Details */}
      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="bg-slate-900/50 border-slate-800/50">
          <TabsTrigger value="details" className="data-[state=active]:bg-slate-800">
            Contract Details
          </TabsTrigger>
          <TabsTrigger value="transactions" className="data-[state=active]:bg-slate-800">
            Transaction History
          </TabsTrigger>
          <TabsTrigger value="terms" className="data-[state=active]:bg-slate-800">
            Terms & Conditions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileContract className="h-5 w-5 mr-2" />
                  Contract Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Contract Address</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-mono text-sm">{contractData.address.slice(0, 10)}...</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(contractData.address)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Network</span>
                  <span className="text-white">{contractData.network}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Status</span>
                  <Badge variant="outline" className="border-green-500 text-green-400">
                    {contractData.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Start Date</span>
                  <span className="text-white">{contractData.startDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">End Date</span>
                  <span className="text-white">{contractData.endDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Revenue Share</span>
                  <span className="text-white">{contractData.revenueShare}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Duration</span>
                  <span className="text-white">{contractData.duration} years</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Financial Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-400">Funding Progress</span>
                    <span className="text-white font-semibold">
                      ${contractData.totalFunding.toLocaleString()} / ${contractData.fundingGoal.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={fundingProgress} className="h-2" />
                  <div className="text-right text-slate-400 text-sm mt-1">{Math.round(fundingProgress)}% funded</div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Total Distributed</span>
                    <span className="text-green-400 font-semibold">
                      ${contractData.totalDistributed.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Next Distribution</span>
                    <span className="text-white">{contractData.nextDistribution}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Active Investors</span>
                    <span className="text-white">{contractData.investors}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Transactions
              </CardTitle>
              <CardDescription className="text-slate-400">
                All blockchain transactions related to your contract
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contractData.transactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transaction.type === "Investment" ? "bg-green-500/20" : "bg-blue-500/20"
                        }`}
                      >
                        {transaction.type === "Investment" ? (
                          <DollarSign className="h-5 w-5 text-green-400" />
                        ) : (
                          <Wallet className="h-5 w-5 text-blue-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{transaction.type}</h3>
                        <p className="text-slate-400 text-sm">
                          {transaction.id} • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-lg font-semibold ${
                          transaction.type === "Investment" ? "text-green-400" : "text-blue-400"
                        }`}
                      >
                        ${transaction.amount.toLocaleString()}
                      </div>
                      <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View All on Blockchain Explorer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="terms" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Contract Terms & Conditions
              </CardTitle>
              <CardDescription className="text-slate-400">
                Legal terms and conditions governing your smart contract
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Revenue Sharing Agreement</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    The athlete agrees to share {contractData.revenueShare}% of their professional earnings with
                    investors for a period of {contractData.duration} years, starting from {contractData.startDate}.
                    Revenue includes but is not limited to salary, bonuses, endorsements, and appearance fees.
                  </p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Investment Terms</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Investors provide funding to support the athlete's career development in exchange for a percentage
                    of future earnings. All investments are final and non-refundable. Distributions are made quarterly
                    based on verified earnings reports.
                  </p>
                </div>

                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h3 className="text-white font-semibold mb-2">Smart Contract Execution</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    This agreement is executed through a smart contract on the {contractData.network} blockchain. All
                    transactions are transparent, immutable, and automatically executed according to the predetermined
                    terms without the need for intermediaries.
                  </p>
                </div>

                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-amber-400 font-semibold mb-1">Important Notice</h3>
                      <p className="text-slate-300 text-sm">
                        This smart contract is legally binding and governed by blockchain technology. Please ensure you
                        understand all terms before proceeding. Consult with legal counsel if you have any questions
                        about your obligations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AthleteLayout>
  )
}
