"use client"

import { useEffect, useRef, useState } from "react"
import { CarouselImage } from "./carousel-image"
import { CarouselVideo } from "./carousel-video"
import { VSpacer } from "@/components/ui/spacing"

interface ScrollingCarouselProps {
  className?: string
  speed?: "slow" | "normal" | "fast"
  imageSize?: "small" | "medium" | "large"
}

export function ScrollingCarousel({ className, speed = "normal", imageSize = "medium" }: ScrollingCarouselProps) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const separatorRef = useRef<HTMLDivElement>(null)

  // Content items - alternating between square images and stories videos
  const contentItems = [
    {
      id: 1,
      type: "image",
      src: "/images/square1.png",
      alt: "Art Expo advertisement",
    },
    {
      id: 2,
      type: "video",
      src: "/videos/stories1a.mp4",
      alt: "Instagram story video",
    },
    {
      id: 3,
      type: "image",
      src: "/images/square4.png",
      alt: "Iconic brand image",
    },
    {
      id: 4,
      type: "video",
      src: "/videos/stories3.mp4",
      alt: "Instagram story video",
    },
    {
      id: 5,
      type: "image",
      src: "/images/square5.png",
      alt: "Dance till you drop advertisement",
    },
    {
      id: 6,
      type: "video",
      src: "/videos/stories4.mp4",
      alt: "Instagram story video",
    },
    {
      id: 7,
      type: "image",
      src: "/images/square8.png",
      alt: "Smart IT Solutions",
    },
    {
      id: 8,
      type: "video",
      src: "/videos/stories5.mp4",
      alt: "Instagram story video",
    },
    {
      id: 9,
      type: "image",
      src: "/images/square3.png",
      alt: "Immerse Yourself",
    },
  ]

  // Duplicate the items to create a seamless loop
  const allItems = [...contentItems, ...contentItems]

  // Determine animation duration based on speed
  const getDuration = () => {
    switch (speed) {
      case "slow":
        return "60s"
      case "fast":
        return "20s"
      default:
        return "40s"
    }
  }

  // Reset animation when it completes
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleAnimationEnd = () => {
      container.style.animation = "none"
      container.offsetHeight // Trigger reflow
      container.style.animation = `scroll ${getDuration()} linear infinite`
    }

    container.addEventListener("animationend", handleAnimationEnd)
    return () => {
      container.removeEventListener("animationend", handleAnimationEnd)
    }
  }, [speed])

  // Animate the separator gradient
  useEffect(() => {
    const separator = separatorRef.current
    if (!separator) return

    // Add animation to the separator
    separator.style.animation = "gradientShift 8s ease infinite"
  }, [])

  return (
    <div className="space-y-8">
      <div
        className="relative w-full overflow-hidden bg-black"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient overlays for fade effect */}
        <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent"></div>
        <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent"></div>

        {/* Scrolling container */}
        <div
          ref={containerRef}
          className="flex gap-4 py-6 items-center"
          style={{
            animation: `scroll ${getDuration()} linear infinite`,
            animationPlayState: isHovered ? "paused" : "running",
          }}
        >
          {allItems.map((item, index) =>
            item.type === "image" ? (
              <CarouselImage key={`${item.id}-${index}`} src={item.src} alt={item.alt} size={imageSize} />
            ) : (
              <CarouselVideo key={`${item.id}-${index}`} src={item.src} alt={item.alt} size={imageSize} />
            ),
          )}
        </div>

        {/* CSS for the animations */}
        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @keyframes gradientShift {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}</style>
      </div>
      <VSpacer size="sm" />
    </div>
  )
}
