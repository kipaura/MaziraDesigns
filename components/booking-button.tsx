"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Loader2 } from "lucide-react"

interface BookingButtonProps {
  buttonText?: string
  calendarUrl?: string
  className?: string
}

export function BookingButton({
  buttonText = "Schedule a Call",
  calendarUrl = "https://api.leadconnectorhq.com/widget/booking/66yNvknvcOgCKkyqZszb",
  className = "",
}: BookingButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent default link behavior
    setIsLoading(true)

    // Create a popup modal for the calendar
    const width = 650
    const height = 650
    const left = (window.innerWidth - width) / 2
    const top = (window.innerHeight - height) / 2

    const popup = window.open(
      calendarUrl,
      "calendar_popup",
      `width=${width},height=${height},top=${top},left=${left},location=no,menubar=no,toolbar=no,status=no,scrollbars=yes,resizable=yes`,
    )

    // If popup was blocked or failed to open
    if (!popup || popup.closed || typeof popup.closed === "undefined") {
      // Fallback to opening in the same tab
      window.location.href = calendarUrl
    }

    // Reset loading state after a short delay
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }

  return (
    <Button onClick={handleClick} disabled={isLoading} variant="purple" className={className}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calendar className="mr-2 h-5 w-5" />}
      {buttonText}
    </Button>
  )
}
