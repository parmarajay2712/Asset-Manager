import { getAssetByIdAction, incrementViewCountAction } from "@/actions/dashboard-actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { formatViewCount } from "@/lib/utils";
import { Download, Info, Loader2, Tag, Eye, ChevronLeft, ArrowRight } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface GalleryDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
}

export default async function GalleryDetailsPage({
  params,
  searchParams,
}: GalleryDetailsPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
          <Loader2 className="h-8 w-8 animate-spin text-white/50" />
        </div>
      }
    >
      <GalleryContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

async function GalleryContent({
  params,
  searchParams,
}: GalleryDetailsPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const errorParam = resolvedSearchParams?.error;

  const result = await getAssetByIdAction(resolvedParams.id);

  if (!result) {
    notFound();
  }

  // Fire and forget view tracking
  incrementViewCountAction(resolvedParams.id);

  const { asset, categoryName, userName, userId, userImage } = result;
  const isAuthor = session?.user?.id === userId;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 pb-24">
      {/* Editorial Image Header */}
      <div className="relative w-full h-[50vh] md:h-[65vh] bg-[#111] overflow-hidden flex items-center justify-center border-b border-white/5">
        <Image
          src={asset.fileUrl}
          alt={asset.title}
          fill
          className="object-contain md:object-cover blur-3xl opacity-20 scale-110 pointer-events-none"
        />
        <div className="relative z-10 w-full max-w-5xl h-full p-4 md:p-12">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src={asset.fileUrl}
              alt={asset.title}
              fill
              className="object-contain bg-black/50 backdrop-blur-sm"
              priority
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-100 pointer-events-none" />
      </div>

      <div className="container max-w-5xl mx-auto px-4 -mt-10 relative z-20">
        <Link href="/gallery" className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white transition-colors mb-8 bg-[#111] border border-white/10 rounded-full px-4 py-2">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Gallery
        </Link>

        {errorParam && (
          <div className="flex items-center gap-3 p-4 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20 mb-8 backdrop-blur-md">
            <Info className="w-5 h-5 flex-shrink-0" />
            <p>
              {errorParam === "upload_failed"
                ? "Something went wrong. Please try again."
                : "An error occurred. Please try again."}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{asset.title}</h1>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center text-sm text-white bg-white/10 border border-white/10 px-3 py-1.5 rounded-md font-medium">
                  <Eye className="w-4 h-4 mr-2 opacity-50" />
                  {formatViewCount(asset.viewCount || 0)} views
                </div>
                {categoryName && (
                  <Badge className="bg-white/5 hover:bg-white/10 text-white border-white/10 px-3 py-1.5 rounded-md text-sm font-medium">
                    <Tag className="mr-2 h-3.5 w-3.5 opacity-50" />
                    {categoryName}
                  </Badge>
                )}
              </div>

              {asset.description && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white/90 mb-3">About this asset</h3>
                  <p className="text-white/60 leading-relaxed text-lg">
                    {asset.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Actions & Creator Card */}
          <div className="space-y-6">
            <div className="bg-[#111] border border-[#1f1f1f] rounded-2xl p-6 shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">Free Download</h3>
                <p className="text-white/50 text-sm">High resolution digital asset</p>
              </div>

              {session?.user ? (
                isAuthor ? (
                  <div className="bg-white/5 border border-white/10 text-white/80 p-4 rounded-xl flex items-start gap-3">
                    <Info className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">
                      This is your own published asset.
                    </p>
                  </div>
                ) : (
                  <Button
                    asChild
                    className="w-full bg-white text-black hover:bg-white/90 h-14 rounded-xl text-base font-semibold transition-transform active:scale-[0.98]"
                  >
                    <a href={asset.fileUrl.replace('/upload/', '/upload/fl_attachment/')} download target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 w-5 h-5" />
                      Download Asset
                    </a>
                  </Button>
                )
              ) : (
                <Button
                  asChild
                  className="w-full bg-white/10 text-white hover:bg-white/20 border border-white/10 h-14 rounded-xl text-base font-medium"
                >
                  <Link href="/login">Sign In to Download</Link>
                </Button>
              )}
            </div>

            {/* Creator Profile Card */}
            <div className="bg-black border border-[#1f1f1f] rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Creator</p>
              
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-14 w-14 border border-white/10 shadow-lg">
                  {userImage && <AvatarImage src={userImage} alt={userName || "Creator"} />}
                  <AvatarFallback className="bg-zinc-800 text-white font-medium text-lg">
                    {userName ? userName.charAt(0).toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold text-white">{userName}</p>
                </div>
              </div>

              <Button
                asChild
                variant="outline"
                className="w-full bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white h-11 rounded-xl"
              >
                <Link href={`/creator/${userId}`} className="flex justify-between items-center px-4 w-full">
                  <span>View Creator Profile</span>
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
