"use client";

import {
  approveAssetAction,
  rejectAssetAction,
} from "@/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { Check, Loader2, User, X, FileImage } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

type PendingAsset = {
  asset: {
    id: string;
    title: string;
    description: string | null;
    fileUrl: string;
    thumbnailUrl: string | null;
    isApproved: string;
    userId: string;
    categoryId: number | null;
    createdAt: Date;
    updatedAt: Date;
  };
  userName: string | null;
};

interface AssetApprovalClientProps {
  initialAssets: PendingAsset[];
}

function AssetApprovalClient({ initialAssets }: AssetApprovalClientProps) {
  const [assets, setAssets] = useState(initialAssets);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleApprove = async (assetId: string) => {
    setProcessingId(assetId);
    try {
      const result = await approveAssetAction(assetId);
      if (result.success) {
        setAssets((prev) => prev.filter((a) => a.asset.id !== assetId));
        toast.success("Asset approved");
      } else {
        toast.error("Failed to approve asset");
      }
    } catch {
      toast.error("Failed to approve asset");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (assetId: string) => {
    setProcessingId(assetId);
    try {
      const result = await rejectAssetAction(assetId);
      if (result.success) {
        setAssets((prev) => prev.filter((a) => a.asset.id !== assetId));
        toast.success("Asset rejected");
      } else {
        toast.error("Failed to reject asset");
      }
    } catch {
      toast.error("Failed to reject asset");
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white">Approval Queue</h1>
        <p className="text-white/50 mt-2">
          Review and moderate newly uploaded assets before they appear in the public gallery.
        </p>
      </div>

      {assets.length === 0 ? (
        <Card className="bg-[#111]/50 border-white/5 border-dashed">
          <CardContent className="py-24 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">You're all caught up!</h3>
            <p className="text-white/40 max-w-sm">
              There are no pending assets to review at this time. New uploads will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {assets.map(({ asset, userName }) => (
            <div
              key={asset.id}
              className="group border border-[#1f1f1f] rounded-2xl overflow-hidden bg-[#111] hover:border-white/20 transition-all duration-300"
            >
              <div className="h-56 bg-black relative overflow-hidden">
                <Image
                  src={asset.fileUrl}
                  alt={asset.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-xs font-medium text-white/90">
                  {formatDistanceToNow(new Date(asset.createdAt), { addSuffix: true })}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-lg text-white mb-1 truncate">{asset.title}</h3>
                {asset.description ? (
                  <p className="text-sm text-white/50 line-clamp-2 min-h-[40px]">{asset.description}</p>
                ) : (
                  <p className="text-sm text-white/30 italic min-h-[40px]">No description provided.</p>
                )}
                
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-white">
                    {userName?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-white/70 truncate">{userName}</span>
                </div>
              </div>
              <div className="p-3 pt-0 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="bg-transparent border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-400 rounded-xl h-11"
                  disabled={processingId === asset.id}
                  onClick={() => handleReject(asset.id)}
                >
                  {processingId === asset.id ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <X className="h-4 w-4 mr-2" />
                  )}
                  Reject
                </Button>
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl h-11 border-none shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all"
                  disabled={processingId === asset.id}
                  onClick={() => handleApprove(asset.id)}
                >
                  {processingId === asset.id ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  Approve
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AssetApprovalClient;
