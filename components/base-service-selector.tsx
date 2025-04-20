"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { CardContainer } from "@/components/ui/card-container"

type ServiceColor = "pink" | "purple" | "green" | "cyan" | "amber";

interface ServiceHeaderProps {
  title: string
  subtitle: string
  icon: React.ReactElement
  color: ServiceColor
}

export function ServiceHeader({
  title,
  subtitle,
  icon,
  color,
}: ServiceHeaderProps) {
  const colorClass = `text-${color}-400`

  // Fix the cloneElement type error by being explicit about the props type
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800">
        {React.cloneElement(icon, {
          className: cn("w-5 h-5", colorClass)
        } as React.HTMLAttributes<SVGElement>)}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-zinc-400 text-sm">{subtitle}</p>
      </div>
    </div>
  )
}

interface BaseServiceSelectorProps {
  title: string
  subtitle: string
  icon: React.ReactElement
  color: ServiceColor
  children: React.ReactNode
  className?: string
  onSelectionChange?: (selection: any) => void
}

export function BaseServiceSelector({ 
  title, 
  subtitle, 
  icon, 
  color, 
  children, 
  className,
  onSelectionChange 
}: BaseServiceSelectorProps) {
  const handleSelectionUpdate = (selection: any) => {
    if (onSelectionChange) {
      onSelectionChange(selection)
    }
  }

  return (
    <CardContainer variant="dark" color={color} className={cn("relative overflow-hidden", className)}>
      {/* Sharp accent line */}
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${color}-600 to-${color === "pink" ? "purple" : color}-600`}
      ></div>

      <div className="p-6">
        <ServiceHeader title={title} subtitle={subtitle} icon={icon} color={color} />

        {React.Children.map(children, child => {
        if (React.isValidElement(child) && typeof child.type !== "string") {
          return React.cloneElement(child, {
            ...(child.props as any).onSelectionChange !== undefined && {
              onSelectionChange: handleSelectionUpdate,
            },
          });
        }
        return child;
      })}
      </div>
    </CardContainer>
  )
}
