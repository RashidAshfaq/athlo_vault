import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MapPin, TrendingUp, Users } from "lucide-react"
import type { Athlete } from "@/lib/athlete-data"

interface AthleteCardProps {
  athlete: Athlete
}

export function AthleteCard({ athlete }: AthleteCardProps) {
  const fundingProgress = athlete.funding ? (athlete.funding.raised / athlete.funding.goal) * 100 : 0

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors duration-200">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={athlete.image || `/placeholder.svg?height=200&width=300&text=${encodeURIComponent(athlete.name)}`}
            alt={athlete.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          {athlete.trending && (
            <Badge className="absolute top-2 right-2 bg-amber-500 text-slate-900">
              <TrendingUp className="h-3 w-3 mr-1" />
              Trending
            </Badge>
          )}
          {athlete.featured && <Badge className="absolute top-2 left-2 bg-blue-500 text-white">Featured</Badge>}
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-white">{athlete.name}</h3>
            <div className="flex items-center justify-between text-sm text-slate-400">
              <span className="capitalize">{athlete.sport}</span>
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {athlete.location}
              </div>
            </div>
          </div>

          <p className="text-slate-300 text-sm line-clamp-2">{athlete.bio}</p>

          {athlete.funding && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Funding Progress</span>
                <span className="text-white font-medium">{Math.round(fundingProgress)}%</span>
              </div>
              <Progress value={fundingProgress} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">${athlete.funding.raised.toLocaleString()} raised</span>
                <div className="flex items-center text-slate-400">
                  <Users className="h-3 w-3 mr-1" />
                  {athlete.funding.investors}
                </div>
              </div>
            </div>
          )}

          <div className="flex space-x-2 pt-2">
            <Link href={`/athletes/${athlete.id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full border-slate-600 text-slate-300 hover:text-white bg-transparent"
              >
                View Profile
              </Button>
            </Link>
            {athlete.funding && (
              <Link href={`/invest/${athlete.id}`} className="flex-1">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900">Invest</Button>
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
