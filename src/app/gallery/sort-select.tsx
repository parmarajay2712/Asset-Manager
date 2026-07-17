"use client";

import { useRouter } from "next/navigation";

export default function SortSelect({ 
  sort, 
  categoryId 
}: { 
  sort: string; 
  categoryId?: number;
}) {
  const router = useRouter();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams();
    if (categoryId) params.set("category", categoryId.toString());
    if (value !== "recent") params.set("sort", value);
    router.push(`/gallery?${params.toString()}`);
  };

  return (
    <select
      className="text-sm bg-transparent border-none text-white/80 py-1 pl-2 pr-6 focus:ring-0 appearance-none cursor-pointer"
      defaultValue={sort}
      onChange={handleSortChange}
    >
      <option value="recent" className="bg-[#111] text-white">Recent</option>
      <option value="popular" className="bg-[#111] text-white">Popular</option>
    </select>
  );
}
