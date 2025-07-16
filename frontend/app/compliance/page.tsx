import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, FileText, Users } from "lucide-react"

export default function CompliancePage() {
  const regulations = [
    {
      name: "Securities and Exchange Commission (SEC)",
      description: "Registered as an investment advisor and compliant with federal securities laws",
      status: "Compliant",
      icon: Shield,
    },
    {
      name: "Financial Industry Regulatory Authority (FINRA)",
      description: "Member organization ensuring fair and honest markets",
      status: "Member",
      icon: CheckCircle,
    },
    {
      name: "Anti-Money Laundering (AML)",
      description: "Comprehensive AML program to prevent financial crimes",
      status: "Implemented",
      icon: FileText,
    },
    {
      name: "Know Your Customer (KYC)",
      description: "Robust identity verification and customer due diligence",
      status: "Active",
      icon: Users,
    },
  ]

  const certifications = [
    {
      name: "SOC 2 Type II",
      issuer: "AICPA",
      description: "Security, availability, and confidentiality controls",
      validUntil: "December 2024",
    },
    {
      name: "ISO 27001",
      issuer: "International Organization for Standardization",
      description: "Information security management system",
      validUntil: "March 2025",
    },
    {
      name: "PCI DSS Level 1",
      issuer: "PCI Security Standards Council",
      description: "Payment card industry data security standard",
      validUntil: "June 2024",
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
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">Compliance & Security</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                AthloVault maintains the highest standards of regulatory compliance and security to protect our users
                and their investments
              </p>
            </div>
          </div>
        </section>

        {/* Regulatory Compliance */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Regulatory Compliance</h2>
              <p className="text-xl text-slate-300">
                We adhere to all applicable financial regulations and industry standards
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regulations.map((regulation, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <regulation.icon className="h-6 w-6 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold">{regulation.name}</h3>
                          <Badge className="bg-green-500 text-white">{regulation.status}</Badge>
                        </div>
                        <p className="text-slate-300 text-sm">{regulation.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security Certifications */}
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Security Certifications</h2>
              <p className="text-xl text-slate-300">
                Industry-recognized certifications validating our security practices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <Card key={index} className="bg-slate-800/50 border-slate-700 text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-8 w-8 text-blue-400" />
                    </div>
                    <CardTitle className="text-white">{cert.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-400 text-sm mb-3">{cert.issuer}</p>
                    <p className="text-slate-300 text-sm mb-4">{cert.description}</p>
                    <div className="text-xs text-slate-500">Valid until {cert.validUntil}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance Framework */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Compliance Framework</h2>
              <p className="text-xl text-slate-300">
                Comprehensive approach to regulatory compliance and risk management
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Investment Advisor Registration</h3>
                      <p className="text-slate-300">
                        AthloVault is registered as an investment advisor with the Securities and Exchange Commission
                        (SEC) under the Investment Advisers Act of 1940. This registration ensures we meet strict
                        fiduciary standards and regulatory requirements.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Accredited Investor Verification</h3>
                      <p className="text-slate-300">
                        We verify that all investors meet accredited investor requirements as defined by SEC
                        regulations. This includes income, net worth, and professional certification verification
                        through third-party services.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Anti-Money Laundering (AML)</h3>
                      <p className="text-slate-300">
                        Our comprehensive AML program includes customer identification procedures, ongoing monitoring,
                        suspicious activity reporting, and regular training for all employees.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Data Protection & Privacy</h3>
                      <p className="text-slate-300">
                        We implement industry-leading data protection measures including encryption, access controls,
                        and regular security audits. Our privacy practices comply with applicable data protection
                        regulations.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Smart Contract Security</h3>
                      <p className="text-slate-300">
                        All smart contracts undergo rigorous security audits by leading blockchain security firms. We
                        implement multi-signature controls and time-locked upgrades for additional security.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Regular Compliance Reviews</h3>
                      <p className="text-slate-300">
                        We conduct regular compliance reviews and work with external legal and compliance experts to
                        ensure ongoing adherence to all applicable regulations and industry best practices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Compliance */}
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Compliance Questions?</h2>
            <p className="text-xl text-slate-300 mb-8">
              Our compliance team is available to answer any questions about our regulatory practices and security
              measures.
            </p>
            <div className="space-y-4">
              <p className="text-slate-300">
                <strong>Compliance Officer:</strong> Emily Thompson, JD
              </p>
              <p className="text-slate-300">
                <strong>Email:</strong> compliance@athlovault.com
              </p>
              <p className="text-slate-300">
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
