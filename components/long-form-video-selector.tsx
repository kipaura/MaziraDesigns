"use client"

import { useState } from "react"
import { Check, Youtube, Facebook, Linkedin, Instagram } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BaseServiceSelector } from "@/components/base-service-selector"
import { VSpacer } from "@/components/ui/spacing"
import { GradientDivider } from "@/components/ui/spacing"

// Custom icons for platforms that aren't in lucide-react
const TiktokLogo = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm10-9a3 3 0 0 0-3 3v10a7 7 0 1 1-7-7v4a3 3 0 1 0 3 3V3h7z"></path>
  </svg>
)

const GoogleLogo = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path>
    <path d="M12 8v8"></path>
    <path d="M8 12h8"></path>
  </svg>
)

type PlanOption = {
  label: string
  value: string
  videos: number
  price: number
}

type PlatformOption = {
  icon: string
  value: string
  label: string
}

type LongFormVideoSelectorProps = {
  onUpdate: (selection: {
    plan: string
    planLabel: string
    price: number
    freePlatform: string
    additionalPlatforms: string[]
    totalPrice: number
  }) => void
}

export function LongFormVideoSelector({ onUpdate }: LongFormVideoSelectorProps) {
  const planOptions: PlanOption[] = [
    { label: "2 Videos per Month – $150/mo", value: "price_1RBAjMAog87WCP1EDwjmAV7S", videos: 2, price: 150 },
    { label: "4 Videos per Month – $300/mo", value: "price_1RBAjLAog87WCP1EjRU8iv4V", videos: 4, price: 300 },
    { label: "6 Videos per Month – $375/mo", value: "price_1RBAjLAog87WCP1EikvU2Kmg", videos: 6, price: 375 },
    { label: "8 Videos per Month – $450/mo", value: "price_1RBAjKAog87WCP1E9AkTiWWT", videos: 8, price: 450 },
    { label: "10 Videos per Month – $600/mo", value: "price_1RBAjKAog87WCP1EhPihu488", videos: 10, price: 600 },
  ]

  const platformOptions: PlatformOption[] = [
    { icon: "Tiktok", value: "price_1RBAjJAog87WCP1EguLpACPE", label: "TikTok" },
    { icon: "Facebook", value: "price_1RBAjJAog87WCP1EpX43Tamb", label: "Facebook" },
    { icon: "Instagram", value: "price_1RBAjIAog87WCP1EBPb7Q1fK", label: "Instagram" },
    { icon: "Linkedin", value: "price_1RBAjIAog87WCP1ErqsNtNAM", label: "LinkedIn" },
    { icon: "Youtube", value: "price_1RBAjHAog87WCP1E5JM4UMmj", label: "YouTube" },
    { icon: "Google", value: "price_1RBAjHAog87WCP1EgUt8eOXd", label: "Google" },
  ]

  const additionalPlatformOptions: PlatformOption[] = [
    { icon: "Tiktok", value: "price_1RBAjGAog87WCP1Ej3aCPcC4", label: "TikTok" },
    { icon: "Facebook", value: "price_1RBAjGAog87WCP1EAisog7W4", label: "Facebook" },
    { icon: "Instagram", value: "price_1RBAjFAog87WCP1El8fSerxL", label: "Instagram" },
    { icon: "Linkedin", value: "price_1RBAjFAog87WCP1EjeS2toRd", label: "LinkedIn" },
    { icon: "Youtube", value: "price_1RBAjEAog87WCP1EJCoXxehQ", label: "YouTube" },
    { icon: "Google", value: "price_1RBAjEAog87WCP1Eylj4gemf", label: "Google" },
  ]

  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [freePlatform, setFreePlatform] = useState<string>("price_1RBAjHAog87WCP1E5JM4UMmj") // YouTube
  const [additionalPlatforms, setAdditionalPlatforms] = useState<string[]>([])

  const handlePlanChange = (value: string) => {
    if (!value) return;
    setSelectedPlan(value)
    updateParent(value, freePlatform, additionalPlatforms)
  }

  const handleFreePlatformChange = (value: string) => {
    setFreePlatform(value)

    // Find the corresponding additional platform value
    const freePlatformLabel = platformOptions.find((p) => p.value === value)?.label
    const correspondingAdditionalPlatform = additionalPlatformOptions.find((p) => p.label === freePlatformLabel)?.value

    // Remove the selected free platform from additional platforms if it exists
    const updatedAdditionalPlatforms = correspondingAdditionalPlatform
      ? additionalPlatforms.filter((p) => p !== correspondingAdditionalPlatform)
      : additionalPlatforms

    setAdditionalPlatforms(updatedAdditionalPlatforms)

    updateParent(selectedPlan, value, updatedAdditionalPlatforms)
  }

  const handleAdditionalPlatformChange = (platform: string, checked: boolean) => {
    let updatedPlatforms: string[]

    if (checked) {
      // Find the corresponding free platform value
      const additionalPlatformLabel = additionalPlatformOptions.find((p) => p.value === platform)?.label
      const correspondingFreePlatform = platformOptions.find((p) => p.label === additionalPlatformLabel)?.value

      // Don't add if it's already the free platform
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

    const additionalCost = additional.length * 20
    const totalPrice = selectedPlanObj.price + additionalCost

    // Get the free platform label for display
    const freePlatformLabel = platformOptions.find((p) => p.value === free)?.label || ""

    // Get additional platform labels for display
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

  const getPlatformIcon = (iconName: string) => {
    switch (iconName) {
      case "Youtube":
        return <Youtube className="h-4 w-4" />
      case "Facebook":
        return <Facebook className="h-4 w-4" />
      case "Linkedin":
        return <Linkedin className="h-4 w-4" />
      case "Instagram":
        return <Instagram className="h-4 w-4" />
      case "Tiktok":
        return <TiktokLogo />
      case "Google":
        return <GoogleLogo />
      default:
        return <Youtube className="h-4 w-4" />
    }
  }

  // Helper function to check if a platform is selected as free
  const isPlatformFree = (additionalPlatformValue: string): boolean => {
    const additionalPlatformLabel = additionalPlatformOptions.find((p) => p.value === additionalPlatformValue)?.label
    const correspondingFreePlatform = platformOptions.find((p) => p.label === additionalPlatformLabel)?.value
    return correspondingFreePlatform === freePlatform
  }

  return (
    <BaseServiceSelector
      title="Long-Form Videos"
      subtitle="In-depth content to build your authority"
      icon={<Youtube />}
      color="amber"
    >
      <div className="space-y-6 mt-6">
        <div className="space-y-2">
          <Label htmlFor="plan-select" className="text-zinc-300">
            Select Your Plan
          </Label>
          <Select value={selectedPlan || undefined} onValueChange={handlePlanChange}>
            <SelectTrigger className="w-full bg-zinc-800 border-zinc-700 text-zinc-200">
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
          <p className="text-sm text-zinc-500 mt-1">Includes 1 free platform. Additional platforms $20/mo each.</p>
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
                  freePlatform === platform.value && "border-red-500 bg-zinc-700 text-white",
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
          <Label className="text-zinc-300">Add More Platforms (+$20/mo each)</Label>
          <div className="grid grid-cols-2 gap-3">
            {additionalPlatformOptions.map((platform) => (
              <div key={platform.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`longvideo-platform-${platform.value}`}
                  checked={additionalPlatforms.includes(platform.value)}
                  disabled={isPlatformFree(platform.value)}
                  onCheckedChange={(checked) => handleAdditionalPlatformChange(platform.value, checked as boolean)}
                  className="border-zinc-600 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                />
                <Label
                  htmlFor={`longvideo-platform-${platform.value}`}
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

        {/* Sharp divider */}
        <GradientDivider />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400">Selected plan:</p>
            <p className="font-medium">{planOptions.find((p) => p.value === selectedPlan)?.label.split("–")[0]}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-400">
              {additionalPlatforms.length > 0
                ? `${additionalPlatforms.length} additional platform${additionalPlatforms.length > 1 ? "s" : ""}`
                : "No additional platforms"}
            </p>
            <p className="font-bold text-lg">
              ${(planOptions.find((p) => p.value === selectedPlan)?.price || 0) + additionalPlatforms.length * 20}
              <span className="text-sm text-zinc-400 font-normal">/mo</span>
            </p>
          </div>
        </div>
      </div>
    </BaseServiceSelector>
  )
}
