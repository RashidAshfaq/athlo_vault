import { API_BASE_URL } from "./api";

export interface NewCareerGoalPayload {
  goalTitle: string;
  description: string;
  category: "Professional" | "Achievement" | "Team" | "Business" | "Legacy";
  priority: "High" | "Medium" | "Low";
  targetDate: string;
  milestones: { name: string }[];
}
export interface Milestone {
  id: number;
  name: string;
  targetDate: string;
  isCompleted?: boolean;
  inProgress?: boolean;
}

export interface CareerGoalData {
  goalTitle: string;
  description: string;
  category: string;
  priority: string;
  targetDate: string;
  milestones: Milestone[];
}

export interface CareerGoalResponse {
  success: boolean;
  message: string;
  execution_time: string;
  data: CareerGoalData;
}




export const createCareerGoal = async (
  payload: NewCareerGoalPayload,
  token: string
): Promise<CareerGoalResponse> => {
  const res = await fetch(`${API_BASE_URL}/athlete/career-goals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "1234abcd-5678-efgh-9101-ijklmnopqrst",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to create career goal");
  }

  const data = await res.json(); // data is entire response
  console.log("📤 Parsed Response JSON:", data);

  return data; // this matches CareerGoalResponse now ✅
};

