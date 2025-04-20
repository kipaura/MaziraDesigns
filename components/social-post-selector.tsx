"use client"

import { useState, useEffect } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BaseServiceSelector } from "@/components/base-service-selector"
import { VSpacer } from "@/components/ui/spacing"
import { GradientDivider } from "@/components/ui/spacing"
import { getPlatformIcon } from "@/components/platform-icons"

type PlanOption = {
  label: string
  value: string
  posts: number
  price: number
}

type PlatformOption = {
  icon: string
  value: string
  label: string
}

type SocialPostSelectorProps = {
  onUpdate: (selection: {
    plan: string
    planLabel: string
    price: number
    freePlatform: string
    additionalPlatforms: string[]
    totalPrice: number
  }) => void
}

export function SocialPostSelector({ onUpdate }: SocialPostSelectorProps) {
  const planOptions: PlanOption[] = [
    { label: "Select a Plan", value: "select", posts: 0, price: 0 },
    { label: "10 Posts per Month – $150/mo", value: "price_1RBAj8Aog87WCP1EZThpEO52", posts: 10, price: 150 },
    { label: "15 Posts per Month – $215/mo", value: "price_1RBAj7Aog87WCP1E2PC6WHtr", posts: 15, price: 215 },
    { label: "20 Posts per Month – $270/mo", value: "price_1RBAj7Aog87WCP1E7y33eaWz", posts: 20, price: 270 },
    { label: "25 Posts per Month – $320/mo", value: "price_1RBAj6Aog87WCP1EvEw6xkpm", posts: 25, price: 320 },
    { label: "30 Posts per Month – $360/mo", value: "price_1RBAj6Aog87WCP1EpE1erkQ4", posts: 30, price: 360 },
    { label: "35 Posts per Month – $395/mo", value: "price_1RBAj5Aog87WCP1EizNs8TI6", posts: 35, price: 395 },
    { label: "40 Posts per Month – $420/mo", value: "price_1RBM67Aog87WCP1E5gBuXNUt", posts: 40, price: 420 },
  ]

  const platformOptions: PlatformOption[] = [
    { icon: "Instagram", value: "price_1RBAj3Aog87WCP1EFZvpUNit", label: "Instagram" },
    { icon: "Tiktok", value: "price_1RBAj4Aog87WCP1EwkTTukqk", label: "TikTok" },
    { icon: "Facebook", value: "price_1RBAj4Aog87WCP1En15F6abl", label: "Facebook" },
    { icon: "Linkedin", value: "price_1RBAj3Aog87WCP1EupWG9c5S", label: "LinkedIn" },
    { icon: "Pinterest", value: "price_1RBAj2Aog87WCP1E3bykvrD7", label: "Pinterest" },
    { icon: "Google", value: "price_1RBAj2Aog87WCP1EpSy9E5gk", label: "Google" },
  ]

  const additionalPlatformOptions: PlatformOption[] = [
    { icon: "Instagram", value: "price_1RDxvgAog87WCP1E6dbFV1sI", label: "Instagram" },
    { icon: "Tiktok", value: "price_1RDxvhAog87WCP1Eyjv85Jz5", label: "TikTok" },
    { icon: "Facebook", value: "price_1RDxvhAog87WCP1En85Lt8PQ", label: "Facebook" },
    { icon: "Linkedin", value: "price_1RDxvgAog87WCP1EF0SHrPBR", label: "LinkedIn" },
    { icon: "Pinterest", value: "price_1RDxviAog87WCP1EQq6PItNw", label: "Pinterest" },
    { icon: "Google", value: "price_1RDxvfAog87WCP1Eus9ohJ5k", label: "Google" },
  ]

  // Set default to the first real plan instead of "select"
  const defaultPlan = planOptions[1].value
  const [selectedPlan, setSelectedPlan] = useState<string>(defaultPlan)
  const [freePlatform, setFreePlatform] = useState<string>("price_1RBAj3Aog87WCP1EFZvpUNit") // Instagram
  const [additionalPlatforms, setAdditionalPlatforms] = useState<string[]>([])

  useEffect(() => {
    updateParent(selectedPlan, freePlatform, additionalPlatforms)
  }, [])

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value)
    updateParent(value, freePlatform, additionalPlatforms)
  }

  const handleFreePlatformChange = (value: string) => {
    setFreePlatform(value)
    const freePlatformLabel = platformOptions.find((p) => p.value === value)?.label
    const correspondingAdditionalPlatform = additionalPlatformOptions.find((p) => p.label === freePlatformLabel)?.value
    const updatedAdditionalPlatforms = correspondingAdditionalPlatform
      ? additionalPlatforms.filter((p) => p !== correspondingAdditionalPlatform)
      : additionalPlatforms
    setAdditionalPlatforms(updatedAdditionalPlatforms)
    updateParent(selectedPlan, value, updatedAdditionalPlatforms)
  }

  const handleAdditionalPlatformChange = (platform: string, checked: boolean) => {
    let updatedPlatforms: string[]
    if (checked) {
      const additionalPlatformLabel = additionalPlatformOptions.find((p) => p.value === platform)?.label
      const correspondingFreePlatform = platformOptions.find((p) => p.label === additionalPlatformLabel)?.value
      if (correspondingFreePlatform === freePlatform) return
      updatedPlatforms = [...additionalPlatforms, platform]
    } else {
      updatedPlatforms = additionalPlatforms.filter((p) => p !== platform)
    }
    setAdditionalPlatforms(updatedPlatforms)
    updateParent(selectedPlan, freePlatform, updatedPlatforms)
  }

  const updateParent = (plan: string, free: string, additional: string[]) => {
    const selectedPlanObj = planOptions.find((p) => p.value === plan)
    if (!selectedPlanObj) return
    const additionalCost = additional.length * 10
    const totalPrice = selectedPlanObj.price + additionalCost
    const freePlatformLabel = platformOptions.find((p) => p.value === free)?.label || ""
    const additionalPlatformLabels = additional.map((platformId) => {
      return additionalPlatformOptions.find((p) => p.value === platformId)?.label || ""
    })
    onUpdate({
      plan,
      planLabel: selectedPlanObj.label,
      price: selectedPlanObj.price,
      freePlatform: freePlatformLabel.toLowerCase(),
      additionalPlatforms: additionalPlatformLabels.map((label) => label.toLowerCase()),
      totalPrice,
    })
  }

  const isPlatformFree = (additionalPlatformValue: string): boolean => {
    const additionalPlatformLabel = additionalPlatformOptions.find((p) => p.value === additionalPlatformValue)?.label
    const correspondingFreePlatform = platformOptions.find((p) => p.label === additionalPlatformLabel)?.value
    return correspondingFreePlatform === freePlatform
  }

  return (
    <BaseServiceSelector
      title="Social Media Posts"
      subtitle="Professional content creation for your social platforms"
      icon={getPlatformIcon("Instagram")}
      color="pink"
    >
      <div className="space-y-6 mt-6">
        <div className="space-y-2">
          <Label htmlFor="plan-select" className="text-zinc-300">
            Select Your Plan
          </Label>
          <Select value={selectedPlan} onValueChange={handlePlanChange}>
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-zinc-200">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 text-zinc-200">
              {planOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.value === "select"}
                  className="focus:bg-zinc-700 focus:text-white"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-zinc-500 mt-1">
            Includes 1 free platform. Additional platforms $10/mo each.
          </p>
        </div>

        <VSpacer size="sm" />

        <div className="space-y-3">
          <Label className="text-zinc-300">Select Your Free Platform</Label>
          <div className="flex flex-wrap gap-2">
            {platformOptions.map((platform) => (
              <Button
                key={platform.value}
                type="button"
                variant="outline"
                size="sm"
                className={cn(
                  "border-zinc-700 bg-zinc-800 hover:bg-zinc-700",
                  freePlatform === platform.value && "border-purple-500 bg-zinc-700 text-white",
                )}
                onClick={() => handleFreePlatformChange(platform.value)}
              >
                <div className="flex items-center gap-2">
                  {getPlatformIcon(platform.icon)}
                  <span>{platform.label}</span>
                  {freePlatform === platform.value && <Check className="h-3 w-3 ml-1" />}
                </div>
              </Button>
            ))}
          </div>
        </div>

        <VSpacer size="sm" />

        <div className="space-y-3">
          <Label className="text-zinc-300">Add More Platforms (+$10/mo each)</Label>
          <div className="grid grid-cols-2 gap-3">
            {additionalPlatformOptions.map((platform) => (
              <div key={platform.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform.value}`}
                  checked={additionalPlatforms.includes(platform.value)}
                  disabled={isPlatformFree(platform.value)}
                  onCheckedChange={(checked) => handleAdditionalPlatformChange(platform.value, checked as boolean)}
                  className="border-zinc-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <Label
                  htmlFor={`platform-${platform.value}`}
                  className={cn(
                    "text-sm font-medium",
                    isPlatformFree(platform.value) ? "text-zinc-500" : "text-zinc-300",
                  )}
                >
                  {platform.label} {isPlatformFree(platform.value) && "(Free)"}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <GradientDivider />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400">Selected plan:</p>
            <p className="font-medium">
              {planOptions.find((p) => p.value === selectedPlan)?.label.split("–")[0]}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-400">
              {additionalPlatforms.length > 0
                ? `${additionalPlatforms.length} additional platform${additionalPlatforms.length > 1 ? "s" : ""}`
                : "No additional platforms"}
            </p>
            <p className="font-bold text-lg">
              ${(planOptions.find((p) => p.value === selectedPlan)?.price || 0) + additionalPlatforms.length * 10}
              <span className="text-sm text-zinc-400 font-normal">/mo</span>
            </p>
          </div>
        </div>
      </div>
    </BaseServiceSelector>
  )
}