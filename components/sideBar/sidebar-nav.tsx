"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    clicked?:string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "justify-start items-center rounded-md px-3 py-2 text-sm transition-colors duration-150 ease-in-out",
            (pathname === `${item.href}`)
              ? "bg-slate-100 dark:bg-[#06202f] text-blue-700 shadow-sm border-r-4 border-blue-600"
              : "hover:bg-slate-50 dark:hover:bg-[#071726] hover:text-blue-700",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
