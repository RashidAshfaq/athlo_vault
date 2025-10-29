"use client";

import { useEffect, useState } from "react";
import { AthleteLayout } from "@/components/athlete-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin,
  Trophy,
  Target,
  Globe,
  Twitter,
  Instagram,
  Linkedin,
  Edit,
  Share,
} from "lucide-react";
import Link from "next/link";
import { getAthleteProfile } from "@/lib/getAthleteProfile";

export default function AthleteProfilePreview() {
  const [athleteData, setAthleteData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await getAthleteProfile();
      console.log("Fetched athlete profile:", res.data); // <-- add this
      if (res.success && res.data) {
        setAthleteData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, []);

  if (loading) {
    return (
      <AthleteLayout title="Profile Preview" description="Loading athlete profile...">
        <p className="text-slate-300">Loading...</p>
      </AthleteLayout>
    );
  }

  if (!athleteData) {
    return (
      <AthleteLayout title="Profile Preview" description="No profile data found">
        <p className="text-slate-300">No data available</p>
      </AthleteLayout>
    );
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
            src={
              athleteData.coverPhoto
                ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${athleteData.coverPhoto}`
                : "/placeholder.svg?height=300&width=800"
            }
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-16 left-6">
          <Avatar className="w-32 h-32 border-4 border-slate-950">
            <AvatarImage
              src={
                athleteData.profile_picture
                  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${athleteData.profile_picture}`
                  : "/placeholder.svg"
              }
              alt={athleteData.fullName}
            />
            <AvatarFallback className="bg-slate-800 text-white text-2xl">
              {athleteData.fullName
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Profile Header */}
      <div className="mt-16 mb-6">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-start lg:justify-between lg:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{athleteData.fullName}</h1>
            <div className="flex flex-wrap items-center gap-2 text-slate-400">
              <span>{athleteData.positionOrSpeciality}</span>
              <span>•</span>
              <span>{athleteData.organizationName}</span>
              <span>•</span>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {athleteData.location}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
              <span>Height: {athleteData.height}</span>
              <span>Weight: {athleteData.weight}</span>
              <span>Experience: {athleteData.yearOfExperience} years</span>
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
              <p className="text-slate-300 leading-relaxed">
                {athleteData.about || "No about section provided."}
              </p>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Achievements
              </h2>
              <div className="p-3 bg-slate-800/50 rounded-lg text-slate-300">
                {athleteData.keyAchievements || "No achievements listed."}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Current Performance */}
          <Card className="bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2" />
                Current Performance
              </h2>
              <div className="p-3 bg-slate-800/50 rounded-lg text-slate-300">
                {athleteData.currentPerformance || "No performance data available."}
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
                {athleteData.socialMedia?.personalWebsiteUrl && (
                  <a
                    href={athleteData.socialMedia.personalWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50"
                  >
                    <Globe className="h-4 w-4 text-slate-400 mr-3" />
                    <span className="text-slate-300 text-sm">Website</span>
                  </a>
                )}
                {athleteData.socialMedia?.twitterFollowers && (
                  <div className="flex items-center p-3 bg-slate-800/50 rounded-lg">
                    <Twitter className="h-4 w-4 text-blue-400 mr-3" />
                    <span className="text-slate-300 text-sm">
                      {athleteData.socialMedia.twitterFollowers} Twitter Followers
                    </span>
                  </div>
                )}
                {athleteData.socialMedia?.instagramFollowers && (
                  <div className="flex items-center p-3 bg-slate-800/50 rounded-lg">
                    <Instagram className="h-4 w-4 text-pink-400 mr-3" />
                    <span className="text-slate-300 text-sm">
                      {athleteData.socialMedia.instagramFollowers} Instagram Followers
                    </span>
                  </div>
                )}
                {athleteData.socialMedia?.linkedFollowers && (
                  <div className="flex items-center p-3 bg-slate-800/50 rounded-lg">
                    <Linkedin className="h-4 w-4 text-blue-600 mr-3" />
                    <span className="text-slate-300 text-sm">
                      {athleteData.socialMedia.linkedFollowers} LinkedIn Followers
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AthleteLayout>
  );
}
