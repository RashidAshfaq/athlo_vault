"use client"

import { useState } from "react"
import { AthleteLayout } from "@/components/athlete-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingCart,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Eye,
  FileText,
  Calendar,
  User,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function AthletePurchaseRequest() {
  const [newRequest, setNewRequest] = useState({
    category: "",
    item: "",
    amount: "",
    vendor: "",
    description: "",
    urgency: "",
    justification: "",
  })

  const [requests, setRequests] = useState([
    {
      id: "PR-001",
      item: "Professional Training Equipment",
      category: "Training",
      amount: 2500,
      vendor: "Elite Sports Equipment Co.",
      status: "approved",
      submittedDate: "2024-04-10",
      reviewedDate: "2024-04-12",
      description: "High-performance training equipment for strength and conditioning",
      adminNotes: "Approved - Essential for career development",
      urgency: "medium",
      justification: "This equipment will help improve my performance metrics by 15-20%",
    },
    {
      id: "PR-002",
      item: "Sports Nutrition Supplements",
      category: "Health & Nutrition",
      amount: 800,
      vendor: "Peak Performance Nutrition",
      status: "pending",
      submittedDate: "2024-04-15",
      reviewedDate: null,
      description: "Monthly supply of approved sports nutrition supplements",
      adminNotes: null,
      urgency: "low",
      justification: "Required for maintaining optimal nutrition during training season",
    },
    {
      id: "PR-003",
      item: "Travel to Training Camp",
      category: "Travel",
      amount: 1200,
      vendor: "Elite Basketball Academy",
      status: "rejected",
      submittedDate: "2024-04-08",
      reviewedDate: "2024-04-09",
      description: "Travel expenses for specialized training camp",
      adminNotes: "Rejected - Similar training available locally",
      urgency: "high",
      justification: "This camp offers specialized training not available in my area",
    },
    {
      id: "PR-004",
      item: "Mental Performance Coaching",
      category: "Coaching",
      amount: 1500,
      vendor: "MindSport Psychology",
      status: "under_review",
      submittedDate: "2024-04-14",
      reviewedDate: null,
      description: "6-month mental performance coaching program",
      adminNotes: null,
      urgency: "medium",
      justification: "Mental coaching is crucial for peak performance in competitive sports",
    },
  ])

  const handleInputChange = (field: string, value: string) => {
    setNewRequest((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitRequest = () => {
    if (
      !newRequest.category ||
      !newRequest.item ||
      !newRequest.amount ||
      !newRequest.vendor ||
      !newRequest.justification
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const request = {
      id: `PR-${String(requests.length + 1).padStart(3, "0")}`,
      item: newRequest.item,
      category: newRequest.category,
      amount: Number.parseFloat(newRequest.amount),
      vendor: newRequest.vendor,
      status: "pending",
      submittedDate: new Date().toISOString().split("T")[0],
      reviewedDate: null,
      description: newRequest.description,
      adminNotes: null,
      urgency: newRequest.urgency,
      justification: newRequest.justification,
    }

    // Add to local state
    setRequests((prev) => [request, ...prev])

    // Store in localStorage for admin to access
    const existingAdminRequests = JSON.parse(localStorage.getItem("adminPurchaseRequests") || "[]")
    const adminRequest = {
      ...request,
      athleteName: "Current Athlete", // In real app, this would come from user context
      athleteId: "athlete-1",
      type: "purchase_request",
      submittedBy: "athlete",
    }
    existingAdminRequests.push(adminRequest)
    localStorage.setItem("adminPurchaseRequests", JSON.stringify(existingAdminRequests))

    // Reset form
    setNewRequest({
      category: "",
      item: "",
      amount: "",
      vendor: "",
      description: "",
      urgency: "",
      justification: "",
    })

    toast({
      title: "Request Submitted",
      description: "Your purchase request has been sent to admin for review",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "under_review":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Eye className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Medium</Badge>
      case "low":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Low</Badge>
      default:
        return <Badge variant="outline">-</Badge>
    }
  }

  const totalRequested = requests.reduce((sum, req) => sum + req.amount, 0)
  const approvedAmount = requests.filter((req) => req.status === "approved").reduce((sum, req) => sum + req.amount, 0)
  const pendingAmount = requests
    .filter((req) => req.status === "pending" || req.status === "under_review")
    .reduce((sum, req) => sum + req.amount, 0)

  return (
    <AthleteLayout title="Purchase Requests" description="Request purchases from your investment funds">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Purchase Requests</h1>
          <p className="text-slate-400">Request purchases from your investment funds</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Requested</p>
                <p className="text-2xl font-bold text-white">${totalRequested.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Approved</p>
                <p className="text-2xl font-bold text-green-400">${approvedAmount.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Pending Review</p>
                <p className="text-2xl font-bold text-amber-400">${pendingAmount.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="new-request" className="space-y-6">
        <TabsList className="bg-slate-900/50 border-slate-800/50">
          <TabsTrigger value="new-request" className="data-[state=active]:bg-slate-800">
            New Request
          </TabsTrigger>
          <TabsTrigger value="my-requests" className="data-[state=active]:bg-slate-800">
            My Requests
          </TabsTrigger>
        </TabsList>

        <TabsContent value="new-request" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Submit New Purchase Request
              </CardTitle>
              <CardDescription className="text-slate-400">
                Request approval for purchases related to your athletic career development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-slate-300">
                    Category <span className="text-red-400">*</span>
                  </Label>
                  <Select value={newRequest.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="Training">Training & Equipment</SelectItem>
                      <SelectItem value="Coaching">Coaching & Instruction</SelectItem>
                      <SelectItem value="Health & Nutrition">Health & Nutrition</SelectItem>
                      <SelectItem value="Travel">Travel & Accommodation</SelectItem>
                      <SelectItem value="Medical">Medical & Recovery</SelectItem>
                      <SelectItem value="Education">Education & Development</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-slate-300">
                    Amount ($) <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newRequest.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="item" className="text-slate-300">
                  Item/Service Description <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="item"
                  value={newRequest.item}
                  onChange={(e) => handleInputChange("item", e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white"
                  placeholder="Brief description of what you're requesting"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vendor" className="text-slate-300">
                  Vendor/Provider <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="vendor"
                  value={newRequest.vendor}
                  onChange={(e) => handleInputChange("vendor", e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white"
                  placeholder="Company or individual providing the service/product"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-slate-300">
                  Detailed Description
                </Label>
                <Textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white min-h-[100px]"
                  placeholder="Provide detailed information about the purchase request..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="justification" className="text-slate-300">
                  Career Development Justification <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="justification"
                  value={newRequest.justification}
                  onChange={(e) => handleInputChange("justification", e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white min-h-[100px]"
                  placeholder="Explain how this purchase will contribute to your athletic career development..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency" className="text-slate-300">
                  Urgency Level <span className="text-red-400">*</span>
                </Label>
                <Select value={newRequest.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Select urgency level" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="low">Low - Can wait 2+ weeks</SelectItem>
                    <SelectItem value="medium">Medium - Needed within 1-2 weeks</SelectItem>
                    <SelectItem value="high">High - Needed within a few days</SelectItem>
                    <SelectItem value="urgent">Urgent - Needed immediately</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-blue-400 font-semibold mb-1">Review Process</h3>
                    <p className="text-slate-300 text-sm">
                      All purchase requests are reviewed by AthloVault administrators within 24-48 hours. Requests must
                      be directly related to your athletic career development and training. You will receive a
                      notification once your request has been reviewed.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleSubmitRequest}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                disabled={
                  !newRequest.category ||
                  !newRequest.item ||
                  !newRequest.amount ||
                  !newRequest.vendor ||
                  !newRequest.justification ||
                  !newRequest.urgency
                }
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Submit Purchase Request
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-requests" className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                My Purchase Requests
              </CardTitle>
              <CardDescription className="text-slate-400">
                Track the status of your submitted purchase requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.map((request, index) => (
                  <div key={index} className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-semibold">{request.item}</h3>
                          {getStatusBadge(request.status)}
                          {getUrgencyBadge(request.urgency)}
                        </div>
                        <p className="text-slate-400 text-sm mb-2">{request.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-400 mb-2">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            Submitted: {request.submittedDate}
                          </span>
                          <span className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {request.vendor}
                          </span>
                        </div>
                        {request.justification && (
                          <div className="mt-2">
                            <p className="text-slate-500 text-xs mb-1">Justification:</p>
                            <p className="text-slate-300 text-sm">{request.justification}</p>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">${request.amount.toLocaleString()}</div>
                        <div className="text-slate-400 text-sm">{request.category}</div>
                      </div>
                    </div>

                    {request.adminNotes && (
                      <div
                        className={`p-3 rounded-lg border ${
                          request.status === "approved"
                            ? "bg-green-500/10 border-green-500/20"
                            : "bg-red-500/10 border-red-500/20"
                        }`}
                      >
                        <p className={`text-sm ${request.status === "approved" ? "text-green-300" : "text-red-300"}`}>
                          <strong>Admin Notes:</strong> {request.adminNotes}
                        </p>
                        {request.reviewedDate && (
                          <p className="text-slate-400 text-xs mt-1">Reviewed on: {request.reviewedDate}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AthleteLayout>
  )
}
