"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/qr-generator/theme-toggle"

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="w-full flex items-center justify-between p-4 border-b border-border bg-background/70 backdrop-blur">
      <div className="flex gap-4">
        <Link href="/">
          <Button variant={pathname === "/" ? "default" : "outline"}>
            WiFi QR
          </Button>
        </Link>
        <Link href="/sitio">
          <Button variant={pathname === "/sitio" ? "default" : "outline"}>
            Web QR
          </Button>
        </Link>
      </div>
      <ThemeToggle />
    </nav>
  )
}