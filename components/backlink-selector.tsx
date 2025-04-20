"use client"

import { useState } from "react"
import { Link, BarChart, Globe, Search } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BaseServiceSelector } from "@/components/base-service-selector"
import { VSpacer } from "@/components/ui/spacing"
import { GradientDivider } from "@/components/ui/spacing"
import { CardContainer } from "@/components/ui/card-container"
import { prepareCheckoutPayload } from "@/lib/checkout-utils"

type PlanOption = {
  label: string
  value: string
  da: string
  price: number
}

type BacklinkSelectorProps = {
  onUpdate: (selection: {
    plan: string
    planLabel: string
    price: number
  }) => void
}

export function BacklinkSelector({ onUpdate }: BacklinkSelectorProps) {
  const planOptions: PlanOption[] = [
    { label: "DA 10–19 – $205/mo", value: "price_1RBAixAog87WCP1EZWRhzr8r", da: "10–19", price: 205 },
    { label: "DA 20–29 – $270/mo", value: "price_1RBAiwAog87WCP1EdArsgHHT", da: "20–29", price: 270 },
    { label: "DA 30–39 – $340/mo", value: "price_1RBAiwAog87WCP1EeiBVdGk7", da: "30–39", price: 340 },
    { label: "DA 40–49 – $610/mo", value: "price_1RBAivAog87WCP1EHQ6zLZeF", da: "40–49", price: 610 },
    { label: "DA 50+ – $945/mo", value: "price_1RBAivAog87WCP1E4An2O38P", da: "50+", price: 945 },
    { label: "DA 60+ – $1,285/mo", value: "price_1RBAiuAog87WCP1Eeg2SaXIv", da: "60+", price: 1285 },
  ]

  const [selectedPlan, setSelectedPlan] = useState<string>(planOptions[0].value)

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value)
    updateParent(value)
  }

  const updateParent = (plan: string) => {
    const selectedPlanObj = planOptions.find((p) => p.value === plan)
    if (!selectedPlanObj) return

    onUpdate({
      plan,
      planLabel: selectedPlanObj.label,
      price: selectedPlanObj.price,
    })
  }

  return (
    <BaseServiceSelector
      title="Backlink Building"
      subtitle="Monthly authority-building backlinks with 1-Year Link Guarantee"
      icon={<Link />}
      color="amber"
    >
      <div className="space-y-6 mt-6">
        <div className="space-y-2">
          <Label htmlFor="backlink-plan-select" className="text-zinc-300">
            Select Your Domain Authority Range
          </Label>
          <Select value={selectedPlan} onValueChange={handlePlanChange}>
            <SelectTrigger id="backlink-plan-select" className="w-full bg-zinc-800 border-zinc-700 text-zinc-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
              {planOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-zinc-500 mt-1">
            Each plan includes 1 high-quality backlink per month with our 1-Year Link Guarantee.
          </p>
        </div>

        <VSpacer size="sm" />

        {/* [Insert your CardContainers and other content here] */}

        <GradientDivider />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400">Selected tier:</p>
            <p className="font-medium">DA {planOptions.find((p) => p.value === selectedPlan)?.da}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-400">1 backlink per month</p>
            <p className="font-bold text-lg">
              ${planOptions.find((p) => p.value === selectedPlan)?.price}
              <span className="text-sm text-zinc-400 font-normal">/mo</span>
            </p>
          </div>
        </div>
      </div>
    </BaseServiceSelector>
  )
}