import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageCircle, Calendar, Trophy, TrendingUp, Heart } from "lucide-react"

export default function CommunityPage() {
  const communityStats = [
    { label: "Active Members", value: "25,000+", icon: Users },
    { label: "Daily Discussions", value: "500+", icon: MessageCircle },
    { label: "Events This Month", value: "12", icon: Calendar },
    { label: "Success Stories", value: "150+", icon: Trophy },
  ]

  const featuredGroups = [
    {
      name: "Basketball Investors",
      members: 5420,
      description: "Discuss basketball investment opportunities and share insights",
      image: "🏀",
      activity: "Very Active",
    },
    {
      name: "Football Analytics",
      members: 3890,
      description: "Deep dive into football statistics and player analysis",
      image: "🏈",
      activity: "Active",
    },
    {
      name: "Emerging Sports",
      members: 2150,
      description: "Explore investment opportunities in growing sports",
      image: "🥍",
      activity: "Growing",
    },
    {
      name: "Women's Sports",
      members: 4200,
      description: "Supporting and investing in women's athletics",
      image: "⚽",
      activity: "Very Active",
    },
  ]

  const recentDiscussions = [
    {
      title: "Marcus Johnson's performance analysis - Worth the investment?",
      author: "InvestorMike",
      replies: 23,
      likes: 45,
      time: "2 hours ago",
      category: "Basketball",
    },
    {
      title: "New NCAA rule changes - Impact on athlete valuations",
      author: "SportsLawyer",
      replies: 18,
      likes: 32,
      time: "4 hours ago",
      category: "General",
    },
    {
      title: "Tennis season predictions and investment strategies",
      author: "TennisExpert",
      replies: 15,
      likes: 28,
      time: "6 hours ago",
      category: "Tennis",
    },
    {
      title: "Success story: My 300% return on soccer investments",
      author: "SoccerFan2023",
      replies: 41,
      likes: 89,
      time: "8 hours ago",
      category: "Soccer",
    },
  ]

  const upcomingEvents = [
    {
      title: "Virtual Investor Meetup",
      date: "Jan 25, 2024",
      time: "7:00 PM EST",
      attendees: 150,
      type: "Virtual",
    },
    {
      title: "Basketball Analytics Workshop",
      date: "Jan 28, 2024",
      time: "2:00 PM EST",
      attendees: 75,
      type: "Workshop",
    },
    {
      title: "Q&A with Top Athletes",
      date: "Feb 2, 2024",
      time: "6:00 PM EST",
      attendees: 300,
      type: "Live Event",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">Community</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                Connect with fellow investors, share insights, and learn from the AthloVault community
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                  Join the Discussion
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white bg-transparent">
                  Browse Groups
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-amber-400" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Groups */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Featured Groups</h2>
              <p className="text-xl text-slate-300">Join specialized communities based on your interests</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredGroups.map((group, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">{group.image}</div>
                    <h3 className="text-white font-semibold mb-2">{group.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{group.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-slate-300 text-sm">{group.members.toLocaleString()} members</span>
                      <Badge
                        className={
                          group.activity === "Very Active"
                            ? "bg-green-500 text-white"
                            : group.activity === "Active"
                              ? "bg-amber-500 text-slate-900"
                              : "bg-blue-500 text-white"
                        }
                      >
                        {group.activity}
                      </Badge>
                    </div>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                      Join Group
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Discussions */}
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Recent Discussions</h2>
              <p className="text-xl text-slate-300">Join the latest conversations in our community</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {recentDiscussions.map((discussion, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge className="bg-amber-500 text-slate-900 text-xs">{discussion.category}</Badge>
                          <span className="text-slate-400 text-sm">by {discussion.author}</span>
                          <span className="text-slate-500 text-sm">•</span>
                          <span className="text-slate-400 text-sm">{discussion.time}</span>
                        </div>
                        <h3 className="text-white font-semibold mb-3 hover:text-amber-400 transition-colors cursor-pointer">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-4 w-4" />
                            <span>{discussion.likes} likes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white bg-transparent">
                View All Discussions
              </Button>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Upcoming Events</h2>
              <p className="text-xl text-slate-300">Don't miss these community events and workshops</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-500 text-white">{event.type}</Badge>
                      <div className="flex items-center text-slate-400 text-sm">
                        <Users className="h-4 w-4 mr-1" />
                        {event.attendees}
                      </div>
                    </div>
                    <CardTitle className="text-white">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-slate-300">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-slate-300">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                    </div>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                      Register
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Our Community?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Connect with thousands of investors and athletes sharing insights, strategies, and success stories
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8">
                Create Account
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white bg-transparent">
                Browse as Guest
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
