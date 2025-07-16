"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Shield, User, CreditCard, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"

interface OnboardingData {
  firstName: string
  lastName: string
  email: string
  userType: string
}

export default function InvestorOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      state: "",
    },
    financial: {
      householdIncome: "",
      profession: "",
      expectedInvestmentAmount: "",
    },
    legal: {
      accreditedInvestor: false,
      riskTolerance: "",
      investmentExperience: "",
    },
    agreements: {
      termsAccepted: false,
      privacyAccepted: false,
      riskDisclosureAccepted: false,
    },
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

    // Get onboarding data passed from signup
    if (parsedUser.onboardingData) {
      setOnboardingData(parsedUser.onboardingData)
      setFormData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          firstName: parsedUser.onboardingData.firstName || "",
          lastName: parsedUser.onboardingData.lastName || "",
          email: parsedUser.onboardingData.email || "",
        },
      }))
    }
  }, [router])

  const steps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Financial Information", icon: CreditCard },
    { id: 3, title: "Legal & Compliance", icon: Shield },
    { id: 4, title: "Complete Setup", icon: CheckCircle },
  ]

  const progress = (currentStep / steps.length) * 100

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = () => {
    // Update user data to remove onboarding flag
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      delete parsedUser.onboardingData
      parsedUser.onboardingCompleted = true
      localStorage.setItem("user", JSON.stringify(parsedUser))
    }

    // Redirect to investor dashboard
    router.push("/investor/dashboard")
  }

  const StepIcon = steps[currentStep - 1].icon

  if (!onboardingData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Welcome, {onboardingData.firstName}!</h1>
            <p className="text-xl text-slate-300">Complete your investor profile to start funding athletes</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= step.id ? "bg-amber-500 text-slate-900" : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-slate-400 mt-2 text-center max-w-20">{step.title}</span>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <StepIcon className="h-6 w-6 mr-2 text-amber-400" />
                {steps[currentStep - 1].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">First Name</Label>
                      <Input
                        className="bg-slate-900 border-slate-700 text-white"
                        value={formData.personalInfo.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, firstName: e.target.value },
                          })
                        }
                        readOnly
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Last Name</Label>
                      <Input
                        className="bg-slate-900 border-slate-700 text-white"
                        value={formData.personalInfo.lastName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            personalInfo: { ...formData.personalInfo, lastName: e.target.value },
                          })
                        }
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Email Address</Label>
                    <Input
                      type="email"
                      className="bg-slate-900 border-slate-700 text-white"
                      value={formData.personalInfo.email}
                      readOnly
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Phone Number</Label>
                    <Input
                      className="bg-slate-900 border-slate-700 text-white"
                      placeholder="+1 (555) 123-4567"
                      value={formData.personalInfo.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, phone: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Date of Birth</Label>
                    <Input
                      type="date"
                      className="bg-slate-900 border-slate-700 text-white"
                      value={formData.personalInfo.dateOfBirth}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, dateOfBirth: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">State of Residence</Label>
                    <Select
                      value={formData.personalInfo.state}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          personalInfo: { ...formData.personalInfo, state: value },
                        })
                      }
                    >
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        {usStates.map((state) => (
                          <SelectItem key={state} value={state.toLowerCase().replace(/\s+/g, "-")}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 2: Financial Information */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Household Income</Label>
                    <Select
                      value={formData.financial.householdIncome}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          financial: { ...formData.financial, householdIncome: value },
                        })
                      }
                    >
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
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
                    <Label className="text-slate-300">Profession</Label>
                    <Input
                      className="bg-slate-900 border-slate-700 text-white"
                      placeholder="e.g., Software Engineer, Doctor, Business Owner"
                      value={formData.financial.profession}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          financial: { ...formData.financial, profession: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label className="text-slate-300">Expected Investment Amount</Label>
                    <Select
                      value={formData.financial.expectedInvestmentAmount}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          financial: { ...formData.financial, expectedInvestmentAmount: value },
                        })
                      }
                    >
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue placeholder="Select investment range" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="under-1k">Under $1,000</SelectItem>
                        <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5k-25k">$5,000 - $25,000</SelectItem>
                        <SelectItem value="25k-100k">$25,000 - $100,000</SelectItem>
                        <SelectItem value="over-100k">Over $100,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Legal & Compliance */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300">Investment Experience</Label>
                    <Select
                      value={formData.legal.investmentExperience}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          legal: { ...formData.legal, investmentExperience: value },
                        })
                      }
                    >
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                        <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                        <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
                        <SelectItem value="professional">Professional Investor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-slate-300">Risk Tolerance</Label>
                    <Select
                      value={formData.legal.riskTolerance}
                      onValueChange={(value) =>
                        setFormData({
                          ...formData,
                          legal: { ...formData.legal, riskTolerance: value },
                        })
                      }
                    >
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue placeholder="Select risk tolerance" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="conservative">Conservative - Lower risk, stable returns</SelectItem>
                        <SelectItem value="moderate">Moderate - Balanced risk and return</SelectItem>
                        <SelectItem value="aggressive">Aggressive - Higher risk, higher potential returns</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreements.termsAccepted}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            agreements: { ...formData.agreements, termsAccepted: !!checked },
                          })
                        }
                        className="border-slate-600"
                      />
                      <Label htmlFor="terms" className="text-slate-300 text-sm">
                        I agree to the Terms of Service and Investment Agreement
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={formData.agreements.privacyAccepted}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            agreements: { ...formData.agreements, privacyAccepted: !!checked },
                          })
                        }
                        className="border-slate-600"
                      />
                      <Label htmlFor="privacy" className="text-slate-300 text-sm">
                        I agree to the Privacy Policy
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="risk"
                        checked={formData.agreements.riskDisclosureAccepted}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            agreements: { ...formData.agreements, riskDisclosureAccepted: !!checked },
                          })
                        }
                        className="border-slate-600"
                      />
                      <Label htmlFor="risk" className="text-slate-300 text-sm">
                        I acknowledge the Risk Disclosure Statement
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Complete Setup */}
              {currentStep === 4 && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-10 w-10 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Welcome to AthloVault!</h3>
                    <p className="text-slate-300">Your investor account has been created successfully.</p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-4">What's Next?</h4>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 text-sm font-bold">
                          1
                        </div>
                        <span className="text-slate-300">Complete identification verification within 24–48 hours</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 text-sm font-bold">
                          2
                        </div>
                        <span className="text-slate-300">Smart contracts</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 text-sm font-bold">
                          3
                        </div>
                        <span className="text-slate-300">Connect with agents</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={completeOnboarding}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-semibold"
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:text-white bg-transparent"
                      onClick={() => router.push("/athletes")}
                    >
                      Browse Athletes
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 4 && (
                <div className="flex justify-between pt-6 border-t border-slate-700">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="border-slate-600 text-slate-300 hover:text-white bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button onClick={nextStep} className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                    {currentStep === 3 ? "Complete Setup" : "Next"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
