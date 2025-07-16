"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Star, MessageCircle, Share2, Bell, Trophy, Users } from "lucide-react"
import { athletes } from "@/lib/athlete-data"

interface User {
  email: string
  firstName?: string
  lastName?: string
  userType: string
  isAuthenticated: boolean
}

export default function FanDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [fanStats, setFanStats] = useState({
    followingCount: 12,
    favoriteSport: "Basketball",
    totalInteractions: 156,
    badgesEarned: 8,
  })

  // Mock following data
  const followingAthletes = athletes.slice(0, 6)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth/signin")
      return
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.userType !== "fan") {
      router.push("/auth/signin")
      return
    }

    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Fan Dashboard</h1>
            <p className="text-slate-400">Welcome back, {user.firstName || "Fan"}</p>
          </div>
          <div className="flex space-x-4">
            <Link href="/athletes">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900">
                <Users className="h-4 w-4 mr-2" />
                Discover Athletes
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
              Logout
            </Button>
          </div>
        </div>

        {/* Fan Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Following</CardTitle>
              <Heart className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{fanStats.followingCount}</div>
              <p className="text-xs text-slate-400">Athletes you follow</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Favorite Sport</CardTitle>
              <Star className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{fanStats.favoriteSport}</div>
              <p className="text-xs text-slate-400">Most followed sport</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Interactions</CardTitle>
              <MessageCircle className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{fanStats.totalInteractions}</div>
              <p className="text-xs text-green-400">+23 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Badges Earned</CardTitle>
              <Trophy className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{fanStats.badgesEarned}</div>
              <p className="text-xs text-slate-400">Fan achievements</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="following" className="space-y-6">
          <TabsList className="bg-slate-900 border-slate-800">
            <TabsTrigger value="following" className="data-[state=active]:bg-slate-800">
              Following
            </TabsTrigger>
            <TabsTrigger value="feed" className="data-[state=active]:bg-slate-800">
              Activity Feed
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-slate-800">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-slate-800">
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="following" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Athletes You Follow</CardTitle>
                <CardDescription className="text-slate-400">Stay updated with your favorite athletes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {followingAthletes.map((athlete) => (
                    <div key={athlete.id} className="bg-slate-800 rounded-lg p-4">
                      <img
                        src={athlete.image || "/placeholder.svg"}
                        alt={athlete.name}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="text-white font-semibold">{athlete.name}</h3>
                      <p className="text-slate-400 text-sm capitalize mb-2">{athlete.sport}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="border-green-600 text-green-400">
                          Following
                        </Badge>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                            <Bell className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Link href={`/athletes/${athlete.id}`}>
                        <Button className="w-full mt-3 bg-transparent" variant="outline" size="sm">
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feed" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Activity Feed</CardTitle>
                <CardDescription className="text-slate-400">Latest updates from athletes you follow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      athlete: "Marcus Johnson",
                      action: "scored 3 touchdowns in championship game",
                      time: "2 hours ago",
                      type: "achievement",
                    },
                    {
                      athlete: "Jordan Chen",
                      action: "reached 80% of funding goal",
                      time: "5 hours ago",
                      type: "funding",
                    },
                    {
                      athlete: "Sofia Martinez",
                      action: "shared training highlights",
                      time: "1 day ago",
                      type: "update",
                    },
                    {
                      athlete: "Emma Wilson",
                      action: "won junior tournament",
                      time: "2 days ago",
                      type: "achievement",
                    },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 bg-slate-800 rounded-lg">
                      <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center">
                        {activity.type === "achievement" && <Trophy className="h-5 w-5 text-amber-400" />}
                        {activity.type === "funding" && <Star className="h-5 w-5 text-green-400" />}
                        {activity.type === "update" && <MessageCircle className="h-5 w-5 text-blue-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-white">
                          <span className="font-semibold">{activity.athlete}</span> {activity.action}
                        </p>
                        <p className="text-slate-400 text-sm">{activity.time}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Your Fan Achievements</CardTitle>
                <CardDescription className="text-slate-400">Badges and milestones you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Early Supporter",
                      description: "Followed 5 athletes before they reached their goals",
                      earned: true,
                    },
                    {
                      name: "Sports Enthusiast",
                      description: "Follow athletes from 3+ different sports",
                      earned: true,
                    },
                    { name: "Community Builder", description: "Made 50+ interactions", earned: true },
                    { name: "Trend Spotter", description: "Followed 3 trending athletes", earned: true },
                    { name: "Loyal Fan", description: "Follow athletes for 6+ months", earned: false },
                    { name: "Super Fan", description: "Follow 20+ athletes", earned: false },
                  ].map((badge, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${badge.earned ? "bg-slate-800 border-amber-500" : "bg-slate-800/50 border-slate-700"}`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <Trophy className={`h-6 w-6 ${badge.earned ? "text-amber-400" : "text-slate-600"}`} />
                        <h3 className={`font-semibold ${badge.earned ? "text-white" : "text-slate-500"}`}>
                          {badge.name}
                        </h3>
                      </div>
                      <p className={`text-sm ${badge.earned ? "text-slate-300" : "text-slate-600"}`}>
                        {badge.description}
                      </p>
                      {badge.earned && <Badge className="mt-2 bg-amber-500 text-slate-900">Earned</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">Fan Community</CardTitle>
                <CardDescription className="text-slate-400">
                  Connect with other fans and discuss your favorite athletes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Marcus Johnson Fan Club",
                      members: 1247,
                      lastActivity: "2 hours ago",
                      description: "Discuss the rising football star",
                    },
                    {
                      title: "Basketball Prospects 2024",
                      members: 892,
                      lastActivity: "4 hours ago",
                      description: "Talk about upcoming basketball talent",
                    },
                    {
                      title: "Tennis Rising Stars",
                      members: 634,
                      lastActivity: "1 day ago",
                      description: "Follow the next generation of tennis players",
                    },
                  ].map((group, index) => (
                    <div key={index} className="p-4 bg-slate-800 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-white font-semibold">{group.title}</h3>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {group.members} members
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-sm mb-3">{group.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-sm">Last activity: {group.lastActivity}</span>
                        <Button size="sm" variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
                          Join Discussion
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
