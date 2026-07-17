"use client";

import { Button } from "@/components/ui/button";
import { Package, Upload, Image as ImageIcon, Zap, Shield, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSession } from "@/lib/auth-client";

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export default function Home() {
  const { data: session, isPending } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center min-h-[80vh]">
        {/* Abstract Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[90vw] md:w-[600px] h-[90vw] md:h-[600px] bg-white/[0.03] blur-[60px] md:blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto relative z-10 px-4">
          <motion.div 
            initial="initial" 
            animate="animate" 
            variants={stagger}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="mb-6 flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-white/70" />
              <span className="text-sm font-medium text-white/70">The new standard for asset management</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
              Manage assets with <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 text-glow">
                absolute precision.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/50 mb-12 max-w-2xl leading-relaxed">
              Upload, organize, and distribute your digital assets through a blazingly fast, beautifully designed platform built for modern creators.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              {!isPending ? (
                session?.user ? (
                  <Button asChild size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-base font-medium">
                    <Link href={isAdmin ? "/admin" : "/dashboard/assets"}>
                      Go to Dashboard
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="w-full sm:w-auto bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-base font-medium">
                    <Link href="/login">
                      Sign in with Google
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                )
              ) : (
                <Button size="lg" disabled className="w-full sm:w-auto bg-white/50 text-black rounded-full px-8 h-12 text-base font-medium">
                  Loading...
                </Button>
              )}
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 h-12 text-base font-medium border-white/10 hover:bg-white/5 hover:text-white bg-transparent">
                <Link href="/gallery">
                  Explore Gallery
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">Everything you need.</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">A complete toolset engineered for performance and visual excellence.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-[#111] border border-[#1f1f1f] hover:border-white/20 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <Upload className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Uploads</h3>
              <p className="text-white/50 leading-relaxed">Drag and drop your heaviest files. We handle the optimization, resizing, and global CDN distribution instantly.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-[#111] border border-[#1f1f1f] hover:border-white/20 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Admin Controls</h3>
              <p className="text-white/50 leading-relaxed">Powerful moderation queues and access management keep your platform secure and your content high quality.</p>
            </div>

            <div className="p-8 rounded-2xl bg-[#111] border border-[#1f1f1f] hover:border-white/20 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Global Discoverability</h3>
              <p className="text-white/50 leading-relaxed">A beautifully designed public gallery helps users find exactly what they're looking for with zero friction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-[#111]/30 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4">How it works</h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">Three simple steps from upload to global distribution.</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-px bg-white/10" />
            
            <div className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-black border border-white/20 flex items-center justify-center text-xl font-bold z-10 mb-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload</h3>
              <p className="text-white/50">Drag and drop your assets into our secure dropzone.</p>
            </div>

            <div className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-black border border-white/20 flex items-center justify-center text-xl font-bold z-10 mb-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Review</h3>
              <p className="text-white/50">Admins verify quality and approve your assets for the public.</p>
            </div>

            <div className="relative flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-black border border-white/20 flex items-center justify-center text-xl font-bold z-10 mb-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Distribute</h3>
              <p className="text-white/50">Your assets are published to the global public gallery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-white/50" />
            <span className="font-medium text-white/50">Asset Manager</span>
          </div>
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} Asset Manager. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
