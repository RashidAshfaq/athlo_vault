import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AthleteCard } from "@/components/athlete-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Users } from "lucide-react"

// Mock data for all athletes
const allAthletes = [
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
    trending: true,
  },
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
    trending: true,
  },
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
    trending: true,
  },
  {
    id: 4,
    name: "Emma Thompson",
    sport: "Swimming",
    position: "Freestyle",
    age: 19,
    image: "/placeholder.svg?height=300&width=300",
    valuation: "$1.2M",
    growth: "+28%",
    followers: "67K",
    stats: { records: 3, medals: 8, competitions: 15 },
    verified: true,
    trending: true,
  },
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
    trending: true,
  },
  {
    id: 6,
    name: "Aisha Patel",
    sport: "Track & Field",
    position: "Sprinter",
    age: 21,
    image: "/placeholder.svg?height=300&width=300",
    valuation: "$1.5M",
    growth: "+35%",
    followers: "95K",
    stats: { pb100m: 10.85, pb200m: 22.15, medals: 6 },
    verified: true,
    trending: true,
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
  {
    id: 8,
    name: "Lisa Park",
    sport: "Golf",
    position: "Professional",
    age: 24,
    image: "/placeholder.svg?height=300&width=300",
    valuation: "$1.9M",
    growth: "+14%",
    followers: "78K",
    stats: { handicap: -2, wins: 5, earnings: 125000 },
    verified: true,
  },
  {
    id: 9,
    name: "Carlos Martinez",
    sport: "Baseball",
    position: "Pitcher",
    age: 23,
    image: "/placeholder.svg?height=300&width=300",
    valuation: "$3.5M",
    growth: "+21%",
    followers: "156K",
    stats: { era: 2.45, strikeouts: 189, wins: 12 },
    verified: true,
  },
]

export default function AthletesPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Users className="h-8 w-8 text-amber-400" />
                <h1 className="text-4xl sm:text-5xl font-bold text-white">Athlete Marketplace</h1>
              </div>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Discover and invest in the next generation of sports superstars
              </p>
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
                  <Input placeholder="Search athletes..." className="pl-10 bg-slate-900 border-slate-700 text-white" />
                </div>
                <Select>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="All Sports" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Sports</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="football">Football</SelectItem>
                    <SelectItem value="soccer">Soccer</SelectItem>
                    <SelectItem value="tennis">Tennis</SelectItem>
                    <SelectItem value="swimming">Swimming</SelectItem>
                    <SelectItem value="track-field">Track & Field</SelectItem>
                    <SelectItem value="baseball">Baseball</SelectItem>
                    <SelectItem value="golf">Golf</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="trending">Most Trending</SelectItem>
                    <SelectItem value="valuation">Highest Valuation</SelectItem>
                    <SelectItem value="growth">Highest Growth</SelectItem>
                    <SelectItem value="followers">Most Followers</SelectItem>
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
              {allAthletes.map((athlete) => (
                <AthleteCard key={athlete.id} athlete={athlete} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8">
                Load More Athletes
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
