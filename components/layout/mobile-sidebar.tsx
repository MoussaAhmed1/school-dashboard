"use client";
import { DashboardNav } from "@/components/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavItem } from "@/types";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

interface MobileSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  navItems?: NavItem[];
}

export function MobileSidebar({ className, navItems = [] }: MobileSidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent side="right" className="!px-0 h-screen overflow-auto bg-[#FAFAFA] dark:bg-[#0a1c38]">
          <div className="space-y-4 py-4">
            <div className="mx-3 my-2 p-3 rounded-lg bg-white/60 dark:bg-[#041423]/60 shadow-sm backdrop-blur">
              <div className="space-y-1">
                <DashboardNav _items={navItems} setOpen={setOpen} />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
