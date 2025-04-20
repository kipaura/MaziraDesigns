"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { CardContainer } from "@/components/ui/card-container"

interface CarouselImageProps {
  src: string
  alt: string
  size: "small" | "medium" | "large"
}

export function CarouselImage({ src, alt, size }: CarouselImageProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Size mapping for square images
  const sizeMap = {
    small: "h-24 w-24",
    medium: "h-40 w-40",
    large: "h-64 w-64",
  }

  return (
    <CardContainer
      variant="dark"
      color="purple"
      className={cn(
        "shrink-0 overflow-hidden transition-transform duration-300",
        sizeMap[size],
        isHovered && "scale-105",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={400}
        height={400}
        className="h-full w-full object-cover"
      />
    </CardContainer>
  )
}
