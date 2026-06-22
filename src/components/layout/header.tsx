"use client";

import { signOut, useSession } from "@/lib/auth-client";
import { LogOut, Package, Menu, Home, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "../ui/sheet";
import { motion } from "framer-motion";

function Header() {
  const pathName = usePathname();
  const router = useRouter();
  
  // Hide global header on login, dashboard, and admin routes
  if (
    pathName === "/login" || 
    pathName.startsWith("/dashboard") || 
    pathName.startsWith("/admin")
  ) {
    return null;
  }

  const { data: session, isPending } = useSession();
  const user = session?.user;
  const isAdminUser = user?.role === "admin";

  const handleLogout = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass h-16">
      <div className="container h-full flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 rounded-lg bg-white/10 border border-white/10 group-hover:bg-white/20 transition-colors">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">
              Asset Manager
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/gallery"
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                pathName.startsWith("/gallery")
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              Gallery
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {isPending ? null : user ? (
            <div className="flex items-center gap-3">
              {!isAdminUser ? (
                <Button variant="ghost" className="hidden sm:flex text-white/70 hover:text-white hover:bg-white/10 h-9" asChild>
                  <Link href="/dashboard/assets">Dashboard</Link>
                </Button>
              ) : (
                <Button variant="ghost" className="hidden sm:flex text-white/70 hover:text-white hover:bg-white/10 h-9" asChild>
                  <Link href="/admin">Admin Console</Link>
                </Button>
              )}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className="relative h-9 w-9 rounded-full border border-white/10 bg-black overflow-hidden ring-offset-black focus-visible:ring-white/20"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-gradient-to-br from-zinc-700 to-zinc-900 text-white font-medium">
                        {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#111] border-[#1f1f1f] text-white">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-white">
                        {user.name}
                      </p>
                      <p className="text-xs leading-none text-white/50">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#1f1f1f]" />
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-white/10 focus:text-white">
                    <Link href={isAdminUser ? "/admin" : "/dashboard/assets"}>
                      <Home className="mr-2 h-4 w-4 text-white/50" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#1f1f1f]" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-400/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link href="/login">
              <Button className="bg-white text-black hover:bg-white/90 h-9 px-5 rounded-full font-medium">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10 border border-white/10 h-9 w-9">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-[#0a0a0a] border-l-[#1f1f1f] text-white">
              <SheetHeader className="mb-6 border-b border-[#1f1f1f] pb-4 text-left">
                <SheetTitle className="flex items-center gap-2 text-white">
                  <Package className="h-5 w-5" />
                  Asset Manager
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-2">
                <SheetClose asChild>
                  <Link
                    href="/gallery"
                    className="flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md"
                  >
                    <ImageIcon className="h-4 w-4" />
                    Gallery
                  </Link>
                </SheetClose>

                {!isPending && user && !isAdminUser && (
                  <SheetClose asChild>
                    <Link
                      href={"/dashboard/assets"}
                      className="flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md"
                    >
                      <Home className="h-4 w-4" />
                      My Dashboard
                    </Link>
                  </SheetClose>
                )}

                {!isPending && user && isAdminUser && (
                  <SheetClose asChild>
                    <Link
                      href={"/admin"}
                      className="flex items-center gap-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md"
                    >
                      <Home className="h-4 w-4" />
                      Admin Console
                    </Link>
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
