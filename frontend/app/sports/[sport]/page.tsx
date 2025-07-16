import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AthleteCard } from "@/components/athlete-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { notFound } from "next/navigation"

const sportsData = {
  football: {
    name: "Football",
    icon: "🏈",
    description: "Invest in the next generation of football superstars",
    athletes: [
      {
        id: 5,
        name: "James Wilson",
        sport: "Football",
        position: "Quarterback",
        age: 23,
        image: "/placeholder.svg?height=300&width=300",
        valuation: "$4.1M",
        growth: "+12%",
        followers: "310K",
        stats: { yards: 3200, touchdowns: 28, completion: 68.5 },
        verified: true,
      },
      {
        id: 7,
        name: "Michael Davis",
        sport: "Football",
        position: "Running Back",
        age: 22,
        image: "/placeholder.svg?height=300&width=300",
        valuation: "$2.8M",
        growth: "+19%",
        followers: "185K",
        stats: { yards: 1850, touchdowns: 15, average: 5.2 },
        verified: true,
      },
    ],
  },
  basketball: {
    name: "Basketball",
    icon: "🏀",
    description: "Discover rising basketball talent from around the globe",
    athletes: [
      {
        id: 1,
        name: "Marcus Johnson",
        sport: "Basketball",
        position: "Point Guard",
        age: 22,
        image: "/placeholder.svg?height=300&width=300",
        valuation: "$2.5M",
        growth: "+15%",
        followers: "125K",
        stats: { points: 24.5, assists: 8.2, rebounds: 5.1 },
        verified: true,
      },
    ],
  },
  soccer: {
    name: "Soccer",
    icon: "⚽",
    description: "Invest in the beautiful game's future stars",
    athletes: [
      {
        id: 3,
        name: "Diego Rodriguez",
        sport: "Soccer",
        position: "Forward",
        age: 21,
        image: "/placeholder.svg?height=300&width=300",
        valuation: "$3.2M",
        growth: "+18%",
        followers: "200K",
        stats: { goals: 18, assists: 12, matches: 25 },
        verified: true,
      },
    ],
  },
  tennis: {
    name: "Tennis",
    icon: "🎾",
    description: "Back the next tennis champions",
    athletes: [
      {
        id: 2,
        name: "Sarah Chen",
        sport: "Tennis",
        position: "Singles",
        age: 20,
        image: "/placeholder.svg?height=300&width=300",
        valuation: "$1.8M",
        growth: "+22%",
        followers: "89K",
        stats: { ranking: 45, wins: 28, tournaments: 12 },
        verified: true,
      },
    ],
  },
}

export default function SportPage({ params }: { params: { sport: string } }) {
  const sportData = sportsData[params.sport as keyof typeof sportsData]

  if (!sportData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-6xl mb-4">{sportData.icon}</div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">{sportData.name} Athletes</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">{sportData.description}</p>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-8 bg-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    placeholder={`Search ${sportData.name.toLowerCase()} athletes...`}
                    className="pl-10 bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Position" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Positions</SelectItem>
                    {params.sport === "football" && (
                      <>
                        <SelectItem value="quarterback">Quarterback</SelectItem>
                        <SelectItem value="running-back">Running Back</SelectItem>
                        <SelectItem value="wide-receiver">Wide Receiver</SelectItem>
                      </>
                    )}
                    {params.sport === "basketball" && (
                      <>
                        <SelectItem value="point-guard">Point Guard</SelectItem>
                        <SelectItem value="shooting-guard">Shooting Guard</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="valuation">Highest Valuation</SelectItem>
                    <SelectItem value="growth">Highest Growth</SelectItem>
                    <SelectItem value="followers">Most Followers</SelectItem>
                    <SelectItem value="age">Youngest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" className="border-slate-700 text-slate-300 hover:text-white bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </section>

        {/* Athletes Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sportData.athletes.map((athlete) => (
                <AthleteCard key={athlete.id} athlete={athlete} />
              ))}
            </div>

            {sportData.athletes.length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No athletes found</h3>
                <p className="text-slate-400">Check back soon for new {sportData.name.toLowerCase()} talent!</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
