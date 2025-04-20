"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BaseServiceSelector } from "@/components/base-service-selector"
import { VSpacer } from "@/components/ui/spacing"
import { GradientDivider } from "@/components/ui/spacing"
import { CardContainer } from "@/components/ui/card-container"

type PlanOption = {
  label: string
  value: string
  emails: number
  price: number
}

type EmailCampaignSelectorProps = {
  onUpdate: (selection: {
    plan: string
    planLabel: string
    price: number
  }) => void
}

export function EmailCampaignSelector({ onUpdate }: EmailCampaignSelectorProps) {
  // Update the pricing display in the plan options
  const planOptions: PlanOption[] = [
    { label: "2 Emails per Month – $150/mo", value: "price_1RBAjDAog87WCP1EqmK7Nzke", emails: 2, price: 150 },
    { label: "4 Emails per Month – $270/mo", value: "price_1RBAjDAog87WCP1ElEDuhr1q", emails: 4, price: 270 },
    { label: "6 Emails per Month – $360/mo", value: "price_1RBAjCAog87WCP1EjmRjEAsh", emails: 6, price: 360 },
    { label: "8 Emails per Month – $420/mo", value: "price_1RBAjCAog87WCP1EjeEf53KG", emails: 8, price: 420 },
    { label: "10 Emails per Month – $450/mo", value: "price_1RBAjBAog87WCP1EqniPdwGp", emails: 10, price: 450 },
  ]

  const [selectedPlan, setSelectedPlan] = useState<string>("")

  const handlePlanChange = (value: string) => {
    if (value === "") return;
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
      title="Email Campaigns"
      subtitle="Conversion-focused email sequences that sell"
      icon={<Mail /> as React.ReactElement}
      color="green"
    >
      <div className="space-y-6 mt-6">
        <div className="space-y-2">
          <Label htmlFor="email-plan-select" className="text-zinc-300">
            Select Your Plan
          </Label>
          <Select value={selectedPlan} onValueChange={handlePlanChange}>
            <SelectTrigger id="email-plan-select" className="w-full bg-zinc-800 border-zinc-700 text-zinc-200">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
              {planOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="focus:bg-zinc-700 focus:text-white">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-zinc-500 mt-1">Professional email campaigns with compelling copy and design.</p>
        </div>

        <VSpacer size="sm" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardContainer variant="dark" className="p-4 bg-zinc-800/50">
            <h4 className="font-medium text-zinc-200 mb-2 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-black">
                ✓
              </span>
              What's Included
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Professional copywriting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Responsive email design</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Subject line optimization</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Call-to-action optimization</span>
              </li>
            </ul>
          </CardContainer>

          <CardContainer variant="dark" className="p-4 bg-zinc-800/50">
            <h4 className="font-medium text-zinc-200 mb-2 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-black">
                ✓
              </span>
              Campaign Types
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Welcome sequences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Promotional campaigns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Nurture sequences</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Re-engagement campaigns</span>
              </li>
            </ul>
          </CardContainer>
        </div>

        {/* Sharp divider */}
        <GradientDivider />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400">Selected plan:</p>
            <p className="font-medium">{planOptions.find((p) => p.value === selectedPlan)?.label.split("–")[0]}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-400">
              {planOptions.find((p) => p.value === selectedPlan)?.emails} emails per month
            </p>
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
