"use client"

import type React from "react"
import { createContext } from "react"
import { cn } from "@/lib/utils"

// Import the new UI components
import { Container as UIContainer } from "@/components/ui/container"
import { Section as UISection } from "@/components/ui/section"

// Typography context to provide consistent styling
const TypographyContext = createContext({})

// Typography provider props
interface TypographyProviderProps {
  children: React.ReactNode
}

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

export function H4({ children, className }: TypographyProps) {
  return <h4 className={cn("text-lg font-bold text-white", className)}>{children}</h4>
}

// Paragraph Components
export function P({ children, className }: TypographyProps) {
  return <p className={cn("text-base text-zinc-300", className)}>{children}</p>
}

export function PLarge({ children, className }: TypographyProps) {
  return <p className={cn("text-lg md:text-xl text-zinc-300", className)}>{children}</p>
}

export function PSmall({ children, className }: TypographyProps) {
  return <p className={cn("text-sm text-zinc-400", className)}>{children}</p>
}

// Special Text Components
export function SectionTitle({ children, className }: TypographyProps) {
  return (
    <div className="text-center mb-12">
      <h2 className={cn("text-3xl font-bold mb-4", className)}>{children}</h2>
    </div>
  )
}

export function Subtitle({ children, className }: TypographyProps) {
  return <p className={cn("text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed", className)}>{children}</p>
}

export function AccentTitle({ children, color = "pink", className }: TypographyProps & { color?: "pink" | "purple" }) {
  return (
    <h3 className={cn(`text-lg font-bold text-white border-l-4 border-${color}-600 pl-3`, className)}>{children}</h3>
  )
}

// Inline Text Components
export function Strong({ children, className }: TypographyProps) {
  return <strong className={cn("font-bold text-white", className)}>{children}</strong>
}

export function Em({ children, className }: TypographyProps) {
  return <em className={cn("italic text-zinc-300", className)}>{children}</em>
}

export function Highlight({
  children,
  color = "pink",
  className,
}: TypographyProps & { color?: "pink" | "purple" | "green" | "cyan" | "amber" }) {
  return <span className={cn(`text-${color}-500 font-bold`, className)}>{children}</span>
}

// Link Component
interface LinkProps extends TypographyProps {
  href: string
  external?: boolean
}

export function TextLink({ children, href, external = false, className }: LinkProps) {
  return (
    <a
      href={href}
      className={cn("text-pink-500 hover:text-pink-400 underline-offset-2 hover:underline", className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  )
}

// Hero Title with Accent Line
export function HeroTitle({ children, className }: TypographyProps) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <H1 className={className}>{children}</H1>
      <div className="h-1 w-40 bg-purple-600 mx-auto mb-8"></div>
    </div>
  )
}

// Container Components
export function Container({ children, className }: TypographyProps) {
  return <UIContainer className={className}>{children}</UIContainer>
}

export function Section({ children, className }: TypographyProps) {
  return <UISection className={className}>{children}</UISection>
}

// Typography Provider Component
export function TypographyProvider({ children }: TypographyProviderProps) {
  return <TypographyContext.Provider value={{}}>{children}</TypographyContext.Provider>
}

// Export all typography components
export const Typography = {
  H1,
  H2,
  H3,
  H4,
  P,
  PLarge,
  PSmall,
  SectionTitle,
  Subtitle,
  AccentTitle,
  Strong,
  Em,
  Highlight,
  TextLink,
  HeroTitle,
  Container,
  Section,
}
