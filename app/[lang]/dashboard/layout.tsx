import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getNavItemsByRole } from "@/utils/permissions";
import { NavItem } from "@/types";

export const metadata: Metadata = {
  title: "NADNEE Dashboard",
  description: "Basic dashboard with Next.js and Shadcn",
};

export default function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params:{lang:Locale}
}) {
  const cookieStore = cookies();
  const role = cookieStore.get("role")?.value || "";
  const filteredNavItems: NavItem[] = getNavItemsByRole(role);
  return (
    <>
      <Header lang={params.lang} navItems={filteredNavItems} />
      <div className="flex min-h-screen relative">
        <main className=" w-full top-10 relative ml-0 " >
        {children}
        </main>
      </div>
    </>
  );
}
