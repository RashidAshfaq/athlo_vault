import { API_BASE_URL } from "./api";

// Keeping for type hints; real request uses FormData
export interface AthleteProfileUpdatePayload {
  fullName: string;
  phone: string;
  dob: string;
  location: string;
  primarySport: string;
  positionOrSpeciality?: string;
  organizationName?: string;
  yearOfExperience?: string;
  keyAchievements?: string;
  currentPerformance?: string;
  felonyConviction: boolean;
  felonyDescription?: string;
  height: string;
  weight: string;
  biography?: string;
  about?: string;
  coach: {
    name: string;
    email: string;
    phone: string;
    yearOfWorkTogether: string;
    achievementAndBackground: string;
  };
  socialMedia: {
    twitterFollowers?: string;
    instagramFollowers?: string;
    linkedFollowers?: string;
    personalWebsiteUrl?: string;
  };
  fundingGoal: {
    fundUses?: string;
    revenueSharePercentage?: string;
    currentGoalsTimelines?: string;
  };
}

export const updateAthleteProfile = async (
  data: AthleteProfileUpdatePayload,
  token: string
): Promise<{ success: boolean; message: string }> => {
  const formData = new FormData();

  formData.append("fullName", data.fullName);
  formData.append("phone", data.phone);
  formData.append("dob", data.dob);
  formData.append("location", data.location);
  formData.append("primarySport", data.primarySport);
  if (data.positionOrSpeciality) formData.append("positionOrSpeciality", data.positionOrSpeciality);
  if (data.organizationName) formData.append("organizationName", data.organizationName);
  if (data.yearOfExperience) formData.append("yearOfExperience", data.yearOfExperience);
  if (data.keyAchievements) formData.append("keyAchievements", data.keyAchievements);
  if (data.currentPerformance) formData.append("currentPerformance", data.currentPerformance);
  formData.append("felonyConviction", String(data.felonyConviction));
  if (data.felonyDescription) formData.append("felonyDescription", data.felonyDescription);
  formData.append("height", data.height);
  formData.append("weight", data.weight);
  if (data.biography) formData.append("biography", data.biography);
  if (data.about) formData.append("about", data.about);

  // Coach
  formData.append("coach[name]", data.coach.name);
  formData.append("coach[email]", data.coach.email);
  formData.append("coach[phone]", data.coach.phone);
  formData.append("coach[yearOfWorkTogether]", data.coach.yearOfWorkTogether);
  formData.append("coach[achievementAndBackground]", data.coach.achievementAndBackground);

  // Social media
  if (data.socialMedia.twitterFollowers)
    formData.append("socialMedia[twitterFollowers]", data.socialMedia.twitterFollowers);
  if (data.socialMedia.instagramFollowers)
    formData.append("socialMedia[instagramFollowers]", data.socialMedia.instagramFollowers);
  if (data.socialMedia.linkedFollowers)
    formData.append("socialMedia[linkedFollowers]", data.socialMedia.linkedFollowers);
  if (data.socialMedia.personalWebsiteUrl)
    formData.append("socialMedia[personalWebsiteUrl]", data.socialMedia.personalWebsiteUrl);

  // Funding goals
  if (data.fundingGoal.fundUses)
    formData.append("fundingGoal[fundUses]", data.fundingGoal.fundUses);
  if (data.fundingGoal.revenueSharePercentage)
    formData.append("fundingGoal[revenueSharePercentage]", data.fundingGoal.revenueSharePercentage);
  if (data.fundingGoal.currentGoalsTimelines)
    formData.append("fundingGoal[currentGoalsTimelines]", data.fundingGoal.currentGoalsTimelines);

  console.log("📤 Sending FormData update payload:", Object.fromEntries(formData.entries()));

  const res = await fetch(`${API_BASE_URL}/athlete/profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-api-key": "1234abcd-5678-efgh-9101-ijklmnopqrst",
    },
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Profile update failed");
  }

  const responseData = await res.json();
  console.log("✅ Profile update response:", responseData);
  return responseData;
};
