"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Share2, ArrowRight, Trophy, DollarSign } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function InvestmentSuccessPage() {
  const [confetti, setConfetti] = useState(false)
  const searchParams = useSearchParams()

  const athleteName = searchParams.get("athlete") || "Marcus Johnson"
  const amount = searchParams.get("amount") || "1000"
  const tokens = searchParams.get("tokens") || "100"

  useEffect(() => {
    setConfetti(true)
    const timer = setTimeout(() => setConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              {confetti && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="animate-bounce text-4xl">🎉</div>
                </div>
              )}
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Investment Successful!</h1>
            <p className="text-xl text-slate-300">Congratulations! You've successfully invested in {athleteName}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Investment Summary */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <DollarSign className="h-6 w-6 mr-2 text-amber-400" />
                  Investment Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-900/50 rounded-lg p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Athlete:</span>
                      <span className="text-white font-semibold">{athleteName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Investment Amount:</span>
                      <span className="text-white font-semibold">${amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tokens Received:</span>
                      <span className="text-white font-semibold">{tokens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Transaction ID:</span>
                      <span className="text-white font-semibold text-sm">TX-{Date.now().toString().slice(-8)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-700">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-green-400 font-semibold">Confirmed</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:text-white bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Receipt
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:text-white bg-transparent"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Investment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="h-6 w-6 mr-2 text-amber-400" />
                  What's Next?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-slate-900 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Track Performance</h4>
                      <p className="text-slate-400 text-sm">
                        Monitor your athlete's progress and performance updates in your dashboard
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-slate-900 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Receive Updates</h4>
                      <p className="text-slate-400 text-sm">
                        Get exclusive updates, behind-the-scenes content, and performance insights
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-slate-900 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">Earn Returns</h4>
                      <p className="text-slate-400 text-sm">
                        Receive your share of revenue as your athlete achieves success
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 space-y-3">
                  <Link href="/dashboard">
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold">
                      Go to Dashboard
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/athletes">
                    <Button
                      variant="outline"
                      className="w-full border-slate-600 text-slate-300 hover:text-white bg-transparent"
                    >
                      Discover More Athletes
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <Card className="bg-slate-800/50 border-slate-700 mt-8">
            <CardHeader>
              <CardTitle className="text-white">Important Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">Investment Details</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Your investment is now active and earning potential returns</li>
                    <li>• Tokens represent your ownership stake in the athlete's future earnings</li>
                    <li>• Revenue sharing begins when the athlete starts earning professionally</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Support & Resources</h4>
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Access exclusive investor updates and content</li>
                    <li>• Join our investor community for discussions and insights</li>
                    <li>• Contact support for any questions about your investment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
