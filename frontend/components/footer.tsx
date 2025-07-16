import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Instagram, Linkedin, Youtube, Mail, Phone } from "lucide-react"

export function Footer() {
  const footerLinks = {
    platform: [
      { name: "How It Works", href: "/how-it-works" },
      { name: "Athlete Marketplace", href: "/athletes" },
      { name: "Investment Simulator", href: "/simulator" },
      { name: "Sports Categories", href: "/sports" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faq" },
      { name: "Community", href: "/community" },
    ],
    legal: [
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Compliance", href: "/compliance" },
    ],
  }

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Company info */}
            <div className="lg:col-span-4">
               <Link href="/" className="flex items-center space-x-2">
            <img src="/images/logo.png" alt="AthloVault" className="h-16 w-auto" />
          </Link>
              <p className="text-slate-400 mb-6 leading-relaxed">
                The premier platform for athlete investment and tokenization. Connect with emerging talent and unlock
                new opportunities in sports finance.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                  <Youtube className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Links */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-white font-semibold mb-4">Platform</h3>
                  <ul className="space-y-3">
                    {footerLinks.platform.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Company</h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Support</h3>
                  <ul className="space-y-3">
                    {footerLinks.support.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-4">Legal</h3>
                  <ul className="space-y-3">
                    {footerLinks.legal.map((link) => (
                      <li key={link.name}>
                        <Link href={link.href} className="text-slate-400 hover:text-white transition-colors">
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-2">
              <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
              <p className="text-slate-400 mb-4 text-sm">Get the latest news and updates from AthloVault.</p>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-400"
                />
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">© {new Date().getFullYear()} AthloVault. All rights reserved.</p>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@athlovault.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
