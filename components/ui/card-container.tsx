import { cn } from "@/lib/utils"
import * as React from "react"
import { HTMLAttributes } from "react"

interface CardContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "dark" | "light"
  color?: "pink" | "purple" | "green" | "cyan" | "amber" | "default"
}

/**
 * CardContainer component for consistent card styling
 * Replaces inconsistent glass-effect-dark and GlassCard usage
 */
export function CardContainer({ 
  children, 
  className, 
  variant = "dark", 
  color = "default",
  ...props 
}: CardContainerProps) {
  const baseClasses = "relative overflow-hidden rounded-xl border transition-all duration-300"

  const variantClasses =
    variant === "dark"
      ? "glass-effect-dark glass-btn-shimmer bg-gradient-to-br from-zinc-900 to-black border-zinc-800"
      : "bg-white/10 border-zinc-200"

  const colorClasses = {
    default: "",
    pink: "glass-pink border-pink-600/50 hover:shadow-lg hover:shadow-pink-900/20",
    purple: "glass-purple border-purple-600/50 hover:shadow-lg hover:shadow-purple-900/20",
    green: "glass-green border-green-600/50 hover:shadow-lg hover:shadow-green-900/20",
    cyan: "glass-cyan border-cyan-600/50 hover:shadow-lg hover:shadow-cyan-900/20",
    amber: "glass-amber border-amber-600/50 hover:shadow-lg hover:shadow-amber-900/20",
  }

  return (
    <div 
      className={cn(baseClasses, variantClasses, colorClasses[color], className)}
      {...props}
    >
      {children}
    </div>
  )
}
