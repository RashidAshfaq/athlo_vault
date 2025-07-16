import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Shield, Users, Globe, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Pioneering the future of sports finance through cutting-edge technology and blockchain innovation.",
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Building a secure, transparent platform where athletes and investors can connect with confidence.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Creating a global community that supports athletic talent and democratizes sports investment.",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making sports investment accessible to everyone, regardless of location or background.",
    },
  ]

  const stats = [
    { label: "Athletes Funded", value: "500+", icon: Users },
    { label: "Total Investment", value: "$25M+", icon: TrendingUp },
    { label: "Countries", value: "50+", icon: Globe },
    { label: "Success Rate", value: "94%", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
                About{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                  AthloVault
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                We're revolutionizing sports finance by connecting emerging athletes with investors through blockchain
                technology, creating opportunities for both talent and capital to thrive.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                  At AthloVault, we believe that exceptional athletic talent shouldn't be limited by financial barriers.
                  Our platform democratizes sports investment, allowing anyone to support the next generation of
                  champions while creating new opportunities for athletes to fund their dreams.
                </p>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  Through innovative blockchain technology and AI-powered analytics, we're building the most
                  transparent, secure, and efficient marketplace for athlete investment in the world.
                </p>
                <Link href="/team">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                    Meet Our Team
                  </Button>
                </Link>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-400/20 to-blue-600/20 rounded-2xl p-8">
                  <img
                    src="/placeholder.svg?height=400&width=500"
                    alt="AthloVault Mission"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Impact</h2>
              <p className="text-xl text-slate-300">Making a difference in the world of sports finance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 text-center">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-8 w-8 text-slate-900" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-slate-400">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Values</h2>
              <p className="text-xl text-slate-300">The principles that guide everything we do</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="bg-slate-900/50 border-slate-700">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <value.icon className="h-6 w-6 text-slate-900" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                        <p className="text-slate-300 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of investors and athletes who are already part of the AthloVault community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/investor/onboarding">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-semibold"
                >
                  Start Investing
                </Button>
              </Link>
              <Link href="/athlete/onboarding">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-900 px-8 py-4 text-lg font-semibold"
                >
                  Get Funded
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
