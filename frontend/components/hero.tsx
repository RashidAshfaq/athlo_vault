"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, TrendingUp, Users, Shield } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.1),transparent_50%)]" />

      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Logo */}
        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
          Invest in Tomorrow's
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
            Champions — Today
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          The first platform to democratize athlete investment through blockchain technology. Support rising stars and
          share in their success.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            asChild
          >
            <Link href="/athletes">
              Start Investing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 bg-transparent backdrop-blur-sm px-8 py-4 text-lg rounded-xl transition-all duration-300"
            asChild
          >
            <Link href="/how-it-works">
              <Play className="mr-2 h-5 w-5" />
              How It Works
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">Trusted By</div>
            <div className="text-slate-300">Early Supporters</div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">Rapidly Growing</div>
            <div className="text-slate-300">Athlete Pipeline</div>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-slate-300">Secure & Transparent</div>
          </div>
        </div>
      </div>
    </section>
  )
}
