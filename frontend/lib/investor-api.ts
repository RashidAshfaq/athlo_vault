// lib/investor-api.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface InvestorProfile {
  userId: number;
  id: number;
  created_at: string;
  firstName: string | null;
  lastName: string | null;
  accountType: string | null;
  profile_picture: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zip: string | null;
  role: string | null;
  email: string;
  isApproved: boolean;
  isProfileCompleted: boolean;
  last_active: string | null;
  fullName: string | null;
  phone: string | null;
  dob: string | null; // "YYYY-MM-DD"
  state_of_residence: string | null;
  household_income: string | null;
  profession: string | null;
  expected_investment_amount: string | null;
  investment_experience: string | null;
  risk_tolerance: string | null;
  terms_of_service_check: boolean | null;
  privacy_policy_check: boolean | null;
  risk_disclosure_statement_check: boolean | null;
  address: string | null;
  annual_income_range: string | null;
  net_worth_range: string | null;
  investment_goals: string | null;
  accredited_investor_status: string | null;
  citizenship: string | null;
  source_of_funds: string | null;
  investment_horizon: string | null;
  kyc_status: string | null;
  aml_status: string | null;
}

export interface InvestorProfileApiResponse {
  success: boolean;
  message: string;
  execution_time: string;
  data: InvestorProfile;
}

export async function getInvestorProfile(): Promise<InvestorProfile> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(`${API_BASE_URL}/investor/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-key": "1234abcd-5678-efgh-9101-ijklmnopqrst",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    let msg = `Failed to fetch investor profile (HTTP ${res.status})`;
    try {
      const j = await res.json();
      if (j?.message) msg = j.message;
    } catch {}
    throw new Error(msg);
  }

  const json: InvestorProfileApiResponse = await res.json();
  return json.data;
}
