// lib/add-investor-api.ts

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface InvestorProfilePayload {
  fullName: string;
  phone: string;
  dob: string; // YYYY-MM-DD
  state_of_residence: string;
  city: string;
  zip: string;
  annual_income_range: string;
  investment_experience: string;
  terms_of_service_check: boolean;
  privacy_policy_check: boolean;
  risk_disclosure_statement_check: boolean;
}

export interface InvestorProfileResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const createInvestorProfile = async (
  profileData: InvestorProfilePayload
): Promise<InvestorProfileResponse> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  

  // Debug logs (mask token)
  console.log("📤 Sending Investor payload:", profileData);
  console.log("🔑 Using token:", token.substring(0, 20) + "...");

  const res = await fetch(`${API_BASE_URL}/investor/profile`, {
    method: "PUT", // <- create should be POST
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-key": "1234abcd-5678-efgh-9101-ijklmnopqrst",
      Accept: "application/json",
    },
    body: JSON.stringify(profileData),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Investor profile API error:", res.status, text);
    let json: any = {};
    try {
      json = JSON.parse(text);
    } catch {}
    throw new Error(json.message || `Failed to create investor profile (HTTP ${res.status})`);
  }

  const data = await res.json();
  console.log("✅ API Response:", data);
  return data;
};
