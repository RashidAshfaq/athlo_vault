import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SportsPage() {
  const sportsCategories = [
    {
      name: "Football",
      slug: "football",
      icon: "🏈",
      description: "Invest in the next generation of football superstars",
      athleteCount: 45,
      totalInvested: "$12.5M",
      avgReturn: "18%",
    },
    {
      name: "Basketball",
      slug: "basketball",
      icon: "🏀",
      description: "Discover rising basketball talent from around the globe",
      athleteCount: 38,
      totalInvested: "$8.2M",
      avgReturn: "22%",
    },
    {
      name: "Soccer",
      slug: "soccer",
      icon: "⚽",
      description: "Invest in the beautiful game's future stars",
      athleteCount: 52,
      totalInvested: "$15.1M",
      avgReturn: "16%",
    },
    {
      name: "Tennis",
      slug: "tennis",
      icon: "🎾",
      description: "Back the next tennis champions",
      athleteCount: 29,
      totalInvested: "$6.8M",
      avgReturn: "20%",
    },
    {
      name: "Baseball",
      slug: "baseball",
      icon: "⚾",
      description: "Support America's pastime rising stars",
      athleteCount: 34,
      totalInvested: "$9.3M",
      avgReturn: "15%",
    },
    {
      name: "Golf",
      slug: "golf",
      icon: "⛳",
      description: "Invest in the future of professional golf",
      athleteCount: 22,
      totalInvested: "$4.7M",
      avgReturn: "19%",
    },
    {
      name: "Track & Field",
      slug: "track-field",
      icon: "🏃",
      description: "Back Olympic hopefuls and track stars",
      athleteCount: 41,
      totalInvested: "$7.9M",
      avgReturn: "24%",
    },
    {
      name: "Swimming",
      slug: "swimming",
      icon: "🏊",
      description: "Support aquatic athletes on their journey",
      athleteCount: 26,
      totalInvested: "$5.4M",
      avgReturn: "21%",
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
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">Sports Categories</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Explore investment opportunities across different sports and find the perfect athletes to back
              </p>
            </div>
          </div>
        </section>

        {/* Sports Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sportsCategories.map((sport) => (
                <Card
                  key={sport.slug}
                  className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{sport.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{sport.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{sport.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Athletes:</span>
                        <span className="text-white font-semibold">{sport.athleteCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Total Invested:</span>
                        <span className="text-white font-semibold">{sport.totalInvested}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Avg Return:</span>
                        <span className="text-green-400 font-semibold">{sport.avgReturn}</span>
                      </div>
                    </div>

                    <Link href={`/sports/${sport.slug}`}>
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold group-hover:scale-105 transition-transform">
                        Explore {sport.name}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
