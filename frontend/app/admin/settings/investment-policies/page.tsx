"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save, FileText } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function InvestmentPolicies() {
  const router = useRouter()
  const [policies, setPolicies] = useState({
    minInvestment: "1000",
    maxInvestment: "100000",
    maxInvestorsPerAthlete: "50",
    investmentPeriod: "12",
    earlyWithdrawalFee: "5",
    platformFee: "2.5",
    requireAccreditation: true,
    allowInternational: false,
    kycRequired: true,
    riskDisclosure:
      "Investing in athletes carries significant risk. Past performance does not guarantee future results. You may lose some or all of your investment.",
    termsAndConditions:
      "By investing through AthloVault, you agree to our terms of service and acknowledge the risks involved in athlete investments.",
  })

  const handleSave = () => {
    // Save policies logic here
    console.log("Saving policies:", policies)
    toast({
      title: "Policies Updated",
      description: "Investment policies have been successfully updated",
    })
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="border-slate-700 text-slate-300 bg-transparent mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Investment Policies</h1>
            <p className="text-slate-400">Configure platform-wide investment rules and policies</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Investment Limits
              </CardTitle>
              <CardDescription className="text-slate-400">Set minimum and maximum investment amounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min-investment" className="text-slate-300">
                    Minimum Investment ($)
                  </Label>
                  <Input
                    id="min-investment"
                    value={policies.minInvestment}
                    onChange={(e) => setPolicies({ ...policies, minInvestment: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="max-investment" className="text-slate-300">
                    Maximum Investment ($)
                  </Label>
                  <Input
                    id="max-investment"
                    value={policies.maxInvestment}
                    onChange={(e) => setPolicies({ ...policies, maxInvestment: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="max-investors" className="text-slate-300">
                    Max Investors per Athlete
                  </Label>
                  <Input
                    id="max-investors"
                    value={policies.maxInvestorsPerAthlete}
                    onChange={(e) => setPolicies({ ...policies, maxInvestorsPerAthlete: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="investment-period" className="text-slate-300">
                    Investment Period (months)
                  </Label>
                  <Input
                    id="investment-period"
                    value={policies.investmentPeriod}
                    onChange={(e) => setPolicies({ ...policies, investmentPeriod: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Fees and Charges</CardTitle>
              <CardDescription className="text-slate-400">Configure platform fees and penalties</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="withdrawal-fee" className="text-slate-300">
                    Early Withdrawal Fee (%)
                  </Label>
                  <Input
                    id="withdrawal-fee"
                    value={policies.earlyWithdrawalFee}
                    onChange={(e) => setPolicies({ ...policies, earlyWithdrawalFee: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="platform-fee" className="text-slate-300">
                    Platform Fee (%)
                  </Label>
                  <Input
                    id="platform-fee"
                    value={policies.platformFee}
                    onChange={(e) => setPolicies({ ...policies, platformFee: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Compliance Settings</CardTitle>
              <CardDescription className="text-slate-400">
                Configure investor requirements and compliance rules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Require Accredited Investor Status</Label>
                  <p className="text-slate-400 text-sm">Only allow accredited investors to participate</p>
                </div>
                <Switch
                  checked={policies.requireAccreditation}
                  onCheckedChange={(checked) => setPolicies({ ...policies, requireAccreditation: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Allow International Investors</Label>
                  <p className="text-slate-400 text-sm">Allow investors from outside the US</p>
                </div>
                <Switch
                  checked={policies.allowInternational}
                  onCheckedChange={(checked) => setPolicies({ ...policies, allowInternational: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">KYC Required</Label>
                  <p className="text-slate-400 text-sm">Require Know Your Customer verification</p>
                </div>
                <Switch
                  checked={policies.kycRequired}
                  onCheckedChange={(checked) => setPolicies({ ...policies, kycRequired: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Legal Disclosures</CardTitle>
              <CardDescription className="text-slate-400">Configure risk disclosures and terms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="risk-disclosure" className="text-slate-300">
                  Risk Disclosure
                </Label>
                <Textarea
                  id="risk-disclosure"
                  value={policies.riskDisclosure}
                  onChange={(e) => setPolicies({ ...policies, riskDisclosure: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="terms-conditions" className="text-slate-300">
                  Terms and Conditions
                </Label>
                <Textarea
                  id="terms-conditions"
                  value={policies.termsAndConditions}
                  onChange={(e) => setPolicies({ ...policies, termsAndConditions: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Policies
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
