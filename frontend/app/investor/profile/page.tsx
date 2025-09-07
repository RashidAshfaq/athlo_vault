"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getInvestorProfile, InvestorProfile } from "@/lib/investor-api"
import { Settings } from "lucide-react"

export default function InvestorProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<InvestorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const run = async () => {
      try {
        const userData = localStorage.getItem("user")
        if (!userData) {
          router.push("/auth/signin")
          return
        }
        const parsed = JSON.parse(userData)
        if (parsed?.userType !== "investor") {
          router.push("/auth/signin")
          return
        }
        const p = await getInvestorProfile()
        setProfile(p)
      } catch (e: any) {
        setError(e?.message || "Failed to load profile")
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading profile...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <p className="text-red-400 font-medium">Error: {error}</p>
          <Button onClick={() => location.reload()} variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
            Retry
          </Button>
          <Link href="/auth/signin">
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">Go to Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Profile not found.</div>
      </div>
    )
  }

  const displayName =
    profile.fullName ||
    [profile.firstName, profile.lastName].filter(Boolean).join(" ") ||
    "Investor"

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        {/* Heading + actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">My Profile</h1>
            <p className="text-slate-400">Welcome, {displayName}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="outline" className={profile.isApproved ? "border-green-600 text-green-400" : "border-yellow-600 text-yellow-400"}>
                {profile.isApproved ? "Approved" : "Pending Approval"}
              </Badge>
              <Badge variant="outline" className={profile.isProfileCompleted ? "border-green-600 text-green-400" : "border-slate-600 text-slate-300"}>
                {profile.isProfileCompleted ? "Profile Complete" : "Profile Incomplete"}
              </Badge>
              {profile.investment_experience && (
                <Badge variant="outline" className="border-amber-600 text-amber-400">
                  {profile.investment_experience}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/investor/dashboard">
              <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                Back to Dashboard
              </Button>
            </Link>
            <Link href="/investor/profile/edit">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Basic Information */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Basic Information</CardTitle>
            <CardDescription className="text-slate-400">Your core account details</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Field label="Full Name" value={displayName} />
            <Field label="Email" value={profile.email} />
            <Field label="Phone" value={profile.phone || "—"} />
            <Field label="Date of Birth" value={profile.dob ? new Date(profile.dob).toLocaleDateString() : "—"} />
            <Field label="Account Type" value={profile.accountType || "investor"} />
            <Field label="Role" value={profile.role || "investor"} />
            <Field label="Created At" value={new Date(profile.created_at).toLocaleString()} />
            <Field label="Last Active" value={profile.last_active ? new Date(profile.last_active).toLocaleString() : "—"} />
          </CardContent>
        </Card>

        {/* Address / Residency */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Location & Residency</CardTitle>
            <CardDescription className="text-slate-400">Where you live and receive correspondence</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Field label="City" value={profile.city || "—"} />
            <Field label="State of Residence" value={profile.state_of_residence || "—"} />
            <Field label="ZIP" value={profile.zip || "—"} />
            <Field label="Country" value={profile.country || "—"} />
            <Field label="Address" value={profile.address || "—"} className="md:col-span-2" />
          </CardContent>
        </Card>

        {/* Financial / Goals / Compliance */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Financial, Goals & Compliance</CardTitle>
            <CardDescription className="text-slate-400">Income ranges, goals, and declarations</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Field label="Annual Income Range" value={profile.annual_income_range || "—"} />
            <Field label="Household Income" value={profile.household_income || "—"} />
            <Field label="Net Worth Range" value={profile.net_worth_range || "—"} />
            <Field label="Profession" value={profile.profession || "—"} />
            <Field label="Expected Investment Amount" value={profile.expected_investment_amount || "—"} />
            <Field label="Investment Experience" value={profile.investment_experience || "—"} />
            <Field label="Investment Goals" value={profile.investment_goals || "—"} />
            <Field label="Risk Tolerance" value={profile.risk_tolerance || "—"} />
            <Field label="Investment Horizon" value={profile.investment_horizon || "—"} />
            <Field label="Accredited Investor" value={profile.accredited_investor_status || "—"} />
            <Field label="Citizenship" value={profile.citizenship || "—"} />
            <Field label="Source of Funds" value={profile.source_of_funds || "—"} />
            <Field label="KYC Status" value={profile.kyc_status || "—"} />
            <Field label="AML Status" value={profile.aml_status || "—"} />
          </CardContent>
        </Card>

        {/* Policy Consents */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Policy Consents</CardTitle>
            <CardDescription className="text-slate-400">What you agreed to when creating your profile</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <Consent label="Terms of Service" value={profile.terms_of_service_check} />
            <Consent label="Privacy Policy" value={profile.privacy_policy_check} />
            <Consent label="Risk Disclosure Statement" value={profile.risk_disclosure_statement_check} />
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

/** ------- Small presentational helpers ------- */
function Field({ label, value, className = "" }: { label: string; value: string | number; className?: string }) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-lg bg-slate-800/60 border border-slate-800 ${className}`}>
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-medium text-right">{String(value)}</span>
    </div>
  )
}

function Consent({ label, value }: { label: string; value: boolean | null | undefined }) {
  const ok = value === true
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/60 border border-slate-800">
      <span className="text-slate-400">{label}</span>
      <Badge variant="outline" className={ok ? "border-green-600 text-green-400" : "border-slate-600 text-slate-300"}>
        {ok ? "Yes" : "No"}
      </Badge>
    </div>
  )
}
