import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Cookie Policy</h1>
            <p className="text-slate-400">Last updated: January 1, 2024</p>
          </div>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-8 prose prose-invert max-w-none">
              <div className="space-y-8 text-slate-300">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies</h2>
                  <p>
                    Cookies are small text files that are placed on your computer or mobile device when you visit a
                    website. They are widely used to make websites work more efficiently and provide information to
                    website owners.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Cookies</h2>
                  <p>AthloVault uses cookies for several purposes:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>To enable certain functions of the platform</li>
                    <li>To provide analytics and track usage</li>
                    <li>To store your preferences and settings</li>
                    <li>To improve security and prevent fraud</li>
                    <li>To deliver relevant advertising</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">3. Types of Cookies We Use</h2>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">Essential Cookies</h3>
                  <p>
                    These cookies are necessary for the platform to function properly. They enable core functionality
                    such as security, network management, and accessibility.
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">Performance Cookies</h3>
                  <p>
                    These cookies collect information about how visitors use our platform, such as which pages are
                    visited most often and if users get error messages.
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">Functionality Cookies</h3>
                  <p>
                    These cookies allow the platform to remember choices you make and provide enhanced, more personal
                    features.
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">Targeting Cookies</h3>
                  <p>These cookies are used to deliver advertisements more relevant to you and your interests.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Cookies</h2>
                  <p>
                    We may also use third-party cookies from trusted partners for analytics, advertising, and other
                    services:
                  </p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Google Analytics for website analytics</li>
                    <li>Social media platforms for sharing functionality</li>
                    <li>Advertising networks for targeted advertising</li>
                    <li>Customer support tools for chat functionality</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">5. Managing Cookies</h2>
                  <p>You can control and manage cookies in various ways:</p>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">Browser Settings</h3>
                  <p>
                    Most browsers allow you to view, manage, and delete cookies. You can usually find these options in
                    your browser's settings or preferences menu.
                  </p>

                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">Cookie Preferences</h3>
                  <p>
                    You can manage your cookie preferences through our cookie consent banner or by visiting our cookie
                    preference center.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">6. Impact of Disabling Cookies</h2>
                  <p>If you choose to disable cookies, some features of our platform may not function properly:</p>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>You may need to log in repeatedly</li>
                    <li>Your preferences may not be saved</li>
                    <li>Some features may not work correctly</li>
                    <li>The platform may not remember your settings</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">7. Updates to This Policy</h2>
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices or for other
                    operational, legal, or regulatory reasons.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
                  <p>If you have any questions about our use of cookies, please contact us at:</p>
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
