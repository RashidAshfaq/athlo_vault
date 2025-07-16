import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle } from "lucide-react"

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "hello@athlovault.com",
      action: "Send Email",
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak with our team",
      contact: "+1 (555) 123-4567",
      action: "Call Now",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with support",
      contact: "Available 24/7",
      action: "Start Chat",
    },
    {
      icon: HelpCircle,
      title: "Help Center",
      description: "Browse our FAQ",
      contact: "Self-service support",
      action: "Visit FAQ",
    },
  ]

  const offices = [
    {
      city: "New York",
      address: "123 Wall Street, Suite 500",
      zipcode: "New York, NY 10005",
      phone: "+1 (555) 123-4567",
    },
    {
      city: "London",
      address: "45 Canary Wharf",
      zipcode: "London E14 5AB, UK",
      phone: "+44 20 7946 0958",
    },
    {
      city: "Singapore",
      address: "1 Marina Bay Drive",
      zipcode: "Singapore 018989",
      phone: "+65 6123 4567",
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
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">Contact Us</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index} className="bg-slate-900/50 border-slate-700 hover:border-slate-600 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <method.icon className="h-6 w-6 text-slate-900" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
                    <p className="text-slate-400 text-sm mb-2">{method.description}</p>
                    <p className="text-slate-300 font-medium mb-4">{method.contact}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-600 text-slate-300 hover:text-white bg-transparent"
                    >
                      {method.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Send us a message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                      <Input className="bg-slate-900 border-slate-700 text-white" placeholder="John" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                      <Input className="bg-slate-900 border-slate-700 text-white" placeholder="Doe" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <Input
                      type="email"
                      className="bg-slate-900 border-slate-700 text-white"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                    <Select>
                      <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="investor">Investor Support</SelectItem>
                        <SelectItem value="athlete">Athlete Support</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="press">Press Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                    <Textarea
                      className="bg-slate-900 border-slate-700 text-white min-h-32"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                    Send Message
                  </Button>
                </CardContent>
              </Card>

              {/* Office Locations */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Our Offices</h2>
                  <div className="space-y-6">
                    {offices.map((office, index) => (
                      <Card key={index} className="bg-slate-800/50 border-slate-700">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                              <MapPin className="h-5 w-5 text-slate-900" />
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-2">{office.city}</h3>
                              <p className="text-slate-300 mb-1">{office.address}</p>
                              <p className="text-slate-300 mb-2">{office.zipcode}</p>
                              <p className="text-slate-400 text-sm">{office.phone}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Business Hours */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Business Hours</h3>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-300">Monday - Friday</span>
                            <span className="text-slate-400">9:00 AM - 6:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Saturday</span>
                            <span className="text-slate-400">10:00 AM - 4:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-300">Sunday</span>
                            <span className="text-slate-400">Closed</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-3">* Support chat available 24/7</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
