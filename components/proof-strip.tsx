"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
// Add Typography import
import { Typography } from "@/components/typography-provider"
const { P } = Typography

interface ProofStripProps {
  className?: string
}

export function ProofStrip({ className }: ProofStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // List of proof points that will scroll
  const proofPoints = [
    "Cancel Anytime",
    "Secured Payment",
    "Custom Content",
    "10-13 Day Delivery",
    "Unlimited Revisions",
    "Strategy Included",
  ]

  // Set up the scrolling animation
  useEffect(() => {
    const scrollElement = scrollRef.current
    if (!scrollElement) return

    // Reset the animation when it completes
    const handleAnimationEnd = () => {
      scrollElement.style.animation = "none"
      // Trigger reflow
      void scrollElement.offsetWidth
      scrollElement.style.animation = "scrollProof 20s linear infinite"
    }

    scrollElement.addEventListener("animationend", handleAnimationEnd)
    return () => {
      scrollElement.removeEventListener("animationend", handleAnimationEnd)
    }
  }, [])

  return (
    <div className={cn("bg-zinc-900 border-y border-zinc-800 py-2 overflow-hidden", className)}>
      <Container>
        <div className="flex items-center">
          {/* Static text */}
          <div className="flex items-center shrink-0">
            {/* Replace direct span with Typography component */}
            {/* Change:
            <span className="text-white font-medium">2,500+ Clients</span>

            // To: */}
            <P className="text-white font-medium m-0">2,500+ Clients</P>
            <span className="mx-4 h-5 w-px bg-zinc-700"></span>
          </div>

          {/* Scrolling text container */}
          <div className="overflow-hidden relative w-full">
            <div
              ref={scrollRef}
              className="flex whitespace-nowrap animate-scrollProof"
              style={{ animation: "scrollProof 20s linear infinite" }}
            >
              {/* Duplicate the proof points to create a seamless loop */}
              {[...proofPoints, ...proofPoints].map((point, index) => (
                <div key={index} className="flex items-center">
                  {/* Change:
                  <span className="text-white px-4">{point}</span>

                  // To: */}
                  <P className="text-white px-4 m-0">{point}</P>
                  <span className="h-2 w-2 rounded-full bg-pink-600 mx-4"></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Add the animation keyframes */}
      <style jsx>{`
        @keyframes scrollProof {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
