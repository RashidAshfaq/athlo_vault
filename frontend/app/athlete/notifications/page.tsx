"use client"

import { useState } from "react"
import { AthleteLayout } from "@/components/athlete-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, X, Heart, DollarSign, Trophy, Building, AlertCircle, CheckCircle, Clock } from "lucide-react"

interface Notification {
  id: string
  type: "admin" | "affiliate" | "fan" | "investment" | "achievement"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionRequired?: boolean
  sender?: {
    name: string
    avatar?: string
    organization?: string
  }
  data?: any
}

export default function AthleteNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "admin",
      title: "Profile Verification Required",
      message: "Please complete your profile verification to unlock premium features and increase investor confidence.",
      timestamp: "2024-05-01T10:30:00Z",
      read: false,
      actionRequired: true,
      sender: {
        name: "AthloVault Admin",
        organization: "AthloVault",
      },
    },
    {
      id: "2",
      type: "affiliate",
      title: "Partnership Request from Nike",
      message:
        "Nike is interested in discussing a potential endorsement partnership. They would like to schedule a meeting to discuss terms.",
      timestamp: "2024-05-01T09:15:00Z",
      read: false,
      actionRequired: true,
      sender: {
        name: "Sarah Johnson",
        organization: "Nike Sports Marketing",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "3",
      type: "investment",
      title: "New Investment Received",
      message: "John Smith has invested $2,500 in your career. Your funding goal is now 78% complete!",
      timestamp: "2024-05-01T08:45:00Z",
      read: false,
      sender: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      data: { amount: 2500, investor: "John Smith" },
    },
    {
      id: "4",
      type: "fan",
      title: "AMA Request",
      message: "Your fans are requesting an Ask Me Anything session. You have 150+ questions waiting for responses.",
      timestamp: "2024-04-30T20:30:00Z",
      read: true,
      actionRequired: true,
    },
    {
      id: "5",
      type: "achievement",
      title: "Milestone Reached!",
      message: "Congratulations! You've reached 75% of your funding goal. Keep up the great work!",
      timestamp: "2024-04-30T18:20:00Z",
      read: true,
      data: { milestone: "75% funding goal" },
    },
    {
      id: "6",
      type: "affiliate",
      title: "Sponsorship Opportunity",
      message: "Gatorade is offering a sponsorship deal worth $50,000. Review the terms and respond by May 15th.",
      timestamp: "2024-04-30T16:10:00Z",
      read: true,
      actionRequired: true,
      sender: {
        name: "Mike Rodriguez",
        organization: "Gatorade",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "7",
      type: "fan",
      title: "Fan Engagement Milestone",
      message:
        "You've reached 10,000 followers across all social platforms! Your engagement rate is up 25% this month.",
      timestamp: "2024-04-30T14:00:00Z",
      read: true,
    },
    {
      id: "8",
      type: "admin",
      title: "Monthly Performance Report",
      message: "Your monthly performance report is ready. Review your stats, funding progress, and investor feedback.",
      timestamp: "2024-04-30T12:00:00Z",
      read: true,
      actionRequired: true,
    },
  ])

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const handleApprove = (notificationId: string) => {
    console.log("Approved notification:", notificationId)
    markAsRead(notificationId)
  }

  const handleReject = (notificationId: string) => {
    console.log("Rejected notification:", notificationId)
    markAsRead(notificationId)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "admin":
        return <AlertCircle className="h-5 w-5 text-blue-400" />
      case "affiliate":
        return <Building className="h-5 w-5 text-purple-400" />
      case "fan":
        return <Heart className="h-5 w-5 text-pink-400" />
      case "investment":
        return <DollarSign className="h-5 w-5 text-green-400" />
      case "achievement":
        return <Trophy className="h-5 w-5 text-amber-400" />
      default:
        return <Bell className="h-5 w-5 text-slate-400" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return "1 day ago"
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const actionRequiredCount = notifications.filter((n) => n.actionRequired && !n.read).length
  const adminNotifications = notifications.filter((n) => n.type === "admin")
  const affiliateNotifications = notifications.filter((n) => n.type === "affiliate")
  const fanNotifications = notifications.filter((n) => n.type === "fan")
  const investmentNotifications = notifications.filter((n) => n.type === "investment")

  return (
    <AthleteLayout title="Notifications" description="Stay updated with messages, requests, and achievements">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center">
            <Bell className="h-8 w-8 mr-3" />
            Notifications
            {unreadCount > 0 && <Badge className="ml-3 bg-red-500 text-white">{unreadCount}</Badge>}
          </h1>
          <p className="text-slate-400">Stay updated with messages, requests, and achievements</p>
        </div>
        {unreadCount > 0 && (
          <Button
            onClick={markAllAsRead}
            variant="outline"
            className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Unread</CardTitle>
            <Bell className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{unreadCount}</div>
            <p className="text-xs text-red-400">Require attention</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Action Required</CardTitle>
            <Clock className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{actionRequiredCount}</div>
            <p className="text-xs text-amber-400">Need response</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Partnerships</CardTitle>
            <Building className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{affiliateNotifications.length}</div>
            <p className="text-xs text-purple-400">Opportunities</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Fan Engagement</CardTitle>
            <Heart className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{fanNotifications.length}</div>
            <p className="text-xs text-pink-400">From fans</p>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-slate-900/50 border-slate-800/50">
          <TabsTrigger value="all" className="data-[state=active]:bg-slate-800">
            All ({notifications.length})
          </TabsTrigger>
          <TabsTrigger value="admin" className="data-[state=active]:bg-slate-800">
            Admin ({adminNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="partnerships" className="data-[state=active]:bg-slate-800">
            Partnerships ({affiliateNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="fans" className="data-[state=active]:bg-slate-800">
            Fans ({fanNotifications.length})
          </TabsTrigger>
          <TabsTrigger value="investments" className="data-[state=active]:bg-slate-800">
            Investments ({investmentNotifications.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-200 ${
                !notification.read ? "border-l-4 border-l-amber-500" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {notification.sender?.avatar ? (
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={notification.sender.avatar || "/placeholder.svg"}
                          alt={notification.sender.name}
                        />
                        <AvatarFallback className="bg-slate-800 text-white">
                          {notification.sender.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-white font-medium">{notification.title}</h3>
                          {!notification.read && <div className="w-2 h-2 bg-amber-500 rounded-full"></div>}
                          {notification.actionRequired && (
                            <Badge variant="outline" className="border-amber-500 text-amber-400 text-xs">
                              Action Required
                            </Badge>
                          )}
                        </div>

                        {notification.sender && (
                          <p className="text-slate-400 text-sm mb-1">
                            From: {notification.sender.name}
                            {notification.sender.organization && ` • ${notification.sender.organization}`}
                          </p>
                        )}

                        <p className="text-slate-300 text-sm mb-2">{notification.message}</p>

                        <p className="text-slate-500 text-xs">{formatTimestamp(notification.timestamp)}</p>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            className="text-slate-400 hover:text-white"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>

                    {notification.actionRequired && !notification.read && (
                      <div className="flex space-x-2 mt-3">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(notification.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(notification.id)}
                          className="border-red-600 text-red-400 bg-transparent hover:bg-red-900/20"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Decline
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="admin" className="space-y-4">
          {adminNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-200 ${
                !notification.read ? "border-l-4 border-l-blue-500" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{notification.title}</h3>
                    <p className="text-slate-300 text-sm mb-2">{notification.message}</p>
                    <p className="text-slate-500 text-xs">{formatTimestamp(notification.timestamp)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="partnerships" className="space-y-4">
          {affiliateNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-200 ${
                !notification.read ? "border-l-4 border-l-purple-500" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={notification.sender?.avatar || "/placeholder.svg"}
                      alt={notification.sender?.name}
                    />
                    <AvatarFallback className="bg-slate-800 text-white">
                      {notification.sender?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{notification.title}</h3>
                    <p className="text-slate-400 text-sm mb-1">
                      From: {notification.sender?.name} • {notification.sender?.organization}
                    </p>
                    <p className="text-slate-300 text-sm mb-2">{notification.message}</p>
                    <p className="text-slate-500 text-xs">{formatTimestamp(notification.timestamp)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="fans" className="space-y-4">
          {fanNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-200 ${
                !notification.read ? "border-l-4 border-l-pink-500" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-pink-500/20 rounded-full flex items-center justify-center">
                    <Heart className="h-5 w-5 text-pink-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{notification.title}</h3>
                    <p className="text-slate-300 text-sm mb-2">{notification.message}</p>
                    <p className="text-slate-500 text-xs">{formatTimestamp(notification.timestamp)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="investments" className="space-y-4">
          {investmentNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`bg-slate-900/50 border-slate-800/50 backdrop-blur-sm hover:bg-slate-800/50 transition-all duration-200 ${
                !notification.read ? "border-l-4 border-l-green-500" : ""
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={notification.sender?.avatar || "/placeholder.svg"}
                      alt={notification.sender?.name}
                    />
                    <AvatarFallback className="bg-slate-800 text-white">
                      {notification.sender?.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-1">{notification.title}</h3>
                    <p className="text-slate-300 text-sm mb-2">{notification.message}</p>
                    <p className="text-slate-500 text-xs">{formatTimestamp(notification.timestamp)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {notifications.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Bell className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-white font-medium mb-2">No notifications</h3>
            <p className="text-slate-400">You're all caught up! New notifications will appear here.</p>
          </CardContent>
        </Card>
      )}
    </AthleteLayout>
  )
}
