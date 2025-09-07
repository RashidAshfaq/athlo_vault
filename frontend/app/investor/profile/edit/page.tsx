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

/** ---------------- API + helpers ---------------- */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

type InvestorUpdatePayload = {
  // core
  fullName: string
  phone: string
  dob: string
  state_of_residence: string | null
  city: string | null
  zip: string | null
  address: string | null
  country: string | null

  // financial
  annual_income_range: string | null
  net_worth_range: string | null
  investment_experience: string | null
  risk_tolerance: string | null
  investment_goals: string | null

  // compliance
  accredited_investor_status: string | null
  citizenship: string | null
  source_of_funds: string | null
  investment_horizon: string | null
  kyc_status: string | null
  aml_status: string | null

  // consent
  terms_of_service_check: boolean
  privacy_policy_check: boolean
  risk_disclosure_statement_check: boolean

  // extras
  household_income?: string | null
  profession?: string | null
  expected_investment_amount?: number | null
}

const incomeMap: Record<string, string> = {
  "under-50k": "Under $50K",
  "50k-100k": "$50K - $100K",
  "100k-250k": "$100K - $250K",
  "250k-500k": "$250K - $500K",
  "over-500k": "Over $500K",
}
const netWorthMap: Record<string, string> = {
  "under-100k": "Under $100K",
  "100k-500k": "$100K - $500K",
  "500k-1m": "$500K - $1M",
  "1m-5m": "$1M - $5M",
  "over-5m": "Over $5M",
}
const experienceMap: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  experienced: "Experienced",
  expert: "Advanced",
}
const riskToleranceMap: Record<string, string> = {
  conservative: "Conservative",
  moderate: "Moderate",
  aggressive: "Aggressive",
  "very-aggressive": "Very Aggressive",
}
const horizonMap: Record<string, string> = {
  short: "Short-term",
  medium: "Medium-term",
  long: "Long-term",
}

/** Normalize to YYYY-MM-DD (ISO date string) */
function toISODate(dateStr: string): string | null {
  if (!dateStr) return null
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return null
  const yyyy = d.getUTCFullYear()
  const mm = String(d.getUTCMonth() + 1).padStart(2, "0")
  const dd = String(d.getUTCDate()).padStart(2, "0")
  return `${yyyy}-${mm}-${dd}`
}

/** Parse currency-like strings to a number; empty/invalid -> null */
function toNumberOrNull(v?: string): number | null {
  if (!v) return null
  const cleaned = v.replace(/[^0-9.]/g, "")
  if (!cleaned) return null
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : null
}

async function updateInvestorProfile(payload: InvestorUpdatePayload) {
  const token = localStorage.getItem("access_token")
  if (!token) throw new Error("No authentication token found")

  const res = await fetch(`${API_BASE_URL}/investor/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-key": "1234abcd-5678-efgh-9101-ijklmnopqrst",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const text = await res.text()
    let json: any = {}
    try { json = JSON.parse(text) } catch {}
    throw new Error(json.message || `Failed to update profile (HTTP ${res.status})`)
  }
  return res.json()
}

/** ---------------- Page ---------------- */
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
    dateOfBirth: "", // YYYY-MM-DD
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
    // extras
    householdIncome: "",
    expectedInvestmentAmount: "", // stored as string in UI, parsed on save
    profession: "",
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

    // Load existing profile data if available (local snapshot)
    const profileData = localStorage.getItem("investorProfile")
    if (profileData) {
      const profile = JSON.parse(profileData)
      setPersonalInfo((p) => profile.personalInfo || p)
      setFinancialInfo((f) => ({ ...f, ...(profile.financialInfo || {}) }))
      setComplianceInfo((c) => profile.complianceInfo || c)
    }
  }, [router])

  const handleSaveProfile = async () => {
    try {
      setLoading(true)

      // Validate & normalize DOB
      const dobISO = toISODate(personalInfo.dateOfBirth)
      if (!dobISO) {
        alert("Please enter a valid Date of Birth in YYYY-MM-DD format.")
        setLoading(false)
        return
      }

      // Parse expected investment amount to number
      const expectedAmount = toNumberOrNull(financialInfo.expectedInvestmentAmount)
      if (financialInfo.expectedInvestmentAmount && expectedAmount === null) {
        alert("Expected Investment Amount must be a valid number (e.g., 25000).")
        setLoading(false)
        return
      }

      const fullName = [personalInfo.firstName, personalInfo.lastName].filter(Boolean).join(" ").trim()

      const payload: InvestorUpdatePayload = {
        fullName,
        phone: personalInfo.phone || "",
        dob: dobISO,
        state_of_residence: personalInfo.state || null,
        city: personalInfo.city || null,
        zip: personalInfo.zipCode || null,
        address: personalInfo.address || null,
        country: personalInfo.country || null,

        annual_income_range: incomeMap[financialInfo.annualIncome] ?? null,
        net_worth_range: netWorthMap[financialInfo.netWorth] ?? null,
        investment_experience: experienceMap[financialInfo.investmentExperience] ?? null,
        risk_tolerance: riskToleranceMap[financialInfo.riskTolerance] ?? null,
        investment_goals: financialInfo.investmentGoals || null,

        accredited_investor_status:
          complianceInfo.accreditedInvestor === "yes"
            ? "Yes"
            : complianceInfo.accreditedInvestor === "no"
            ? "No"
            : complianceInfo.accreditedInvestor === "unsure"
            ? "Unsure"
            : null,
        citizenship: complianceInfo.citizenship || null,
        source_of_funds: complianceInfo.sourceOfFunds || null,
        investment_horizon: horizonMap[complianceInfo.investmentHorizon] ?? null,
        kyc_status: complianceInfo.kycStatus || null,
        aml_status: complianceInfo.amlStatus || null,

        // consent (adjust if backend not required)
        terms_of_service_check: true,
        privacy_policy_check: true,
        risk_disclosure_statement_check: true,

        // extras
        household_income: financialInfo.householdIncome || null,
        profession: (financialInfo.profession || financialInfo.employmentStatus || financialInfo.employer || "").trim() || null,
        expected_investment_amount: expectedAmount, // number or null
      }

      const res = await updateInvestorProfile(payload)

      // Optional: keep a local snapshot
      const snapshot = {
        personalInfo,
        financialInfo,
        complianceInfo,
        lastUpdated: new Date().toISOString(),
      }
      localStorage.setItem("investorProfile", JSON.stringify(snapshot))

      alert(res?.message || "Profile updated successfully!")
      router.push("/investor/dashboard")
    } catch (err: any) {
      console.error(err)
      alert(err?.message || "Failed to update profile.")
    } finally {
      setLoading(false)
    }
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

          {/* Personal */}
          <TabsContent value="personal" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
                <CardDescription className="text-slate-400">Update your basic personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                    <Input id="firstName" value={personalInfo.firstName} onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                    <Input id="lastName" value={personalInfo.lastName} onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-slate-300">Email</Label>
                    <Input id="email" type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                    <Input id="phone" value={personalInfo.phone} onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateOfBirth" className="text-slate-300">Date of Birth</Label>
                    <Input id="dateOfBirth" type="date" value={personalInfo.dateOfBirth} onChange={(e) => setPersonalInfo({ ...personalInfo, dateOfBirth: e.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-slate-300">Address</Label>
                    <Input id="address" value={personalInfo.address} onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-slate-300">City</Label>
                    <Input id="city" value={personalInfo.city} onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-slate-300">State</Label>
                    <Input id="state" value={personalInfo.state} onChange={(e) => setPersonalInfo({ ...personalInfo, state: e.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="zipCode" className="text-slate-300">ZIP Code</Label>
                    <Input id="zipCode" value={personalInfo.zipCode} onChange={(e) => setPersonalInfo({ ...personalInfo, zipCode: e.target.value })} className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial */}
          <TabsContent value="financial" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Financial Information</CardTitle>
                <CardDescription className="text-slate-400">Provide your financial details for investment qualification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="annualIncome" className="text-slate-300">Annual Income</Label>
                    <Select value={financialInfo.annualIncome} onValueChange={(value) => setFinancialInfo({ ...financialInfo, annualIncome: value })}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Select income range" /></SelectTrigger>
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
                    <Label htmlFor="netWorth" className="text-slate-300">Net Worth</Label>
                    <Select value={financialInfo.netWorth} onValueChange={(value) => setFinancialInfo({ ...financialInfo, netWorth: value })}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Select net worth range" /></SelectTrigger>
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
                    <Label htmlFor="investmentExperience" className="text-slate-300">Investment Experience</Label>
                    <Select value={financialInfo.investmentExperience} onValueChange={(value) => setFinancialInfo({ ...financialInfo, investmentExperience: value })}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Select experience level" /></SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (3-7 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (8-15 years)</SelectItem>
                        <SelectItem value="expert">Expert (15+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="riskTolerance" className="text-slate-300">Risk Tolerance</Label>
                    <Select value={financialInfo.riskTolerance} onValueChange={(value) => setFinancialInfo({ ...financialInfo, riskTolerance: value })}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Select risk tolerance" /></SelectTrigger>
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
                  <Label htmlFor="investmentGoals" className="text-slate-300">Investment Goals</Label>
                  <Textarea id="investmentGoals" value={financialInfo.investmentGoals} onChange={(e) => setFinancialInfo({ ...financialInfo, investmentGoals: e.target.value })} placeholder="Describe your investment goals and objectives..." className="bg-slate-800 border-slate-700 text-white" />
                </div>

                {/* Extras: Household Income / Expected Investment Amount / Profession */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="householdIncome" className="text-slate-300">Household Income</Label>
                    <Input
                      id="householdIncome"
                      value={financialInfo.householdIncome}
                      onChange={(e) => setFinancialInfo({ ...financialInfo, householdIncome: e.target.value })}
                      placeholder="e.g., $100K - $150K"
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expectedInvestmentAmount" className="text-slate-300">Expected Investment Amount</Label>
                    <Input
                      id="expectedInvestmentAmount"
                      type="number"
                      inputMode="decimal"
                      step="0.01"
                      min="0"
                      value={financialInfo.expectedInvestmentAmount}
                      onChange={(e) => setFinancialInfo({ ...financialInfo, expectedInvestmentAmount: e.target.value })}
                      placeholder="e.g., 25000"
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="profession" className="text-slate-300">Profession</Label>
                  <Input
                    id="profession"
                    value={financialInfo.profession}
                    onChange={(e) => setFinancialInfo({ ...financialInfo, profession: e.target.value })}
                    placeholder="e.g., Software Engineer"
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>

              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance */}
          <TabsContent value="compliance" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Legal & Compliance</CardTitle>
                <CardDescription className="text-slate-400">Complete your compliance and verification information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="accreditedInvestor" className="text-slate-300">Accredited Investor Status</Label>
                    <Select value={complianceInfo.accreditedInvestor} onValueChange={(value) => setComplianceInfo({ ...complianceInfo, accreditedInvestor: value })}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="yes">Yes, I am an accredited investor</SelectItem>
                        <SelectItem value="no">No, I am not an accredited investor</SelectItem>
                        <SelectItem value="unsure">I'm not sure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="citizenship" className="text-slate-300">Citizenship</Label>
                    <Input id="citizenship" value={complianceInfo.citizenship} onChange={(e) => setComplianceInfo({ ...complianceInfo, citizenship: e.target.value })} placeholder="e.g., United States" className="bg-slate-800 border-slate-700 text-white" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="sourceOfFunds" className="text-slate-300">Source of Funds</Label>
                    <Select value={complianceInfo.sourceOfFunds} onValueChange={(value) => setComplianceInfo({ ...complianceInfo, sourceOfFunds: value })}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Select source" /></SelectTrigger>
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
                    <Label htmlFor="investmentHorizon" className="text-slate-300">Investment Horizon</Label>
                    <Select value={complianceInfo.investmentHorizon} onValueChange={(value) => setComplianceInfo({ ...complianceInfo, investmentHorizon: value })}>
                      <SelectTrigger className="bg-slate-800 border-slate-700 text-white"><SelectValue placeholder="Select horizon" /></SelectTrigger>
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
