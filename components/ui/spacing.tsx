import { cn } from "@/lib/utils"

interface SpacerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
}

/**
 * Vertical spacer component for consistent spacing between elements
 */
export function VSpacer({ size = "md", className }: SpacerProps) {
  const sizeClasses = {
    xs: "h-2", // 8px
    sm: "h-4", // 16px
    md: "h-8", // 32px
    lg: "h-12", // 48px
    xl: "h-16", // 64px
  }

  return <div className={cn(sizeClasses[size], className)} aria-hidden="true" />
}

interface DividerProps {
  className?: string
}

/**
 * Divider component for consistent horizontal dividers
 */
export function Divider({ className }: DividerProps) {
  return <div className={cn("h-px w-full bg-zinc-800", className)} aria-hidden="true" />
}

interface GradientDividerProps {
  className?: string
}

/**
 * Gradient divider component for consistent styled dividers
 */
export function GradientDivider({ className }: GradientDividerProps) {
  return (
    <div
      className={cn("h-px w-full bg-gradient-to-r from-transparent via-zinc-700 to-transparent", className)}
      aria-hidden="true"
    />
  )
}
