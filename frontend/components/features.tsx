"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Shield, Users, Zap, Globe, BarChart3 } from "lucide-react"
import Link from "next/link"

const sports = [
  {
    name: "Football",
    description: "Invest in rising quarterbacks, running backs, and defensive stars",
    athletes: 45,
    avgReturn: "18.5%",
    image: "/placeholder.svg?height=200&width=300&text=Football",
  },
  {
    name: "Basketball",
    description: "Support future NBA stars and college standouts",
    athletes: 38,
    avgReturn: "22.1%",
    image: "/placeholder.svg?height=200&width=300&text=Basketball",
  },
  {
    name: "Baseball",
    description: "Back promising pitchers and power hitters",
    athletes: 29,
    avgReturn: "15.7%",
    image: "/placeholder.svg?height=200&width=300&text=Baseball",
  },
  {
    name: "Tennis",
    description: "Invest in the next generation of tennis champions",
    athletes: 22,
    avgReturn: "24.3%",
    image: "/placeholder.svg?height=200&width=300&text=Tennis",
  },
  {
    name: "Golf",
    description: "Support rising golf professionals and amateurs",
    athletes: 18,
    avgReturn: "19.8%",
    image: "/placeholder.svg?height=200&width=300&text=Golf",
  },
  {
    name: "Swimming",
    description: "Back Olympic hopefuls and record breakers",
    athletes: 15,
    avgReturn: "16.9%",
    image: "/placeholder.svg?height=200&width=300&text=Swimming",
  },
]

const features = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description:
      "All investments secured through smart contracts on the blockchain, ensuring transparency and automatic execution of terms.",
  },
  {
    icon: TrendingUp,
    title: "Performance Tracking",
    description:
      "Real-time analytics and performance metrics help you make informed investment decisions based on data.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a community of sports fans and investors supporting the next generation of athletic talent.",
  },
  {
    icon: Zap,
    title: "Instant Transactions",
    description: "Fast, secure transactions powered by blockchain technology with minimal fees and maximum efficiency.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Invest in athletes from around the world, breaking down geographical barriers in sports investment.",
  },
  {
    icon: BarChart3,
    title: "Portfolio Management",
    description:
      "Advanced tools to track your investments, returns, and portfolio performance across multiple athletes.",
  },
]

export function Features() {
  return (
    <section className="py-20 section-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Platform Features */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              AthloVault?
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            The most advanced platform for athlete investment, powered by blockchain technology and data-driven insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Sports Categories */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Invest By
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Sports
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover investment opportunities across major sports and find athletes that match your interests
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sports.map((sport, index) => (
            <Card
              key={index}
              className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 group"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={sport.image || "/placeholder.svg"}
                    alt={sport.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-xl mb-1">{sport.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-400 mb-4">{sport.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-slate-400 text-sm">Athletes</span>
                      <p className="text-white font-semibold">{sport.athletes}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Avg Return</span>
                      <p className="text-green-400 font-semibold">{sport.avgReturn}</p>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold" asChild>
                    <Link href={`/sports/${sport.name.toLowerCase()}`}>View Athletes</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3" asChild>
            <Link href="/sports">Explore All Sports</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
