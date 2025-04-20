import { cn } from "@/lib/utils"
import type React from "react"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full"
}

/**
 * Container component for consistent width constraints
 *
 * @param size - Container width preset:
 *   - xs: max-w-screen-sm (640px)
 *   - sm: max-w-screen-md (768px)
 *   - md: max-w-screen-lg (1024px)
 *   - lg: max-w-screen-xl (1280px) - DEFAULT
 *   - xl: max-w-screen-2xl (1536px)
 *   - full: max-w-full
 */
export function Container({ children, className, size = "lg" }: ContainerProps) {
  const sizeClasses = {
    xs: "max-w-screen-sm", // 640px
    sm: "max-w-screen-md", // 768px
    md: "max-w-screen-lg", // 1024px
    lg: "max-w-screen-xl", // 1280px
    xl: "max-w-screen-2xl", // 1536px
    full: "max-w-full",
  }

  return <div className={cn("mx-auto px-4 md:px-6 w-full", sizeClasses[size], className)}>{children}</div>
}
