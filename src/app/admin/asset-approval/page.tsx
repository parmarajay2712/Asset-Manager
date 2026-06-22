import { getPendingAssetsAction } from "@/actions/admin-actions";
import AssetApprovalClient from "@/components/admin/asset-approval-client";

async function AssetApprovalPage() {
  const pendingAssets = await getPendingAssetsAction();

  return <AssetApprovalClient initialAssets={pendingAssets} />;
}

export default AssetApprovalPage;
