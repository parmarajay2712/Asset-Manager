import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarLayout } from "@/components/layout/sidebar-layout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/");
  if (session.user.role !== "admin") redirect("/");

  return (
    <SidebarLayout>
      <div className="p-4 lg:p-8">{children}</div>
    </SidebarLayout>
  );
}
