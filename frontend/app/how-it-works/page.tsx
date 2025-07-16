import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HowItWorks } from "@/components/how-it-works"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">How AthloVault Works</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Learn how our platform connects athletes with investors through blockchain technology
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Component */}
        <section className="py-16">
          <HowItWorks />
        </section>
      </main>

      <Footer />
    </div>
  )
}
