"use client";

import { API_BASE_URL } from "@/lib/api"; // reuse your base URL constant

/* -------------------- PURCHASE REQUEST -------------------- */

export interface PurchaseRequestPayload {
  category: string;
  amount: number;
  itemServiceDescription: string;
  vendorProvider: string;
  careerDevelopmentJustification: string;
  urgencyLevel: "low" | "medium" | "high" | "urgent";
  detailDescription?: string;
}
interface Request {
  id: string;
  item: string;
  category: string;
  amount: number;
  vendor: string;
  status: string;
  submittedDate: string;
  reviewedDate: string | null;   //  always string or null
  description: string;
  adminNotes: string | null;
  urgency: string;
  justification: string;
}


export interface PurchaseRequestResponse {
  success: boolean;
  message: string;
  execution_time: string;
  data: {
    id: number;
    created_at: number;
    category: string;
    amount: number;
    itemServiceDescription: string;
    vendorProvider: string;
    careerDevelopmentJustification: string;
    urgencyLevel: string;
    detailDescription?: string;
    reviewedOn?: string | null;
    admin_note?: string | null;
    requestStatus: string;
    submitDate: string;
    athlete: any;
  };
}

export const submitPurchaseRequest = async (
  payload: PurchaseRequestPayload,
  token?: string
): Promise<PurchaseRequestResponse> => {
  const res = await fetch(`${API_BASE_URL}/athlete/purchase-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "1234abcd-5678-efgh-9101-ijklmnopqrst",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || "Failed to submit purchase request");
  }

  return res.json();
};
