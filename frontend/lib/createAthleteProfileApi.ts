export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface AthleteProfilePayload {
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
  profilePicture?: File;
  coverPhoto?: File;
  governmentId?: File;
  proofOfAthleteStatus?: File;
}

export interface AthleteProfileResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const createAthleteProfile = async (
  profileData: AthleteProfilePayload
): Promise<AthleteProfileResponse> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const formData = new FormData();

  // Append plain fields
  formData.append("fullName", profileData.fullName);
  formData.append("phone", profileData.phone);
  formData.append("dob", profileData.dob);
  formData.append("location", profileData.location);
  formData.append("primarySport", profileData.primarySport);
  if (profileData.positionOrSpeciality)
    formData.append("positionOrSpeciality", profileData.positionOrSpeciality);
  if (profileData.organizationName)
    formData.append("organizationName", profileData.organizationName);
  if (profileData.yearOfExperience)
    formData.append("yearOfExperience", profileData.yearOfExperience);
  if (profileData.keyAchievements)
    formData.append("keyAchievements", profileData.keyAchievements);
  if (profileData.currentPerformance)
    formData.append("currentPerformance", profileData.currentPerformance);
  formData.append("felonyConviction", String(profileData.felonyConviction));
  if (profileData.felonyDescription)
    formData.append("felonyDescription", profileData.felonyDescription);
  formData.append("height", profileData.height);
  formData.append("weight", profileData.weight);
  if (profileData.biography) formData.append("biography", profileData.biography);
  if (profileData.about) formData.append("about", profileData.about);

  // Nested: coach
  formData.append("coach[name]", profileData.coach.name);
  formData.append("coach[email]", profileData.coach.email);
  formData.append("coach[phone]", profileData.coach.phone);
  formData.append("coach[yearOfWorkTogether]", profileData.coach.yearOfWorkTogether);
  formData.append("coach[achievementAndBackground]", profileData.coach.achievementAndBackground);

  // Nested: socialMedia
  if (profileData.socialMedia.twitterFollowers)
    formData.append("socialMedia[twitterFollowers]", profileData.socialMedia.twitterFollowers);
  if (profileData.socialMedia.instagramFollowers)
    formData.append("socialMedia[instagramFollowers]", profileData.socialMedia.instagramFollowers);
  if (profileData.socialMedia.linkedFollowers)
    formData.append("socialMedia[linkedFollowers]", profileData.socialMedia.linkedFollowers);
  if (profileData.socialMedia.personalWebsiteUrl)
    formData.append("socialMedia[personalWebsiteUrl]", profileData.socialMedia.personalWebsiteUrl);

  // Nested: fundingGoal
  if (profileData.fundingGoal.fundUses)
    formData.append("fundingGoal[fundUses]", profileData.fundingGoal.fundUses);
  if (profileData.fundingGoal.revenueSharePercentage)
    formData.append("fundingGoal[revenueSharePercentage]", profileData.fundingGoal.revenueSharePercentage);
  if (profileData.fundingGoal.currentGoalsTimelines)
    formData.append("fundingGoal[currentGoalsTimelines]", profileData.fundingGoal.currentGoalsTimelines);

  // Files
  if (profileData.profilePicture)
    formData.append("profilePicture", profileData.profilePicture);
  if (profileData.coverPhoto)
    formData.append("coverPhoto", profileData.coverPhoto);
  if (profileData.governmentId)
    formData.append("governmentId", profileData.governmentId);
  if (profileData.proofOfAthleteStatus)
    formData.append("proofOfAthleteStatus", profileData.proofOfAthleteStatus);

  // Debug log
  console.log("📤 Sending to API:", Object.fromEntries(formData.entries()));

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
    throw new Error(errorData.message || "Failed to create athlete profile");
  }

  return res.json();
};
