// ===============================================
// admin-dashboard.ts  (Updated Full Version)
// ===============================================

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ---------- Types ----------
export interface AdminDashboardResponse {
  success: boolean;
  message?: string;
  data?: {
    stats?: {
      totalUsers?: number;
      totalInvestments?: number;
      activeAthletes?: number;
      pendingApprovals?: number;
      monthlyGrowth?: number;
      investmentGrowth?: number;
      complianceRate?: number;
      platformUptime?: number;
    };
    users?: Array<{
      id: string | number;
      name?: string;
      email: string;
      role?: string;
      status?: string;
      joinDate?: string;
      lastActive?: string;
      verificationStatus?: string;
      onboardingStage?: string;
      location?: string | null;
      phone?: string | null;
      totalFunding?: number | null;
      investmentDuration?: number | null;
      minInvestment?: number | null;
    }>;
    approvals?: Array<{
      id: string | number;
      name: string;
      type: string;
      submittedDate?: string;
      status?: string;
      documents?: string[];
      sport?: string;
      investmentLimit?: string;
      kycStatus?: string;
      profileData?: any;
    }>;
    purchaseRequests?: Array<{
      id: string | number;
      athleteName: string;
      athleteId?: string | number;
      item: string;
      category: string;
      amount: number;
      vendor?: string;
      status: "pending" | "approved" | "rejected";
      submittedDate?: string;
      reviewedDate?: string | null;
      description?: string;
      adminNotes?: string | null;
      urgency?: "urgent" | "high" | "medium" | "low";
      justification?: string;
      type?: string;
      submittedBy?: string;
    }>;
    pagination?: {
      page?: number;
      limit?: number;
      total?: number;
      totalPages?: number;
    };
  };
}

// ---------- Auth Header ----------
function buildAuthHeaders() {
  const raw =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;

  let accessToken: string | undefined;
  try {
    const obj = raw ? JSON.parse(raw) : undefined;
    accessToken = obj?.access_token ?? obj?.data?.access_token ?? undefined;
  } catch {
    accessToken = undefined;
  }

  return {
    "Content-Type": "application/json",
    "x-api-key": "1234abcd-5678-efgh-9101-ijklmnopqrst",
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
}

// ---------- Dashboard ----------
type DashboardQuery = {
  page?: number;
  limit?: number;
  status?: string;
  role?: string;
  approvalStatus?: string;
  search?: string;
  filter?: "users" | "approvals" | "requests";
};

export async function fetchAdminDashboard(
  { page = 1, limit = 10, status, role, approvalStatus, search, filter }: DashboardQuery = {},
  signal?: AbortSignal
): Promise<AdminDashboardResponse> {
  const base = (flt?: DashboardQuery["filter"]) => {
    const u = new URL(`${API_BASE_URL}/admin/dashboard`);
    u.searchParams.set("page", String(page));
    u.searchParams.set("limit", String(limit));
    if (status) u.searchParams.set("status", status);
    if (role) u.searchParams.set("role", role);
    if (approvalStatus) u.searchParams.set("approvalStatus", approvalStatus);
    if (search) u.searchParams.set("search", search);
    if (flt) u.searchParams.set("filter", flt);
    return u;
  };

  async function doFetch(url: URL) {
    const res = await fetch(url.toString(), {
      method: "GET",
      headers: buildAuthHeaders(),
      signal,
    });

    if (res.status === 401) {
      const msg = (await res.json().catch(() => ({})))?.message || "Unauthorized";
      const e = new Error(msg);
      (e as any).code = 401;
      throw e;
    }

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Failed to load admin dashboard (${res.status})`);
    }

    return res.json();
  }

  if (filter) {
    const raw = await doFetch(base(filter));
    return normalizeDashboard(raw, { page, limit });
  }

  const [rawUsers, rawRequests, rawApprovals] = await Promise.allSettled([
    doFetch(base("users")),
    doFetch(base("requests")),
    doFetch(base("approvals")),
  ]);

  const merged: any = {
    success:
      (rawUsers.status === "fulfilled" && rawUsers.value?.success) ||
      (rawRequests.status === "fulfilled" && rawRequests.value?.success) ||
      (rawApprovals.status === "fulfilled" && rawApprovals.value?.success) ||
      true,
    message: "OK",
    data: {
      summary:
        (rawUsers.status === "fulfilled" && rawUsers.value?.data?.summary) ||
        (rawRequests.status === "fulfilled" && rawRequests.value?.data?.summary) ||
        (rawApprovals.status === "fulfilled" && rawApprovals.value?.data?.summary) ||
        {},
      users:
        (rawUsers.status === "fulfilled" && rawUsers.value?.data?.users) || { data: [], meta: {} },
      requests:
        (rawRequests.status === "fulfilled" && rawRequests.value?.data?.requests) || { data: [], meta: {} },
      approvals:
        (rawApprovals.status === "fulfilled" && rawApprovals.value?.data?.approvals) || { data: [], meta: {} },
    },
  };

  return normalizeDashboard(merged, { page, limit });
}

function normalizeDashboard(raw: any, fallback: { page: number; limit: number }): AdminDashboardResponse {
  const summary = raw?.data?.summary ?? {};

  const usersObj = raw?.data?.users ?? {};
  const usersArr = Array.isArray(usersObj?.data) ? usersObj.data : [];
  const usersMeta = usersObj?.meta ?? {};

  const requestsObj = raw?.data?.requests ?? {};
  const requestsArr = Array.isArray(requestsObj?.data) ? requestsObj.data : [];
  const requestsMeta = requestsObj?.meta ?? {};

  const approvalsObj = raw?.data?.approvals ?? {};
  const approvalsArr = Array.isArray(approvalsObj?.data) ? approvalsObj.data : [];
  const approvalsMeta = approvalsObj?.meta ?? {};

  return {
    success: !!raw?.success,
    message: raw?.message,
    data: {
      stats: {
        totalUsers: Number(summary.totalUsers ?? 0),
        totalInvestments: Number(summary.total_investment ?? 0),
        activeAthletes: Number(summary.activeAthletes ?? 0),
        pendingApprovals: Number(summary.pendingApprovals ?? 0),
        monthlyGrowth: Number(summary.growthPct ?? 0),
        investmentGrowth: Number(summary.investmentGrowth ?? 0),
        complianceRate: Number(summary.complianceRate ?? 0),
        platformUptime: Number(summary.platformUptime ?? 0),
      },
      users: usersArr.map((u: any) => ({
        id: u.id,
        name: (u.name ?? `${u.firstName ?? ""} ${u.lastName ?? ""}`)?.trim(),
        email: u.email,
        role: u.role ?? "user",
        status: u.status ?? "pending",
        joinDate: u.joinDate ?? u.join_date ?? "-",
        lastActive: u.lastActive ?? u.last_active ?? "-",
        verificationStatus: u.verificationStatus ?? "pending",
        onboardingStage: u.onboardingStage ?? "unknown",
        location: u.location ?? "",
        phone: u.phone ?? "",
        totalFunding: Number(u.total_funding ?? 0),
        investmentDuration: Number(u.investment_duration ?? 0),
        minInvestment: Number(u.min_investment ?? 0),
      })),
      purchaseRequests: requestsArr.map((r: any) => ({
        id: r.id,
        athleteName: r.athlete?.fullName ?? "-",
        athleteId: r.athlete?.id ?? "",
        item: r.itemServiceDescription ?? "",
        category: r.category ?? "",
        amount: Number(r.amount ?? 0),
        vendor: r.vendorProvider ?? "-",
        status: (r.requestStatus ?? "pending") as "pending" | "approved" | "rejected",
        submittedDate: r.submitDate ?? "-",
        reviewedDate: r.reviewedOn ?? null,
        description: r.detailDescription ?? "",
        adminNotes: r.admin_note ?? null,
        urgency: (r.urgencyLevel ?? "medium") as "urgent" | "high" | "medium" | "low",
        justification: r.careerDevelopmentJustification ?? "",
        type: "",
        submittedBy: "",
      })),
      approvals: approvalsArr.map((a: any) => ({
        id: a.id,
        name: a.name ?? a.athlete?.fullName ?? "-",
        type: a.type ?? "athlete",
        submittedDate: a.submittedDate ?? a.created_at ?? "-",
        status: a.status ?? "pending",
        documents: a.documents ?? [],
        sport: a.sport ?? a.athlete?.primarySport ?? "",
        investmentLimit: a.investmentLimit,
        kycStatus: a.kycStatus,
        profileData: a.profileData ?? a.athlete ?? {},
      })),
      pagination: {
        page: Number(usersMeta.page ?? requestsMeta.page ?? approvalsMeta.page ?? fallback.page),
        limit: Number(
          usersMeta.per_page ?? requestsMeta.per_page ?? approvalsMeta.per_page ?? fallback.limit
        ),
        total: Number(usersMeta.total ?? requestsMeta.total ?? approvalsMeta.total ?? 0),
        totalPages: Number(
          usersMeta.total_pages ?? requestsMeta.total_pages ?? approvalsMeta.total_pages ?? 1
        ),
      },
    },
  };
}

// ---------- Update User ----------
export type UpdateUserPayload = {
  userId: string | number;
  location?: string;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  phone?: string | null;
  totalFunding?: number;
  investmentDuration?: number;
  minInvestment?: number;
};

export type UpdateUserResult = {
  success: boolean;
  message?: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    phone?: string;
    location?: string;
    totalFunding?: number;
    investmentDuration?: number;
    minInvestment?: number;
  };
};

export async function updateUserProfile(
  payload: UpdateUserPayload
): Promise<UpdateUserResult> {
  if (!payload?.userId) throw new Error("userId is required");

  const url = new URL(`${API_BASE_URL}/admin/update_user_profile`);
  url.searchParams.set("userId", String(payload.userId));

  if (payload.location) url.searchParams.set("location", payload.location);
  if (payload.name) url.searchParams.set("name", payload.name);
  if (payload.email) url.searchParams.set("email", payload.email);
  if (payload.role) url.searchParams.set("role", payload.role);
  if (payload.status) url.searchParams.set("status", payload.status);
  if (typeof payload.phone !== "undefined" && payload.phone !== null)
    url.searchParams.set("phone", String(payload.phone));

  // ✅ New athlete fields
  if (payload.totalFunding)
    url.searchParams.set("total_funding", String(payload.totalFunding));
  if (payload.investmentDuration)
    url.searchParams.set("investment_duration", String(payload.investmentDuration));
  if (payload.minInvestment)
    url.searchParams.set("min_investment", String(payload.minInvestment));

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: buildAuthHeaders(),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || `Update failed (${res.status})`);
  }

  const raw = await res.json();
  const updated = raw?.data?.data ?? {};

  return {
    success: !!raw?.success,
    message: raw?.data?.message || raw?.message,
    user: {
      id: String(updated.id ?? payload.userId),
      name: updated.name ?? "",
      email: updated.email ?? "",
      role: updated.role ?? "user",
      status: updated.status ?? "pending",
      phone: updated.phone ?? "",
      location: updated.location ?? "",
      totalFunding: Number(updated.total_funding ?? payload.totalFunding ?? 0),
      investmentDuration: Number(updated.investment_duration ?? payload.investmentDuration ?? 0),
      minInvestment: Number(updated.min_investment ?? payload.minInvestment ?? 0),
    },
  };
}

// ---------- Messaging ----------
export type SendBulkMessagesPayload = {
  message: string;
  userIds: (string | number)[];
};

export type SendBulkMessagesResult = {
  success: boolean;
  message?: string;
  messageId?: string;
  recipients?: (string | number)[];
};

export async function sendBulkMessages(
  payload: SendBulkMessagesPayload
): Promise<SendBulkMessagesResult> {
  if (
    !payload?.message?.trim() ||
    !Array.isArray(payload.userIds) ||
    payload.userIds.length === 0
  ) {
    throw new Error("Message and at least one userId are required");
  }

  const res = await fetch(`${API_BASE_URL}/admin/send_bulk_messages`, {
    method: "POST",
    headers: buildAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      err?.message || `Failed to send bulk messages (${res.status})`
    );
  }

  const raw = await res.json();
  return {
    success: !!raw?.success,
    message: raw?.message,
    messageId: raw?.data?.messageId,
    recipients: raw?.data?.recipients,
  };
}

// ---------- Bulk Purchase Status ----------
export type BulkPurchaseStatus = "approved" | "rejected";

export type BulkPurchaseStatusPayload = {
  purchaseIds: (string | number)[];
  status: BulkPurchaseStatus;
  note?: string;
};

export type BulkPurchaseStatusResult = {
  success: boolean;
  message?: string;
  updated: number;
  notFound: number;
  alreadyInStatus: number;
  targetStatus: BulkPurchaseStatus;
  updatedIds: (string | number)[];
  requests: Array<{
    id: string | number;
    detailDescription?: string | null;
    approvedBy?: { id: number } | null;
    reviewedOn?: string | null;
    admin_note?: string | null;
    requestStatus: "pending" | "approved" | "rejected";
  }>;
};

export async function bulkUpdatePurchaseStatus(
  payload: BulkPurchaseStatusPayload
): Promise<BulkPurchaseStatusResult> {
  if (!Array.isArray(payload.purchaseIds) || payload.purchaseIds.length === 0)
    throw new Error("purchaseIds is required");
  if (!payload.status) throw new Error("status is required");

  const res = await fetch(`${API_BASE_URL}/admin/bulk_purchase_status`, {
    method: "POST",
    headers: buildAuthHeaders(),
    body: JSON.stringify({
      purchaseIds: payload.purchaseIds,
      status: payload.status,
      note: payload.note ?? "",
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.message || `Bulk update failed (${res.status})`);
  }

  const raw = await res.json();
  const d = raw?.data ?? {};
  return {
    success: !!raw?.success,
    message: raw?.message,
    updated: Number(d.updated ?? 0),
    notFound: Number(d.notFound ?? 0),
    alreadyInStatus: Number(d.alreadyInStatus ?? 0),
    targetStatus: (d.targetStatus ?? payload.status) as BulkPurchaseStatus,
    updatedIds: Array.isArray(d.updatedIds) ? d.updatedIds : [],
    requests: Array.isArray(d.requests) ? d.requests : [],
  };
}
