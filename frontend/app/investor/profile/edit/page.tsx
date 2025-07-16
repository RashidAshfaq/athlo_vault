"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, DollarSign, Shield } from "lucide-react"
import { Footer } from "@/components/footer"

interface Investor {
  email: string
  firstName?: string
  lastName?: string
  userType: string
  isAuthenticated: boolean
}

export default function EditInvestorProfile() {
  const router = useRouter()
  const [user, setUser] = useState<Investor | null>(null)
  const [loading, setLoading] = useState(false)

  // Personal Information
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  // Financial Information
  const [financialInfo, setFinancialInfo] = useState({
    annualIncome: "",
    netWorth: "",
    investmentExperience: "",
    riskTolerance: "",
    investmentGoals: "",
    liquidNetWorth: "",
    employmentStatus: "",
    employer: "",
  })

  // Legal and Compliance
  const [complianceInfo, setComplianceInfo] = useState({
    accreditedInvestor: "",
    politicallyExposed: "",
    taxId: "",
    citizenship: "",
    investmentHorizon: "",
    sourceOfFunds: "",
    kycStatus: "Pending",
    amlStatus: "Pending",
  })

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

    // Load existing profile data if available
    const profileData = localStorage.getItem("investorProfile")
    if (profileData) {
      const profile = JSON.parse(profileData)
      setPersonalInfo(profile.personalInfo || personalInfo)
      setFinancialInfo(profile.financialInfo || financialInfo)
      setComplianceInfo(profile.complianceInfo || complianceInfo)
    }
  }, [router])

  const handleSaveProfile = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const profileData = {
      personalInfo,
      financialInfo,
      complianceInfo,
      lastUpdated: new Date().toISOString(),
    }

    localStorage.setItem("investorProfile", JSON.stringify(profileData))
    setLoading(false)

    // Show success message and redirect
    alert("Profile updated successfully!")
    router.push("/investor/dashboard")
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/investor/dashboard">
              <Button variant="outline" size="icon" className="border-slate-700 text-slate-300 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-white">Edit Profile</h1>
              <p className="text-slate-400">Update your investor profile information</p>
            </div>
          </div>
          <Button
            onClick={handleSaveProfile}
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="bg-slate-900 border-slate-800">
            <TabsTrigger value="personal" className="data-[state=active]:bg-slate-800">
              <Save className="h-4 w-4 mr-2" />
              Personal Info
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-slate-800">
              <DollarSign className="h-4 w-4 mr-2" />
              Financial Info
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-slate-800">
              <Shield className="h-4 w-4 mr-2" />
              Legal & Compliance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-slate-400">Update your basic personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-300">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-slate-300">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-slate-300">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-slate-300">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="text-slate-300">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-slate-300">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={personalInfo.city}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-slate-300">
                      State
                    </Label>
                    <Input
                      id="state"
                      value={personalInfo.state}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, state: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-slate-300">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      value={personalInfo.zipCode}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, zipCode: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Financial Information</CardTitle>
                <CardDescription className="text-slate-400">
                  Provide your financial details for investment qualification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="annualIncome" className="text-slate-300">
                      Annual Income
                    </Label>
                    <Select
                      value={financialInfo.annualIncome}
                      onValueChange={(value) => setFinancialInfo({ ...financialInfo, annualIncome: value })}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="under-50k">Under $50,000</SelectItem>
                        <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                        <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                        <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                        <SelectItem value="over-500k">Over $500,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="netWorth" className="text-slate-300">
                      Net Worth
                    </Label>
                    <Select
                      value={financialInfo.netWorth}
                      onValueChange={(value) => setFinancialInfo({ ...financialInfo, netWorth: value })}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select net worth range" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="under-100k">Under $100,000</SelectItem>
                        <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                        <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                        <SelectItem value="1m-5m">$1,000,000 - $5,000,000</SelectItem>
                        <SelectItem value="over-5m">Over $5,000,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="investmentExperience" className="text-slate-300">
                      Investment Experience
                    </Label>
                    <Select
                      value={financialInfo.investmentExperience}
                      onValueChange={(value) => setFinancialInfo({ ...financialInfo, investmentExperience: value })}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (3-7 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (8-15 years)</SelectItem>
                        <SelectItem value="expert">Expert (15+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="riskTolerance" className="text-slate-300">
                      Risk Tolerance
                    </Label>
                    <Select
                      value={financialInfo.riskTolerance}
                      onValueChange={(value) => setFinancialInfo({ ...financialInfo, riskTolerance: value })}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select risk tolerance" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                        <SelectItem value="very-aggressive">Very Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="investmentGoals" className="text-slate-300">
                    Investment Goals
                  </Label>
                  <Textarea
                    id="investmentGoals"
                    value={financialInfo.investmentGoals}
                    onChange={(e) => setFinancialInfo({ ...financialInfo, investmentGoals: e.target.value })}
                    placeholder="Describe your investment goals and objectives..."
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Legal & Compliance</CardTitle>
                <CardDescription className="text-slate-400">
                  Complete your compliance and verification information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accreditedInvestor" className="text-slate-300">
                      Accredited Investor Status
                    </Label>
                    <Select
                      value={complianceInfo.accreditedInvestor}
                      onValueChange={(value) => setComplianceInfo({ ...complianceInfo, accreditedInvestor: value })}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="yes">Yes, I am an accredited investor</SelectItem>
                        <SelectItem value="no">No, I am not an accredited investor</SelectItem>
                        <SelectItem value="unsure">I'm not sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="citizenship" className="text-slate-300">
                      Citizenship
                    </Label>
                    <Input
                      id="citizenship"
                      value={complianceInfo.citizenship}
                      onChange={(e) => setComplianceInfo({ ...complianceInfo, citizenship: e.target.value })}
                      placeholder="e.g., United States"
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sourceOfFunds" className="text-slate-300">
                      Source of Funds
                    </Label>
                    <Select
                      value={complianceInfo.sourceOfFunds}
                      onValueChange={(value) => setComplianceInfo({ ...complianceInfo, sourceOfFunds: value })}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="employment">Employment Income</SelectItem>
                        <SelectItem value="business">Business Ownership</SelectItem>
                        <SelectItem value="investments">Investment Returns</SelectItem>
                        <SelectItem value="inheritance">Inheritance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="investmentHorizon" className="text-slate-300">
                      Investment Horizon
                    </Label>
                    <Select
                      value={complianceInfo.investmentHorizon}
                      onValueChange={(value) => setComplianceInfo({ ...complianceInfo, investmentHorizon: value })}
                    >
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                        <SelectValue placeholder="Select horizon" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="short">Short-term (1-3 years)</SelectItem>
                        <SelectItem value="medium">Medium-term (3-7 years)</SelectItem>
                        <SelectItem value="long">Long-term (7+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">KYC Status</Label>
                    <div className="p-3 bg-slate-800 rounded-md border border-slate-700">
                      <span className="text-yellow-400">{complianceInfo.kycStatus}</span>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">AML Status</Label>
                    <div className="p-3 bg-slate-800 rounded-md border border-slate-700">
                      <span className="text-yellow-400">{complianceInfo.amlStatus}</span>
                    </div>
                  </div>
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
