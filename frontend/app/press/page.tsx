import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ExternalLink, Download, Mail } from "lucide-react"

export default function PressPage() {
  const pressReleases = [
    {
      id: 1,
      title: "AthloVault Raises $25M Series A to Revolutionize Sports Investment",
      date: "2024-01-15",
      category: "Funding",
      excerpt:
        "Leading venture capital firms back AthloVault's mission to democratize athlete investment through blockchain technology.",
      link: "#",
    },
    {
      id: 2,
      title: "Partnership with NCAA to Support Student-Athlete Funding",
      date: "2023-12-08",
      category: "Partnership",
      excerpt:
        "AthloVault announces groundbreaking partnership to provide new funding opportunities for college athletes.",
      link: "#",
    },
    {
      id: 3,
      title: "AthloVault Platform Surpasses $50M in Total Athlete Investments",
      date: "2023-11-22",
      category: "Milestone",
      excerpt: "Platform reaches major milestone with over 500 athletes funded and 10,000+ active investors.",
      link: "#",
    },
    {
      id: 4,
      title: "New AI-Powered Athlete Valuation System Launches",
      date: "2023-10-30",
      category: "Product",
      excerpt:
        "Revolutionary AI system provides real-time athlete valuations based on performance data and market trends.",
      link: "#",
    },
  ]

  const mediaKit = [
    {
      name: "Company Logo Pack",
      description: "High-resolution logos in various formats",
      type: "ZIP",
      size: "2.4 MB",
    },
    {
      name: "Executive Headshots",
      description: "Professional photos of leadership team",
      type: "ZIP",
      size: "8.1 MB",
    },
    {
      name: "Product Screenshots",
      description: "Platform interface and feature screenshots",
      type: "ZIP",
      size: "5.7 MB",
    },
    {
      name: "Company Fact Sheet",
      description: "Key statistics and company information",
      type: "PDF",
      size: "1.2 MB",
    },
  ]

  const mediaContacts = [
    {
      name: "Sarah Martinez",
      title: "Head of Communications",
      email: "press@athlovault.com",
      phone: "+1 (555) 123-4567",
    },
    {
      name: "Michael Chen",
      title: "PR Manager",
      email: "media@athlovault.com",
      phone: "+1 (555) 123-4568",
    },
  ]

  const awards = [
    {
      year: "2024",
      award: "Fintech Innovation Award",
      organization: "TechCrunch Disrupt",
      description: "Best Blockchain Application in Sports Finance",
    },
    {
      year: "2023",
      award: "Sports Business Journal Award",
      organization: "Sports Business Journal",
      description: "Most Innovative Sports Technology Platform",
    },
    {
      year: "2023",
      award: "Forbes 30 Under 30",
      organization: "Forbes",
      description: "CEO Sarah Johnson recognized in Finance category",
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
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">Press & Media</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
                Latest news, press releases, and media resources for journalists and media professionals
              </p>
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                <Mail className="h-4 w-4 mr-2" />
                Contact Press Team
              </Button>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Latest Press Releases</h2>
              <p className="text-xl text-slate-300">Stay updated with our latest announcements and milestones</p>
            </div>

            <div className="space-y-6">
              {pressReleases.map((release) => (
                <Card
                  key={release.id}
                  className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <Badge className="bg-amber-500 text-slate-900">{release.category}</Badge>
                          <div className="flex items-center text-slate-400 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(release.date).toLocaleDateString()}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">{release.title}</h3>
                        <p className="text-slate-300 mb-4">{release.excerpt}</p>
                      </div>
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <Button
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:text-white bg-transparent"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Read More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Media Kit */}
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Media Kit</h2>
              <p className="text-xl text-slate-300">Download our media assets and company information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mediaKit.map((item, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Download className="h-6 w-6 text-amber-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{item.name}</h3>
                    <p className="text-slate-400 text-sm mb-3">{item.description}</p>
                    <div className="flex justify-between items-center text-xs text-slate-500 mb-4">
                      <span>{item.type}</span>
                      <span>{item.size}</span>
                    </div>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Awards & Recognition</h2>
              <p className="text-xl text-slate-300">Industry recognition for our innovation and impact</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {awards.map((award, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 text-center">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">🏆</div>
                    <div className="text-amber-400 font-bold text-lg mb-2">{award.year}</div>
                    <h3 className="text-white font-semibold mb-2">{award.award}</h3>
                    <p className="text-slate-400 text-sm mb-3">{award.organization}</p>
                    <p className="text-slate-300 text-sm">{award.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Media Contacts */}
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Media Contacts</h2>
              <p className="text-xl text-slate-300">Get in touch with our press team</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {mediaContacts.map((contact, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="h-8 w-8 text-amber-400" />
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-1">{contact.name}</h3>
                    <p className="text-slate-400 mb-4">{contact.title}</p>
                    <div className="space-y-2">
                      <p className="text-slate-300">{contact.email}</p>
                      <p className="text-slate-300">{contact.phone}</p>
                    </div>
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
