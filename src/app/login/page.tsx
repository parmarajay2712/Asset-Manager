import LoginButton from "@/components/auth/login-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { Package, ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-[400px] px-4 relative z-10">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to home
        </Link>
        
        <Card className="bg-[#111]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="text-center pt-10 pb-6">
            <div className="mx-auto p-3 rounded-xl bg-white/5 border border-white/10 mb-6 shadow-inner">
              <Package className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-white mb-2">
              Welcome back
            </CardTitle>
            <CardDescription className="text-white/50">
              Sign in to manage your digital assets
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-10">
            <LoginButton />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
