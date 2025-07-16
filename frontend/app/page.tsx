import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Merchandise } from "@/components/merchandise"
import { OurTeam } from "@/components/our-team"
import { FAQ } from "@/components/faq"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen hero-gradient">
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <Merchandise />
      <OurTeam />
      <FAQ />
      <Footer />
    </div>
  )
}
