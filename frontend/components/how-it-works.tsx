import { Card, CardContent } from "@/components/ui/card"
import { UserPlus, Search, DollarSign, TrendingUp } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up & Verify",
      description: "Create your account and complete KYC verification to access the marketplace.",
      step: "01",
    },
    {
      icon: Search,
      title: "Discover Athletes",
      description: "Browse emerging talent, analyze performance data, and find investment opportunities.",
      step: "02",
    },
    {
      icon: DollarSign,
      title: "Invest Securely",
      description: "Purchase athlete tokens through our secure blockchain-based investment platform.",
      step: "03",
    },
    {
      icon: TrendingUp,
      title: "Track & Earn",
      description: "Monitor your portfolio and receive revenue shares as athletes achieve success.",
      step: "04",
    },
  ]

  return (
    <section className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get started with athlete investment in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="bg-slate-800/50 border-slate-700 relative overflow-hidden group hover:border-amber-500/50 transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="absolute top-4 right-4 text-6xl font-bold text-slate-800 group-hover:text-slate-700 transition-colors">
                  {step.step}
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 text-slate-900" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
