"use client"

import { AthleteLayout } from "@/components/athlete-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Trophy, Target, BarChart3, Globe, Twitter, Instagram, Linkedin, Edit, Share, Star } from "lucide-react"
import Link from "next/link"

export default function AthleteProfilePreview() {
  const athleteData = {
    name: "Alex Johnson",
    position: "Point Guard",
    team: "University Basketball Team",
    location: "Los Angeles, CA",
    age: 22,
    height: "6'2\"",
    weight: "185 lbs",
    bio: "Passionate basketball player with dreams of making it to the NBA. Currently leading my university team with strong performance stats and leadership skills. Looking for investors who believe in my potential and want to be part of my journey to professional basketball.",
    profileImage: "/placeholder.svg?height=150&width=150",
    coverImage: "/placeholder.svg?height=300&width=800",
    socialMedia: {
      website: "https://alexjohnson.com",
      twitter: "@alexjohnson",
      instagram: "@alexjohnson_bball",
      linkedin: "alex-johnson-athlete",
    },
    stats: {
      pointsPerGame: 24.5,
      assistsPerGame: 8.2,
      reboundsPerGame: 5.1,
      fieldGoalPercentage: 48.5,
      threePointPercentage: 38.2,
      freeThrowPercentage: 85.7,
    },
    achievements: [
      "Conference Player of the Year 2024",
      "All-American Second Team",
      "Team Captain for 2 consecutive years",
      "Academic All-Conference",
      "Community Service Award",
    ],
    careerGoals: [
      "Get drafted in NBA first round",
      "Win NBA Rookie of the Year",
      "Secure major endorsement deal",
      "Lead team to championship",
    ],
    highlights: [
      {
        title: "Triple-Double Performance",
        description: "28 points, 12 assists, 10 rebounds vs. Duke",
        date: "March 2024",
      },
      {
        title: "Game-Winning Shot",
        description: "Buzzer-beater to win conference championship",
        date: "February 2024",
      },
      {
        title: "Season High",
        description: "35 points in rivalry game",
        date: "January 2024",
      },
    ],
  }

  return (
    <AthleteLayout title="Profile Preview" description="See how your profile appears to investors and fans">
      {/* Header */}
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Profile Preview</h1>
          <p className="text-slate-400">See how your profile appears to investors and fans</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800">
            <Share className="h-4 w-4 mr-2" />
            Share Profile
          </Button>
          <Link href="/athlete/settings">
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative mb-6">
        <div className="h-48 md:h-64 bg-gradient-to-r from-slate-800 to-slate-700 rounded-lg overflow-hidden">
          <img
            src={athleteData.coverImage || "/placeholder.svg?height=300&width=800"}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-16 left-6">
          <Avatar className="w-32 h-32 border-4 border-slate-950">
            <AvatarImage src={athleteData.profileImage || "/placeholder.svg"} alt={athleteData.name} />
            <AvatarFallback className="bg-slate-800 text-white text-2xl">
              {athleteData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Profile Header */}
      <div className="mt-16 mb-6">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{athleteData.name}</h1>
            <div className="flex flex-wrap items-center gap-2 text-slate-400">
              <span>{athleteData.position}</span>
              <span>•</span>
              <span>{athleteData.team}</span>
              <span>•</span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {athleteData.location}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span>Age: {athleteData.age}</span>
              <span>Height: {athleteData.height}</span>
              <span>Weight: {athleteData.weight}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4">About</h2>
              <p className="text-slate-300 leading-relaxed">{athleteData.bio}</p>
            </CardContent>
          </Card>

          {/* Performance Stats */}
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Performance Stats
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">{athleteData.stats.pointsPerGame}</div>
                  <p className="text-slate-400 text-sm">PPG</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">{athleteData.stats.assistsPerGame}</div>
                  <p className="text-slate-400 text-sm">APG</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">{athleteData.stats.reboundsPerGame}</div>
                  <p className="text-slate-400 text-sm">RPG</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">{athleteData.stats.fieldGoalPercentage}%</div>
                  <p className="text-slate-400 text-sm">FG%</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">{athleteData.stats.threePointPercentage}%</div>
                  <p className="text-slate-400 text-sm">3P%</p>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                  <div className="text-2xl font-bold text-white">{athleteData.stats.freeThrowPercentage}%</div>
                  <p className="text-slate-400 text-sm">FT%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Career Highlights */}
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Career Highlights
              </h2>
              <div className="space-y-4">
                {athleteData.highlights.map((highlight, index) => (
                  <div key={index} className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-medium">{highlight.title}</h3>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {highlight.date}
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-sm">{highlight.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {athleteData.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-800/50 rounded-lg">
                    <Trophy className="h-4 w-4 text-amber-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Career Goals */}
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Career Goals
              </h2>
              <div className="space-y-3">
                {athleteData.careerGoals.map((goal, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-800/50 rounded-lg">
                    <Target className="h-4 w-4 text-amber-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{goal}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Connect
              </h2>
              <div className="space-y-3">
                {athleteData.socialMedia.website && (
                  <a
                    href={athleteData.socialMedia.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <Globe className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-300 text-sm">Website</span>
                  </a>
                )}
                {athleteData.socialMedia.twitter && (
                  <a
                    href={`https://twitter.com/${athleteData.socialMedia.twitter.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <Twitter className="h-4 w-4 text-blue-400 mr-3" />
                    <span className="text-slate-300 text-sm">{athleteData.socialMedia.twitter}</span>
                  </a>
                )}
                {athleteData.socialMedia.instagram && (
                  <a
                    href={`https://instagram.com/${athleteData.socialMedia.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <Instagram className="h-4 w-4 text-pink-400 mr-3" />
                    <span className="text-slate-300 text-sm">{athleteData.socialMedia.instagram}</span>
                  </a>
                )}
                {athleteData.socialMedia.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${athleteData.socialMedia.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <Linkedin className="h-4 w-4 text-blue-600 mr-3" />
                    <span className="text-slate-300 text-sm">LinkedIn</span>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AthleteLayout>
  )
}
