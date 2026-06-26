import { getPendingAssetsAction } from "@/actions/admin-actions";
import AssetApprovalClient from "@/components/admin/asset-approval-client";

export const dynamic = "force-dynamic";

async function AssetApprovalPage() {
  const pendingAssets = await getPendingAssetsAction();

  return <AssetApprovalClient initialAssets={pendingAssets} />;
}

export default AssetApprovalPage;
