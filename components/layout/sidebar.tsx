import { DashboardNav } from "@/components/dashboard-nav";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

interface SidebarProps {
  navItems?: NavItem[];
}

export default function Sidebar({ navItems = [] }: SidebarProps) {
  return (
    <nav
      className={cn(
        `hidden min-h-full overflow-auto overflow-x-hidden pt-16 xl:block bg-slate-50/90 dark:bg-[#0a1c38] transition-colors duration-150`,
      )}
      dir="rtl"
    >
      <div className="py-3">
        <div className="mx-3 p-3 rounded-lg bg-white/80 dark:bg-[#041423]/80 shadow-sm backdrop-blur-sm side-nav ring-1 ring-slate-900/5 dark:ring-white/10">
          <div className="space-y-1 max-w-[30vw] max-h-[90vh] overflow-y-auto overflow-x-hidden">
            <DashboardNav _items={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}
