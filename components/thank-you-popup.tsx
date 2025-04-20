"use client"

import { CheckCircle } from "lucide-react"

interface ThankYouPopupProps {
  isOpen: boolean
}

export function ThankYouPopup({ isOpen }: ThankYouPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Popup */}
      <div className="relative z-[101] h-full flex items-center justify-center">
        <div className="bg-zinc-900/95 rounded-xl border border-purple-600/50 shadow-lg p-8 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-300">
          <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-purple-600 -mt-8 mb-6 rounded-t-lg" />

          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-purple-500" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Thanks for completing your onboarding!</h2>

            <p className="text-zinc-300 mb-6">
              Our team will get started on your content and follow-up with any questions.
            </p>

            <div className="w-full h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent my-2" />

            <p className="text-sm text-zinc-400 mt-4">Redirecting you in a moment...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
