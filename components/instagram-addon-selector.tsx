"use client"

import { useState } from "react"
import { Instagram, ImageIcon, Film } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BaseServiceSelector } from "@/components/base-service-selector"
import { VSpacer } from "@/components/ui/spacing"
import { GradientDivider } from "@/components/ui/spacing"
import { CardContainer } from "@/components/ui/card-container"

type StoriesPlanOption = {
  label: string
  value: string
  stories: number
  price: number
}

type CarouselsPlanOption = {
  label: string
  value: string
  carousels: number
  price: number
}

type InstagramAddOnSelectorProps = {
  onUpdate: (selection: {
    storiesPlan: string | null
    storiesPlanLabel: string | null
    storiesPrice: number
    carouselsPlan: string | null
    carouselsPlanLabel: string | null
    carouselsPrice: number
    totalPrice: number
  }) => void
}

export function InstagramAddOnSelector({ onUpdate }: InstagramAddOnSelectorProps) {
  // Update the pricing display in the plan options
  const storiesOptions: StoriesPlanOption[] = [
    { label: "10 Stories – $100/mo", value: "price_1RBAj1Aog87WCP1ETnoTxTrh", stories: 10, price: 100 },
    { label: "20 Stories – $180/mo", value: "price_1RBAj1Aog87WCP1Eh81mlhPh", stories: 20, price: 180 },
    { label: "30 Stories – $255/mo", value: "price_1RBAj0Aog87WCP1EognDrhd7", stories: 30, price: 255 },
  ]

  const carouselsOptions: CarouselsPlanOption[] = [
    { label: "5 Carousels – $50/mo", value: "price_1RBAj0Aog87WCP1EDlWEQcgP", carousels: 5, price: 50 },
    { label: "10 Carousels – $95/mo", value: "price_1RBAizAog87WCP1EVMHvLFO9", carousels: 10, price: 95 },
    { label: "15 Carousels – $135/mo", value: "price_1RBAizAog87WCP1ED9YwvVqB", carousels: 15, price: 135 },
    { label: "20 Carousels – $170/mo", value: "price_1RBAiyAog87WCP1E7agZT0Df", carousels: 20, price: 170 },
    { label: "25 Carousels – $200/mo", value: "price_1RBAiyAog87WCP1Et19MB5dE", carousels: 25, price: 200 },
    { label: "30 Carousels – $225/mo", value: "price_1RBAixAog87WCP1Ep1g3szRD", carousels: 30, price: 225 },
  ]

  const [selectedStoriesPlan, setSelectedStoriesPlan] = useState<string | null>(null)
  const [selectedCarouselsPlan, setSelectedCarouselsPlan] = useState<string | null>(null)

  const handleStoriesPlanChange = (value: string) => {
    setSelectedStoriesPlan(value === selectedStoriesPlan ? null : value)
    updateParent(value === selectedStoriesPlan ? null : value, selectedCarouselsPlan)
  }

  const handleCarouselsPlanChange = (value: string) => {
    setSelectedCarouselsPlan(value === selectedCarouselsPlan ? null : value)
    updateParent(selectedStoriesPlan, value === selectedCarouselsPlan ? null : value)
  }

  const updateParent = (storiesPlan: string | null, carouselsPlan: string | null) => {
    const selectedStoriesPlanObj = storiesPlan ? storiesOptions.find((p) => p.value === storiesPlan) : null
    const selectedCarouselsPlanObj = carouselsPlan ? carouselsOptions.find((p) => p.value === carouselsPlan) : null

    const storiesPrice = selectedStoriesPlanObj?.price || 0
    const carouselsPrice = selectedCarouselsPlanObj?.price || 0
    const totalPrice = storiesPrice + carouselsPrice

    onUpdate({
      storiesPlan,
      storiesPlanLabel: selectedStoriesPlanObj?.label || null,
      storiesPrice,
      carouselsPlan,
      carouselsPlanLabel: selectedCarouselsPlanObj?.label || null,
      carouselsPrice,
      totalPrice,
    })
  }

  return (
    <BaseServiceSelector
      title="Instagram Add-Ons"
      subtitle="Enhance your Instagram presence with premium content"
      icon={<Instagram /> as React.ReactElement}
      color="pink"
    >
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stories Section */}
          <CardContainer variant="dark" className="p-4 bg-zinc-800/30">
            <div className="flex items-center gap-2">
              <Film className="w-4 h-4 text-pink-400" />
              <h4 className="font-medium text-zinc-200">Instagram Stories</h4>
            </div>

            <VSpacer size="sm" />

            <div className="space-y-2">
              <Label htmlFor="stories-plan-select" className="text-zinc-300">
                Select Stories Plan
              </Label>
              <Select value={selectedStoriesPlan || ""} onValueChange={handleStoriesPlanChange}>
                <SelectTrigger id="stories-plan-select" className="w-full bg-zinc-800 border-zinc-700 text-zinc-200">
                  <SelectValue placeholder="Select a plan (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                  {storiesOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="focus:bg-zinc-700 focus:text-white">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <VSpacer size="sm" />

            <div className="space-y-2 text-sm text-zinc-400">
              <p>Professional Instagram Stories with:</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-0.5">•</span>
                  <span>Custom branded templates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-0.5">•</span>
                  <span>Engaging animations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-0.5">•</span>
                  <span>Call-to-action elements</span>
                </li>
              </ul>
            </div>

            {selectedStoriesPlan && (
              <div className="text-right mt-4">
                <p className="text-sm text-zinc-400">
                  {storiesOptions.find((p) => p.value === selectedStoriesPlan)?.stories} stories per month
                </p>
                <p className="font-bold">
                  ${storiesOptions.find((p) => p.value === selectedStoriesPlan)?.price}
                  <span className="text-sm text-zinc-400 font-normal">/mo</span>
                </p>
              </div>
            )}
          </CardContainer>

          {/* Carousels Section */}
          <CardContainer variant="dark" className="p-4 bg-zinc-800/30">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-pink-400" />
              <h4 className="font-medium text-zinc-200">Instagram Carousels</h4>
            </div>

            <VSpacer size="sm" />

            <div className="space-y-2">
              <Label htmlFor="carousels-plan-select" className="text-zinc-300">
                Select Carousels Plan
              </Label>
              <Select value={selectedCarouselsPlan || ""} onValueChange={handleCarouselsPlanChange}>
                <SelectTrigger id="carousels-plan-select" className="w-full bg-zinc-800 border-zinc-700 text-zinc-200">
                  <SelectValue placeholder="Select a plan (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
                  {carouselsOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="focus:bg-zinc-700 focus:text-white">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <VSpacer size="sm" />

            <div className="space-y-2 text-sm text-zinc-400">
              <p>Eye-catching carousel posts with:</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-0.5">•</span>
                  <span>Multi-slide designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-0.5">•</span>
                  <span>Cohesive visual style</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-pink-400 mt-0.5">•</span>
                  <span>Swipe-worthy content</span>
                </li>
              </ul>
            </div>

            {selectedCarouselsPlan && (
              <div className="text-right mt-4">
                <p className="text-sm text-zinc-400">
                  {carouselsOptions.find((p) => p.value === selectedCarouselsPlan)?.carousels} carousels per month
                </p>
                <p className="font-bold">
                  ${carouselsOptions.find((p) => p.value === selectedCarouselsPlan)?.price}
                  <span className="text-sm text-zinc-400 font-normal">/mo</span>
                </p>
              </div>
            )}
          </CardContainer>
        </div>

        {/* Sharp divider */}
        <GradientDivider />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400">Selected add-ons:</p>
            <p className="font-medium">
              {selectedStoriesPlan && selectedCarouselsPlan
                ? "Stories + Carousels"
                : selectedStoriesPlan
                  ? "Stories"
                  : selectedCarouselsPlan
                    ? "Carousels"
                    : "None"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-400">
              {selectedStoriesPlan || selectedCarouselsPlan
                ? "Instagram content package"
                : "No Instagram add-ons selected"}
            </p>
            <p className="font-bold text-lg">
              $
              {(selectedStoriesPlan ? storiesOptions.find((p) => p.value === selectedStoriesPlan)?.price || 0 : 0) +
                (selectedCarouselsPlan
                  ? carouselsOptions.find((p) => p.value === selectedCarouselsPlan)?.price || 0
                  : 0)}
              {(selectedStoriesPlan || selectedCarouselsPlan) && (
                <span className="text-sm text-zinc-400 font-normal">/mo</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </BaseServiceSelector>
  )
}
