// lib/update-investor-profile.ts
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export interface InvestorUpdatePayload {
  // core
  fullName: string;
  phone: string;
  dob: string; // YYYY-MM-DD
  state_of_residence: string | null;
  city: string | null;
  zip: string | null;
  address: string | null;
  country: string | null;

  // financial
  annual_income_range: string | null;
  net_worth_range: string | null;
  investment_experience: string | null;
  risk_tolerance: string | null;
  investment_goals: string | null;

  // compliance
  accredited_investor_status: string | null; // "Yes" | "No" | "Unsure"
  citizenship: string | null;
  source_of_funds: string | null;
  investment_horizon: string | null; // "Short-term" | "Medium-term" | "Long-term"
  kyc_status: string | null;
  aml_status: string | null;

  // extras present in backend response
  household_income?: string | null;
  profession?: string | null;

  // IMPORTANT: backend expects a number
  expected_investment_amount?: number | null;

  // Optional checks on update
  terms_of_service_check?: boolean;
  privacy_policy_check?: boolean;
  risk_disclosure_statement_check?: boolean;
}

export interface InvestorUpdateResponse {
  success: boolean;
  message: string;
  execution_time?: string;
  data?: any;
}

// UI → API value maps (based on your selects)
const incomeMap: Record<string, string> = {
  "under-50k": "Under $50K",
  "50k-100k": "$50K - $100K",
  "100k-250k": "$100K - $250K",
  "250k-500k": "$250K - $500K",
  "over-500k": "Over $500K",
};

const netWorthMap: Record<string, string> = {
  "under-100k": "Under $100K",
  "100k-500k": "$100K - $500K",
  "500k-1m": "$500K - $1M",
  "1m-5m": "$1M - $5M",
  "over-5m": "Over $5M",
};

const experienceMap: Record<string, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  experienced: "Experienced",
  expert: "Advanced",
};

const riskToleranceMap: Record<string, string> = {
  conservative: "Conservative",
  moderate: "Moderate",
  aggressive: "Aggressive",
  "very-aggressive": "Very Aggressive",
};

const horizonMap: Record<string, string> = {
  short: "Short-term",
  medium: "Medium-term",
  long: "Long-term",
};

/** Parse currency-like strings to a number; empty/invalid -> null */
function toNumberOrNull(v?: string): number | null {
  if (!v) return null;
  const cleaned = v.replace(/[^0-9.]/g, "");
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

// Build payload from page state
export const buildInvestorUpdatePayload = (opts: {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  financialInfo: {
    annualIncome: string;          // keys in incomeMap
    netWorth: string;              // keys in netWorthMap
    investmentExperience: string;  // keys in experienceMap
    riskTolerance: string;         // keys in riskToleranceMap
    investmentGoals: string;
    liquidNetWorth: string;
    employmentStatus: string;
    employer: string;
    householdIncome?: string;
    expectedInvestmentAmount?: string; // parsed to number
    profession?: string;
  };
  complianceInfo: {
    accreditedInvestor: string;    // "yes" | "no" | "unsure"
    politicallyExposed: string;
    taxId: string;
    citizenship: string;
    investmentHorizon: string;     // keys in horizonMap
    sourceOfFunds: string;
    kycStatus: string;
    amlStatus: string;
  };
  requiredChecks?: {
    terms: boolean;
    privacy: boolean;
    risk: boolean;
  };
}): InvestorUpdatePayload => {
  const { personalInfo, financialInfo, complianceInfo, requiredChecks } = opts;

  const fullName = [personalInfo.firstName, personalInfo.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  const base: InvestorUpdatePayload = {
    fullName,
    phone: personalInfo.phone || "",
    dob: personalInfo.dateOfBirth || "",
    state_of_residence: personalInfo.state || null,
    city: personalInfo.city || null,
    zip: personalInfo.zipCode || null,
    address: personalInfo.address || null,
    country: personalInfo.country || null,

    annual_income_range: incomeMap[financialInfo.annualIncome] ?? null,
    net_worth_range: netWorthMap[financialInfo.netWorth] ?? null,
    investment_experience: experienceMap[financialInfo.investmentExperience] ?? null,
    risk_tolerance: riskToleranceMap[financialInfo.riskTolerance] ?? null,
    investment_goals: financialInfo.investmentGoals || null,

    accredited_investor_status:
      financialInfo?.investmentExperience === undefined && complianceInfo.accreditedInvestor === ""
        ? null
        : complianceInfo.accreditedInvestor === "yes"
        ? "Yes"
        : complianceInfo.accreditedInvestor === "no"
        ? "No"
        : complianceInfo.accreditedInvestor === "unsure"
        ? "Unsure"
        : null,
    citizenship: complianceInfo.citizenship || null,
    source_of_funds: complianceInfo.sourceOfFunds || null,
    investment_horizon: horizonMap[complianceInfo.investmentHorizon] ?? null,
    kyc_status: complianceInfo.kycStatus || null,
    aml_status: complianceInfo.amlStatus || null,

    // extras
    household_income: financialInfo.householdIncome || null,
    profession:
      (financialInfo.profession && financialInfo.profession.trim()) ||
      (financialInfo.employmentStatus && financialInfo.employmentStatus.trim()) ||
      (financialInfo.employer && financialInfo.employer.trim()) ||
      null,
    expected_investment_amount: toNumberOrNull(financialInfo.expectedInvestmentAmount), // number
  };

  if (requiredChecks) {
    base.terms_of_service_check = !!requiredChecks.terms;
    base.privacy_policy_check = !!requiredChecks.privacy;
    base.risk_disclosure_statement_check = !!requiredChecks.risk;
  }

  return base;
};

export const updateInvestorProfile = async (
  payload: InvestorUpdatePayload
): Promise<InvestorUpdateResponse> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No authentication token found");

  const res = await fetch(`${API_BASE_URL}/investor/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-key": "1234abcd-5678-efgh-9101-ijklmnopqrst",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    let json: any = {};
    try { json = JSON.parse(text); } catch {}
    throw new Error(json.message || `Failed to update profile (HTTP ${res.status})`);
  }

  return res.json();
};
