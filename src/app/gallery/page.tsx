import {
  getCategoriesAction,
  getPublicAssetsAction,
  getPublicAssetsCountAction,
  getTrendingAssetsAction,
} from "@/actions/dashboard-actions";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2, Flame, Eye, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { formatViewCount } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface GalleryPageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    sort?: "recent" | "popular";
  }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[65vh]">
          <Loader2 className="h-8 w-8 animate-spin text-white/50" />
        </div>
      }
    >
      <GalleryContent searchParams={searchParams} />
    </Suspense>
  );
}

async function GalleryContent({ searchParams }: GalleryPageProps) {
  const resolvedParams = await searchParams;

  const categoryId = resolvedParams.category
    ? Number.parseInt(resolvedParams.category)
    : undefined;

  const currentPage = resolvedParams.page
    ? Number.parseInt(resolvedParams.page)
    : 1;

  const sort = resolvedParams.sort || "recent";
  const limit = 20; // Increased limit for masonry

  const [categories, assets, totalCount, trendingAssets] = await Promise.all([
    getCategoriesAction(),
    getPublicAssetsAction(categoryId, currentPage, limit, sort),
    getPublicAssetsCountAction(categoryId),
    (!categoryId && currentPage === 1) ? getTrendingAssetsAction() : Promise.resolve([]),
  ]);

  const totalPages = Math.ceil(totalCount / limit);
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const sortedByViews = [...assets].sort((a, b) => (b.asset.viewCount || 0) - (a.asset.viewCount || 0));
  const top3Ids = sortedByViews.slice(0, 3).map((a) => a.asset.id);

  function buildPageUrl(page: number, newSort?: "recent" | "popular") {
    const params = new URLSearchParams();
    if (categoryId) params.set("category", categoryId.toString());
    if (page > 1) params.set("page", page.toString());
    const activeSort = newSort || sort;
    if (activeSort !== "recent") params.set("sort", activeSort);
    return `/gallery?${params.toString()}`;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Top Filter & Search Bar */}
      <div className="sticky top-16 z-30 glass py-4 px-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5">
        <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Vercel-style Tab Filters */}
          <div className="flex overflow-x-auto gap-1 pb-1 sm:pb-0 hide-scrollbar w-full md:w-auto p-1 rounded-lg bg-white/5 border border-white/10">
            <Link 
              href="/gallery"
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${!categoryId ? 'bg-white text-black shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            >
              All
            </Link>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/gallery?category=${c.id}`}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${categoryId === c.id ? 'bg-white text-black shadow-sm' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              >
                {c.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="w-full bg-black border border-white/10 rounded-full py-1.5 pl-9 pr-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
                disabled
              />
            </div>
            
            <div className="shrink-0 bg-black border border-white/10 rounded-full px-1 py-1">
              <select
                className="text-sm bg-transparent border-none text-white/80 py-1 pl-2 pr-6 focus:ring-0 appearance-none cursor-pointer"
                defaultValue={sort}
              >
                <option value="recent" className="bg-[#111] text-white">Recent</option>
                <option value="popular" className="bg-[#111] text-white">Popular</option>
              </select>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    document.querySelector('select').addEventListener('change', function(e) {
                      window.location.href = '${buildPageUrl(1)}'.replace(/sort=[^&]*/, '').replace(/\\?$/, '') + (this.value === 'popular' ? '${categoryId ? '&' : '?'}sort=popular' : '');
                    });
                  `,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 py-10 space-y-16">
        {/* Trending Section */}
        {trendingAssets.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">Trending Now</h2>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x">
              {trendingAssets.map(({ asset, userName }) => (
                <Link
                  href={`/gallery/${asset.id}`}
                  key={asset.id}
                  className="block shrink-0 snap-start w-64 md:w-80 group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-[#111] border border-white/10 aspect-[16/10] group-hover:border-white/30 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-all duration-300">
                    <Image
                      src={asset.fileUrl}
                      alt={asset.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-semibold text-lg line-clamp-1 mb-1">
                        {asset.title}
                      </h3>
                      <div className="flex justify-between items-center">
                        <span className="text-white/60 text-sm font-medium">
                          {userName}
                        </span>
                        <span className="flex items-center text-white/90 text-xs font-semibold bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                          <Eye className="w-3.5 h-3.5 mr-1.5" />
                          {formatViewCount(asset.viewCount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section>
          {!categoryId && currentPage === 1 && trendingAssets.length > 0 && (
            <h2 className="text-2xl font-bold tracking-tight mb-8 text-white">Discover</h2>
          )}
          
          {assets.length === 0 ? (
            <div className="py-32 text-center border border-white/5 rounded-3xl bg-[#111]/50 border-dashed">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-white/30" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No assets found</h3>
              <p className="text-white/40">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <>
              {/* MASONRY GRID */}
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {assets.map(({ asset, categoryName, userName }) => {
                  const isTop3 = top3Ids.includes(asset.id) && (asset.viewCount || 0) > 0;
                  return (
                    <Link
                      href={`/gallery/${asset.id}`}
                      key={asset.id}
                      className="block break-inside-avoid group"
                    >
                      <div className="relative overflow-hidden rounded-2xl bg-[#111] border border-white/10 group-hover:border-white/30 transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
                        {/* We don't have natural heights stored, so we will fake varied heights for masonry look if needed, but native images in Next.js fill need aspect ratio. To get true masonry, we use standard img tag or specific aspect ratio classes based on ID to simulate it if heights aren't known. We'll use random aspect ratios or object-cover */}
                        <div className="relative w-full" style={{ aspectRatio: (asset.id.length % 2 === 0) ? '3/4' : '4/3' }}>
                          <Image
                            src={asset.fileUrl}
                            alt={asset.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        
                        {isTop3 && (
                          <div className="absolute top-4 left-4 z-10">
                            <Badge className="bg-black/50 backdrop-blur-md text-orange-400 border border-orange-500/30 gap-1 pl-1.5 shadow-lg">
                              <Flame className="w-3.5 h-3.5" />
                              TRENDING
                            </Badge>
                          </div>
                        )}
                        
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-white font-semibold text-xl line-clamp-1 mb-2">
                              {asset?.title}
                            </h3>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                                  {userName ? userName.charAt(0).toUpperCase() : "U"}
                                </div>
                                <span className="text-white/80 text-sm font-medium">
                                  {userName || "Unknown"}
                                </span>
                              </div>
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
                  );
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-16 pb-12">
                  <Button
                    variant="outline"
                    className="border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-full px-6"
                    disabled={!hasPrevPage}
                    asChild={hasPrevPage}
                  >
                    {hasPrevPage ? (
                      <Link href={buildPageUrl(currentPage - 1)}>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Link>
                    ) : (
                      <span>
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                      </span>
                    )}
                  </Button>

                  <span className="text-sm font-medium text-white/50 bg-[#111] px-4 py-2 rounded-full border border-white/5">
                    Page {currentPage} of {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    className="border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white rounded-full px-6"
                    disabled={!hasNextPage}
                    asChild={hasNextPage}
                  >
                    {hasNextPage ? (
                      <Link href={buildPageUrl(currentPage + 1)}>
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    ) : (
                      <span>
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </span>
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
