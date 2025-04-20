"use client"

import { cn } from "@/lib/utils"
import type React from "react"

// Typography components
interface TypographyProps {
  children: React.ReactNode
  className?: string
}

// Heading Components
export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn("text-4xl md:text-5xl lg:text-6xl font-light text-white whitespace-normal", className)}>
      {children}
    </h1>
  )
}

export function H2({ children, className }: TypographyProps) {
  return <h2 className={cn("text-3xl font-bold text-white", className)}>{children}</h2>
}

export function H3({ children, className }: TypographyProps) {
  return <h3 className={cn("text-xl font-bold text-white", className)}>{children}</h3>
}

export function P({ children, className }: TypographyProps) {
  return <p className={cn("text-base text-zinc-300", className)}>{children}</p>
}

export function PLarge({ children, className }: TypographyProps) {
  return <p className={cn("text-lg md:text-xl text-zinc-300", className)}>{children}</p>
}

export const Typography = {
  H1,
  H2,
  H3,
  P,
  PLarge,
}
