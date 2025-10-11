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
        <SheetContent side="right" className="!px-0 h-screen overflow-auto">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
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
