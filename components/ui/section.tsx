import { cn } from "@/lib/utils"
import type React from "react"

interface SectionProps {
  children: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
  as?: "section" | "div" | "article" | "main"
}

/**
 * Section component for consistent vertical spacing
 *
 * @param size - Section padding preset:
 *   - sm: py-8 (32px)
 *   - md: py-16 (64px) - DEFAULT
 *   - lg: py-20 (80px)
 *   - xl: py-24 (96px)
 * @param as - HTML element to render (default: section)
 */
export function Section({ children, className, size = "md", as = "section" }: SectionProps) {
  const sizeClasses = {
    sm: "py-8", // Small sections (32px)
    md: "py-16", // Standard sections (64px)
    lg: "py-20", // Large sections (80px)
    xl: "py-24", // Extra large sections (96px)
  }

  const Component = as

  return <Component className={cn(sizeClasses[size], className)}>{children}</Component>
}
