"use client"

import { useState } from "react"
import { AthleteLayout } from "@/components/athlete-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload } from "@/components/file-upload"
import {
  User,
  Trophy,
  Target,
  Camera,
  Save,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Globe,
  Instagram,
  Twitter,
  Linkedin,
  Shield,
  AlertTriangle,
  Clock,
  Users,
} from "lucide-react"

export default function AthleteSettings() {
  const [profileData, setProfileData] = useState({
    // Basic Information
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "2002-03-15",
    location: "Los Angeles, CA",

    // Athletic Information
    sport: "Basketball",
    position: "Point Guard",
    team: "UCLA Bruins",
    height: "6'2\"",
    weight: "185",
    experience: "4",

    // Coach Information
    coachName: "",
    coachEmail: "",
    coachPhone: "",
    coachYears: "",
    coachAchievements: "",

    // Bio and Goals
    bio: "Passionate basketball player with dreams of making it to the NBA. Currently leading my university team with strong performance stats and leadership skills.",
    careerGoals: "Get drafted in NBA first round, Win NBA Rookie of the Year, Secure major endorsement deal",

    // Social Media
    website: "",
    instagram: "@alexjohnson_bball",
    twitter: "@alexjohnson",
    linkedin: "alex-johnson-athlete",

    // Legal & Verification
    felonyConviction: "",
    felonyDescription: "",
    felonyYear: "",

    // Profile Status
    profileStatus: "under-review",
  })

  const [showFelonyDetails, setShowFelonyDetails] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))

    if (field === "felonyConviction") {
      setShowFelonyDetails(value === "yes")
      if (value === "no") {
        setProfileData((prev) => ({
          ...prev,
          felonyDescription: "",
          felonyYear: "",
        }))
      }
    }
  }

  const handleSave = () => {
    console.log("Saving profile data:", profileData)
    // Here you would typically save to your backend
  }

  return (
    <AthleteLayout title="Profile Settings" description="Manage your athlete profile and account settings">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Profile Settings</h1>
          <p className="text-slate-400">Update your profile information and preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Profile Status Alert */}
      {profileData.profileStatus === "under-review" && (
        <Card className="bg-amber-500/10 border-amber-500/20 mb-6">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-amber-400 font-semibold text-lg mb-2">Profile is Now Under Review</h3>
                <p className="text-slate-300 mb-3">
                  Your profile has been submitted and is currently being reviewed by our team. This process typically
                  takes 24-48 hours.
                </p>
                <div className="flex items-center space-x-2 text-slate-300">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Step 2: You will be contacted by an AthloVault agent</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="bg-slate-900/50 border-slate-800/50">
          <TabsTrigger value="basic" className="data-[state=active]:bg-slate-800">
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="athletic" className="data-[state=active]:bg-slate-800">
            Athletic Details
          </TabsTrigger>
          <TabsTrigger value="coach" className="data-[state=active]:bg-slate-800">
            Coach
          </TabsTrigger>
          <TabsTrigger value="goals" className="data-[state=active]:bg-slate-800">
            Goals & Bio
          </TabsTrigger>
          <TabsTrigger value="social" className="data-[state=active]:bg-slate-800">
            Social Media
          </TabsTrigger>
          <TabsTrigger value="legal" className="data-[state=active]:bg-slate-800">
            Legal & Verification
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-slate-800">
            Photos & Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <User className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-slate-300">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={profileData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-slate-300">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={profileData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-300 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-300 flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-slate-300 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-slate-300 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="City, State"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="athletic" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Athletic Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Provide details about your sport and athletic background
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="sport" className="text-slate-300">
                    Sport
                  </Label>
                  <Select value={profileData.sport} onValueChange={(value) => handleInputChange("sport", value)}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue placeholder="Select your sport" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="Basketball">Basketball</SelectItem>
                      <SelectItem value="Football">Football</SelectItem>
                      <SelectItem value="Baseball">Baseball</SelectItem>
                      <SelectItem value="Soccer">Soccer</SelectItem>
                      <SelectItem value="Tennis">Tennis</SelectItem>
                      <SelectItem value="Golf">Golf</SelectItem>
                      <SelectItem value="Track & Field">Track & Field</SelectItem>
                      <SelectItem value="Swimming">Swimming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position" className="text-slate-300">
                    Position
                  </Label>
                  <Input
                    id="position"
                    value={profileData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="e.g., Point Guard, Quarterback"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="team" className="text-slate-300">
                  Current Team/School
                </Label>
                <Input
                  id="team"
                  value={profileData.team}
                  onChange={(e) => handleInputChange("team", e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white"
                  placeholder="e.g., UCLA Bruins, Manchester United"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="height" className="text-slate-300">
                    Height
                  </Label>
                  <Input
                    id="height"
                    value={profileData.height}
                    onChange={(e) => handleInputChange("height", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="e.g., 6 feet 2 inches"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-slate-300">
                    Weight (lbs)
                  </Label>
                  <Input
                    id="weight"
                    value={profileData.weight}
                    onChange={(e) => handleInputChange("weight", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="e.g., 185"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-slate-300">
                    Years of Experience
                  </Label>
                  <Input
                    id="experience"
                    value={profileData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="e.g., 4"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coach" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Coach Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Provide details about your current coach or training staff
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="coachName" className="text-slate-300">
                    Coach Name
                  </Label>
                  <Input
                    id="coachName"
                    value={profileData.coachName}
                    onChange={(e) => handleInputChange("coachName", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="e.g., John Smith"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coachYears" className="text-slate-300">
                    Years Working Together
                  </Label>
                  <Input
                    id="coachYears"
                    value={profileData.coachYears}
                    onChange={(e) => handleInputChange("coachYears", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="e.g., 2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="coachEmail" className="text-slate-300">
                    Coach Email
                  </Label>
                  <Input
                    id="coachEmail"
                    type="email"
                    value={profileData.coachEmail}
                    onChange={(e) => handleInputChange("coachEmail", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="coach@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coachPhone" className="text-slate-300">
                    Coach Phone
                  </Label>
                  <Input
                    id="coachPhone"
                    value={profileData.coachPhone}
                    onChange={(e) => handleInputChange("coachPhone", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coachAchievements" className="text-slate-300">
                  Coach Achievements & Background
                </Label>
                <Textarea
                  id="coachAchievements"
                  value={profileData.coachAchievements}
                  onChange={(e) => handleInputChange("coachAchievements", e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white min-h-[120px]"
                  placeholder="Describe your coach's background, achievements, and coaching philosophy..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Biography & Career Goals
              </CardTitle>
              <CardDescription className="text-slate-400">Tell your story and share your aspirations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-slate-300">
                  Biography
                </Label>
                <Textarea
                  id="bio"
                  value={profileData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white min-h-[120px]"
                  placeholder="Tell your story, background, and what makes you unique as an athlete..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="careerGoals" className="text-slate-300">
                  Career Goals
                </Label>
                <Textarea
                  id="careerGoals"
                  value={profileData.careerGoals}
                  onChange={(e) => handleInputChange("careerGoals", e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white min-h-[120px]"
                  placeholder="Share your short-term and long-term career objectives..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Social Media & Online Presence
              </CardTitle>
              <CardDescription className="text-slate-400">
                Connect your social media accounts to showcase your following
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="website" className="text-slate-300 flex items-center">
                  <Globe className="h-4 w-4 mr-2" />
                  Personal Website
                </Label>
                <Input
                  id="website"
                  value={profileData.website}
                  onChange={(e) => handleInputChange("website", e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="instagram" className="text-slate-300 flex items-center">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={profileData.instagram}
                    onChange={(e) => handleInputChange("instagram", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter" className="text-slate-300 flex items-center">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    value={profileData.twitter}
                    onChange={(e) => handleInputChange("twitter", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="@username"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-slate-300 flex items-center">
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="username"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Legal & Verification
              </CardTitle>
              <CardDescription className="text-slate-400">
                Complete verification requirements for platform compliance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Felony Conviction Section */}
              <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-amber-400" />
                    <h3 className="text-white font-semibold">Background Check</h3>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-300 text-base">Have you ever been convicted of a felony?</Label>
                    <RadioGroup
                      value={profileData.felonyConviction}
                      onValueChange={(value) => handleInputChange("felonyConviction", value)}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="felony-yes" className="border-slate-600 text-blue-600" />
                        <Label htmlFor="felony-yes" className="text-slate-300">
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="felony-no" className="border-slate-600 text-blue-600" />
                        <Label htmlFor="felony-no" className="text-slate-300">
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {showFelonyDetails && (
                    <div className="space-y-4 mt-4 p-4 bg-slate-900/50 rounded-lg border border-slate-600/30">
                      <div className="space-y-2">
                        <Label htmlFor="felonyDescription" className="text-slate-300">
                          Please briefly describe the nature of the conviction and the year it occurred
                        </Label>
                        <Textarea
                          id="felonyDescription"
                          value={profileData.felonyDescription}
                          onChange={(e) => handleInputChange("felonyDescription", e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white min-h-[100px]"
                          placeholder="Provide a brief description of the conviction and the year it occurred..."
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="felonyYear" className="text-slate-300">
                          Year of Conviction
                        </Label>
                        <Input
                          id="felonyYear"
                          value={profileData.felonyYear}
                          onChange={(e) => handleInputChange("felonyYear", e.target.value)}
                          className="bg-slate-800/50 border-slate-700 text-white"
                          placeholder="e.g., 2020"
                        />
                      </div>

                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                        <p className="text-blue-300 text-sm">
                          <strong>Confidentiality Notice:</strong> This information is used solely for compliance and
                          verification purposes and will remain confidential.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <p className="text-amber-300 text-sm font-medium">Important Notice</p>
                        <p className="text-slate-300 text-sm">
                          You may be contacted by an AthloVault agent for additional verification. All profiles undergo
                          a 24–48 hour review process.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" className="border-slate-600 data-[state=checked]:bg-blue-600" />
                  <Label htmlFor="terms" className="text-slate-300 text-sm">
                    I agree to the{" "}
                    <a href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                      Privacy Policy
                    </a>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="verification" className="border-slate-600 data-[state=checked]:bg-blue-600" />
                  <Label htmlFor="verification" className="text-slate-300 text-sm">
                    I consent to background verification and identity checks as required by AthloVault
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Photos & Media
              </CardTitle>
              <CardDescription className="text-slate-400">Upload your profile photos and media content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label className="text-slate-300">Profile Photo</Label>
                  <FileUpload
                    accept="image/*"
                    maxSize={5}
                    onUpload={(files) => console.log("Profile photo uploaded:", files)}
                    className="h-32"
                  />
                  <p className="text-slate-400 text-sm">Recommended: 400x400px, max 5MB</p>
                </div>
                <div className="space-y-4">
                  <Label className="text-slate-300">Cover Photo</Label>
                  <FileUpload
                    accept="image/*"
                    maxSize={10}
                    onUpload={(files) => console.log("Cover photo uploaded:", files)}
                    className="h-32"
                  />
                  <p className="text-slate-400 text-sm">Recommended: 1200x400px, max 10MB</p>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-slate-300">Action Photos & Videos</Label>
                <FileUpload
                  accept="image/*,video/*"
                  maxSize={50}
                  multiple
                  onUpload={(files) => console.log("Media uploaded:", files)}
                  className="h-40"
                />
                <p className="text-slate-400 text-sm">
                  Upload photos and videos showcasing your athletic performance. Max 50MB per file.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AthleteLayout>
  )
}
