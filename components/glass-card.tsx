"use client"

import type React from "react"
import { CardContainer } from "@/components/ui/card-container"

type GlassCardProps = {
  children: React.ReactNode
  variant: "dark" | "light"
  color: "pink" | "purple" | "green" | "cyan" | "amber"
  className?: string
}

export function GlassCard({ children, variant, color, className }: GlassCardProps) {
  // This component is now a wrapper around CardContainer for backward compatibility
  return (
    <CardContainer variant={variant} color={color} className={className}>
      {children}
    </CardContainer>
  )
}
