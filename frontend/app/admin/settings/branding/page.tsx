"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, Globe, Upload, Palette } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function PlatformBranding() {
  const router = useRouter()
  const [branding, setBranding] = useState({
    platformName: "AthloVault",
    tagline: "Invest in Athletic Excellence",
    primaryColor: "#3b82f6",
    secondaryColor: "#10b981",
    accentColor: "#2c16f3ff",
    logoUrl: "public/logo.png",
    faviconUrl: "/favicon.ico",
    footerText: "© 2024 AthloVault. All rights reserved.",
    supportEmail: "support@athlovault.com",
    privacyPolicyUrl: "/privacy",
    termsOfServiceUrl: "/terms",
    aboutUsUrl: "/about",
    contactUrl: "/contact",
    socialTwitter: "https://twitter.com/athlovault",
    socialLinkedin: "https://linkedin.com/company/athlovault",
    socialInstagram: "https://instagram.com/athlovault",
  })

  const handleSave = () => {
    console.log("Saving branding settings:", branding)
    toast({
      title: "Branding Updated",
      description: "Platform branding has been successfully updated",
    })
  }

  const handleFileUpload = (field: string) => {
    // Mock file upload - in real implementation, this would handle file uploads
    console.log(`Uploading file for ${field}`)
    toast({
      title: "File Upload",
      description: `${field} file upload initiated`,
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
            <h1 className="text-3xl font-bold text-white">Platform Branding</h1>
            <p className="text-slate-400">Customize platform appearance and branding elements</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Configure platform name and basic information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platform-name" className="text-slate-300">
                    Platform Name
                  </Label>
                  <Input
                    id="platform-name"
                    value={branding.platformName}
                    onChange={(e) => setBranding({ ...branding, platformName: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="support-email" className="text-slate-300">
                    Support Email
                  </Label>
                  <Input
                    id="support-email"
                    value={branding.supportEmail}
                    onChange={(e) => setBranding({ ...branding, supportEmail: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="tagline" className="text-slate-300">
                  Tagline
                </Label>
                <Input
                  id="tagline"
                  value={branding.tagline}
                  onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label htmlFor="footer-text" className="text-slate-300">
                  Footer Text
                </Label>
                <Textarea
                  id="footer-text"
                  value={branding.footerText}
                  onChange={(e) => setBranding({ ...branding, footerText: e.target.value })}
                  className="bg-slate-800 border-slate-700 text-white"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Color Scheme
              </CardTitle>
              <CardDescription className="text-slate-400">Configure platform colors and theme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="primary-color" className="text-slate-300">
                    Primary Color
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="w-16 h-10 bg-slate-800 border-slate-700"
                    />
                    <Input
                      value={branding.primaryColor}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondary-color" className="text-slate-300">
                    Secondary Color
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={branding.secondaryColor}
                      onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                      className="w-16 h-10 bg-slate-800 border-slate-700"
                    />
                    <Input
                      value={branding.secondaryColor}
                      onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="accent-color" className="text-slate-300">
                    Accent Color
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="accent-color"
                      type="color"
                      value={branding.accentColor}
                      onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                      className="w-16 h-10 bg-slate-800 border-slate-700"
                    />
                    <Input
                      value={branding.accentColor}
                      onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Logo & Assets</CardTitle>
              <CardDescription className="text-slate-400">Upload and manage platform logos and assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Platform Logo</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      value={branding.logoUrl}
                      onChange={(e) => setBranding({ ...branding, logoUrl: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="Logo URL"
                    />
                    <Button
                      variant="outline"
                      onClick={() => handleFileUpload("logo")}
                      className="border-slate-700 text-slate-300 bg-transparent"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-slate-300">Favicon</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input
                      value={branding.faviconUrl}
                      onChange={(e) => setBranding({ ...branding, faviconUrl: e.target.value })}
                      className="bg-slate-800 border-slate-700 text-white"
                      placeholder="Favicon URL"
                    />
                    <Button
                      variant="outline"
                      onClick={() => handleFileUpload("favicon")}
                      className="border-slate-700 text-slate-300 bg-transparent"
                    >
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Legal Links</CardTitle>
              <CardDescription className="text-slate-400">Configure links to legal pages and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="privacy-policy" className="text-slate-300">
                    Privacy Policy URL
                  </Label>
                  <Input
                    id="privacy-policy"
                    value={branding.privacyPolicyUrl}
                    onChange={(e) => setBranding({ ...branding, privacyPolicyUrl: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="terms-of-service" className="text-slate-300">
                    Terms of Service URL
                  </Label>
                  <Input
                    id="terms-of-service"
                    value={branding.termsOfServiceUrl}
                    onChange={(e) => setBranding({ ...branding, termsOfServiceUrl: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="about-us" className="text-slate-300">
                    About Us URL
                  </Label>
                  <Input
                    id="about-us"
                    value={branding.aboutUsUrl}
                    onChange={(e) => setBranding({ ...branding, aboutUsUrl: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="contact" className="text-slate-300">
                    Contact URL
                  </Label>
                  <Input
                    id="contact"
                    value={branding.contactUrl}
                    onChange={(e) => setBranding({ ...branding, contactUrl: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Social Media Links</CardTitle>
              <CardDescription className="text-slate-400">Configure social media presence and links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="twitter" className="text-slate-300">
                    Twitter/X URL
                  </Label>
                  <Input
                    id="twitter"
                    value={branding.socialTwitter}
                    onChange={(e) => setBranding({ ...branding, socialTwitter: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin" className="text-slate-300">
                    LinkedIn URL
                  </Label>
                  <Input
                    id="linkedin"
                    value={branding.socialLinkedin}
                    onChange={(e) => setBranding({ ...branding, socialLinkedin: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="instagram" className="text-slate-300">
                    Instagram URL
                  </Label>
                  <Input
                    id="instagram"
                    value={branding.socialInstagram}
                    onChange={(e) => setBranding({ ...branding, socialInstagram: e.target.value })}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Branding Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
