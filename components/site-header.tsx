"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import * as Typography from "@/components/ui/typography"

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/build" },
    { label: "Contact", href: "/contact" },
    { label: "About", href: "/about" },
  ]

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") {
      return false
    }
    return pathname ? pathname.startsWith(path) : false
  }

  return (
    <header className="border-b border-zinc-800 bg-black/80 backdrop-blur-sm sticky top-0 z-50 glass-effect-dark">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8">
              <img src="/images/white_logo.svg" alt="Mazira Logo" className="w-full h-full" />
            </div>
            <Typography.H3 className="font-light">
              <span className="text-pink-600">MAZIRA</span>
              <span className="text-white">DESIGNS</span>
            </Typography.H3>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex gap-0">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "px-6 py-3 block transition-colors border-b-2 glass-btn",
                      isActive(item.href)
                        ? "text-white border-pink-600 font-normal"
                        : "text-zinc-400 border-transparent hover:text-white hover:bg-zinc-900/30 font-light",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button onClick={() => router.push("/build")} variant="pink">
              Start Your Build
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-md border-t border-zinc-800 glass-effect-dark">
          <nav className="max-w-screen-xl mx-auto px-4 py-0">
            <ul className="divide-y divide-zinc-800">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block py-4 font-bold",
                      isActive(item.href) ? "text-white" : "text-zinc-400 hover:text-white",
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="py-4">
                <Button
                  onClick={() => {
                    router.push("/build")
                    setMobileMenuOpen(false)
                  }}
                  variant="pink"
                  className="w-full"
                >
                  Start Your Build
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
