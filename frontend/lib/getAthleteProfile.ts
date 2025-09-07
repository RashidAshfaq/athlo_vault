import { API_BASE_URL } from "./api";

export interface AthleteProfileAPIResponse {
  success: boolean;
  message: string;
  execution_time: string;
  data?: any; // you can replace `any` with a detailed type if you want
}

export const getAthleteProfile = async (): Promise<AthleteProfileAPIResponse> => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No authentication token found");
  }

  const res = await fetch(`${API_BASE_URL}/athlete/profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "x-api-key": "1234abcd-5678-efgh-9101-ijklmnopqrst", // your API key
    },
  });


  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to fetch athlete profile");
  }

  return res.json();
};
