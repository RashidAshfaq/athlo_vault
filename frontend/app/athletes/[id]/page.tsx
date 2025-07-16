import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Users,
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  Trophy,
  BarChart3,
  DollarSign,
  Target,
  Play,
  Heart,
  Share2,
  Instagram,
  Twitter,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Complete athlete data for all athletes
const athleteData = {
  1: {
    id: 1,
    name: "Marcus Johnson",
    sport: "Basketball",
    position: "Point Guard",
    age: 22,
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$2.5M",
    growth: "+15%",
    followers: "125K",
    verified: true,
    trending: true,
    bio: "Rising basketball star with exceptional court vision and leadership skills. Currently averaging 24.5 points and 8.2 assists per game in his senior year at UCLA.",
    stats: {
      points: 24.5,
      assists: 8.2,
      rebounds: 5.1,
      fieldGoal: 48.5,
      threePoint: 38.2,
      freeThrow: 85.7,
    },
    funding: {
      goal: 500000,
      raised: 375000,
      investors: 156,
      daysLeft: 45,
      minInvestment: 100,
      revenueShare: 10,
      duration: 5,
    },
    achievements: [
      "NCAA Division I All-American (2023)",
      "Pac-12 Player of the Year (2023)",
      "Led team to Final Four (2023)",
      "School record holder for assists in a season",
    ],
    socialMedia: {
      instagram: "125K",
      twitter: "89K",
      tiktok: "67K",
    },
    careerGoals:
      "Aiming for NBA Draft 2024. Long-term goal to play professionally for 10+ years and establish basketball academies for underprivileged youth.",
    useOfFunds:
      "Training with elite coaches, nutrition program, sports psychology, equipment, and travel expenses for showcases and combines.",
  },
  2: {
    id: 2,
    name: "Sarah Chen",
    sport: "Tennis",
    position: "Singles",
    age: 20,
    location: "Miami, FL",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$1.8M",
    growth: "+22%",
    followers: "89K",
    verified: true,
    trending: true,
    bio: "Talented tennis player with powerful groundstrokes and exceptional mental toughness. Currently ranked #45 in WTA singles.",
    stats: {
      ranking: 45,
      wins: 28,
      tournaments: 12,
      winPercentage: 73.5,
      aces: 156,
      breakPoints: 68.2,
    },
    funding: {
      goal: 300000,
      raised: 185000,
      investors: 89,
      daysLeft: 32,
      minInvestment: 150,
      revenueShare: 12,
      duration: 4,
    },
    achievements: [
      "WTA Rising Star Award (2023)",
      "French Open Quarterfinalist (2023)",
      "3x ITF Tournament Winner",
      "NCAA Singles Champion (2022)",
    ],
    socialMedia: {
      instagram: "89K",
      twitter: "54K",
      tiktok: "43K",
    },
    careerGoals:
      "Breaking into WTA Top 20 by 2025. Ultimate goal is to win a Grand Slam and represent USA in Olympics.",
    useOfFunds:
      "Professional coaching team, travel expenses for tournaments, fitness training, and equipment upgrades.",
  },
  3: {
    id: 3,
    name: "Diego Rodriguez",
    sport: "Soccer",
    position: "Forward",
    age: 21,
    location: "Barcelona, Spain",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$3.2M",
    growth: "+18%",
    followers: "200K",
    verified: true,
    trending: true,
    bio: "Dynamic forward with exceptional pace and finishing ability. Currently playing for Barcelona B with first team call-ups.",
    stats: {
      goals: 18,
      assists: 12,
      matches: 25,
      shotsOnTarget: 68.5,
      passAccuracy: 84.2,
      dribbleSuccess: 72.1,
    },
    funding: {
      goal: 750000,
      raised: 520000,
      investors: 203,
      daysLeft: 28,
      minInvestment: 200,
      revenueShare: 8,
      duration: 6,
    },
    achievements: [
      "La Liga Youth Player of the Year (2023)",
      "UEFA Youth League Top Scorer (2022)",
      "Spain U21 International (15 caps, 8 goals)",
      "Barcelona B Leading Scorer (2023)",
    ],
    socialMedia: {
      instagram: "200K",
      twitter: "145K",
      tiktok: "89K",
    },
    careerGoals:
      "Breaking into Barcelona first team and becoming a regular starter. Long-term goal is to play for Spain national team in World Cup.",
    useOfFunds: "Personal trainer, nutritionist, mental performance coach, and equipment for optimal performance.",
  },
  4: {
    id: 4,
    name: "Emma Thompson",
    sport: "Swimming",
    position: "Freestyle",
    age: 19,
    location: "Sydney, Australia",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$1.2M",
    growth: "+28%",
    followers: "67K",
    verified: true,
    trending: true,
    bio: "Promising freestyle swimmer with Olympic potential. Current holder of 3 national records in freestyle events.",
    stats: {
      records: 3,
      medals: 8,
      competitions: 15,
      pb50m: "24.12",
      pb100m: "52.89",
      pb200m: "1:56.34",
    },
    funding: {
      goal: 200000,
      raised: 145000,
      investors: 67,
      daysLeft: 38,
      minInvestment: 75,
      revenueShare: 15,
      duration: 3,
    },
    achievements: [
      "3x National Record Holder",
      "Commonwealth Games Gold Medalist (2022)",
      "World Championships Finalist (2023)",
      "Australian Swimmer of the Year (2023)",
    ],
    socialMedia: {
      instagram: "67K",
      twitter: "34K",
      tiktok: "28K",
    },
    careerGoals:
      "Qualifying for Paris 2024 Olympics and winning a medal. Long-term goal is to break world records and inspire young swimmers.",
    useOfFunds: "High-altitude training camps, sports science support, coaching fees, and competition travel expenses.",
  },
  5: {
    id: 5,
    name: "James Wilson",
    sport: "Football",
    position: "Quarterback",
    age: 23,
    location: "Austin, TX",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$4.1M",
    growth: "+12%",
    followers: "310K",
    verified: true,
    trending: true,
    bio: "Elite quarterback with strong arm and exceptional field awareness. Led his college team to national championship game.",
    stats: {
      yards: 3200,
      touchdowns: 28,
      completion: 68.5,
      rating: 156.8,
      rushingYards: 450,
      rushingTDs: 6,
    },
    funding: {
      goal: 1000000,
      raised: 780000,
      investors: 234,
      daysLeft: 22,
      minInvestment: 250,
      revenueShare: 6,
      duration: 7,
    },
    achievements: [
      "Heisman Trophy Finalist (2023)",
      "Big 12 Offensive Player of the Year (2023)",
      "Led team to National Championship Game",
      "School record for passing touchdowns",
    ],
    socialMedia: {
      instagram: "310K",
      twitter: "245K",
      tiktok: "156K",
    },
    careerGoals:
      "Being selected in first round of NFL Draft. Goal is to become a franchise quarterback and win Super Bowl.",
    useOfFunds:
      "NFL combine preparation, quarterback coaching, film study, physical training, and agent representation.",
  },
  6: {
    id: 6,
    name: "Aisha Patel",
    sport: "Track & Field",
    position: "Sprinter",
    age: 21,
    location: "London, UK",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$1.5M",
    growth: "+35%",
    followers: "95K",
    verified: true,
    trending: true,
    bio: "Lightning-fast sprinter with Olympic aspirations. Current British record holder in 100m and 200m events.",
    stats: {
      pb100m: 10.85,
      pb200m: 22.15,
      medals: 6,
      competitions: 18,
      worldRanking: 12,
      seasonBest: 10.89,
    },
    funding: {
      goal: 350000,
      raised: 245000,
      investors: 112,
      daysLeft: 41,
      minInvestment: 100,
      revenueShare: 14,
      duration: 4,
    },
    achievements: [
      "British Record Holder (100m & 200m)",
      "European Championships Silver Medalist",
      "Diamond League Winner (2023)",
      "Commonwealth Games Champion",
    ],
    socialMedia: {
      instagram: "95K",
      twitter: "67K",
      tiktok: "52K",
    },
    careerGoals: "Competing in Paris 2024 Olympics and winning gold medal. Breaking the 10.80 barrier in 100m sprint.",
    useOfFunds:
      "Elite sprint coaching, biomechanics analysis, training camps, competition travel, and recovery equipment.",
  },
  7: {
    id: 7,
    name: "Jake Martinez",
    sport: "Baseball",
    position: "Pitcher",
    age: 21,
    location: "Phoenix, AZ",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$1.9M",
    growth: "+20%",
    followers: "78K",
    verified: true,
    trending: true,
    bio: "Dominant left-handed pitcher with a devastating curveball. Currently the ace of his college team with MLB scouts watching.",
    stats: {
      era: 2.45,
      strikeouts: 156,
      wins: 12,
      whip: 1.15,
      innings: 145.2,
      saves: 0,
    },
    funding: {
      goal: 400000,
      raised: 280000,
      investors: 95,
      daysLeft: 35,
      minInvestment: 125,
      revenueShare: 11,
      duration: 5,
    },
    achievements: [
      "Conference Pitcher of the Year (2023)",
      "All-American Third Team (2023)",
      "Perfect Game in College World Series",
      "School record for strikeouts in a season",
    ],
    socialMedia: {
      instagram: "78K",
      twitter: "45K",
      tiktok: "32K",
    },
    careerGoals:
      "Being drafted in the first round of MLB Draft. Goal is to pitch in the World Series and win Cy Young Award.",
    useOfFunds: "Pitching coach, biomechanics analysis, strength training, and showcase participation fees.",
  },
  8: {
    id: 8,
    name: "Tommy Chen",
    sport: "Baseball",
    position: "Shortstop",
    age: 22,
    location: "San Francisco, CA",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$1.6M",
    growth: "+18%",
    followers: "65K",
    verified: true,
    trending: false,
    bio: "Versatile infielder with excellent defensive skills and clutch hitting ability. Team captain with strong leadership qualities.",
    stats: {
      average: 0.325,
      homers: 18,
      rbis: 67,
      steals: 22,
      fielding: 0.985,
      ops: 0.892,
    },
    funding: {
      goal: 320000,
      raised: 195000,
      investors: 78,
      daysLeft: 29,
      minInvestment: 100,
      revenueShare: 13,
      duration: 4,
    },
    achievements: [
      "Conference Player of the Year (2023)",
      "Golden Glove Award Winner",
      "Team Captain for 2 years",
      "Academic All-American",
    ],
    socialMedia: {
      instagram: "65K",
      twitter: "38K",
      tiktok: "25K",
    },
    careerGoals:
      "Making it to the major leagues and becoming an All-Star player. Long-term goal is to coach baseball after playing career.",
    useOfFunds: "Hitting coach, fielding training, strength conditioning, and professional showcase fees.",
  },
  9: {
    id: 9,
    name: "Carlos Rodriguez",
    sport: "Baseball",
    position: "Outfielder",
    age: 20,
    location: "Miami, FL",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$2.1M",
    growth: "+25%",
    followers: "92K",
    verified: true,
    trending: true,
    bio: "Power-hitting outfielder with incredible speed and arm strength. Considered one of the top prospects in college baseball.",
    stats: {
      average: 0.34,
      homers: 22,
      rbis: 78,
      stolen: 28,
      slugging: 0.625,
      ops: 1.045,
    },
    funding: {
      goal: 450000,
      raised: 315000,
      investors: 134,
      daysLeft: 33,
      minInvestment: 150,
      revenueShare: 9,
      duration: 5,
    },
    achievements: [
      "Freshman All-American (2022)",
      "Conference Home Run Leader (2023)",
      "Team MVP Award Winner",
      "USA Baseball National Team Member",
    ],
    socialMedia: {
      instagram: "92K",
      twitter: "56K",
      tiktok: "41K",
    },
    careerGoals: "Being a top-5 pick in MLB Draft. Dream is to play in the World Series and win MVP award.",
    useOfFunds: "Elite hitting coach, speed training, nutrition program, and professional development.",
  },
  10: {
    id: 10,
    name: "Maria Gonzalez",
    sport: "Tennis",
    position: "Singles",
    age: 19,
    location: "Madrid, Spain",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$1.4M",
    growth: "+30%",
    followers: "67K",
    verified: true,
    trending: true,
    bio: "Rising tennis star with aggressive baseline play and mental toughness. Currently climbing the WTA rankings rapidly.",
    stats: {
      ranking: 78,
      wins: 22,
      tournaments: 8,
      winPercentage: 71.2,
      aces: 89,
      breakPoints: 65.8,
    },
    funding: {
      goal: 250000,
      raised: 165000,
      investors: 72,
      daysLeft: 26,
      minInvestment: 100,
      revenueShare: 16,
      duration: 3,
    },
    achievements: [
      "ITF Junior Grand Slam Winner",
      "Spanish National Champion U21",
      "WTA Tour First Title (2023)",
      "Fed Cup Team Member",
    ],
    socialMedia: {
      instagram: "67K",
      twitter: "41K",
      tiktok: "35K",
    },
    careerGoals: "Breaking into WTA Top 30 and winning a Grand Slam title. Representing Spain in Olympics.",
    useOfFunds: "World-class coaching team, travel expenses, fitness training, and mental performance coaching.",
  },
  11: {
    id: 11,
    name: "Alex Petrov",
    sport: "Tennis",
    position: "Singles",
    age: 21,
    location: "Moscow, Russia",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$1.7M",
    growth: "+16%",
    followers: "73K",
    verified: true,
    trending: false,
    bio: "Powerful serve-and-volley player with classic tennis style. Known for his mental strength and clutch performances.",
    stats: {
      ranking: 52,
      wins: 25,
      tournaments: 10,
      winPercentage: 68.9,
      aces: 234,
      breakPoints: 58.3,
    },
    funding: {
      goal: 380000,
      raised: 225000,
      investors: 98,
      daysLeft: 31,
      minInvestment: 125,
      revenueShare: 12,
      duration: 4,
    },
    achievements: [
      "ATP Challenger Tour Winner (3x)",
      "Davis Cup Team Member",
      "NCAA Singles Finalist",
      "European Junior Champion",
    ],
    socialMedia: {
      instagram: "73K",
      twitter: "48K",
      tiktok: "29K",
    },
    careerGoals:
      "Breaking into ATP Top 20 and winning an ATP Masters 1000 event. Long-term goal is Grand Slam victory.",
    useOfFunds: "Elite coaching, travel for tournaments, fitness training, and equipment upgrades.",
  },
  12: {
    id: 12,
    name: "Jordan Smith",
    sport: "Golf",
    position: "Professional",
    age: 23,
    location: "Augusta, GA",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$2.3M",
    growth: "+14%",
    followers: "105K",
    verified: true,
    trending: true,
    bio: "Precision golfer with exceptional putting skills. Currently competing on professional tours with major championship aspirations.",
    stats: {
      handicap: -2,
      tournaments: 15,
      earnings: 450000,
      avgScore: 69.8,
      fairwaysHit: 72.5,
      greensInReg: 68.9,
    },
    funding: {
      goal: 600000,
      raised: 420000,
      investors: 167,
      daysLeft: 39,
      minInvestment: 200,
      revenueShare: 7,
      duration: 6,
    },
    achievements: [
      "PGA Tour Rookie of the Year Candidate",
      "Korn Ferry Tour Winner (2x)",
      "NCAA Individual Champion",
      "Walker Cup Team Member",
    ],
    socialMedia: {
      instagram: "105K",
      twitter: "78K",
      tiktok: "52K",
    },
    careerGoals:
      "Winning a major championship and becoming a top-10 player in the world. Goal is to play in Ryder Cup.",
    useOfFunds: "Swing coach, caddie expenses, travel costs, and equipment optimization.",
  },
  13: {
    id: 13,
    name: "Emily Watson",
    sport: "Golf",
    position: "Professional",
    age: 21,
    location: "Scottsdale, AZ",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$1.5M",
    growth: "+28%",
    followers: "68K",
    verified: true,
    trending: true,
    bio: "Young golf prodigy with incredible distance and accuracy. Rising star on the LPGA Tour with major potential.",
    stats: {
      handicap: -1,
      tournaments: 12,
      earnings: 280000,
      avgScore: 71.2,
      fairwaysHit: 69.8,
      greensInReg: 65.4,
    },
    funding: {
      goal: 280000,
      raised: 175000,
      investors: 83,
      daysLeft: 27,
      minInvestment: 100,
      revenueShare: 15,
      duration: 4,
    },
    achievements: [
      "LPGA Tour First Victory (2023)",
      "Symetra Tour Leading Money Winner",
      "Curtis Cup Team Member",
      "NCAA Division I Champion",
    ],
    socialMedia: {
      instagram: "68K",
      twitter: "42K",
      tiktok: "38K",
    },
    careerGoals: "Winning multiple major championships and becoming world #1. Inspiring young girls to play golf.",
    useOfFunds: "Professional coaching, fitness training, travel expenses, and mental performance coaching.",
  },
  14: {
    id: 14,
    name: "Ryan Park",
    sport: "Golf",
    position: "Professional",
    age: 24,
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    location: "Seoul, South Korea",
    valuation: "$1.8M",
    growth: "+19%",
    followers: "82K",
    verified: true,
    trending: false,
    bio: "Consistent golfer with excellent course management and mental game. Known for his clutch performances under pressure.",
    stats: {
      handicap: -3,
      tournaments: 18,
      earnings: 380000,
      avgScore: 69.5,
      fairwaysHit: 75.2,
      greensInReg: 71.3,
    },
    funding: {
      goal: 420000,
      raised: 285000,
      investors: 115,
      daysLeft: 34,
      minInvestment: 150,
      revenueShare: 10,
      duration: 5,
    },
    achievements: [
      "Asian Tour Winner (3x)",
      "PGA Tour Card Holder",
      "Korean National Champion",
      "Presidents Cup Team Member",
    ],
    socialMedia: {
      instagram: "82K",
      twitter: "59K",
      tiktok: "31K",
    },
    careerGoals:
      "Winning on PGA Tour and representing Korea in Olympics. Long-term goal is major championship victory.",
    useOfFunds: "Swing analysis technology, caddie support, travel costs, and performance optimization.",
  },
  15: {
    id: 15,
    name: "Michael Johnson Jr",
    sport: "Track & Field",
    position: "Distance Runner",
    age: 22,
    location: "Eugene, OR",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$1.3M",
    growth: "+24%",
    followers: "71K",
    verified: true,
    trending: true,
    bio: "Elite distance runner following in his father's footsteps. Specializes in 5K and 10K with Olympic aspirations.",
    stats: {
      pb5k: "13:45",
      pb10k: "28:30",
      marathonPB: "2:15:30",
      competitions: 16,
      medals: 9,
      worldRanking: 18,
    },
    funding: {
      goal: 220000,
      raised: 155000,
      investors: 68,
      daysLeft: 25,
      minInvestment: 75,
      revenueShare: 17,
      duration: 3,
    },
    achievements: [
      "NCAA 5K Champion (2023)",
      "US National Team Member",
      "Diamond League Winner",
      "World Championships Finalist",
    ],
    socialMedia: {
      instagram: "71K",
      twitter: "45K",
      tiktok: "33K",
    },
    careerGoals:
      "Qualifying for Paris 2024 Olympics and winning a medal. Breaking American records in distance events.",
    useOfFunds: "High-altitude training, sports science support, coaching fees, and competition travel.",
  },
  16: {
    id: 16,
    name: "Lisa Thompson",
    sport: "Track & Field",
    position: "High Jumper",
    age: 20,
    location: "Portland, OR",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$1.1M",
    growth: "+32%",
    followers: "58K",
    verified: true,
    trending: false,
    bio: "Talented high jumper with exceptional technique and competitive spirit. Rising star in field events.",
    stats: {
      personalBest: "1.95m",
      competitions: 14,
      medals: 8,
      worldRanking: 25,
      seasonBest: "1.92m",
      consistency: 85.7,
    },
    funding: {
      goal: 180000,
      raised: 125000,
      investors: 56,
      daysLeft: 30,
      minInvestment: 50,
      revenueShare: 18,
      duration: 3,
    },
    achievements: [
      "NCAA High Jump Champion",
      "US Junior Record Holder",
      "World Junior Championships Medalist",
      "Conference Athlete of the Year",
    ],
    socialMedia: {
      instagram: "58K",
      twitter: "32K",
      tiktok: "24K",
    },
    careerGoals: "Breaking the 2.00m barrier and competing in Olympics. Inspiring young athletes in field events.",
    useOfFunds: "Technical coaching, biomechanics analysis, strength training, and competition expenses.",
  },
  17: {
    id: 17,
    name: "David Kim",
    sport: "Swimming",
    position: "Butterfly",
    age: 20,
    location: "Los Angeles, CA",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$1.4M",
    growth: "+26%",
    followers: "74K",
    verified: true,
    trending: true,
    bio: "Butterfly specialist with powerful stroke technique and exceptional underwater skills. Olympic medal contender.",
    stats: {
      pb100m: "52.34",
      pb200m: "1:56.78",
      medals: 6,
      competitions: 13,
      worldRanking: 15,
      records: 2,
    },
    funding: {
      goal: 260000,
      raised: 185000,
      investors: 79,
      daysLeft: 36,
      minInvestment: 100,
      revenueShare: 14,
      duration: 4,
    },
    achievements: [
      "NCAA 100m Butterfly Champion",
      "US National Team Member",
      "World Championships Finalist",
      "American Record Holder (relay)",
    ],
    socialMedia: {
      instagram: "74K",
      twitter: "48K",
      tiktok: "36K",
    },
    careerGoals:
      "Winning Olympic gold in butterfly events and breaking world records. Inspiring Asian-American swimmers.",
    useOfFunds: "Elite coaching, training camps, sports science support, and international competition travel.",
  },
  18: {
    id: 18,
    name: "Sophie Anderson",
    sport: "Swimming",
    position: "Backstroke",
    age: 21,
    location: "Denver, CO",
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    valuation: "$1.3M",
    growth: "+22%",
    followers: "69K",
    verified: true,
    trending: false,
    bio: "Backstroke specialist with smooth technique and strong finishing speed. Consistent performer at major competitions.",
    stats: {
      pb100m: "59.45",
      pb200m: "2:08.12",
      medals: 7,
      competitions: 15,
      worldRanking: 22,
      records: 1,
    },
    funding: {
      goal: 240000,
      raised: 165000,
      investors: 71,
      daysLeft: 28,
      minInvestment: 75,
      revenueShare: 16,
      duration: 4,
    },
    achievements: [
      "NCAA 200m Backstroke Champion",
      "US National Championships Medalist",
      "World University Games Gold",
      "Conference Record Holder",
    ],
    socialMedia: {
      instagram: "69K",
      twitter: "43K",
      tiktok: "31K",
    },
    careerGoals: "Making the Olympic team and winning a medal. Breaking American records in backstroke events.",
    useOfFunds: "Technical coaching, video analysis, strength training, and competition preparation.",
  },
}

export default function AthleteProfilePage({ params }: { params: { id: string } }) {
  const athlete = athleteData[params.id as keyof typeof athleteData]

  if (!athlete) {
    notFound()
  }

  const fundingProgress = (athlete.funding.raised / athlete.funding.goal) * 100

  return (
    <div className="min-h-screen bg-slate-900">
      <Header />

      <main className="pt-8">
        {/* Hero Section */}
        <section className="relative">
          <div className="h-64 bg-gradient-to-r from-slate-800 to-slate-700 relative overflow-hidden">
            <img
              src={athlete.coverImage || "/placeholder.svg"}
              alt="Cover"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-32 pb-8">
              <div className="flex flex-col lg:flex-row items-start lg:items-end space-y-4 lg:space-y-0 lg:space-x-6">
                {/* Profile Image */}
                <div className="relative">
                  <img
                    src={athlete.image || "/placeholder.svg"}
                    alt={athlete.name}
                    className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 border-slate-900 object-cover"
                  />
                  {athlete.verified && (
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-slate-900">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {athlete.trending && (
                      <Badge className="bg-amber-500 text-slate-900 font-semibold">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    {athlete.verified && (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{athlete.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-slate-300 mb-4">
                    <span className="flex items-center">
                      <Trophy className="h-4 w-4 mr-1" />
                      {athlete.sport} • {athlete.position}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {athlete.age} years old
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {athlete.location}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{athlete.valuation}</div>
                      <div className="text-slate-400 text-sm">Valuation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">{athlete.growth}</div>
                      <div className="text-slate-400 text-sm">Growth</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {athlete.followers}
                      </div>
                      <div className="text-slate-400 text-sm">Followers</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white bg-transparent">
                    <Heart className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:text-white bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Link href={`/invest/${athlete.id}`}>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold px-8">
                      <Star className="h-4 w-4 mr-2" />
                      Invest Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="space-y-6">
                  <TabsList className="bg-slate-800 border-slate-700">
                    <TabsTrigger
                      value="overview"
                      className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900"
                    >
                      Overview
                    </TabsTrigger>
                    <TabsTrigger
                      value="stats"
                      className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900"
                    >
                      Performance
                    </TabsTrigger>
                    <TabsTrigger
                      value="pitch"
                      className="data-[state=active]:bg-amber-500 data-[state=active]:text-slate-900"
                    >
                      Investment Pitch
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-6">
                    {/* Bio */}
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white">About {athlete.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300 leading-relaxed mb-6">{athlete.bio}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h4 className="text-white font-semibold mb-3">Social Media</h4>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Instagram className="h-4 w-4 text-pink-400" />
                                  <span className="text-slate-300 text-sm">Instagram</span>
                                </div>
                                <span className="text-white font-semibold">{athlete.socialMedia.instagram}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <Twitter className="h-4 w-4 text-blue-400" />
                                  <span className="text-slate-300 text-sm">Twitter</span>
                                </div>
                                <span className="text-white font-semibold">{athlete.socialMedia.twitter}</span>
                              </div>
                            </div>
                          </div>

                          <div className="md:col-span-2">
                            <h4 className="text-white font-semibold mb-3">Key Achievements</h4>
                            <ul className="space-y-2">
                              {athlete.achievements.map((achievement, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <Trophy className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                  <span className="text-slate-300 text-sm">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Career Goals */}
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Target className="h-5 w-5 mr-2 text-amber-400" />
                          Career Goals
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300 leading-relaxed">{athlete.careerGoals}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="stats" className="space-y-6">
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <BarChart3 className="h-5 w-5 mr-2 text-amber-400" />
                          Current Season Stats
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                          {Object.entries(athlete.stats).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-3xl font-bold text-white mb-1">{value}</div>
                              <div className="text-slate-400 text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Chart Placeholder */}
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white">Performance Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-64 bg-slate-900/50 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <BarChart3 className="h-12 w-12 text-slate-600 mx-auto mb-2" />
                            <p className="text-slate-400">Interactive performance charts coming soon</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="pitch" className="space-y-6">
                    {/* Investment Pitch Video */}
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white">Investment Pitch</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-slate-900/50 rounded-lg flex items-center justify-center mb-4">
                          <Button className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                            <Play className="h-6 w-6 mr-2" />
                            Watch Pitch Video
                          </Button>
                        </div>
                        <p className="text-slate-300 text-sm">
                          Watch {athlete.name}'s personal investment pitch and learn about their journey, goals, and why
                          they're seeking investment.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Use of Funds */}
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardHeader>
                        <CardTitle className="text-white">Use of Funds</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-300 leading-relaxed">{athlete.useOfFunds}</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Investment Card */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <DollarSign className="h-5 w-5 mr-2 text-amber-400" />
                      Investment Opportunity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300">Funding Progress</span>
                        <span className="text-white font-semibold">
                          ${athlete.funding.raised.toLocaleString()} / ${athlete.funding.goal.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={fundingProgress} className="h-2" />
                      <div className="text-right text-slate-400 text-sm">{Math.round(fundingProgress)}% funded</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-white">{athlete.funding.investors}</div>
                        <div className="text-slate-400 text-sm">Investors</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">{athlete.funding.daysLeft}</div>
                        <div className="text-slate-400 text-sm">Days Left</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Min. Investment:</span>
                        <span className="text-white">${athlete.funding.minInvestment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Revenue Share:</span>
                        <span className="text-white">{athlete.funding.revenueShare}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Duration:</span>
                        <span className="text-white">{athlete.funding.duration} years</span>
                      </div>
                    </div>

                    <Link href={`/invest/${athlete.id}`}>
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold">
                        Invest Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Recent Updates */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Updates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-semibold">Performance Update</span>
                        <span className="text-slate-400 text-xs">2 days ago</span>
                      </div>
                      <p className="text-slate-300 text-sm">Achieved new personal best in recent competition</p>
                    </div>
                    <div className="p-3 bg-slate-900/50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-white text-sm font-semibold">Training Update</span>
                        <span className="text-slate-400 text-xs">1 week ago</span>
                      </div>
                      <p className="text-slate-300 text-sm">Started working with new elite coaching team</p>
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
