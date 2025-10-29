"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { bulkUpdatePurchaseStatus } from "@/lib/admin-dashboard";
import {
  Bar,
  Line,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  BarChart as ReBarChart,
  LineChart as ReLineChart,
} from "recharts";
import {
  Users,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  UserX,
  Search,
  Mail,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  Clock,
  Bell,
  CreditCard,
  FileCheck,
  Globe,
  PieChartIcon,
  LineChartIcon,
  Activity,
  Calendar,
  MapPin,
  Phone,
  Save,
  X,
  ShoppingCart,
  BarChart as BarChartIcon, // important: icon alias
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  fetchAdminDashboard,
  updateUserProfile,
  sendBulkMessages,
  type AdminDashboardResponse,
} from "@/lib/admin-dashboard";

// ---------------- Types (local UI shapes) ----------------
interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  userType: string;
  isAuthenticated: boolean;
  access_token?: string;
  data?: { access_token?: string };
}

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  lastActive: string;
  verificationStatus: string;
  onboardingStage: string;
  location?: string;
  phone?: string;
  totalFunding?: number;
investmentDuration?: number;
minInvestment?: number;

}

interface ApprovalItem {
  id: string;
  name: string;
  type: string;
  submittedDate: string;
  status: string;
  documents: string[];
  sport?: string;
  investmentLimit?: string;
  kycStatus?: string;
  profileData?: any;
}

type PurchaseStatus = "pending" | "approved" | "rejected";

interface PurchaseRequest {
  id: string;
  athleteName: string;
  athleteId: string;
  item: string;
  category: string;
  amount: number;
  vendor: string;
  status: PurchaseStatus;
  submittedDate: string;
  reviewedDate: string | null;
  description: string;
  adminNotes: string | null;
  urgency: "urgent" | "high" | "medium" | "low";
  justification: string;
  type: string;
  submittedBy: string;
}

export default function AdminDashboard() {
  const router = useRouter();

  // ---------- Auth / user ----------
  const [user, setUser] = useState<User | null>(null);

  // ---------- Pagination ----------
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  // ---------- Loading ----------
  const [loading, setLoading] = useState<boolean>(true);

  // ---------- Filters / UI local states ----------
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApprovals, setSelectedApprovals] = useState<string[]>([]);
  const [messageDialog, setMessageDialog] = useState(false);
  const [bulkMessage, setBulkMessage] = useState("");
  const [viewUserDialog, setViewUserDialog] = useState(false);
  const [editUserDialog, setEditUserDialog] = useState(false);
  const [viewApprovalDialog, setViewApprovalDialog] = useState(false);
  const [viewPurchaseDialog, setViewPurchaseDialog] = useState(false);
  const [contractsDialog, setContractsDialog] = useState(false);
  const [paymentsDialog, setPaymentsDialog] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState<UserData | null>(null);
  const [selectedApprovalDetails, setSelectedApprovalDetails] = useState<ApprovalItem | null>(null);
  const [selectedPurchaseDetails, setSelectedPurchaseDetails] = useState<PurchaseRequest | null>(null);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  // ---------- Stats ----------
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalInvestments: 0,
    activeAthletes: 0,
    pendingApprovals: 0,
    monthlyGrowth: 0,
    investmentGrowth: 0,
    complianceRate: 0,
    platformUptime: 0,
  });

  // ---------- Data lists ----------
  const [userData, setUserData] = useState<UserData[]>([]);
  const [approvalData, setApprovalData] = useState<ApprovalItem[]>([]);
  const [purchaseRequests, setPurchaseRequests] = useState<PurchaseRequest[]>([]);
  const [selectedPurchaseRequests, setSelectedPurchaseRequests] = useState<string[]>([]);

  // ---------- Chart data (static examples) ----------
  const userRoleData = [
    { name: "Athletes", value: 342, color: "#3b82f6" },
    { name: "Investors", value: 189, color: "#10b981" },
    { name: "Fans", value: 716, color: "#f59e0b" },
    { name: "Institutions", value: 12, color: "#8b5cf6" },
  ];

  const investmentTrendData = [
    { month: "Jan", amount: 45000, users: 120 },
    { month: "Feb", amount: 52000, users: 145 },
    { month: "Mar", amount: 48000, users: 132 },
    { month: "Apr", amount: 61000, users: 167 },
    { month: "May", amount: 55000, users: 154 },
    { month: "Jun", amount: 73000, users: 189 },
  ];

  const complianceData = [
    { name: "KYC Complete", value: 94.2, color: "#10b981" },
    { name: "AML Verified", value: 98.7, color: "#3b82f6" },
    { name: "Pending", value: 5.8, color: "#f59e0b" },
    { name: "Failed", value: 1.3, color: "#ef4444" },
  ];

  // ---------- Boot: check user ----------
  useEffect(() => {
    const userDataLS = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!userDataLS) {
      router.push("/auth/signin");
      return;
    }

    const parsedUser = JSON.parse(userDataLS);
    if (parsedUser.userType !== "admin") {
      router.push("/auth/signin");
      return;
    }

    setUser(parsedUser);

    // fallback PRs (only if API returns nothing)
    const adminRequests = JSON.parse(localStorage.getItem("adminPurchaseRequests") || "[]");
    setPurchaseRequests(adminRequests);
  }, [router]);

  // ---------- Fetch dashboard from API (with filters) ----------
  useEffect(() => {
    if (!user) return;
    const controller = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const res: AdminDashboardResponse = await fetchAdminDashboard(
          {
            page,
            limit,
            status: statusFilter !== "all" ? statusFilter : undefined,
            role: roleFilter !== "all" ? roleFilter : undefined,
            search: searchTerm.trim() ? searchTerm.trim() : undefined,
          },
          controller.signal
        );

        // ---- Stats
        const s = res?.data?.stats ?? {};
        setStats((prev) => ({
          totalUsers: s.totalUsers ?? prev.totalUsers,
          totalInvestments: s.totalInvestments ?? prev.totalInvestments,
          activeAthletes: s.activeAthletes ?? prev.activeAthletes,
          pendingApprovals: s.pendingApprovals ?? prev.pendingApprovals,
          monthlyGrowth: s.monthlyGrowth ?? prev.monthlyGrowth,
          investmentGrowth: s.investmentGrowth ?? prev.investmentGrowth,
          complianceRate: s.complianceRate ?? prev.complianceRate,
          platformUptime: s.platformUptime ?? prev.platformUptime,
        }));

        // ---- Users
        if (Array.isArray(res?.data?.users)) {
          setUserData(
            res.data!.users!.map((u) => ({
              id: String(u.id ?? u.email),
              name: (u.name ?? "").trim() || u.email || "Unknown User",
              email: u.email ?? "-",
              role: u.role ?? "user",
              status: u.status ?? "pending",
              joinDate: u.joinDate ?? "-",
              lastActive: u.lastActive ?? "-",
              verificationStatus: u.verificationStatus ?? "pending",
              onboardingStage: u.onboardingStage ?? "unknown",
              location: u.location ?? "",
              phone: u.phone ?? "",
            }))
          );
        } else {
          setUserData([]);
        }

        // ---- Purchase Requests
        if (Array.isArray(res?.data?.purchaseRequests)) {
          const mapped = res.data!.purchaseRequests!;
          setPurchaseRequests(mapped as any);
          localStorage.setItem("adminPurchaseRequests", JSON.stringify(mapped));
        }

        // ---- Approvals
        if (Array.isArray(res?.data?.approvals)) {
          setApprovalData(
            res.data!.approvals!.map((a) => ({
              id: String(a.id),
              name: a.name,
              type: a.type,
              submittedDate: a.submittedDate ?? "-",
              status: a.status ?? "pending",
              documents: a.documents ?? [],
              sport: a.sport,
              investmentLimit: a.investmentLimit,
              kycStatus: a.kycStatus,
              profileData: a.profileData,
            }))
          );
        } else {
          setApprovalData([]);
        }

        // ---- Pagination (prefer users, else requests, else approvals)
        const p = res?.data?.pagination;
        setTotalPages(p?.totalPages ? Number(p.totalPages) : 1);
      } catch (e: any) {
        if (e?.code === 401) {
          router.push("/auth/signin");
          return;
        }
        toast({
          title: "Failed to load dashboard",
          description: e?.message || "Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [user, page, limit, roleFilter, statusFilter, searchTerm, router]);

  // ---------- Handlers ----------
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const handleUserSelection = (userId: string) => {
    setSelectedUsers((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]));
  };

  const handleApprovalSelection = (approvalId: string) => {
    setSelectedApprovals((prev) =>
      prev.includes(approvalId) ? prev.filter((id) => id !== approvalId) : [...prev, approvalId]
    );
  };

  const handlePurchaseRequestSelection = (requestId: string) => {
    setSelectedPurchaseRequests((prev) =>
      prev.includes(requestId) ? prev.filter((id) => id !== requestId) : [...prev, requestId]
    );
  };

  const handleBulkAction = (action: "activate" | "suspend") => {
    toast({
      title: "Action Completed",
      description: `${action} applied to ${selectedUsers.length} users`,
    });
    setSelectedUsers([]);
  };

  const handleBulkPurchaseAction = async (action: "approve" | "reject") => {
  if (selectedPurchaseRequests.length === 0) return;

  const status = action === "approve" ? "approved" : "rejected" as const;
  const note =
    status === "approved"
      ? "Approved in bulk by admin"
      : "Rejected in bulk by admin";

  try {
    const res = await bulkUpdatePurchaseStatus({
      purchaseIds: selectedPurchaseRequests.map((id) => Number(id)),
      status,
      note,
    });

    // Merge API updates into local state
    setPurchaseRequests((prev) =>
      prev.map((r) => {
        const upd = res.requests.find((x) => String(x.id) === String(r.id));
        if (!upd) return r;
        return {
          ...r,
          status: upd.requestStatus,
          reviewedDate: upd.reviewedOn
            ? upd.reviewedOn.split("T")[0]
            : r.reviewedDate,
          adminNotes: upd.admin_note ?? r.adminNotes,
        };
      })
    );

    localStorage.setItem(
      "adminPurchaseRequests",
      JSON.stringify(
        purchaseRequests.map((r) => {
          const upd = res.requests.find((x) => String(x.id) === String(r.id));
          if (!upd) return r;
          return {
            ...r,
            status: upd.requestStatus,
            reviewedDate: upd.reviewedOn
              ? upd.reviewedOn.split("T")[0]
              : r.reviewedDate,
            adminNotes: upd.admin_note ?? r.adminNotes,
          };
        })
      )
    );

    toast({
      title: "Purchase Requests Updated",
      description: `${res.updated} request(s) ${status}.`,
    });
  } catch (e: any) {
    toast({
      title: "Bulk Update Failed",
      description: e?.message || "Could not update purchase requests",
      variant: "destructive",
    });
  } finally {
    setSelectedPurchaseRequests([]);
  }
};


  const handleViewUser = (u: UserData) => {
    setSelectedUserDetails(u);
    setViewUserDialog(true);
  };

  const handleEditUser = (u: UserData) => {
    setEditingUser({ ...u });
    setEditUserDialog(true);
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;

    try {
      const res = await updateUserProfile({
  userId: editingUser.id,
  name: editingUser.name,
  email: editingUser.email,
  role: editingUser.role,
  status: editingUser.status,
  phone: editingUser.phone,
  location: editingUser.location,
  totalFunding: editingUser.totalFunding,
  investmentDuration: editingUser.investmentDuration,
  minInvestment: editingUser.minInvestment,
});

      if (res.success && res.user) {
        setUserData((prev) =>
          prev.map((u) => {
            if (u.id === editingUser.id) {
              return {
                ...u,
                ...res.user,
                id: String(res.user.id ?? u.id),
                joinDate: u.joinDate,
                lastActive: u.lastActive,
                verificationStatus: u.verificationStatus,
                onboardingStage: u.onboardingStage,
              } as UserData;
            }
            return u;
          })
        );

        toast({
          title: "User Updated",
          description: res.message || "User profile has been successfully updated",
        });
        setEditUserDialog(false);
        setEditingUser(null);
      } else {
        toast({
          title: "Update Failed",
          description: res.message || "Could not update user",
          variant: "destructive",
        });
      }
    } catch (e: any) {
      toast({
        title: "Update Error",
        description: e?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const handleViewApproval = (approval: ApprovalItem) => {
    setSelectedApprovalDetails(approval);
    setViewApprovalDialog(true);
  };

  const handleViewPurchaseRequest = (request: PurchaseRequest) => {
    setSelectedPurchaseDetails(request);
    setViewPurchaseDialog(true);
  };

  const handleApprovePurchaseRequest = async (requestId: string, approved: boolean) => {
  const status = approved ? "approved" : "rejected" as const;
  const note = approved
    ? "Approved - Request meets requirements"
    : "Rejected - Does not meet criteria";

  try {
    const res = await bulkUpdatePurchaseStatus({
      purchaseIds: [Number(requestId)],
      status,
      note,
    });

    setPurchaseRequests((prev) =>
      prev.map((r) => {
        const upd = res.requests.find((x) => String(x.id) === String(r.id));
        if (!upd) return r;
        return {
          ...r,
          status: upd.requestStatus,
          reviewedDate: upd.reviewedOn
            ? upd.reviewedOn.split("T")[0]
            : r.reviewedDate,
          adminNotes: upd.admin_note ?? r.adminNotes,
        };
      })
    );

    localStorage.setItem(
      "adminPurchaseRequests",
      JSON.stringify(
        purchaseRequests.map((r) => {
          const upd = res.requests.find((x) => String(x.id) === String(r.id));
          if (!upd) return r;
          return {
            ...r,
            status: upd.requestStatus,
            reviewedDate: upd.reviewedOn
              ? upd.reviewedOn.split("T")[0]
              : r.reviewedDate,
            adminNotes: upd.admin_note ?? r.adminNotes,
          };
        })
      )
    );

    toast({
      title: approved ? "Request Approved" : "Request Rejected",
      description: res.message || `Purchase request has been ${status}.`,
    });

    if (selectedPurchaseDetails?.id === requestId) {
      setViewPurchaseDialog(false);
    }
  } catch (e: any) {
    toast({
      title: "Update Failed",
      description: e?.message || "Could not update request",
      variant: "destructive",
    });
  }
};


  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
    }
    switch (status) {
      case "rejected":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
            <UserX className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "under_review":
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Eye className="h-3 w-3 mr-1" />
            Under Review
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>;
      case "high":
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Low</Badge>;
      default:
        return <Badge variant="outline">-</Badge>;
    }
  };

  const filteredUsers = userData.filter((u) => {
    const s = searchTerm.toLowerCase();
    const matchesSearch = u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s);
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    const matchesStatus = statusFilter === "all" || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const pendingPurchaseRequests = purchaseRequests.filter((req) => req.status === "pending").length;

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">{!user ? "Loading..." : "Loading dashboard..."}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400">Welcome back, {user.firstName || "Admin"}</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-slate-700 text-slate-300 bg-transparent">
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Users</CardTitle>
              <Users className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-green-400">
                {stats.monthlyGrowth >= 0 ? "+" : ""}
                {stats.monthlyGrowth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Total Investments</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.totalInvestments.toLocaleString()}</div>
              <p className="text-xs text-green-400">+{stats.investmentGrowth}% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Purchase Requests</CardTitle>
              <ShoppingCart className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{pendingPurchaseRequests}</div>
              <p className="text-xs text-amber-400">Pending approval</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Pending Approvals</CardTitle>
              <AlertTriangle className="h-4 w-4 text-amber-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.pendingApprovals}</div>
              <p className="text-xs text-amber-400">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-slate-900 border-slate-800">
            <TabsTrigger value="users" className="data-[state=active]:bg-slate-800">User Management</TabsTrigger>
            <TabsTrigger value="approvals" className="data-[state=active]:bg-slate-800">Approvals</TabsTrigger>
            <TabsTrigger value="purchase-requests" className="data-[state=active]:bg-slate-800">Purchase Requests</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-slate-800">Analytics</TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-slate-800">Settings & Controls</TabsTrigger>
          </TabsList>

          {/* User Management */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">User Management</CardTitle>
                    <CardDescription className="text-slate-400">Manage all platform users across roles</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 bg-transparent"
                      disabled={selectedUsers.length === 0}
                      onClick={() => setMessageDialog(true)}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Message Selected
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 bg-transparent"
                      onClick={() => {
                        toast({ title: "Action Completed", description: `activate applied to ${selectedUsers.length} users` });
                        setSelectedUsers([]);
                      }}
                      disabled={selectedUsers.length === 0}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Activate
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 bg-transparent"
                      onClick={() => {
                        toast({ title: "Action Completed", description: `suspend applied to ${selectedUsers.length} users` });
                        setSelectedUsers([]);
                      }}
                      disabled={selectedUsers.length === 0}
                    >
                      <Ban className="h-4 w-4 mr-2" />
                      Suspend
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => {
                          setPage(1);
                          setSearchTerm(e.target.value);
                        }}
                        className="pl-10 bg-slate-800 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <Select
                    value={roleFilter}
                    onValueChange={(v) => {
                      setPage(1);
                      setRoleFilter(v);
                    }}
                  >
                    <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="athlete">Athletes</SelectItem>
                      <SelectItem value="investor">Investors</SelectItem>
                      <SelectItem value="fan">Fans</SelectItem>
                      <SelectItem value="institution">Institutions</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={statusFilter}
                    onValueChange={(v) => {
                      setPage(1);
                      setStatusFilter(v);
                    }}
                  >
                    <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Table */}
                <div className="rounded-md border border-slate-800">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-slate-800">
                        <TableHead className="text-slate-400">
                          <Checkbox
                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onCheckedChange={(checked) => {
                              if (checked) setSelectedUsers(filteredUsers.map((u) => u.id));
                              else setSelectedUsers([]);
                            }}
                          />
                        </TableHead>
                        <TableHead className="text-slate-400">User</TableHead>
                        <TableHead className="text-slate-400">Role</TableHead>
                        <TableHead className="text-slate-400">Status</TableHead>
                        <TableHead className="text-slate-400">Verification</TableHead>
                        <TableHead className="text-slate-400">Last Active</TableHead>
                        <TableHead className="text-slate-400">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow className="border-slate-800">
                          <TableCell colSpan={7} className="text-center text-slate-400 py-6">
                            No users to display
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((u) => (
                          <TableRow key={u.id} className="border-slate-800">
                            <TableCell>
                              <Checkbox
                                checked={selectedUsers.includes(u.id)}
                                onCheckedChange={() => handleUserSelection(u.id)}
                              />
                            </TableCell>
                            <TableCell>
                              <div>
                                <div className="text-white font-medium">{u.name}</div>
                                <div className="text-slate-400 text-sm">{u.email}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-slate-600 text-slate-300">
                                {u.role}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={u.status === "active" ? "default" : "secondary"}
                                className={
                                  u.status === "active"
                                    ? "bg-green-600 text-white"
                                    : u.status === "pending"
                                    ? "bg-amber-600 text-white"
                                    : "bg-red-600 text-white"
                                }
                              >
                                {u.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  u.verificationStatus === "verified"
                                    ? "border-green-600 text-green-400"
                                    : "border-amber-600 text-amber-400"
                                }
                              >
                                {u.verificationStatus}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-slate-400">{u.lastActive}</TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-slate-700 text-slate-300 bg-transparent"
                                  onClick={() => handleViewUser(u)}
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-slate-700 text-slate-300 bg-transparent"
                                  onClick={() => handleEditUser(u)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex justify-end items-center gap-2 mt-4">
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 bg-transparent"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </Button>
                  <span className="text-slate-400 text-sm">Page {page} of {totalPages}</span>
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-300 bg-transparent"
                    disabled={page >= totalPages}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>

                  <Select
                    value={String(limit)}
                    onValueChange={(v) => {
                      setPage(1);
                      setLimit(Number(v));
                    }}
                  >
                    <SelectTrigger className="w-24 bg-slate-800 border-slate-700 text-white">
                      <SelectValue placeholder="Limit" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {[10, 20, 50].map((n) => (
                        <SelectItem key={n} value={String(n)}>
                          {n}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approvals */}
          <TabsContent value="approvals" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">User Approvals</CardTitle>
                    <CardDescription className="text-slate-400">
                      Centralized approval queue for all user types
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {approvalData.length === 0 ? (
                  <div className="text-slate-400">No approvals to review</div>
                ) : (
                  <div className="space-y-4">
                    {approvalData.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            checked={selectedApprovals.includes(item.id)}
                            onCheckedChange={() => handleApprovalSelection(item.id)}
                          />
                          <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {item.name.split(" ").map((n) => n[0]).join("")}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{item.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-slate-400">
                              <Badge variant="outline" className="border-slate-600 text-slate-300">
                                {item.type}
                              </Badge>
                              {item.sport && <span>• {item.sport}</span>}
                              {item.investmentLimit && <span>• Limit: {item.investmentLimit}</span>}
                              <span>• Submitted {item.submittedDate}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-slate-500">Documents:</span>
                              {item.documents.map((doc, index) => (
                                <Badge key={index} variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={
                              item.status === "pending"
                                ? "border-amber-600 text-amber-400"
                                : "border-blue-600 text-blue-400"
                            }
                          >
                            {item.status}
                          </Badge>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-700 text-slate-300 bg-transparent"
                              onClick={() => handleViewApproval(item)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Purchase Requests */}
          <TabsContent value="purchase-requests" className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-white">Purchase Requests</CardTitle>
                    <CardDescription className="text-slate-400">
                      Review and approve athlete purchase requests
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="border-green-600 text-green-400 bg-transparent hover:bg-green-600 hover:text-white"
                      onClick={() => handleBulkPurchaseAction("approve")}
                      disabled={selectedPurchaseRequests.length === 0}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approve Selected
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-600 text-red-400 bg-transparent hover:bg-red-600 hover:text-white"
                      onClick={() => handleBulkPurchaseAction("reject")}
                      disabled={selectedPurchaseRequests.length === 0}
                    >
                      <UserX className="h-4 w-4 mr-2" />
                      Reject Selected
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {purchaseRequests.length === 0 ? (
                    <div className="text-center py-8">
                      <ShoppingCart className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">No purchase requests submitted yet</p>
                    </div>
                  ) : (
                    purchaseRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            checked={selectedPurchaseRequests.includes(request.id)}
                            onCheckedChange={() => handlePurchaseRequestSelection(request.id)}
                          />
                          <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                            <ShoppingCart className="h-6 w-6 text-slate-300" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{request.item}</p>
                            <div className="flex items-center space-x-2 text-sm text-slate-400">
                              <span>By: {request.athleteName}</span>
                              <span>• ${request.amount.toLocaleString()}</span>
                              <span>• {request.category}</span>
                              <span>• {request.submittedDate}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              {getUrgencyBadge(request.urgency)}
                              <span className="text-xs text-slate-500">Vendor: {request.vendor}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(request.status)}
                          <div className="flex space-x-2">
                            {request.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => handleApprovePurchaseRequest(request.id, true)}
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                                  onClick={() => handleApprovePurchaseRequest(request.id, false)}
                                >
                                  <UserX className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-slate-700 text-slate-300 bg-transparent"
                              onClick={() => handleViewPurchaseRequest(request)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics (static demo charts) */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <PieChartIcon className="h-5 w-5 mr-2" />
                    User Distribution by Role
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      athletes: { label: "Athletes", color: "#3b82f6" },
                      investors: { label: "Investors", color: "#10b981" },
                      fans: { label: "Fans", color: "#f59e0b" },
                      institutions: { label: "Institutions", color: "#8b5cf6" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={userRoleData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ percent }) => (percent !== undefined ? `${(percent * 100).toFixed(0)}%` : "")}
                        >
                          {userRoleData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <LineChartIcon className="h-5 w-5 mr-2" />
                    Investment Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      amount: { label: "Investment Amount", color: "#3b82f6" },
                      users: { label: "New Users", color: "#10b981" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <ReLineChart data={investmentTrendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                        <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={2} />
                      </ReLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChartIcon className="h-5 w-5 mr-2" />
                    KYC/AML Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: { label: "Percentage", color: "#3b82f6" },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <ReBarChart data={complianceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </ReBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Platform Growth Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Monthly Active Users</span>
                      <span className="text-white font-semibold">8,432</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Daily Signups</span>
                      <span className="text-green-400 font-semibold">+47</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">User Retention (30d)</span>
                      <span className="text-blue-400 font-semibold">78.3%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Conversion Rate</span>
                      <span className="text-purple-400 font-semibold">12.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings & Controls */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Notification Center
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-amber-400" />
                        <div>
                          <div className="text-white text-sm">KYC Review Required</div>
                          <div className="text-slate-400 text-xs">3 investors pending</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-amber-600 text-amber-400">
                        High
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Activity className="h-5 w-5 text-blue-400" />
                        <div>
                          <div className="text-white text-sm">System Maintenance</div>
                          <div className="text-slate-400 text-xs">Scheduled for tonight</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-blue-600 text-blue-400">
                        Info
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <div>
                          <div className="text-white text-sm">Backup Completed</div>
                          <div className="text-slate-400 text-xs">Daily backup successful</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-green-600 text-green-400">
                        Success
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Payment Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Pending Payouts</span>
                      <span className="text-amber-400 font-semibold">$23,847</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Completed Transactions</span>
                      <span className="text-green-400 font-semibold">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Failed Payments</span>
                      <span className="text-red-400 font-semibold">12</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-slate-700 text-slate-300 bg-transparent"
                      onClick={() => setPaymentsDialog(true)}
                    >
                      <FileCheck className="h-4 w-4 mr-2" />
                      View Payment Details
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Globe className="h-5 w-5 mr-2" />
                    Platform Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 justify-start bg-transparent"
                      onClick={() => router.push("/admin/settings/investment-policies")}
                    >
                      Investment Policies
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 justify-start bg-transparent"
                      onClick={() => router.push("/admin/settings/user-verification")}
                    >
                      User Verification Settings
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 justify-start bg-transparent"
                      onClick={() => router.push("/admin/settings/security")}
                    >
                      Security Configuration
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 justify-start bg-transparent"
                      onClick={() => router.push("/admin/settings/branding")}
                    >
                      Platform Branding
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileCheck className="h-5 w-5 mr-2" />
                    Smart Contract Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">247</div>
                      <div className="text-slate-400">Active Contracts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">$1.2M</div>
                      <div className="text-slate-400">Total Contract Value</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">99.8%</div>
                      <div className="text-slate-400">Success Rate</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-slate-700 text-slate-300 bg-transparent"
                    onClick={() => setContractsDialog(true)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View All Contracts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Message Dialog */}
        <Dialog open={messageDialog} onOpenChange={setMessageDialog}>
          <DialogContent className="bg-slate-900 border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-white">Send Message</DialogTitle>
              <DialogDescription className="text-slate-400">
                Send a message to {selectedUsers.length} selected users
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="message" className="text-slate-300">
                  Message
                </Label>
                <Textarea
                  id="message"
                  value={bulkMessage}
                  onChange={(e) => setBulkMessage(e.target.value)}
                  className="bg-slate-800 border-slate-700 text-white"
                  placeholder="Enter your message..."
                  rows={4}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setMessageDialog(false)}
                  className="border-slate-700 text-slate-300 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    try {
                      const res = await sendBulkMessages({
                        message: bulkMessage,
                        userIds: selectedUsers.map((id) => Number(id)),
                      });

                      if (res.success) {
                        toast({
                          title: "✅ Message Sent Successfully",
                          description: `Delivered to ${res.recipients?.length ?? 0} users.`,
                        });

                        setMessageDialog(false);
                        setBulkMessage("");
                        setSelectedUsers([]);
                      } else {
                        toast({
                          title: "Failed",
                          description: res.message || "Could not send messages",
                          variant: "destructive",
                        });
                      }
                    } catch (e: any) {
                      toast({
                        title: "Error",
                        description: e?.message || "Something went wrong",
                        variant: "destructive",
                      });
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!bulkMessage.trim() || selectedUsers.length === 0}
                >
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* View User Dialog */}
        <Dialog open={viewUserDialog} onOpenChange={setViewUserDialog}>
          <DialogContent className="bg-slate-900 border-slate-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">User Details</DialogTitle>
              <DialogDescription className="text-slate-400">Complete profile information and activity</DialogDescription>
            </DialogHeader>
            {selectedUserDetails && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Name</Label>
                    <div className="text-white">{selectedUserDetails.name}</div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Email</Label>
                    <div className="text-white">{selectedUserDetails.email}</div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Role</Label>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {selectedUserDetails.role}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-slate-300">Status</Label>
                    <Badge
                      variant={selectedUserDetails.status === "active" ? "default" : "secondary"}
                      className={
                        selectedUserDetails.status === "active"
                          ? "bg-green-600 text-white"
                          : selectedUserDetails.status === "pending"
                          ? "bg-amber-600 text-white"
                          : "bg-red-600 text-white"
                      }
                    >
                      {selectedUserDetails.status}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-slate-300">Location</Label>
                    <div className="text-white flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {selectedUserDetails.location}
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Phone</Label>
                    <div className="text-white flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {selectedUserDetails.phone}
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Join Date</Label>
                    <div className="text-white flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {selectedUserDetails.joinDate}
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Last Active</Label>
                    <div className="text-white flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {selectedUserDetails.lastActive}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setViewUserDialog(false)}
                    className="border-slate-700 text-slate-300 bg-transparent"
                  >
                    Close
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setViewUserDialog(false);
                      handleEditUser(selectedUserDetails);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit User
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit User Dialog */}
<Dialog open={editUserDialog} onOpenChange={setEditUserDialog}>
  <DialogContent className="bg-slate-900 border-slate-800 max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-white">Edit User Profile</DialogTitle>
      <DialogDescription className="text-slate-400">
        Update user information and settings
      </DialogDescription>
    </DialogHeader>

    {editingUser && (
      <div className="space-y-6">
        {/* Base user info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="edit-name" className="text-slate-300">
              Name
            </Label>
            <Input
              id="edit-name"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
          <div>
            <Label htmlFor="edit-email" className="text-slate-300">
              Email
            </Label>
            <Input
              id="edit-email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="edit-role" className="text-slate-300">
              Role
            </Label>
            <Select
              value={editingUser.role}
              onValueChange={(value) =>
                setEditingUser({ ...editingUser, role: value })
              }
            >
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="athlete">Athlete</SelectItem>
                <SelectItem value="investor">Investor</SelectItem>
                <SelectItem value="fan">Fan</SelectItem>
                <SelectItem value="institution">Institution</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-status" className="text-slate-300">
              Status
            </Label>
            <Select
              value={editingUser.status}
              onValueChange={(value) =>
                setEditingUser({ ...editingUser, status: value })
              }
            >
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="edit-location" className="text-slate-300">
              Location
            </Label>
            <Input
              id="edit-location"
              value={editingUser.location || ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, location: e.target.value })
              }
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>

          <div>
            <Label htmlFor="edit-phone" className="text-slate-300">
              Phone
            </Label>
            <Input
              id="edit-phone"
              value={editingUser.phone || ""}
              onChange={(e) =>
                setEditingUser({ ...editingUser, phone: e.target.value })
              }
              className="bg-slate-800 border-slate-700 text-white"
            />
          </div>
        </div>

        {/* ✅ Athlete-only fields */}
        {editingUser.role === "athlete" && (
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
            <div>
              <Label htmlFor="edit-total-funding" className="text-slate-300">
                Total Funding ($)
              </Label>
              <Input
                id="edit-total-funding"
                type="number"
                value={editingUser.totalFunding ?? ""}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    totalFunding: Number(e.target.value),
                  })
                }
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div>
              <Label
                htmlFor="edit-investment-duration"
                className="text-slate-300"
              >
                Investment Duration (Years)
              </Label>
              <Input
                id="edit-investment-duration"
                type="number"
                value={editingUser.investmentDuration ?? ""}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    investmentDuration: Number(e.target.value),
                  })
                }
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>

            <div>
              <Label htmlFor="edit-min-investment" className="text-slate-300">
                Minimum Investment ($)
              </Label>
              <Input
                id="edit-min-investment"
                type="number"
                value={editingUser.minInvestment ?? ""}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    minInvestment: Number(e.target.value),
                  })
                }
                className="bg-slate-800 border-slate-700 text-white"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => setEditUserDialog(false)}
            className="border-slate-700 text-slate-300 bg-transparent"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button
            onClick={handleSaveUser}
            className="bg-green-600 hover:bg-green-700"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>


        {/* View Approval Dialog */}
        <Dialog open={viewApprovalDialog} onOpenChange={setViewApprovalDialog}>
          <DialogContent className="bg-slate-900 border-slate-800 max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-white">Approval Details</DialogTitle>
              <DialogDescription className="text-slate-400">Complete submitted profile for review</DialogDescription>
            </DialogHeader>
            {selectedApprovalDetails && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Name</Label>
                    <div className="text-white">{selectedApprovalDetails.name}</div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Type</Label>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {selectedApprovalDetails.type}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-slate-300">Submitted Date</Label>
                    <div className="text-white">{selectedApprovalDetails.submittedDate}</div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Status</Label>
                    <Badge variant="outline" className="border-amber-600 text-amber-400">
                      {selectedApprovalDetails.status}
                    </Badge>
                  </div>
                  {selectedApprovalDetails.sport && (
                    <div>
                      <Label className="text-slate-300">Sport</Label>
                      <div className="text-white">{selectedApprovalDetails.sport}</div>
                    </div>
                  )}
                  {selectedApprovalDetails.investmentLimit && (
                    <div>
                      <Label className="text-slate-300">Investment Limit</Label>
                      <div className="text-white">{selectedApprovalDetails.investmentLimit}</div>
                    </div>
                  )}
                </div>

                <div>
                  <Label className="text-slate-300">Submitted Documents</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedApprovalDetails.documents.map((doc, index) => (
                      <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300">
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>

                {selectedApprovalDetails.profileData && (
                  <div>
                    <Label className="text-slate-300">Profile Data</Label>
                    <div className="bg-slate-800 p-4 rounded-lg mt-2">
                      <pre className="text-slate-300 text-sm whitespace-pre-wrap">
                        {JSON.stringify(selectedApprovalDetails.profileData, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setViewApprovalDialog(false)}
                    className="border-slate-700 text-slate-300 bg-transparent"
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* View Purchase Request Dialog */}
        <Dialog open={viewPurchaseDialog} onOpenChange={setViewPurchaseDialog}>
          <DialogContent className="bg-slate-900 border-slate-800 max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-white">Purchase Request Details</DialogTitle>
              <DialogDescription className="text-slate-400">Review athlete purchase request</DialogDescription>
            </DialogHeader>
            {selectedPurchaseDetails && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-300">Athlete</Label>
                    <div className="text-white">{selectedPurchaseDetails.athleteName}</div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Request ID</Label>
                    <div className="text-white font-mono">{selectedPurchaseDetails.id}</div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Item/Service</Label>
                    <div className="text-white">{selectedPurchaseDetails.item}</div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Amount</Label>
                    <div className="text-white text-xl font-bold">${selectedPurchaseDetails.amount.toLocaleString()}</div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Category</Label>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {selectedPurchaseDetails.category}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-slate-300">Urgency</Label>
                    {getUrgencyBadge(selectedPurchaseDetails.urgency)}
                  </div>
                  <div>
                    <Label className="text-slate-300">Vendor</Label>
                    <div className="text-white">{selectedPurchaseDetails.vendor}</div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Submitted Date</Label>
                    <div className="text-white">{selectedPurchaseDetails.submittedDate}</div>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">Description</Label>
                  <div className="bg-slate-800 p-3 rounded-lg mt-2">
                    <p className="text-slate-300">{selectedPurchaseDetails.description}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-slate-300">Career Development Justification</Label>
                  <div className="bg-slate-800 p-3 rounded-lg mt-2">
                    <p className="text-slate-300">{selectedPurchaseDetails.justification}</p>
                  </div>
                </div>

                {selectedPurchaseDetails.adminNotes && (
                  <div>
                    <Label className="text-slate-300">Admin Notes</Label>
                    <div className="bg-slate-800 p-3 rounded-lg mt-2">
                      <p className="text-slate-300">{selectedPurchaseDetails.adminNotes}</p>
                      {selectedPurchaseDetails.reviewedDate && (
                        <p className="text-slate-400 text-sm mt-2">Reviewed on: {selectedPurchaseDetails.reviewedDate}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setViewPurchaseDialog(false)}
                    className="border-slate-700 text-slate-300 bg-transparent"
                  >
                    Close
                  </Button>
                  {selectedPurchaseDetails.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                        onClick={() => handleApprovePurchaseRequest(selectedPurchaseDetails.id, false)}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprovePurchaseRequest(selectedPurchaseDetails.id, true)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Smart Contracts Dialog (demo data) */}
        <Dialog open={contractsDialog} onOpenChange={setContractsDialog}>
          <DialogContent className="bg-slate-900 border-slate-800 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-white">Smart Contracts</DialogTitle>
              <DialogDescription className="text-slate-400">All platform smart contracts and details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="rounded-md border border-slate-800">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-800">
                      <TableHead className="text-slate-400">Contract ID</TableHead>
                      <TableHead className="text-slate-400">Athlete</TableHead>
                      <TableHead className="text-slate-400">Investor</TableHead>
                      <TableHead className="text-slate-400">Amount</TableHead>
                      <TableHead className="text-slate-400">Status</TableHead>
                      <TableHead className="text-slate-400">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: "0x1a2b3c", athlete: "John Doe", investor: "Jane Smith", amount: "$5,000", status: "Active", created: "2024-01-15" },
                      { id: "0x4d5e6f", athlete: "Mike Johnson", investor: "Bob Wilson", amount: "$10,000", status: "Active", created: "2024-01-18" },
                      { id: "0x7g8h9i", athlete: "Sarah Davis", investor: "Alice Brown", amount: "$7,500", status: "Completed", created: "2024-01-20" },
                    ].map((contract) => (
                      <TableRow key={contract.id} className="border-slate-800">
                        <TableCell className="text-white font-mono">{contract.id}</TableCell>
                        <TableCell className="text-white">{contract.athlete}</TableCell>
                        <TableCell className="text-white">{contract.investor}</TableCell>
                        <TableCell className="text-white">{contract.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={contract.status === "Active" ? "default" : "secondary"}
                            className={contract.status === "Active" ? "bg-green-600" : "bg-blue-600"}
                          >
                            {contract.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-400">{contract.created}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setContractsDialog(false)} className="border-slate-700 text-slate-300 bg-transparent">
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Payments Dialog (demo data) */}
        <Dialog open={paymentsDialog} onOpenChange={setPaymentsDialog}>
          <DialogContent className="bg-slate-900 border-slate-800 max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-white">Payment Details</DialogTitle>
              <DialogDescription className="text-slate-400">All platform payments and transactions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Input placeholder="Search payments..." className="bg-slate-800 border-slate-700 text-white" />
                <Select>
                  <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="rounded-md border border-slate-800">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-800">
                      <TableHead className="text-slate-400">Transaction ID</TableHead>
                      <TableHead className="text-slate-400">From</TableHead>
                      <TableHead className="text-slate-400">To</TableHead>
                      <TableHead className="text-slate-400">Amount</TableHead>
                      <TableHead className="text-slate-400">Status</TableHead>
                      <TableHead className="text-slate-400">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { id: "TXN001", from: "Jane Smith", to: "John Doe", amount: "$5,000", status: "Completed", date: "2024-01-15" },
                      { id: "TXN002", from: "Bob Wilson", to: "Mike Johnson", amount: "$10,000", status: "Pending", date: "2024-01-18" },
                      { id: "TXN003", from: "Alice Brown", to: "Sarah Davis", amount: "$7,500", status: "Completed", date: "2024-01-20" },
                      { id: "TXN004", from: "Tom Anderson", to: "Lisa Wang", amount: "$3,200", status: "Failed", date: "2024-01-22" },
                    ].map((payment) => (
                      <TableRow key={payment.id} className="border-slate-800">
                        <TableCell className="text-white font-mono">{payment.id}</TableCell>
                        <TableCell className="text-white">{payment.from}</TableCell>
                        <TableCell className="text-white">{payment.to}</TableCell>
                        <TableCell className="text-white">{payment.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={payment.status === "Completed" ? "default" : "secondary"}
                            className={
                              payment.status === "Completed"
                                ? "bg-green-600"
                                : payment.status === "Pending"
                                ? "bg-amber-600"
                                : "bg-red-600"
                            }
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-400">{payment.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setPaymentsDialog(false)} className="border-slate-700 text-slate-300 bg-transparent">
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
