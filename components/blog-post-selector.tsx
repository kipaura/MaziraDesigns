"use client"

import { useState, useEffect } from "react"
import { FileText, Search, BarChart, Globe } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BaseServiceSelector } from "@/components/base-service-selector"
import { VSpacer } from "@/components/ui/spacing"
import { GradientDivider } from "@/components/ui/spacing"
import { CardContainer } from "@/components/ui/card-container"

type PlanOption = {
  label: string
  value: string
  blogs: number
  price: number
}

type BlogPostSelectorProps = {
  onUpdate: (selection: {
    plan: string
    planLabel: string
    price: number
  }) => void
}

export function BlogPostSelector({ onUpdate }: BlogPostSelectorProps) {
  const planOptions: PlanOption[] = [
    { label: "2 Blogs per Month – $100/mo", value: "price_1RBAjAAog87WCP1E4X4rFuVN", blogs: 2, price: 100 },
    { label: "4 Blogs per Month – $180/mo", value: "price_1RBAjAAog87WCP1E99Yn83Iv", blogs: 4, price: 180 },
    { label: "6 Blogs per Month – $250/mo", value: "price_1RBAj9Aog87WCP1EGqXoewWr", blogs: 6, price: 250 },
    { label: "8 Blogs per Month – $310/mo", value: "price_1RBAj9Aog87WCP1E0C0K1djl", blogs: 8, price: 310 },
    { label: "10 Blogs per Month – $350/mo", value: "price_1RBAj8Aog87WCP1EL9tQ9bCq", blogs: 10, price: 350 },
  ]

  // Initialize with the first plan so the summary panel shows a value by default.
  const [selectedPlan, setSelectedPlan] = useState<string>(planOptions[0].value)

  useEffect(() => {
    updateParent(planOptions[0].value)
  }, [])

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value)
    updateParent(value)
  }

  const updateParent = (plan: string) => {
    if (!plan) return
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
      title="SEO Blog Posts"
      subtitle="High-quality content that ranks and converts"
      icon={<FileText /> as React.ReactElement}
      color="cyan"
    >
      <div className="space-y-6 mt-6">
        <div className="space-y-2">
          <Label htmlFor="blog-plan-select" className="text-zinc-300">
            Select Your Plan
          </Label>
          <Select value={selectedPlan} onValueChange={handlePlanChange}>
            <SelectTrigger id="blog-plan-select" className="w-full bg-zinc-800 border-zinc-700 text-zinc-200">
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
          <p className="text-sm text-zinc-500 mt-1">
            Each blog post includes keyword research, writing, and on-page SEO optimization.
          </p>
        </div>

        <VSpacer size="sm" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CardContainer variant="dark" className="p-4 bg-zinc-800/50">
            <h4 className="font-medium text-zinc-200 mb-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400" />
              SEO Optimization
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Keyword research & analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Meta title & description</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Optimized headings & structure</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Internal & external linking</span>
              </li>
            </ul>
          </CardContainer>

          <CardContainer variant="dark" className="p-4 bg-zinc-800/50">
            <h4 className="font-medium text-zinc-200 mb-2 flex items-center gap-2">
              <BarChart className="w-4 h-4 text-cyan-400" />
              Content Quality
            </h4>
            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>1,500+ words per post</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Expert writers in your niche</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Engaging, conversion-focused copy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>Custom images & graphics</span>
              </li>
            </ul>
          </CardContainer>
        </div>

        <VSpacer size="sm" />

        <CardContainer variant="dark" className="p-4 bg-zinc-800/30">
          <h4 className="font-medium text-zinc-200 mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            Why Our Blog Posts Work
          </h4>
          <p className="text-sm text-zinc-400">
            Our SEO blog posts are designed to rank in search engines while engaging your audience and driving
            conversions. We combine data-driven keyword research with compelling storytelling to create content that
            performs.
          </p>
        </CardContainer>

        {/* Sharp divider */}
        <GradientDivider />

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-zinc-400">Selected plan:</p>
            <p className="font-medium">{planOptions.find((p) => p.value === selectedPlan)?.label.split("–")[0]}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-zinc-400">
              {planOptions.find((p) => p.value === selectedPlan)?.blogs} blog posts per month
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
