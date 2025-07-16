"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { User, Trophy, DollarSign, FileText, CheckCircle, ArrowRight, ArrowLeft, Upload } from "lucide-react"

interface OnboardingData {
  firstName: string
  lastName: string
  email: string
  userType: string
}

export default function AthleteOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/signin")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.userType !== "athlete") {
      router.push("/auth/signin")
      return
    }

    // Get onboarding data passed from signup
    if (parsedUser.onboardingData) {
      setOnboardingData(parsedUser.onboardingData)
    }
  }, [router])

  const steps = [
    { id: 1, title: "Personal Information", icon: User },
    { id: 2, title: "Athletic Profile", icon: Trophy },
    { id: 3, title: "Funding Goals", icon: DollarSign },
    { id: 4, title: "Legal & Verification", icon: FileText },
    { id: 5, title: "Launch Profile", icon: CheckCircle },
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
      localStorage.setItem("user", JSON.stringify(parsedUser))
    }

    // Redirect to athlete dashboard
    router.push("/athlete/dashboard")
  }

  const StepIcon = steps[currentStep - 1].icon

  if (!onboardingData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Welcome, {onboardingData.firstName}!</h1>
            <p className="text-xl text-slate-300">Complete your athlete profile to start raising funds</p>
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
              {/* Step 1: Personal Information - Pre-filled */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                      <Input
                        className="bg-slate-900 border-slate-700 text-white"
                        value={onboardingData.firstName}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                      <Input
                        className="bg-slate-900 border-slate-700 text-white"
                        value={onboardingData.lastName}
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                    <Input
                      type="email"
                      className="bg-slate-900 border-slate-700 text-white"
                      value={onboardingData.email}
                      readOnly
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                      <Input className="bg-slate-900 border-slate-700 text-white" placeholder="+1 (555) 123-4567" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Date of Birth</label>
                      <Input type="date" className="bg-slate-900 border-slate-700 text-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Location</label>
                    <Input className="bg-slate-900 border-slate-700 text-white" placeholder="City, State, Country" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Profile Photo</label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                      <p className="text-slate-400 text-sm">Upload a professional headshot</p>
                      <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent mt-2">
                        Choose Photo
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Athletic Profile */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Primary Sport</label>
                      <Select>
                        <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                          <SelectValue placeholder="Select your sport" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="basketball">Basketball</SelectItem>
                          <SelectItem value="football">Football</SelectItem>
                          <SelectItem value="soccer">Soccer</SelectItem>
                          <SelectItem value="tennis">Tennis</SelectItem>
                          <SelectItem value="baseball">Baseball</SelectItem>
                          <SelectItem value="golf">Golf</SelectItem>
                          <SelectItem value="swimming">Swimming</SelectItem>
                          <SelectItem value="track-field">Track & Field</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Position/Specialty</label>
                      <Input
                        className="bg-slate-900 border-slate-700 text-white"
                        placeholder="e.g., Point Guard, Quarterback"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Current Team/Organization</label>
                    <Input
                      className="bg-slate-900 border-slate-700 text-white"
                      placeholder="e.g., University of California"
                    />
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Coach Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Coach Name</label>
                        <Input className="bg-slate-900 border-slate-700 text-white" placeholder="Coach Name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Coach Email</label>
                        <Input
                          type="email"
                          className="bg-slate-900 border-slate-700 text-white"
                          placeholder="Coach Email"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Coach Phone</label>
                        <Input className="bg-slate-900 border-slate-700 text-white" placeholder="+1 (555) 123-4567" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Years Working Together</label>
                        <Input type="number" className="bg-slate-900 border-slate-700 text-white" placeholder="Years" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Coach Achievements & Background
                      </label>
                      <Textarea
                        className="bg-slate-900 border-slate-700 text-white min-h-24"
                        placeholder="Coach Achievements & Background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Years of Experience</label>
                    <Select>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="4-6">4-6 years</SelectItem>
                        <SelectItem value="7-10">7-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Key Achievements</label>
                    <Textarea
                      className="bg-slate-900 border-slate-700 text-white min-h-24"
                      placeholder="List your major achievements, awards, records, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Current Performance Stats & Achievements
                    </label>
                    <Textarea
                      className="bg-slate-900 border-slate-700 text-white min-h-24"
                      placeholder="Describe your current performance stats and achievements"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Social Media Following</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input className="bg-slate-900 border-slate-700 text-white" placeholder="Instagram followers" />
                      <Input className="bg-slate-900 border-slate-700 text-white" placeholder="Twitter followers" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Funding Goals */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      How will you use the funding?
                    </label>
                    <Textarea
                      className="bg-slate-900 border-slate-700 text-white min-h-32"
                      placeholder="Describe how you plan to use the investment (training, equipment, coaching, etc.)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Revenue Share Percentage</label>
                    <Select>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue placeholder="Select revenue share" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="5">5% of future earnings</SelectItem>
                        <SelectItem value="10">10% of future earnings</SelectItem>
                        <SelectItem value="15">15% of future earnings</SelectItem>
                        <SelectItem value="20">20% of future earnings</SelectItem>
                        <SelectItem value="custom">Custom arrangement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Career Goals & Timeline</label>
                    <Textarea
                      className="bg-slate-900 border-slate-700 text-white min-h-24"
                      placeholder="Describe your short-term and long-term career goals"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Legal & Verification */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Government ID</label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                      <p className="text-slate-400 text-sm">Upload a clear photo of your government-issued ID</p>
                      <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent mt-2">
                        Upload ID
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Proof of Athletic Status</label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                      <Trophy className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                      <p className="text-slate-400 text-sm">
                        Upload documents proving your athletic status (team roster, competition results, etc.)
                      </p>
                      <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent mt-2">
                        Upload Documents
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Felony Conviction</label>
                    <RadioGroup>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="felony-yes" className="border-slate-600" />
                        <label
                          htmlFor="felony-yes"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-300"
                        >
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="felony-no" className="border-slate-600" />
                        <label
                          htmlFor="felony-no"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-300"
                        >
                          No
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Conditionally render textarea if "Yes" is selected */}
                  {/* You'll need to manage the state of the radio group to show/hide this */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Please briefly describe the nature of the conviction and the year it occurred
                    </label>
                    <Textarea className="bg-slate-900 border-slate-700 text-white min-h-24" placeholder="Description" />
                  </div>

                  <p className="text-slate-400 text-sm">
                    This information is used solely for compliance and verification purposes and will remain
                    confidential
                  </p>
                  <p className="text-slate-400 text-sm">
                    You may be contacted by an AthloVault agent for additional verification. All profiles undergo a
                    24–48 hour review process
                  </p>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Legal Agreements</h4>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox id="terms" className="border-slate-600 mt-1" />
                        <label htmlFor="terms" className="text-slate-300 text-sm">
                          I agree to the{" "}
                          <span className="text-amber-400 underline cursor-pointer">Terms of Service</span> and
                          understand the legal implications of tokenizing my future earnings.
                        </label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox id="privacy" className="border-slate-600 mt-1" />
                        <label htmlFor="privacy" className="text-slate-300 text-sm">
                          I agree to the <span className="text-amber-400 underline cursor-pointer">Privacy Policy</span>{" "}
                          and consent to the collection and use of my personal data.
                        </label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox id="financial" className="border-slate-600 mt-1" />
                        <label htmlFor="financial" className="text-slate-300 text-sm">
                          I understand that this is a financial investment product and that my future earnings may be
                          affected by the revenue sharing agreement.
                        </label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox id="age" className="border-slate-600 mt-1" />
                        <label htmlFor="age" className="text-slate-300 text-sm">
                          I confirm that I am at least 18 years old and legally able to enter into this agreement.
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Launch Profile */}
              {currentStep === 5 && (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="h-10 w-10 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Profile Created Successfully!</h3>
                    <p className="text-slate-300">Your athlete profile is now under review.</p>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-6">
                    <h4 className="text-white font-semibold mb-4">What Happens Next?</h4>
                    <div className="space-y-3 text-left">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 text-sm font-bold">
                          1
                        </div>
                        <span className="text-slate-300">Profile review and verification (24-48 hours)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 text-sm font-bold">
                          2
                        </div>
                        <span className="text-slate-300">
                          Token creation and smart contract deployment. You will be contacted by an AthloVault agent
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-slate-900 text-sm font-bold">
                          3
                        </div>
                        <span className="text-slate-300">Profile goes live and investment begins</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={completeOnboarding}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold"
                    >
                      Go to Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:text-white bg-transparent"
                      onClick={() => router.push("/athletes")}
                    >
                      Preview Profile
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 5 && (
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
                    {currentStep === 4 ? "Create Profile" : "Next"}
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
