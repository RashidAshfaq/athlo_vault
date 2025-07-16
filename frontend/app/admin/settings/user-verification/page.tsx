"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Users, Shield } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function UserVerificationSettings() {
  const router = useRouter()
  const [settings, setSettings] = useState({
    autoApproveAthletes: false,
    autoApproveInvestors: false,
    autoApproveFans: true,
    kycProvider: "jumio",
    amlProvider: "chainalysis",
    documentRetentionDays: "2555", // 7 years
    verificationTimeout: "72",
    requirePhoneVerification: true,
    requireEmailVerification: true,
    requireAddressVerification: true,
    allowSelfieVerification: true,
    minDocumentQuality: "high",
    maxVerificationAttempts: "3",
  })

  const handleSave = () => {
    console.log("Saving verification settings:", settings)
    toast({
      title: "Settings Updated",
      description: "User verification settings have been successfully updated",
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
            <h1 className="text-3xl font-bold text-white">User Verification Settings</h1>
            <p className="text-slate-400">Configure KYC/AML and user approval processes</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Auto-Approval Settings
              </CardTitle>
              <CardDescription className="text-slate-400">
                Configure which user types can be automatically approved
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Auto-approve Athletes</Label>
                  <p className="text-slate-400 text-sm">
                    Automatically approve athlete registrations after verification
                  </p>
                </div>
                <Switch
                  checked={settings.autoApproveAthletes}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoApproveAthletes: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Auto-approve Investors</Label>
                  <p className="text-slate-400 text-sm">Automatically approve investor registrations after KYC/AML</p>
                </div>
                <Switch
                  checked={settings.autoApproveInvestors}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoApproveInvestors: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Auto-approve Fans</Label>
                  <p className="text-slate-400 text-sm">Automatically approve fan registrations</p>
                </div>
                <Switch
                  checked={settings.autoApproveFans}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoApproveFans: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                KYC/AML Providers
              </CardTitle>
              <CardDescription className="text-slate-400">Configure third-party verification providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="kyc-provider" className="text-slate-300">
                    KYC Provider
                  </Label>
                  <Select
                    value={settings.kycProvider}
                    onValueChange={(value) => setSettings({ ...settings, kycProvider: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="jumio">Jumio</SelectItem>
                      <SelectItem value="onfido">Onfido</SelectItem>
                      <SelectItem value="veriff">Veriff</SelectItem>
                      <SelectItem value="sumsub">Sum&Substance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="aml-provider" className="text-slate-300">
                    AML Provider
                  </Label>
                  <Select
                    value={settings.amlProvider}
                    onValueChange={(value) => setSettings({ ...settings, amlProvider: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="chainalysis">Chainalysis</SelectItem>
                      <SelectItem value="elliptic">Elliptic</SelectItem>
                      <SelectItem value="refinitiv">Refinitiv</SelectItem>
                      <SelectItem value="lexisnexis">LexisNexis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Verification Requirements</CardTitle>
              <CardDescription className="text-slate-400">
                Configure what verification steps are required
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Phone Verification Required</Label>
                  <p className="text-slate-400 text-sm">Require phone number verification via SMS</p>
                </div>
                <Switch
                  checked={settings.requirePhoneVerification}
                  onCheckedChange={(checked) => setSettings({ ...settings, requirePhoneVerification: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Email Verification Required</Label>
                  <p className="text-slate-400 text-sm">Require email address verification</p>
                </div>
                <Switch
                  checked={settings.requireEmailVerification}
                  onCheckedChange={(checked) => setSettings({ ...settings, requireEmailVerification: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Address Verification Required</Label>
                  <p className="text-slate-400 text-sm">Require proof of address documents</p>
                </div>
                <Switch
                  checked={settings.requireAddressVerification}
                  onCheckedChange={(checked) => setSettings({ ...settings, requireAddressVerification: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-slate-300">Allow Selfie Verification</Label>
                  <p className="text-slate-400 text-sm">Allow selfie photos for identity verification</p>
                </div>
                <Switch
                  checked={settings.allowSelfieVerification}
                  onCheckedChange={(checked) => setSettings({ ...settings, allowSelfieVerification: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Verification Parameters</CardTitle>
              <CardDescription className="text-slate-400">
                Configure verification timeouts and quality requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="verification-timeout" className="text-slate-300">
                    Verification Timeout (hours)
                  </Label>
                  <Input
                    id="verification-timeout"
                    value={settings.verificationTimeout}
                    onChange={(e) => setSettings({ ...settings, verificationTimeout: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="max-attempts" className="text-slate-300">
                    Max Verification Attempts
                  </Label>
                  <Input
                    id="max-attempts"
                    value={settings.maxVerificationAttempts}
                    onChange={(e) => setSettings({ ...settings, maxVerificationAttempts: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="document-retention" className="text-slate-300">
                    Document Retention (days)
                  </Label>
                  <Input
                    id="document-retention"
                    value={settings.documentRetentionDays}
                    onChange={(e) => setSettings({ ...settings, documentRetentionDays: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="document-quality" className="text-slate-300">
                    Minimum Document Quality
                  </Label>
                  <Select
                    value={settings.minDocumentQuality}
                    onValueChange={(value) => setSettings({ ...settings, minDocumentQuality: value })}
                  >
                    <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="ultra">Ultra High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
