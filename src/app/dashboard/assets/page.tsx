import {
  getCategoriesAction,
  getUserAssetsAction,
} from "@/actions/dashboard-actions";
import AssetGrid from "@/components/dashboard/asset-grid";
import UploadAsset from "@/components/dashboard/upload-asset";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function UserAssetsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  const [categories, assets] = await Promise.all([
    getCategoriesAction(),
    getUserAssetsAction(session.user.id),
  ]);

  return (
    <div className="container py-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">My Assets</h1>
          <p className="text-white/50 mt-1">Manage your uploaded digital assets.</p>
        </div>
        <UploadAsset categories={categories || []} />
      </div>
      {assets.length === 0 ? (
        <div className="border border-white/5 bg-[#111]/50 border-dashed rounded-2xl py-24 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No assets yet</h3>
          <p className="text-white/40 mb-6 max-w-sm">
            You haven't uploaded any assets yet. Click "Upload Asset" to get started and share your work.
          </p>
        </div>
      ) : (
        <AssetGrid assets={assets} />
      )}
    </div>
  );
}

export default UserAssetsPage;
