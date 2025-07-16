import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AthleteCard } from "@/components/athlete-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Trophy } from "lucide-react"

// Mock data for track & field athletes
const trackFieldAthletes = [
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
    id: 15,
    name: "Michael Johnson Jr",
    sport: "Track & Field",
    position: "Distance Runner",
    age: 22,
    image: "/placeholder.svg?height=300&width=300",
    valuation: "$1.3M",
    growth: "+24%",
    followers: "71K",
    stats: { pb5k: "13:45", pb10k: "28:30", marathonPB: "2:15:30" },
    verified: true,
    trending: true,
  },
  {
    id: 16,
    name: "Lisa Thompson",
    sport: "Track & Field",
    position: "High Jumper",
    age: 20,
    image: "/placeholder.svg?height=300&width=300",
    valuation: "$1.1M",
    growth: "+32%",
    followers: "58K",
    stats: { personalBest: "1.95m", competitions: 14, medals: 8 },
    verified: true,
    trending: false,
  },
]

export default function TrackFieldPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Trophy className="h-8 w-8 text-amber-400" />
                <h1 className="text-4xl sm:text-5xl font-bold text-white">Track & Field Athletes</h1>
              </div>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Invest in Olympic hopefuls and world record breakers in track and field
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
                  <Input
                    placeholder="Search track & field athletes..."
                    className="pl-10 bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="All Events" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="sprints">Sprints</SelectItem>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="jumps">Jumps</SelectItem>
                    <SelectItem value="throws">Throws</SelectItem>
                    <SelectItem value="hurdles">Hurdles</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="records">Personal Bests</SelectItem>
                    <SelectItem value="trending">Most Trending</SelectItem>
                    <SelectItem value="valuation">Highest Valuation</SelectItem>
                    <SelectItem value="growth">Highest Growth</SelectItem>
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
              {trackFieldAthletes.map((athlete) => (
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
