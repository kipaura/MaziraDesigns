"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Loader2, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"

interface GHLCalendarWidgetProps {
  buttonText?: string
  className?: string
  calendarUrl?: string
}

export function GHLCalendarWidget({
  buttonText = "Schedule a Call",
  className = "",
  calendarUrl = "https://api.leadconnectorhq.com/widget/booking/66yNvknvcOgCKkyqZszb",
}: GHLCalendarWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    setIsLoading(true)
  }

  return (
    <>
      <Button onClick={handleOpen} disabled={isLoading} variant="purple" className={className}>
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calendar className="mr-2 h-5 w-5" />}
        {buttonText}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[650px] h-auto max-h-[95vh] p-0">
          <DialogHeader className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
            <div className="flex items-center justify-between p-4">
              <DialogTitle className="text-xl font-semibold">Schedule a Call</DialogTitle>
              <DialogClose className="rounded-full p-2 hover:bg-zinc-800">
                <X className="h-5 w-5" />
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-40">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
            <iframe
              src={calendarUrl}
              className="w-full min-h-[800px] border-0"
              title="Calendar Widget"
              onLoad={() => setIsLoading(false)}
              allow="camera *; microphone *; autoplay *; clipboard-write *"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
