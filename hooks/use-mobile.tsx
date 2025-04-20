"use client"

import { useState, useEffect } from "react"

/**
 * Hook to detect if the viewport width is below a specified breakpoint
 * @param breakpoint - The breakpoint width in pixels (default: 768)
 * @returns boolean indicating if the viewport is below the breakpoint
 */
export function useMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    // Set initial value
    setIsMobile(window.innerWidth < breakpoint)

    // Use matchMedia for more efficient event handling
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    
    const handleChange = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Add both matchMedia and resize listeners for better compatibility
    mql.addEventListener("change", handleChange)
    window.addEventListener("resize", handleChange)

    // Clean up
    return () => {
      mql.removeEventListener("change", handleChange)
      window.removeEventListener("resize", handleChange)
    }
  }, [breakpoint])

  return isMobile
}
