import Image from "next/image";
import { Badge } from "../ui/badge";
import { formatDistanceToNow } from "date-fns";

type Asset = {
  id: string;
  title: string;
  description: string | null;
  fileUrl: string;
  isApproved: string;
  categoryId: number | null;
  createdAt: Date;
};

interface AssetGridProps {
  assets: Asset[];
}

function AssetGrid({ assets }: AssetGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assets.map((asset) => (
        <div
          key={asset.id}
          className="group border border-[#1f1f1f] rounded-2xl overflow-hidden bg-[#111] hover:border-white/20 transition-all duration-300"
        >
          <div className="h-48 bg-black relative overflow-hidden">
            <Image
              src={asset.fileUrl}
              alt={asset.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />
            <div className="absolute top-3 right-3">
              <Badge
                className={
                  asset.isApproved === "approved"
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 backdrop-blur-md"
                    : asset.isApproved === "rejected"
                    ? "bg-red-500/10 text-red-500 border-red-500/20 backdrop-blur-md"
                    : "bg-amber-500/10 text-amber-500 border-amber-500/20 backdrop-blur-md"
                }
              >
                {asset.isApproved === "approved"
                  ? "Approved"
                  : asset.isApproved === "rejected"
                  ? "Rejected"
                  : "Pending"}
              </Badge>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-lg text-white mb-1 truncate">{asset.title}</h3>
            {asset.description ? (
              <p className="text-sm text-white/50 line-clamp-2 min-h-[40px]">{asset.description}</p>
            ) : (
              <p className="text-sm text-white/30 italic min-h-[40px]">No description provided.</p>
            )}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
              <span className="text-xs font-medium text-white/40">
                {formatDistanceToNow(new Date(asset.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AssetGrid;
