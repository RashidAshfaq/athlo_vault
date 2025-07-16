import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AthleteCard } from "@/components/athlete-card"
import { getTrendingAthletes } from "@/lib/athlete-data"

export default function TrendingAthletesPage() {
  const trendingAthletes = getTrendingAthletes()

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />

      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Trending Athletes</h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover the most promising athletes gaining momentum in their sports. These rising stars are attracting
              significant investor interest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingAthletes.map((athlete) => (
              <AthleteCard key={athlete.id} athlete={athlete} />
            ))}
          </div>

          {trendingAthletes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No trending athletes found at the moment.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
