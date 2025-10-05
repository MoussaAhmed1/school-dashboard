import Header from "@/components/layout/header";
import { Locale } from "@/i18n.config";
import type { Metadata } from "next";

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
  return (
    <>
      <Header lang={params.lang} />
      <div className="flex min-h-screen relative" >
        {/* <div className="hidden xl:block xl:w-[17%]  h-full w-0 border-r rtl:border-r-0 rtl:border-l fixed z-20 shadow-lg">
          <Sidebar />
        </div> */}
        <main className=" w-full top-10 relative ml-0 " >
          {children}
        </main>
      </div>
    </>
  );
}
