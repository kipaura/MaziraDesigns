"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { CardContainer } from "@/components/ui/card-container"
// Add Typography import
import { Typography } from "@/components/typography-provider"
const { H3, P } = Typography

interface ServiceBlockProps {
  block: {
    id: string
    title: string
    icon: React.ReactElement<React.SVGAttributes<SVGElement>> // Update this type
    description: string
    price: string
    color: string
  }
  isSelected: boolean
  onSelect: (id: string) => void
}

export function ServiceBlock({ block, isSelected, onSelect }: ServiceBlockProps) {
  const handleSelect = () => {
    onSelect(block.id)
  }

  return (
    <CardContainer
      variant="dark"
      color={block.color as "pink" | "purple" | "green" | "cyan" | "amber"}
      className={cn(
        "p-6 flex flex-col h-full transition-all duration-300",
        isSelected && "ring-2 ring-white/50 scale-[1.02]",
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg",
            block.color === "pink" && "bg-pink-600/20",
            block.color === "purple" && "bg-purple-600/20",
            block.color === "green" && "bg-green-600/20",
            block.color === "cyan" && "bg-cyan-600/20",
            block.color === "amber" && "bg-amber-600/20",
          )}
        >
          {React.cloneElement(block.icon, {
            className: cn(
              "w-5 h-5",
              block.color === "pink" && "text-pink-400",
              block.color === "purple" && "text-purple-400",
              block.color === "green" && "text-green-400",
              block.color === "cyan" && "text-cyan-400",
              block.color === "amber" && "text-amber-400",
            )
          } as React.SVGAttributes<SVGElement>)}
        </div>
        {/* Replace direct h3 with Typography component */}
        <H3 className="text-lg">{block.title}</H3>
      </div>
      {/* Replace direct p with Typography component */}
      <P className="text-sm mb-4 flex-grow">{block.description}</P>
      <div className="mt-auto">
        {/* Change: */}
        <P className="text-lg font-bold text-white mb-2">{block.price} / month</P>
        <Button
          onClick={handleSelect}
          className={cn(
            "w-full",
            isSelected &&
              cn(
                block.color === "pink" && "bg-pink-600/20",
                block.color === "purple" && "bg-purple-600/20",
                block.color === "green" && "bg-green-600/20",
                block.color === "cyan" && "bg-cyan-600/20",
                block.color === "amber" && "bg-amber-600/20",
              ),
          )}
        >
          {isSelected ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Selected
            </>
          ) : (
            "Add to Stack"
          )}
        </Button>
      </div>
    </CardContainer>
  )
}
