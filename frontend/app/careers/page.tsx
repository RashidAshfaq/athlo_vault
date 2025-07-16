import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, DollarSign, Users, Code, TrendingUp } from "lucide-react"

export default function CareersPage() {
  const openPositions = [
    {
      id: 1,
      title: "Senior Blockchain Developer",
      department: "Engineering",
      location: "Remote / New York",
      type: "Full-time",
      salary: "$120k - $180k",
      description: "Build and maintain our smart contract infrastructure and tokenization platform.",
      requirements: ["5+ years blockchain development", "Solidity expertise", "DeFi experience"],
    },
    {
      id: 2,
      title: "Sports Analytics Specialist",
      department: "Data Science",
      location: "Los Angeles",
      type: "Full-time",
      salary: "$90k - $130k",
      description: "Develop AI models for athlete performance prediction and valuation algorithms.",
      requirements: ["Sports analytics background", "Python/R proficiency", "Machine learning experience"],
    },
    {
      id: 3,
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      salary: "$80k - $120k",
      description: "Lead go-to-market strategies for new features and athlete partnerships.",
      requirements: ["5+ years product marketing", "Fintech experience", "Sports industry knowledge"],
    },
    {
      id: 4,
      title: "Compliance Officer",
      department: "Legal",
      location: "New York",
      type: "Full-time",
      salary: "$100k - $150k",
      description: "Ensure regulatory compliance across all investment products and jurisdictions.",
      requirements: ["Securities law experience", "Fintech compliance", "Series 7/66 preferred"],
    },
    {
      id: 5,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      salary: "$70k - $110k",
      description: "Design intuitive interfaces for our investor and athlete platforms.",
      requirements: ["5+ years UX/UI design", "Fintech experience", "Mobile-first design"],
    },
    {
      id: 6,
      title: "Business Development Intern",
      department: "Business Development",
      location: "Los Angeles",
      type: "Internship",
      salary: "$20/hour",
      description: "Support athlete recruitment and partnership development initiatives.",
      requirements: ["Business/Sports Management student", "Strong communication skills", "Sports industry interest"],
    },
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Market-leading salaries plus equity participation in our growth",
    },
    {
      icon: Users,
      title: "Amazing Team",
      description: "Work with world-class talent from top tech companies and sports organizations",
    },
    {
      icon: TrendingUp,
      title: "Growth Opportunities",
      description: "Rapid career advancement in a fast-growing fintech startup",
    },
    {
      icon: Code,
      title: "Cutting-edge Tech",
      description: "Work with the latest blockchain, AI, and sports analytics technologies",
    },
  ]

  const departments = [
    { name: "Engineering", count: 12, icon: "💻" },
    { name: "Data Science", count: 8, icon: "📊" },
    { name: "Marketing", count: 6, icon: "📢" },
    { name: "Legal", count: 4, icon: "⚖️" },
    { name: "Design", count: 5, icon: "🎨" },
    { name: "Business Development", count: 7, icon: "🤝" },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">Join Our Team</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                Help us revolutionize sports finance and build the future of athlete investment
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8">
                  View Open Positions
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white bg-transparent">
                  Learn About Our Culture
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-slate-400">Team Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">6</div>
                <div className="text-slate-400">Departments</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-slate-400">Open Positions</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">95%</div>
                <div className="text-slate-400">Employee Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Departments */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Departments</h2>
              <p className="text-xl text-slate-300">Diverse teams working together to achieve our mission</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {departments.map((dept) => (
                <Card key={dept.name} className="bg-slate-800/50 border-slate-700 text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-3">{dept.icon}</div>
                    <h3 className="text-white font-semibold mb-2">{dept.name}</h3>
                    <p className="text-slate-400 text-sm">{dept.count} positions</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Open Positions</h2>
              <p className="text-xl text-slate-300">Find your next career opportunity</p>
            </div>

            <div className="space-y-6">
              {openPositions.map((position) => (
                <Card key={position.id} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="text-xl font-bold text-white">{position.title}</h3>
                          <Badge className="bg-amber-500 text-slate-900">{position.department}</Badge>
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {position.type}
                          </Badge>
                        </div>

                        <p className="text-slate-300 mb-4">{position.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {position.location}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            {position.salary}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {position.type}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-white font-semibold text-sm mb-2">Key Requirements:</h4>
                          <ul className="text-slate-400 text-sm space-y-1">
                            {position.requirements.map((req, index) => (
                              <li key={index}>• {req}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Why Work at AthloVault?</h2>
              <p className="text-xl text-slate-300">Amazing benefits and a culture that puts people first</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="h-6 w-6 text-amber-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-slate-400 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Us?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Don't see the perfect role? We're always looking for exceptional talent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8">
                Send Us Your Resume
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white bg-transparent">
                Learn About Our Culture
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
