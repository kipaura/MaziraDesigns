"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ShoppingCart, ChevronUp, X, ArrowRight, CheckCircle, MousePointerClick, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"
import { GlassCard } from "@/components/glass-card"
import { CardContainer } from "@/components/ui/card-container"
import { VSpacer } from "@/components/ui/spacing"
import { prepareCheckoutPayload } from "@/lib/checkout-utils"

// Create a reusable step card component
function StepCard({
  number,
  title,
  description,
  icon,
  color = "pink",
}: {
  number: number
  title: string
  description: string
  icon: React.ReactNode
  color?: "pink" | "purple"
}) {
  return (
    <CardContainer variant="dark" color={color} className="p-3">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-6 h-6 rounded-lg bg-zinc-800/80 flex items-center justify-center">{icon}</div>
        <h3 className="text-sm font-semibold">
          {number}. {title}
        </h3>
      </div>
      <p className="text-xs text-zinc-300 pl-8">{description}</p>
    </CardContainer>
  )
}

interface SummaryPanelProps {
  selectedServices: { name: string; tier: string; price: number }[];
  total: number;
}

export function SummaryPanel({ selectedServices, total }: SummaryPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const router = useRouter()
  const isMobile = useMobile()

  // Only store as checkoutServices when actually starting checkout
  const startCheckout = async () => {
    const result = await prepareCheckoutPayload(selectedServices)
    if (result.success && result.url) {
      // Now store as checkoutServices when moving to actual checkout
      sessionStorage.setItem('checkoutServices', JSON.stringify({
        services: selectedServices,
        total: total
      }))
      
      // Add success_url parameter to redirect to onboarding page
      const checkoutUrl = new URL(result.url)
      checkoutUrl.searchParams.set('success_url', `${window.location.origin}/onboarding`)
      
      window.location.href = checkoutUrl.toString()
    } else {
      alert(result.error || "There was an issue preparing checkout. Please try again.")
    }
  }

  // Close drawer when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMobile && isOpen && !target.closest(".summary-panel")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMobile, isOpen])

  // Define the step cards once to avoid duplication
  const stepCards = (
    <div className="space-y-3">
      <StepCard
        number={1}
        title="Pick Your Plan"
        description="Select services that fit your needs."
        icon={<CheckCircle className="w-3 h-3 text-pink-400" />}
        color="pink"
      />
      <StepCard
        number={2}
        title="Customize & Add-On"
        description="Add platforms or formats as needed."
        icon={<MousePointerClick className="w-3 h-3 text-purple-400" />}
        color="purple"
      />
      <StepCard
        number={3}
        title="Checkout & Onboard"
        description="Complete your order and get started."
        icon={<CreditCard className="w-3 h-3 text-pink-400" />}
        color="pink"
      />
    </div>
  )

  if (isMobile) {
    return (
      <>
        {/* Mobile Drawer */}
        <div
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out summary-panel",
            isOpen ? "translate-y-0" : "translate-y-[calc(100%-80px)]",
          )}
        >
          {/* Drawer Handle */}
          <div
            className="h-6 bg-black border-t border-x border-zinc-800 mx-auto w-full flex justify-center items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-12 h-1 bg-zinc-700 mb-1"></div>
          </div>

          {/* Drawer Header - Always visible */}
          <div
            className="bg-black border-t border-x border-zinc-800 px-4 py-3 flex justify-between items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              <h2 className="text-lg font-bold">Your Content Plan Summary</h2>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xl font-bold">
                ${total}
                <span className="text-sm text-zinc-400 font-normal">/mo</span>
              </p>
              <ChevronUp className={cn("w-5 h-5 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
            </div>
          </div>

          {/* Drawer Content */}
          <GlassCard variant="dark" color="pink" className="p-4 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Content Plan Summary</h2>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {selectedServices.length === 0 ? (
              <div className="py-8 text-center border border-dashed border-zinc-800 bg-zinc-900">
                <p className="text-zinc-500">No services selected yet. Start by picking your content blocks.</p>
              </div>
            ) : (
              <ul className="space-y-0 mb-6">
                {selectedServices.map((service, index) => (
                  <li key={index} className="flex justify-between items-center p-3 border-b border-zinc-800">
                    <div>
                      <p className="font-bold">{service.name}</p>
                      <p className="text-sm text-zinc-400">{service.tier}</p>
                    </div>
                    <p className="font-bold">${service.price}</p>
                  </li>
                ))}
              </ul>
            )}

            {/* Sharp divider */}
            <div className="h-px w-full bg-zinc-800 my-4"></div>

            <div className="flex justify-between items-center mb-6">
              <p className="font-bold">Total</p>
              <p className="text-2xl font-bold text-lg font-semibold text-right mt-4">
                ${total}
                <span className="text-sm text-zinc-400 font-normal">/mo</span>
              </p>
            </div>

            <Button
              onClick={startCheckout}
              disabled={selectedServices.length === 0}
              variant="pink"
              className={cn(
                "w-full mt-4 py-6 text-lg whitespace-nowrap",
                selectedServices.length === 0 && "opacity-50 cursor-not-allowed",
              )}
              size="lg"
            >
              <ArrowRight className="mr-2 h-5 w-5" /> Checkout & Onboarding
            </Button>

            {/* How It Works - Stacked Cards */}
            <VSpacer size="md" />
            {stepCards}
          </GlassCard>
        </div>

        {/* Backdrop when drawer is open */}
        {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />}
      </>
    )
  }

  // Desktop floating panel
  return (
    <div className="sticky top-24">
      <GlassCard
        variant="dark"
        color="pink"
        className={cn("p-6 transition-all duration-300", isScrolled && "shadow-xl shadow-black/20")}
      >
        {/* Sharp accent line */}
        <div className="h-1 w-full bg-pink-600 absolute top-0 left-0"></div>

        <div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Your Content Plan Summary
          </h2>
          <p className="text-sm text-zinc-400 mb-6">
            {selectedServices.length === 0
              ? "Pick a tier from each category to get started."
              : "Review your selections below."}
          </p>

          {selectedServices.length === 0 ? (
            <div className="py-8 text-center border border-dashed border-zinc-800 bg-zinc-900 rounded-lg">
              <p className="text-zinc-500">No services selected yet. Start by picking your content blocks.</p>
            </div>
          ) : (
            <ul className="space-y-0 mb-6 max-h-[400px] overflow-y-auto pr-2">
              {selectedServices.map((service, index) => (
                <li key={index} className="flex justify-between items-center p-3 border-b border-zinc-800">
                  <div>
                    <p className="font-bold">{service.name}</p>
                    <p className="text-sm text-zinc-400">{service.tier}</p>
                  </div>
                  <p className="font-bold">${service.price}</p>
                </li>
              ))}
            </ul>
          )}

          {/* Sharp divider */}
          <div className="h-px w-full bg-zinc-800 my-4"></div>

          <div className="flex justify-between items-center mb-6">
            <p className="font-bold">Total</p>
            <p className="text-2xl font-bold text-lg font-semibold text-right mt-4">
              ${total}
              <span className="text-sm text-zinc-400 font-normal">/mo</span>
            </p>
          </div>

          <Button
            onClick={startCheckout}
            disabled={selectedServices.length === 0}
            variant="pink"
            className={cn(
              "w-full mt-4 py-6 text-lg whitespace-nowrap",
              selectedServices.length === 0 && "opacity-50 cursor-not-allowed",
            )}
            size="lg"
          >
            <ArrowRight className="mr-2 h-5 w-5" /> Checkout & Onboarding
          </Button>
        </div>
      </GlassCard>

      {/* How It Works - Stacked Cards */}
      <VSpacer size="md" />
      {stepCards}
    </div>
  )
}
