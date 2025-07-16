import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AthleteCard } from "@/components/athlete-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Trophy } from "lucide-react"

// Mock data for tennis athletes
const tennisAthletes = [
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
    id: 10,
    name: "Maria Gonzalez",
    sport: "Tennis",
    position: "Singles",
    age: 19,
    image: "/placeholder.svg?height=300&width=300",
    valuation: "$1.4M",
    growth: "+30%",
    followers: "67K",
    stats: { ranking: 78, wins: 22, tournaments: 8 },
    verified: true,
    trending: true,
  },
  {
    id: 11,
    name: "Alex Petrov",
    sport: "Tennis",
    position: "Singles",
    age: 21,
    image: "/placeholder.svg?height=300&width=300",
    valuation: "$1.7M",
    growth: "+16%",
    followers: "73K",
    stats: { ranking: 52, wins: 25, tournaments: 10 },
    verified: true,
    trending: false,
  },
]

export default function TennisPage() {
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
                <h1 className="text-4xl sm:text-5xl font-bold text-white">Tennis Athletes</h1>
              </div>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Invest in the future champions of tennis and be part of their Grand Slam journey
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
                    placeholder="Search tennis players..."
                    className="pl-10 bg-slate-900 border-slate-700 text-white"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="singles">Singles</SelectItem>
                    <SelectItem value="doubles">Doubles</SelectItem>
                    <SelectItem value="mixed">Mixed Doubles</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="ranking">Best Ranking</SelectItem>
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
              {tennisAthletes.map((athlete) => (
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
