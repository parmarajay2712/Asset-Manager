"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, FileImage, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type AnalyticsDashboardProps = {
  metrics: {
    totalAssets: number;
    totalUsers: number;
    pendingApprovals: number;
    approvedAssets: number;
  };
  uploadsPerDay: { date: string; count: number }[];
  assetsByCategory: { name: string; value: number }[];
  approvalBreakdown: { name: string; value: number }[];
  recentActivity: {
    id: string;
    title: string;
    status: string;
    createdAt: Date;
    userName: string;
  }[];
};

const COLORS = ["#14b8a6", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];
const STATUS_COLORS = {
  approved: "#10b981",
  pending: "#f59e0b",
  rejected: "#ef4444",
};

export default function AnalyticsDashboard({
  metrics,
  uploadsPerDay,
  assetsByCategory,
  approvalBreakdown,
  recentActivity,
}: AnalyticsDashboardProps) {
  return (
    <div className="container py-8 space-y-8 max-w-7xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-white/50 mt-2">
          Overview of your Asset Manager performance and metrics.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border-[#1f1f1f]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Total Assets</CardTitle>
            <FileImage className="h-4 w-4 text-white/40" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.totalAssets}</div>
            <p className="text-xs text-white/40">All time uploads</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border-[#1f1f1f]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/70">Total Users</CardTitle>
            <Users className="h-4 w-4 text-white/40" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.totalUsers}</div>
            <p className="text-xs text-white/40">Registered accounts</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#111] to-amber-950/10 border-[#1f1f1f]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/70">
              Pending Approvals
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.pendingApprovals}</div>
            <p className="text-xs text-white/40">Requires attention</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-[#111] to-emerald-950/10 border-[#1f1f1f]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/70">
              Approved Assets
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.approvedAssets}</div>
            <p className="text-xs text-white/40">Published in gallery</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Uploads Over Time - Spans 2 columns on large screens */}
        <Card className="col-span-1 lg:col-span-2 bg-[#111] border-[#1f1f1f]">
          <CardHeader>
            <CardTitle className="text-white">Uploads (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {uploadsPerDay.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={uploadsPerDay}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                      }}
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                    />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip
                      labelFormatter={(value) => new Date(value).toDateString()}
                    />
                    <Bar
                      dataKey="count"
                      fill="#14b8a6"
                      radius={[4, 4, 0, 0]}
                      name="Uploads"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No upload data available
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Categories Pie Chart */}
        <Card className="col-span-1 bg-[#111] border-[#1f1f1f]">
          <CardHeader>
            <CardTitle className="text-white">Assets by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              {assetsByCategory.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetsByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {assetsByCategory.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No category data
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Approval Breakdown */}
        <Card className="col-span-1 lg:col-span-3 bg-[#111] border-[#1f1f1f]">
          <CardHeader>
            <CardTitle className="text-white">Approval Status Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              {approvalBreakdown.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={approvalBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" allowDecimals={false} />
                    <YAxis
                      dataKey="name"
                      type="category"
                      tick={{ fontSize: 12 }}
                      tickFormatter={(value: string) => value ? value.charAt(0).toUpperCase() + value.slice(1) : ''}
                      width={80}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      radius={[0, 4, 4, 0]}
                      barSize={30}
                      name="Count"
                    >
                      {approvalBreakdown.map((entry, index) => {
                        const statusColor =
                          STATUS_COLORS[
                            entry.name as keyof typeof STATUS_COLORS
                          ] || COLORS[0];
                        return <Cell key={`cell-${index}`} fill={statusColor} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  No approval data
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card className="bg-[#111] border-[#1f1f1f]">
        <CardHeader>
          <CardTitle className="text-white">Recent Uploads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="text-white/50">Asset Title</TableHead>
                  <TableHead className="text-white/50">Uploaded By</TableHead>
                  <TableHead className="text-white/50">Date</TableHead>
                  <TableHead className="text-white/50">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <TableRow key={activity.id} className="border-white/5 hover:bg-white/5">
                      <TableCell className="font-medium truncate max-w-[200px] text-white">
                        {activity.title}
                      </TableCell>
                      <TableCell className="text-white/70">{activity.userName}</TableCell>
                      <TableCell className="text-white/50">
                        {formatDistanceToNow(new Date(activity.createdAt), {
                          addSuffix: true,
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            activity.status === "approved"
                              ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              : activity.status === "pending"
                              ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                              : "bg-red-500/10 text-red-500 border-red-500/20"
                          }
                        >
                          {activity.status.charAt(0).toUpperCase() +
                            activity.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center h-24 text-white/40">
                      No recent activity.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
