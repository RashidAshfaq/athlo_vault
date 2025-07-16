"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calculator, TrendingUp, DollarSign, BarChart3 } from "lucide-react"

export default function SimulatorPage() {
  const [investmentAmount, setInvestmentAmount] = useState([1000])
  const [timeHorizon, setTimeHorizon] = useState([5])
  const [riskLevel, setRiskLevel] = useState("moderate")
  const [sport, setSport] = useState("basketball")

  const calculateReturns = () => {
    const baseReturn = investmentAmount[0]
    const riskMultiplier = riskLevel === "conservative" ? 0.08 : riskLevel === "moderate" ? 0.15 : 0.25
    const sportMultiplier = sport === "basketball" ? 1.2 : sport === "football" ? 1.1 : 1.0
    const timeMultiplier = timeHorizon[0] / 5

    return Math.round(baseReturn * riskMultiplier * sportMultiplier * timeMultiplier)
  }

  const projectedReturn = calculateReturns()
  const totalValue = investmentAmount[0] + projectedReturn
  const annualReturn = Math.round((projectedReturn / timeHorizon[0]) * 100) / 100

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Investment Simulator</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Explore potential returns and simulate different investment scenarios
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Simulator Controls */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calculator className="h-6 w-6 mr-2 text-amber-400" />
                  Investment Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Investment Amount: ${investmentAmount[0].toLocaleString()}
                  </label>
                  <Slider
                    value={investmentAmount}
                    onValueChange={setInvestmentAmount}
                    max={50000}
                    min={100}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>$100</span>
                    <span>$50,000</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Time Horizon: {timeHorizon[0]} years
                  </label>
                  <Slider
                    value={timeHorizon}
                    onValueChange={setTimeHorizon}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>1 year</span>
                    <span>10 years</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Sport Category</label>
                  <Select value={sport} onValueChange={setSport}>
                    <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="basketball">Basketball</SelectItem>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="soccer">Soccer</SelectItem>
                      <SelectItem value="tennis">Tennis</SelectItem>
                      <SelectItem value="baseball">Baseball</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Risk Tolerance</label>
                  <Select value={riskLevel} onValueChange={setRiskLevel}>
                    <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="conservative">Conservative (8% avg return)</SelectItem>
                      <SelectItem value="moderate">Moderate (15% avg return)</SelectItem>
                      <SelectItem value="aggressive">Aggressive (25% avg return)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                  Start Investing
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {/* Projected Returns */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2 text-green-400" />
                    Projected Returns
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</div>
                      <div className="text-slate-400 text-sm">Total Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">${projectedReturn.toLocaleString()}</div>
                      <div className="text-slate-400 text-sm">Total Return</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-amber-400">${annualReturn.toLocaleString()}</div>
                    <div className="text-slate-400 text-sm">Average Annual Return</div>
                  </div>
                </CardContent>
              </Card>

              {/* Breakdown */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="h-6 w-6 mr-2 text-blue-400" />
                    Investment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Initial Investment</span>
                      <span className="text-white font-semibold">${investmentAmount[0].toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Projected Growth</span>
                      <span className="text-green-400 font-semibold">+${projectedReturn.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Time Period</span>
                      <span className="text-white font-semibold">{timeHorizon[0]} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Risk Level</span>
                      <span className="text-white font-semibold capitalize">{riskLevel}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-700">
                      <span className="text-slate-400">Final Value</span>
                      <span className="text-white font-bold text-lg">${totalValue.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <Card className="bg-amber-500/10 border-amber-500/20 border">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <DollarSign className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-amber-400 font-semibold text-sm mb-1">Investment Disclaimer</h4>
                      <p className="text-slate-300 text-sm">
                        These projections are estimates based on historical data and market analysis. Actual returns may
                        vary significantly. Past performance does not guarantee future results.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
