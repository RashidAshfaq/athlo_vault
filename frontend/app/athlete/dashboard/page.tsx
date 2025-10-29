"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AthleteLayout } from "@/components/athlete-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  Users,
  DollarSign,
  Edit,
  Eye,
  Bell,
  Settings,
  Star,
  Target,
  FileCodeIcon as FileContract,
  ShoppingCart,
  CheckCircle,
  Clock,
  AlertCircle,
  Trophy,
  Save,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { updateSeasonStats, Sport as SportType } from "@/lib/season-stats-api"
import { getAthleteProfile } from "@/lib/getAthleteProfile"

interface AthleteUser {
  userId: number
  id: number
  created_at: number
  firstName: string
  lastName: string
  fullName: string
  email: string
  phone: string
  dob: string
  accountType: string
  profile_picture: string
  coverPhoto: string
  city: string
  state?: string | null
  country?: string | null
  zip?: string | null
  role: string
  isApproved: boolean
  isProfileCompleted: boolean
  location: string
  primarySport: string
  positionOrSpeciality: string
  organizationName: string
  yearOfExperience: number
  keyAchievements: string
  currentPerformance: string
  felonyConviction: boolean
  felonyDescription: string
  height: number
  weight: number
  biography?: string | null
  about: string
  access_token: string
  refresh_token: string

  fundingGoal?: {
    id: number
    created_at: number
    fundUses: string
    revenueSharePercentage: number
    currentGoalsTimelines: string
  }

  socialMedia?: {
    id: number
    created_at: number
    twitterFollowers: number
    instagramFollowers: number
    linkedFollowers: number
    personalWebsiteUrl: string
  }

  coach?: {
    id: number
    created_at: number
    name: string
    email: string
    phone: string
    yearOfWorkTogether: number
    achievementAndBackground: string
  }

  /** Backend-provided *current* season stats for the user's primary sport. */
  currentSeasonStats?: Record<string, number>
}

/** ---------- Season Stats Config (UI fields + type) ---------- */
type Sport =
  | "Baseball"
  | "Basketball"
  | "Football"
  | "Golf"
  | "Soccer"
  | "Swimming"
  | "Tennis"
  | "track and field"

type FieldType = "int" | "float"
type StatField = { key: string; label: string; type: FieldType }

const SPORT_FIELDS: Record<Sport, StatField[]> = {
  Baseball: [
    { key: "era", label: "ERA", type: "float" },
    { key: "strikeouts", label: "Strikeouts", type: "int" },
    { key: "wins", label: "Wins", type: "int" },
    { key: "whip", label: "WHIP", type: "float" },
    { key: "innings", label: "Innings Pitched", type: "int" },
    { key: "saves", label: "Saves", type: "int" },
  ],
  Basketball: [
    { key: "points", label: "Points", type: "int" },
    { key: "assists", label: "Assists", type: "int" },
    { key: "rebounds", label: "Rebounds", type: "int" },
    { key: "fieldGoal", label: "Field Goal %", type: "float" },
    { key: "threePoint", label: "3PT %", type: "float" },
    { key: "freeThrow", label: "FT %", type: "float" },
  ],
  Football: [
    { key: "yards", label: "Passing Yards", type: "int" },
    { key: "touchdowns", label: "Passing TDs", type: "int" },
    { key: "completion", label: "Completion", type: "int" },
    { key: "rating", label: "QB Rating", type: "float" },
    { key: "rushingYards", label: "Rushing Yards", type: "int" },
    { key: "rushingTds", label: "Rushing TDs", type: "int" },
  ],
  Golf: [
    { key: "handicap", label: "Handicap", type: "float" },
    { key: "tournaments", label: "Tournaments", type: "int" },
    { key: "earnings", label: "Earnings", type: "float" },
    { key: "avgScore", label: "Average Score", type: "float" },
    { key: "fairwaysHit", label: "Fairways Hit %", type: "float" },
    { key: "greensInReg", label: "GIR %", type: "float" },
  ],
  Soccer: [
    { key: "goals", label: "Goals", type: "int" },
    { key: "assists", label: "Assists", type: "int" },
    { key: "matches", label: "Matches", type: "int" },
    { key: "shotOnTarget", label: "Shots on Target", type: "int" },
    { key: "passAccuracy", label: "Pass Accuracy %", type: "float" },
    { key: "dribbleSuccess", label: "Dribble Success %", type: "float" },
  ],
  Swimming: [
    { key: "records", label: "Records", type: "int" },
    { key: "medals", label: "Medals", type: "int" },
    { key: "competitions", label: "Competitions", type: "int" },
    { key: "pb50m", label: "PB 50m (s)", type: "float" },
    { key: "pb100m", label: "PB 100m (s)", type: "float" },
    { key: "pb200m", label: "PB 200m (s)", type: "float" },
  ],
  Tennis: [
    { key: "ranking", label: "Ranking", type: "int" },
    { key: "wins", label: "Wins", type: "int" },
    { key: "tournaments", label: "Tournaments", type: "int" },
    { key: "winPercentage", label: "Win %", type: "float" },
    { key: "aces", label: "Aces", type: "int" },
    { key: "breakPoints", label: "Break Points Won", type: "int" },
  ],
  "track and field": [
    { key: "pb100m", label: "PB 100m (s)", type: "float" },
    { key: "pb200m", label: "PB 200m (s)", type: "float" },
    { key: "medals", label: "Medals", type: "int" },
    { key: "competitions", label: "Competitions", type: "int" },
    { key: "worldRankings", label: "World Ranking", type: "int" },
    { key: "seasonBest", label: "Season Best (s)", type: "float" },
  ],
}

/** Frontend → Backend column name mapping */
const FIELD_NAME_MAP: Record<Sport, Record<string, string>> = {
  Baseball: {
    era: "era",
    strikeouts: "strikeouts",
    wins: "wins",
    whip: "whip",
    innings: "innings",
    saves: "saves",
  },
  Basketball: {
    points: "points",
    assists: "assists",
    rebounds: "rebounds",
    fieldGoal: "fieldGoal",
    threePoint: "threePoint",
    freeThrow: "freeThrow",
  },
  Football: {
    yards: "yards",
    touchdowns: "touchdowns",
    completion: "completion",
    rating: "rating",
    rushingYards: "rushingYards",
    rushingTds: "rushingTds",
  },
  Golf: {
    handicap: "handicap",
    tournaments: "tournaments",
    earnings: "earnings",
    avgScore: "avgScore",
    fairwaysHit: "fairwaysHit",
    greensInReg: "greensInReg",
  },
  Soccer: {
    goals: "goals",
    assists: "assists",
    matches: "matches",
    shotOnTarget: "shotOnTarget",
    passAccuracy: "passAccuracy",
    dribbleSuccess: "dribbleSuccess",
  },
  Swimming: {
    records: "records",
    medals: "medals",
    competitions: "competitions",
    pb50m: "pb50m",
    pb100m: "pb100m",
    pb200m: "pb200m",
  },
  Tennis: {
    ranking: "ranking",
    wins: "wins",
    tournaments: "tournaments",
    winPercentage: "winPercentage",
    aces: "aces",
    breakPoints: "breakPoints",
  },
  "track and field": {
    pb100m: "pb100m",
    pb200m: "pb200m",
    medals: "medals",
    competitions: "competitions",
    worldRankings: "worldRankings",
    seasonBest: "seasonBest",
  },
}

/** Build inverse mapping (Backend → UI) */
const invertMap = (obj: Record<string, string>): Record<string, string> => {
  const inv: Record<string, string> = {}
  Object.entries(obj).forEach(([uiKey, beKey]) => (inv[beKey] = uiKey))
  return inv
}

export default function AthleteDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<AthleteUser | null>(null)
  const [loading, setLoading] = useState(true)

  // season-stats local UI state
  const [seasonStats, setSeasonStats] = useState<Record<string, string>>({})
  const [previousSeasonStats, setPreviousSeasonStats] = useState<Record<string, string>>({})
  const [savingStats, setSavingStats] = useState(false)

  // helpers for inputs
  const onlyDigits = (v: string) => v.replace(/[^\d]/g, "")
  const onlyNumberLike = (v: string) => v.replace(/[^\d.]/g, "")

  const sport: Sport | "" = (user?.primarySport as Sport) || ""

  const BLANK_FOR_SPORT = useMemo(() => {
    if (!sport || !SPORT_FIELDS[sport]) return {}
    const blank: Record<string, string> = {}
    SPORT_FIELDS[sport].forEach((f) => (blank[f.key] = ""))
    return blank
  }, [sport])

  /** map backend stats → UI fields (as strings) */
  const toUiStats = (s: Sport | "", backendStats?: Record<string, number>): Record<string, string> => {
    if (!s || !backendStats) return { ...BLANK_FOR_SPORT }
    const backendToUi = invertMap(FIELD_NAME_MAP[s])
    const filled: Record<string, string> = { ...BLANK_FOR_SPORT }
    Object.entries(backendStats).forEach(([beKey, value]) => {
      const uiKey = backendToUi[beKey]
      if (!uiKey) return
      if (typeof value === "number" && Number.isFinite(value)) filled[uiKey] = String(value)
    })
    return filled
  }

  // bootstrap from localStorage, then refresh from API (prefill current + show previous)
  useEffect(() => {
    const init = async () => {
      try {
        const userData = localStorage.getItem("user")
        if (!userData) {
          router.replace("/auth/signin")
          return
        }

        const parsedUser: AthleteUser = JSON.parse(userData)
        if (parsedUser.role !== "athlete") {
          router.replace("/auth/signin")
          return
        }

        setUser(parsedUser)

        const res = await getAthleteProfile()
        if (res?.success && res?.data) {
          setUser((prev) => {
            const merged = { ...(prev || parsedUser), ...res.data }
            const mergedSport = (merged.primarySport || "") as Sport
            if (mergedSport && SPORT_FIELDS[mergedSport]) {
              const prevUi = toUiStats(mergedSport, merged.currentSeasonStats)
              setPreviousSeasonStats(prevUi)
              setSeasonStats(prevUi) // prefill inputs with existing data
            } else {
              setPreviousSeasonStats({})
              setSeasonStats({})
            }
            return merged as AthleteUser
          })
        } else {
          const parsedSport = (parsedUser.primarySport || "") as Sport
          if (parsedSport && SPORT_FIELDS[parsedSport]) {
            setPreviousSeasonStats({ ...BLANK_FOR_SPORT })
            setSeasonStats({ ...BLANK_FOR_SPORT })
          }
        }
      } catch (error) {
        console.error("Error loading dashboard:", error)
        router.replace("/auth/signin")
      } finally {
        setLoading(false)
      }
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  // when sport or backend currentSeasonStats change, refresh previous + current UI values
  useEffect(() => {
    if (!user) return
    const s: Sport | "" = (user.primarySport as Sport) || ""
    if (!s) {
      setPreviousSeasonStats({})
      setSeasonStats({})
      return
    }
    const prevUi = toUiStats(s, user.currentSeasonStats)
    setPreviousSeasonStats(prevUi)
    // only set current if inputs are empty or keys differ (e.g., sport changed)
    setSeasonStats((old) => {
      const keysOld = Object.keys(old)
      const keysNew = Object.keys(prevUi)
      const sameKeys = keysOld.length === keysNew.length && keysOld.every((k) => keysNew.includes(k))
      const isEmpty = keysOld.length === 0 || keysOld.every((k) => (old[k] ?? "").trim() === "")
      return isEmpty || !sameKeys ? prevUi : old
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.primarySport, user?.currentSeasonStats])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-400"></div>
        <span className="ml-4">Loading Dashboard...</span>
      </div>
    )
  }

  if (!user) return null

  const profileCompletion = user.isProfileCompleted
  const currentFunding = user.fundingGoal?.currentGoalsTimelines || 0
  const fundingPercentage = user.fundingGoal?.revenueSharePercentage ? Math.min(user.fundingGoal.revenueSharePercentage, 100) : 0

  const handleSeasonStatChange = (key: string, value: string, type: FieldType) => {
    setSeasonStats((prev) => ({
      ...prev,
      [key]: type === "int" ? onlyDigits(value) : onlyNumberLike(value),
    }))
  }

  const validateSeasonStats = (): string[] => {
    const errors: string[] = []
    const s = (user?.primarySport || "") as Sport
    const fields = SPORT_FIELDS[s] || []
    fields.forEach((f) => {
      const raw = seasonStats[f.key] ?? ""
      if (raw.trim() === "") {
        errors.push(`${f.label} is required`)
        return
      }
      if (f.type === "int" && !/^\d+$/.test(raw)) errors.push(`${f.label} must be an integer`)
      if (f.type === "float" && !/^\d+(\.\d+)?$/.test(raw)) errors.push(`${f.label} must be a number`)
    })
    return errors
  }

  const handleSaveSeasonStats = async () => {
    try {
      const s = (user?.primarySport || "") as Sport
      if (!s) {
        toast({
          title: "Select a sport first",
          description: "Set your Primary Sport in Profile Settings.",
          variant: "destructive",
        })
        return
      }

      const errors = validateSeasonStats()
      if (errors.length) {
        toast({
          title: "Validation Failed",
          description: errors.join("\n"),
          variant: "destructive",
        })
        return
      }

      const token =
        localStorage.getItem("access_token") ||
        localStorage.getItem("token") ||
        localStorage.getItem("auth_token")

      if (!token) {
        toast({
          title: "Not signed in",
          description: "No access token found. Please log in again.",
          variant: "destructive",
        })
        return
      }

      setSavingStats(true)

      const fields = SPORT_FIELDS[s] || []
      const map = FIELD_NAME_MAP[s] || {}

      // Build backend-shaped stats object with numbers
      const stats: Record<string, number> = {}
      fields.forEach((f) => {
        const raw = seasonStats[f.key] ?? ""
        const num = f.type === "int" ? parseInt(raw, 10) : parseFloat(raw)
        const backendKey = map[f.key] ?? f.key
        stats[backendKey] = Number.isFinite(num) ? num : 0
      })

      const res = await updateSeasonStats({ sport: s as SportType, stats }, token)

      toast({
        title: "Season Stats Updated",
        description: res.message || "Stats saved successfully.",
      })

      // Keep inputs as-is and update the previous snapshot + user
      setPreviousSeasonStats(toUiStats(s, stats))
      setUser((prev) => (prev ? { ...prev, currentSeasonStats: { ...stats } } : prev))
    } catch (err: any) {
      console.error("Season stats update failed:", err?.message || err)
      toast({
        title: "Season Stats Update Failed",
        description: err?.message || "An error occurred while updating your season stats.",
        variant: "destructive",
      })
    } finally {
      setSavingStats(false)
    }
  }

  return (
    <AthleteLayout title="Dashboard" description="Welcome back! Here's your performance overview.">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Welcome back, {user.firstName || user.fullName || "Athlete"}! 👋
            </h1>
            <p className="text-slate-400 text-lg">Here's what's happening with your profile today.</p>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/settings">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/profile/preview">
                <Eye className="h-4 w-4 mr-2" />
                Preview Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Profile Completion Status */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/20 mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-lg">Profile Completion</h3>
              <p className="text-slate-300 text-sm">Complete your profile to attract more investors</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-400">{profileCompletion ? 100 : 50}%</div>
              <div className="text-slate-400 text-sm">Complete</div>
            </div>
          </div>
          <Progress value={profileCompletion ? 100 : 50} className="mb-4" />
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <CheckCircle className="h-3 w-3 mr-1" />
              Basic Info
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <CheckCircle className="h-3 w-3 mr-1" />
              Athletic Details
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Clock className="h-3 w-3 mr-1" />
              Coach Information
            </Badge>
            <Badge variant="secondary" className="bg-slate-500/20 text-slate-400 border-slate-500/30">
              <AlertCircle className="h-3 w-3 mr-1" />
              Media Upload
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Current Funding</p>
                <p className="text-2xl font-bold text-white">{Number(currentFunding).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Rvenue Share Percentage</p>
                <p className="text-2xl font-bold text-white">{fundingPercentage.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Investors</p>
                <p className="text-2xl font-bold text-white">24</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +3 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Profile Views</p>
                <p className="text-2xl font-bold text-white">1,247</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-purple-400" />
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Fan Engagement</p>
                <p className="text-2xl font-bold text-white">89%</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-blue-400" />
              </div>
            </div>
            <p className="text-green-400 text-sm mt-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Excellent rating
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Update Season Stats (inline on Dashboard) */}
      <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm mb-8">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <Trophy className="h-5 w-5 mr-2" />
              Update Season Stats
            </CardTitle>
            <CardDescription className="text-slate-400">
              {user.primarySport
                ? `Enter statistics for your current sport: ${user.primarySport}`
                : "Set your Primary Sport in Profile Settings first"}
            </CardDescription>
          </div>
          <Button
            onClick={handleSaveSeasonStats}
            disabled={savingStats || !user.primarySport}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4 md:mt-0"
          >
            <Save className="h-4 w-4 mr-2" />
            {savingStats ? "Saving..." : "Save Season Stats"}
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {!user.primarySport ? (
            <div className="text-slate-400">
              Please set your <span className="text-white font-medium">Primary Sport</span> in{" "}
              <Link href="/athlete/settings" className="text-blue-400 underline">
                Profile Settings
              </Link>{" "}
              to enable season stats.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(SPORT_FIELDS[user.primarySport as Sport] || []).map((f) => (
                  <div key={f.key} className="space-y-2">
                    <label htmlFor={`stat-${f.key}`} className="text-slate-300 block">
                      {f.label}
                    </label>
                    <input
                      id={`stat-${f.key}`}
                      type="text"
                      inputMode={f.type === "int" ? "numeric" : "decimal"}
                      pattern={f.type === "int" ? "[0-9]*" : "[0-9]*[.,]?[0-9]*"}
                      value={seasonStats[f.key] ?? ""}
                      onChange={(e) => handleSeasonStatChange(f.key, e.target.value, f.type)}
                      className="w-full rounded-md bg-slate-800/50 border border-slate-700 px-3 py-2 text-white outline-none focus:border-slate-500"
                    />
                    <div className="text-xs text-slate-400">
                      Prev: <span className="text-slate-200">{previousSeasonStats[f.key] ?? "—"}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <p className="text-blue-300 text-sm">
                  Tip: Fields accept numbers appropriate for {user.primarySport}. Decimals are allowed where relevant
                  (e.g., ERA, PB times).
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions and Smart Contract */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-slate-400">Manage your profile and engagement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/goals">
                <Target className="h-4 w-4 mr-2" />
                Update Career Goals
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/settings">
                <Settings className="h-4 w-4 mr-2" />
                Profile Settings
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/notifications">
                <Bell className="h-4 w-4 mr-2" />
                View Notifications
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FileContract className="h-5 w-5 mr-2" />
              Smart Contract & Requests
            </CardTitle>
            <CardDescription className="text-slate-400">Manage your blockchain contracts and purchases</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/smart-contract">
                <FileContract className="h-4 w-4 mr-2" />
                View Smart Contract
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800"
              asChild
            >
              <Link href="/athlete/purchase-request">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Request Purchase
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </AthleteLayout>
  )
}
