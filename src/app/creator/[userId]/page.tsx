import { getCreatorProfileAction } from "@/actions/dashboard-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loader2, Eye, LayoutGrid } from "lucide-react";
import { formatViewCount } from "@/lib/utils";

interface CreatorProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function CreatorProfilePage({
  params,
}: CreatorProfilePageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
          <Loader2 className="h-8 w-8 animate-spin text-white/50" />
        </div>
      }
    >
      <CreatorContent params={params} />
    </Suspense>
  );
}

async function CreatorContent({ params }: CreatorProfilePageProps) {
  const resolvedParams = await params;
  const profileData = await getCreatorProfileAction(resolvedParams.userId);

  if (!profileData) {
    notFound();
  }

  const { creator, assets } = profileData;

  const totalViews = assets.reduce((acc, curr) => acc + (curr.asset.viewCount || 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Profile Header */}
      <div className="relative border-b border-white/5 bg-[#111] overflow-hidden">
        {/* Abstract background for profile */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-96 h-96 bg-white/[0.05] rounded-full blur-3xl" />
          <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-white/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-4xl px-4 py-24 flex flex-col items-center text-center relative z-10">
          <Avatar className="h-28 w-28 border border-white/10 shadow-2xl mb-8 bg-[#0a0a0a]">
            {creator.image && (
              <AvatarImage src={creator.image} alt={creator.name || "Creator"} />
            )}
            <AvatarFallback className="bg-zinc-800 text-white text-3xl font-bold">
              {creator.name ? creator.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{creator.name}</h1>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium">
              <LayoutGrid className="w-4 h-4 text-white/50" />
              <span>{assets.length} Published Asset{assets.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm font-medium">
              <Eye className="w-4 h-4 text-white/50" />
              <span>{formatViewCount(totalViews)} Total Views</span>
            </div>
          </div>
        </div>
      </div>

      {/* Assets Grid */}
      <div className="container max-w-7xl mx-auto px-4 py-16">
        {assets.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center border border-dashed border-white/10 rounded-2xl bg-[#111]/50">
            <LayoutGrid className="w-12 h-12 text-white/20 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No assets found</h3>
            <p className="text-white/40 max-w-sm">
              This creator hasn't published any assets to the gallery yet.
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {assets.map(({ asset, categoryName, userName }) => (
              <Link
                href={`/gallery/${asset.id}`}
                key={asset.id}
                className="block break-inside-avoid group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-[#111] border border-white/10 group-hover:border-white/30 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                  <div className="relative w-full" style={{ aspectRatio: (asset.id.length % 2 === 0) ? '3/4' : '4/3' }}>
                    <Image
                      src={asset.fileUrl}
                      alt={asset.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-semibold text-xl line-clamp-1 mb-2">
                        {asset.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {categoryName && (
                            <span className="bg-white/10 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-md border border-white/10 hidden sm:block">
                              {categoryName}
                            </span>
                          )}
                          <span className="flex items-center text-white/90 text-xs font-semibold bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                            <Eye className="w-3 h-3 mr-1.5" />
                            {formatViewCount(asset.viewCount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
