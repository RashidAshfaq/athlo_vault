export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

/* -------------------- SIGNUP -------------------- */

// Payload for the signup request
export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: string;
}

// Response structure expected from the backend for signup
export interface SignupResponse {
  success: boolean;
  message: string;
  execution_time: string;
  data: {
    userId: number;
    id: number;
    created_at: string;
    firstName: string;
    lastName: string;
    accountType: string;
    role: string;
    email: string;
    access_token: string;
    refresh_token: string;
    [key: string]: any; // allow optional fields
  };
}

// Signup API call
export const signupUser = async (
  userData: SignupPayload
): Promise<SignupResponse> => {
  console.log("Signup Payload:", userData);

  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "1234abcd-5678-efgh-9101-ijklmnopqrst", // Replace with your actual API key
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Signup failed");
  }

  return res.json();
};

/* -------------------- LOGIN -------------------- */

export interface LoginPayload {
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  execution_time: string;
  data: {
    access_token: string;
    refresh_token: string;
    role: string;
    [key: string]: any;
  };
}

export const loginUser = async (
  credentials: LoginPayload
): Promise<LoginResponse> => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "1234abcd-5678-efgh-9101-ijklmnopqrst",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Login failed");
  }

  return res.json();
};
