"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How does athlete investment work?",
    answer:
      "You invest in promising athletes early in their careers through our blockchain-based smart contracts. In return, you receive a percentage of their future earnings from endorsements, prize money, and professional contracts. Our platform handles all the legal and financial aspects securely.",
  },
  {
    question: "What sports and athletes are available?",
    answer:
      "We feature athletes from major sports including football, basketball, baseball, tennis, golf, swimming, and track & field. Our team carefully vets each athlete based on their performance, potential, and character. New athletes are added regularly as they meet our strict criteria.",
  },
  {
    question: "What are the minimum investment amounts?",
    answer:
      "Minimum investments vary by athlete, typically ranging from $250 to $1,000. This allows both casual fans and serious investors to participate. Each athlete's profile clearly displays their minimum investment requirement and funding goals.",
  },
  {
    question: "How are returns calculated and distributed?",
    answer:
      "Returns are based on a predetermined percentage of the athlete's earnings as specified in the smart contract. Payments are automatically distributed monthly through our blockchain system. You can track all transactions and earnings in real-time through your dashboard.",
  },
  {
    question: "Is my investment protected?",
    answer:
      "Yes, all investments are secured through blockchain smart contracts and comply with financial regulations. We also provide investor protection through our comprehensive vetting process, performance guarantees, and transparent reporting. However, like all investments, there are inherent risks.",
  },
  {
    question: "Can I sell my investment stake?",
    answer:
      "Yes, our platform includes a secondary marketplace where you can sell your investment stakes to other users. The value of your stake may fluctuate based on the athlete's performance and market demand. Trading is facilitated through secure smart contracts.",
  },
  {
    question: "How do you vet athletes?",
    answer:
      "Our comprehensive vetting process includes performance analysis, character assessment, academic review, and background checks. We work with sports analysts, coaches, and industry experts to evaluate each athlete's potential. Only the most promising candidates are accepted to our platform.",
  },
  {
    question: "What happens if an athlete gets injured?",
    answer:
      "While injury risk is inherent in sports, we mitigate this through diversification recommendations and insurance options. Some contracts include injury protection clauses. We also provide detailed risk assessments for each athlete to help you make informed decisions.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 faq-background relative">
      {/* Animated floating dots */}
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>
      <div className="floating-dot"></div>

      {/* Floating orbs for premium effect */}
      <div className="floating-orb"></div>
      <div className="floating-orb"></div>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(245,158,11,0.02)_50%,transparent_75%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Questions
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Get answers to common questions about investing in athletes through AthloVault
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden hover:bg-slate-800/70 transition-all duration-300"
            >
              <button
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-xl"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-amber-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-slate-700/50 pt-4">
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-slate-300 mb-6">
              Our team is here to help you understand athlete investment and get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Contact Support
              </a>
              <a
                href="mailto:support@athlovault.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 font-semibold rounded-lg transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
