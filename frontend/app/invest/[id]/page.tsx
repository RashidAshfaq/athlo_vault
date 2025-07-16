"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, DollarSign, Users, TrendingUp, Shield, CheckCircle } from "lucide-react"
import { getAthleteById } from "@/lib/athlete-data"
import Link from "next/link"

interface InvestPageProps {
  params: {
    id: string
  }
}

export default function InvestPage({ params }: InvestPageProps) {
  const router = useRouter()
  const athlete = getAthleteById(params.id)

  const [step, setStep] = useState(1)
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!athlete) {
    notFound()
  }

  const fundingPercentage = (athlete.funding.raised / athlete.funding.goal) * 100

  const handleInvestmentSubmit = async () => {
    if (step === 1) {
      // Validate investment amount
      const amount = Number.parseFloat(investmentAmount)
      if (!amount || amount < athlete.funding.minInvestment) {
        alert(`Minimum investment is $${athlete.funding.minInvestment}`)
        return
      }
      setStep(2)
    } else if (step === 2) {
      // Review step - go to confirmation
      setStep(3)
    } else if (step === 3) {
      // Final confirmation
      if (!agreeToTerms) {
        alert("Please agree to the terms and conditions")
        return
      }

      setIsProcessing(true)

      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Redirect to success page
      router.push(`/invest/success?athlete=${athlete.name}&amount=${investmentAmount}`)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="amount" className="text-white text-lg font-semibold">
                Investment Amount
              </Label>
              <div className="mt-2 relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="amount"
                  type="number"
                  placeholder={`Minimum $${athlete.funding.minInvestment}`}
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-700 text-white text-lg h-12"
                  min={athlete.funding.minInvestment}
                />
              </div>
              <p className="text-slate-400 text-sm mt-2">
                Minimum investment: ${athlete.funding.minInvestment.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[500, 1000, 2500].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  className="border-slate-700 text-slate-300 hover:bg-slate-800 h-12 bg-transparent"
                  onClick={() => setInvestmentAmount(amount.toString())}
                >
                  ${amount.toLocaleString()}
                </Button>
              ))}
            </div>

            <div className="bg-slate-800 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-3">Investment Terms</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Revenue Share:</span>
                  <span className="text-white">{athlete.funding.revenueShare}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Term Length:</span>
                  <span className="text-white">{athlete.funding.term}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expected ROI:</span>
                  <span className="text-green-400">{athlete.expectedROI}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Risk Level:</span>
                  <Badge
                    variant="outline"
                    className={`
                    ${athlete.riskLevel === "Low" ? "border-green-600 text-green-400" : ""}
                    ${athlete.riskLevel === "Medium" ? "border-amber-600 text-amber-400" : ""}
                    ${athlete.riskLevel === "High" ? "border-red-600 text-red-400" : ""}
                  `}
                  >
                    {athlete.riskLevel}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Review Your Investment</h2>
              <p className="text-slate-400">Please review the details before confirming</p>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={athlete.image || "/placeholder.svg"}
                  alt={athlete.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-white font-semibold text-lg">{athlete.name}</h3>
                  <p className="text-slate-400 capitalize">{athlete.sport}</p>
                </div>
              </div>

              <Separator className="my-4 bg-slate-700" />

              <div className="space-y-3">
                <div className="flex justify-between text-lg">
                  <span className="text-slate-400">Investment Amount:</span>
                  <span className="text-white font-semibold">
                    ${Number.parseFloat(investmentAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Revenue Share:</span>
                  <span className="text-white">{athlete.funding.revenueShare}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Term:</span>
                  <span className="text-white">{athlete.funding.term}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Expected Annual Return:</span>
                  <span className="text-green-400">{athlete.expectedROI}</span>
                </div>
              </div>
            </div>

            <div className="bg-amber-900/20 border border-amber-600/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-amber-400 mt-0.5" />
                <div>
                  <h4 className="text-amber-400 font-semibold">Investment Protection</h4>
                  <p className="text-amber-200 text-sm mt-1">
                    Your investment is protected by our athlete performance guarantee and transparent revenue tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Confirm Investment</h2>
              <p className="text-slate-400">Final step to complete your investment</p>
            </div>

            <div className="bg-slate-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Investment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Athlete:</span>
                  <span className="text-white">{athlete.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount:</span>
                  <span className="text-white font-semibold">
                    ${Number.parseFloat(investmentAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Processing Fee:</span>
                  <span className="text-white">$0 (Waived)</span>
                </div>
                <Separator className="my-3 bg-slate-700" />
                <div className="flex justify-between text-lg">
                  <span className="text-white font-semibold">Total:</span>
                  <span className="text-white font-semibold">
                    ${Number.parseFloat(investmentAmount).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="border-slate-600"
              />
              <Label htmlFor="terms" className="text-slate-300 text-sm">
                I agree to the{" "}
                <Link href="/terms" className="text-amber-400 hover:text-amber-300">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-amber-400 hover:text-amber-300">
                  Investment Agreement
                </Link>
              </Label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href={`/athletes/${athlete.id}`}>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white">Invest in {athlete.name}</h1>
            <p className="text-slate-400">Step {step} of 3</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Investment Form */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">
                  {step === 1 && "Choose Investment Amount"}
                  {step === 2 && "Review Investment"}
                  {step === 3 && "Confirm Investment"}
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {step === 1 && "Enter the amount you'd like to invest"}
                  {step === 2 && "Review your investment details"}
                  {step === 3 && "Complete your investment"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepContent()}

                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setStep(step - 1)}
                      className="border-slate-700 text-slate-300"
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    onClick={handleInvestmentSubmit}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold ml-auto"
                    disabled={isProcessing}
                  >
                    {isProcessing
                      ? "Processing..."
                      : step === 1
                        ? "Review Investment"
                        : step === 2
                          ? "Confirm Investment"
                          : "Complete Investment"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Athlete Summary Sidebar */}
          <div className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <img
                  src={athlete.image || "/placeholder.svg"}
                  alt={athlete.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-white font-semibold text-lg">{athlete.name}</h3>
                <p className="text-slate-400 capitalize mb-4">{athlete.sport}</p>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Funding Progress</span>
                      <span className="text-white">{fundingPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={fundingPercentage} className="h-2" />
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-400">Raised:</span>
                    <span className="text-white">${athlete.funding.raised.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Goal:</span>
                    <span className="text-white">${athlete.funding.goal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Investors:</span>
                    <span className="text-white">{athlete.funding.investors}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">Why Invest?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                    <span className="text-slate-300 text-sm">High growth potential</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-400" />
                    <span className="text-slate-300 text-sm">Strong fan following</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-amber-400" />
                    <span className="text-slate-300 text-sm">Protected investment</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
