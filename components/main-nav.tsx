"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Navigation items for the main navigation
const navItems = [
  { name: "Menu", href: "/pos" },
  { name: "Customers", href: "/pos/customers" },
  { name: "Tables", href: "/pos/tables" },
  { name: "Orders", href: "/pos/orders" },
  { name: "Offline", href: "/pos/offline" },
  { name: "Management", href: "/pos/management" },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/pos" className="flex items-center space-x-2 font-bold text-xl">
        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white">R</div>
        <span>Resto POS</span>
      </Link>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href ? "text-primary font-semibold" : "text-muted-foreground",
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
