"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { CardContainer } from "@/components/ui/card-container"

interface CarouselVideoProps {
  src: string
  alt: string
  size: "small" | "medium" | "large"
}

export function CarouselVideo({ src, alt, size }: CarouselVideoProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Size mapping for story videos (9:16 aspect ratio)
  const sizeMap = {
    small: { height: "h-48", width: "w-27" },
    medium: { height: "h-80", width: "w-45" },
    large: { height: "h-128", width: "w-72" },
  }

  return (
    <CardContainer
      variant="dark"
      color="purple"
      className={cn(
        "shrink-0 overflow-hidden transition-transform duration-300",
        sizeMap[size].height,
        sizeMap[size].width,
        isHovered && "scale-105",
      )}
      style={{ aspectRatio: "9/16" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video autoPlay loop muted playsInline className="h-full w-full object-cover" aria-label={alt}>
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </CardContainer>
  )
}
