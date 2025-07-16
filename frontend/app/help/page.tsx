import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, Book, Video, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function HelpCenterPage() {
  const helpCategories = [
    {
      icon: "💰",
      title: "Getting Started with Investing",
      description: "Learn the basics of athlete investment",
      articles: 12,
      link: "/help/investing",
    },
    {
      icon: "🏃",
      title: "For Athletes",
      description: "How to get funded and manage your profile",
      articles: 8,
      link: "/help/athletes",
    },
    {
      icon: "🔐",
      title: "Account & Security",
      description: "Manage your account and security settings",
      articles: 15,
      link: "/help/account",
    },
    {
      icon: "💳",
      title: "Payments & Withdrawals",
      description: "Payment methods and withdrawal processes",
      articles: 10,
      link: "/help/payments",
    },
    {
      icon: "📊",
      title: "Platform Features",
      description: "How to use dashboard and analytics tools",
      articles: 18,
      link: "/help/features",
    },
    {
      icon: "⚖️",
      title: "Legal & Compliance",
      description: "Terms, regulations, and compliance info",
      articles: 6,
      link: "/help/legal",
    },
  ]

  const popularArticles = [
    {
      title: "How to make your first athlete investment",
      category: "Investing",
      readTime: "5 min read",
      link: "/help/first-investment",
    },
    {
      title: "Understanding athlete valuations and returns",
      category: "Investing",
      readTime: "8 min read",
      link: "/help/valuations",
    },
    {
      title: "Setting up your athlete profile",
      category: "Athletes",
      readTime: "6 min read",
      link: "/help/athlete-profile",
    },
    {
      title: "Payment methods and processing times",
      category: "Payments",
      readTime: "4 min read",
      link: "/help/payment-methods",
    },
    {
      title: "Two-factor authentication setup",
      category: "Security",
      readTime: "3 min read",
      link: "/help/2fa",
    },
  ]

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      availability: "24/7",
      action: "Start Chat",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      availability: "Response within 24h",
      action: "Send Email",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our team directly",
      availability: "Mon-Fri 9AM-6PM EST",
      action: "Call Now",
    },
    {
      icon: Video,
      title: "Video Call",
      description: "Schedule a screen share session",
      availability: "By appointment",
      action: "Schedule Call",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">Help Center</h1>
            <p className="text-xl text-slate-300 mb-8">Find answers to your questions and get the support you need</p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                className="pl-12 pr-4 py-4 text-lg bg-slate-800 border-slate-700 text-white"
                placeholder="Search for help articles..."
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-500 hover:bg-amber-600 text-slate-900">
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Browse by Category</h2>
              <p className="text-xl text-slate-300">Find help articles organized by topic</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {helpCategories.map((category, index) => (
                <Link key={index} href={category.link}>
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="text-4xl mb-4">{category.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4">{category.description}</p>
                      <div className="text-slate-500 text-sm">{category.articles} articles</div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Popular Articles</h2>
              <p className="text-xl text-slate-300">Most viewed help articles this week</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {popularArticles.map((article, index) => (
                <Link key={index} href={article.link}>
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Book className="h-4 w-4 text-amber-400" />
                            <span className="text-amber-400 text-sm font-medium">{article.category}</span>
                            <span className="text-slate-500 text-sm">•</span>
                            <span className="text-slate-400 text-sm">{article.readTime}</span>
                          </div>
                          <h3 className="text-white font-semibold hover:text-amber-400 transition-colors">
                            {article.title}
                          </h3>
                        </div>
                        <div className="ml-4">
                          <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
                            <span className="text-slate-400">→</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Still Need Help?</h2>
              <p className="text-xl text-slate-300">Get in touch with our support team</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactOptions.map((option, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <option.icon className="h-6 w-6 text-amber-400" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">{option.title}</h3>
                    <p className="text-slate-400 text-sm mb-3">{option.description}</p>
                    <p className="text-slate-500 text-xs mb-4">{option.availability}</p>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-8">Quick Links</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/faq">
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:text-white bg-transparent"
                >
                  FAQ
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:text-white bg-transparent"
                >
                  Contact Us
                </Button>
              </Link>
              <Link href="/terms">
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:text-white bg-transparent"
                >
                  Terms of Service
                </Button>
              </Link>
              <Link href="/privacy">
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:text-white bg-transparent"
                >
                  Privacy Policy
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
