"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Mail } from "lucide-react"

const teamMembers = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CEO & Co-Founder",
    image: "/placeholder.svg?height=300&width=300&text=Sarah+Chen",
    bio: "Former Goldman Sachs investment banker with 10+ years in sports finance. Harvard MBA.",
    expertise: ["Sports Finance", "Investment Banking", "Strategy"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sarah@athlovault.com",
    },
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "CTO & Co-Founder",
    image: "/placeholder.svg?height=300&width=300&text=Marcus+Rodriguez",
    bio: "Former Meta engineer specializing in blockchain and smart contracts. Stanford CS.",
    expertise: ["Blockchain", "Smart Contracts", "Full-Stack Development"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "marcus@athlovault.com",
    },
  },
  {
    id: 3,
    name: "Dr. Amanda Foster",
    role: "Head of Athlete Relations",
    image: "/placeholder.svg?height=300&width=300&text=Dr.+Amanda+Foster",
    bio: "Former Olympic sports psychologist and NCAA Division I athletic director.",
    expertise: ["Sports Psychology", "Athlete Development", "Performance Analytics"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "amanda@athlovault.com",
    },
  },
  {
    id: 4,
    name: "James Park",
    role: "Head of Legal & Compliance",
    image: "/placeholder.svg?height=300&width=300&text=James+Park",
    bio: "Securities lawyer with expertise in sports law and financial regulations. Yale Law.",
    expertise: ["Securities Law", "Sports Law", "Regulatory Compliance"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "james@athlovault.com",
    },
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Head of Marketing",
    image: "/placeholder.svg?height=300&width=300&text=Lisa+Thompson",
    bio: "Former Nike marketing executive with 8+ years in sports brand management.",
    expertise: ["Brand Strategy", "Digital Marketing", "Sports Marketing"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "lisa@athlovault.com",
    },
  },
  {
    id: 6,
    name: "David Kim",
    role: "Head of Data Analytics",
    image: "/placeholder.svg?height=300&width=300&text=David+Kim",
    bio: "Former ESPN analytics lead specializing in sports performance metrics and AI.",
    expertise: ["Data Science", "Sports Analytics", "Machine Learning"],
    social: {
      linkedin: "#",
      twitter: "#",
      email: "david@athlovault.com",
    },
  },
]

export function OurTeam() {
  return (
    <section className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Meet Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
              Expert Team
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Our diverse team combines expertise in finance, technology, sports, and law to revolutionize athlete
            investment
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:bg-slate-900/70 transition-all duration-300 group"
            >
              <CardContent className="p-0">
                {/* Member Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Social Links - Show on hover */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      <Linkedin className="h-5 w-5 text-white" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                    >
                      <Twitter className="h-5 w-5 text-white" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors"
                    >
                      <Mail className="h-5 w-5 text-white" />
                    </a>
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-6">
                  <h3 className="text-white font-bold text-xl mb-1 group-hover:text-amber-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-amber-400 font-medium mb-3">{member.role}</p>
                  <p className="text-slate-300 text-sm mb-4 leading-relaxed">{member.bio}</p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, index) => (
                      <Badge key={index} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
            <h3 className="text-2xl font-bold text-white mb-4">Join Our Team</h3>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for revolutionizing sports investment.
              Help us build the future of athlete funding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/careers"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                View Open Positions
              </a>
              <a
                href="mailto:careers@athlovault.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 font-semibold rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact HR
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
