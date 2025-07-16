import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-slate-400">Last updated: January 1, 2024</p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 prose prose-invert max-w-none">
              <div className="space-y-8 text-slate-300">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                  <p>
                    By accessing and using AthloVault ("the Platform"), you accept and agree to be bound by the terms
                    and provision of this agreement. If you do not agree to abide by the above, please do not use this
                    service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
                  <p>
                    AthloVault is a platform that facilitates investment in athletes through tokenization of future
                    earnings. The Platform allows investors to purchase tokens representing a share in an athlete's
                    future revenue streams.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">3. Investment Risks</h2>
                  <p>
                    All investments carry risk, including the potential loss of principal. Athletic performance, injury,
                    and market conditions can significantly impact returns. Past performance does not guarantee future
                    results.
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Athletes may not achieve projected performance levels</li>
                    <li>Injuries may impact earning potential</li>
                    <li>Market conditions may affect valuations</li>
                    <li>Regulatory changes may impact the platform</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">4. Eligibility</h2>
                  <p>To use the Platform, you must:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Be at least 18 years of age</li>
                    <li>Be legally capable of entering into binding contracts</li>
                    <li>Meet accredited investor requirements where applicable</li>
                    <li>Complete our KYC/AML verification process</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">5. Account Security</h2>
                  <p>
                    You are responsible for maintaining the confidentiality of your account credentials and for all
                    activities that occur under your account. You agree to notify us immediately of any unauthorized use
                    of your account.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">6. Prohibited Activities</h2>
                  <p>You agree not to:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Use the Platform for any illegal or unauthorized purpose</li>
                    <li>Attempt to manipulate athlete valuations or market prices</li>
                    <li>Share your account credentials with others</li>
                    <li>Engage in money laundering or terrorist financing</li>
                    <li>Violate any applicable laws or regulations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
                  <p>
                    The Platform and its original content, features, and functionality are owned by AthloVault and are
                    protected by international copyright, trademark, patent, trade secret, and other intellectual
                    property laws.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">8. Privacy Policy</h2>
                  <p>
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of
                    the Platform, to understand our practices.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
                  <p>
                    In no event shall AthloVault be liable for any indirect, incidental, special, consequential, or
                    punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                    intangible losses.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">10. Governing Law</h2>
                  <p>
                    These Terms shall be interpreted and governed by the laws of the State of Delaware, without regard
                    to its conflict of law provisions.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">11. Changes to Terms</h2>
                  <p>
                    We reserve the right to modify these terms at any time. We will notify users of any material changes
                    via email or through the Platform. Continued use of the Platform after such modifications
                    constitutes acceptance of the updated terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">12. Contact Information</h2>
                  <p>If you have any questions about these Terms of Service, please contact us at:</p>
                  <div className="mt-4">
                    <p>Email: legal@athlovault.com</p>
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
