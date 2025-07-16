import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Mail } from "lucide-react"

export default function TeamPage() {
  const leadership = [
    {
      name: "Sarah Johnson",
      role: "CEO & Co-Founder",
      bio: "Former Goldman Sachs VP with 15+ years in sports finance. Led $2B+ in athlete endorsement deals.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      twitter: "#",
      email: "sarah@athlovault.com",
    },
    {
      name: "Marcus Chen",
      role: "CTO & Co-Founder",
      bio: "Ex-Google engineer and blockchain expert. Built scalable systems for 100M+ users.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      twitter: "#",
      email: "marcus@athlovault.com",
    },
    {
      name: "David Rodriguez",
      role: "Head of Sports Analytics",
      bio: "Former ESPN analyst and MIT PhD. Pioneer in sports performance prediction algorithms.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      twitter: "#",
      email: "david@athlovault.com",
    },
    {
      name: "Emily Thompson",
      role: "Head of Legal & Compliance",
      bio: "Securities law expert with 12+ years at SEC. Specialist in fintech regulations.",
      image: "/placeholder.svg?height=300&width=300",
      linkedin: "#",
      twitter: "#",
      email: "emily@athlovault.com",
    },
  ]

  const advisors = [
    {
      name: "Michael Jordan",
      role: "Strategic Advisor",
      bio: "Basketball legend and successful entrepreneur. Investor in multiple sports tech companies.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Serena Williams",
      role: "Athlete Experience Advisor",
      bio: "Tennis champion and venture capitalist. Advocate for athlete empowerment and financial literacy.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Mark Cuban",
      role: "Business Strategy Advisor",
      bio: "Entrepreneur, investor, and Dallas Mavericks owner. Expert in sports business and technology.",
      image: "/placeholder.svg?height=300&width=300",
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
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">Meet Our Team</h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                We're a diverse group of experts from finance, technology, and sports, united by our mission to
                revolutionize athlete investment.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Leadership Team</h2>
              <p className="text-xl text-slate-300">The visionaries driving AthloVault forward</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((member, index) => (
                <Card
                  key={index}
                  className="bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-full"></div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-amber-400 font-semibold mb-4">{member.role}</p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">{member.bio}</p>

                    <div className="flex justify-center space-x-3">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Advisory Board */}
        <section className="py-20 bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Advisory Board</h2>
              <p className="text-xl text-slate-300">Industry legends guiding our strategic direction</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advisors.map((advisor, index) => (
                <Card
                  key={index}
                  className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group"
                >
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <img
                        src={advisor.image || "/placeholder.svg"}
                        alt={advisor.name}
                        className="w-40 h-40 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent rounded-full"></div>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">{advisor.name}</h3>
                    <p className="text-amber-400 font-semibold mb-4">{advisor.role}</p>
                    <p className="text-slate-300 leading-relaxed">{advisor.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Join Our Team */}
        <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Join Our Team</h2>
            <p className="text-xl text-slate-300 mb-8">
              We're always looking for talented individuals who share our passion for sports and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8">
                View Open Positions
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-slate-600 text-slate-300 hover:text-white px-8 bg-transparent"
              >
                Contact HR
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
