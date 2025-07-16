import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-slate-400">Last updated: January 1, 2024</p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 prose prose-invert max-w-none">
              <div className="space-y-8 text-slate-300">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                  <p>
                    We collect information you provide directly to us, such as when you create an account, make
                    investments, or contact us for support.
                  </p>
                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">Personal Information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, email address, phone number</li>
                    <li>Date of birth and government-issued ID</li>
                    <li>Financial information for accredited investor verification</li>
                    <li>Payment information and transaction history</li>
                    <li>Investment preferences and risk tolerance</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Verify your identity and comply with legal requirements</li>
                    <li>Send you technical notices and support messages</li>
                    <li>Communicate about products, services, and promotional offers</li>
                    <li>Monitor and analyze trends and usage</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties except as
                    described in this policy:
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>With your consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and prevent fraud</li>
                    <li>With service providers who assist our operations</li>
                    <li>In connection with a merger or acquisition</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information
                    against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and audits</li>
                    <li>Access controls and authentication measures</li>
                    <li>Employee training on data protection</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
                  <p>Depending on your location, you may have certain rights regarding your personal information:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Access to your personal information</li>
                    <li>Correction of inaccurate information</li>
                    <li>Deletion of your information</li>
                    <li>Portability of your data</li>
                    <li>Objection to processing</li>
                    <li>Withdrawal of consent</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">6. Cookies and Tracking</h2>
                  <p>
                    We use cookies and similar tracking technologies to collect and use personal information about you.
                    For more information about our use of cookies, please see our Cookie Policy.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">7. International Transfers</h2>
                  <p>
                    Your information may be transferred to and processed in countries other than your own. We ensure
                    appropriate safeguards are in place to protect your information during such transfers.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in
                    this policy, unless a longer retention period is required by law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
                  <p>
                    Our services are not intended for individuals under 18 years of age. We do not knowingly collect
                    personal information from children under 18.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting
                    the new policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
                  <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                  <div className="mt-4">
                    <p>Email: privacy@athlovault.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Address: 123 Wall Street, Suite 500, New York, NY 10005</p>
                  </div>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
