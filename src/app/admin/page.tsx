import {
  getApprovalBreakdown,
  getAssetsByCategory,
  getDashboardMetrics,
  getRecentActivity,
  getUploadsPerDay,
} from "@/actions/analytics-actions";
import AnalyticsDashboard from "@/components/admin/analytics-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    metrics,
    uploadsPerDay,
    assetsByCategory,
    approvalBreakdown,
    recentActivity,
  ] = await Promise.all([
    getDashboardMetrics(),
    getUploadsPerDay(),
    getAssetsByCategory(),
    getApprovalBreakdown(),
    getRecentActivity(),
  ]);

  return (
    <AnalyticsDashboard
      metrics={metrics}
      uploadsPerDay={uploadsPerDay}
      assetsByCategory={assetsByCategory}
      approvalBreakdown={approvalBreakdown}
      recentActivity={recentActivity}
    />
  );
}
