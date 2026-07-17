"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { 
  Package, 
  Image as ImageIcon, 
  Settings, 
  LogOut, 
  CheckCircle,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";
import { Menu } from "lucide-react";

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const user = session?.user;
  const isAdmin = user?.role === "admin";

  const adminLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Asset Approval", href: "/admin/asset-approval", icon: CheckCircle },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const userLinks = [
    { name: "My Assets", href: "/dashboard/assets", icon: ImageIcon },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-[#1f1f1f] bg-[#0a0a0a] flex flex-col z-40 hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-[#1f1f1f]">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1 rounded-md bg-white/10 group-hover:bg-white/20 transition-colors">
              <Package className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-white">
              Asset Manager
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto hide-scrollbar">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-[#1f1f1f]">
          {!isPending && user && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <Avatar className="h-9 w-9 border border-white/10">
                  <AvatarFallback className="bg-zinc-800 text-white text-xs">
                    {user.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="truncate">
                  <p className="text-sm font-medium text-white truncate">{user.name}</p>
                  <p className="text-xs text-white/50 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push("/") } })}
                className="p-2 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                title="Log out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 max-w-full md:ml-64 min-h-screen overflow-x-hidden">
        {/* Mobile Header Equivalent */}
        <div className="md:hidden h-16 border-b border-[#1f1f1f] flex items-center justify-between px-4 bg-[#0a0a0a] sticky top-0 z-30">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1 rounded-md bg-white/10">
              <Package className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold text-sm text-white">
              Asset Manager
            </span>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-[#0a0a0a] border-r-[#1f1f1f] p-0 flex flex-col">
              <SheetHeader className="h-16 px-6 border-b border-[#1f1f1f] flex items-start justify-center">
                <SheetTitle className="flex items-center gap-2 text-white">
                  <Package className="h-4 w-4" />
                  <span className="text-sm">Asset Manager</span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {link.name}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-[#1f1f1f]">
                {!isPending && user && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <Avatar className="h-9 w-9 border border-white/10">
                        <AvatarFallback className="bg-zinc-800 text-white text-xs">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="truncate text-left">
                        <p className="text-sm font-medium text-white truncate">{user.name}</p>
                        <p className="text-xs text-white/50 truncate">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push("/") } })}
                      className="p-2 text-white/50 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors shrink-0"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
        {children}
      </main>
    </div>
  );
}
