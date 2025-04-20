"use client"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { VSpacer } from "@/components/ui/spacing"

interface StepperProps {
  steps: {
    label: string
    fields: any[]
  }[]
  currentStep: number
  onStepChange: (step: number) => void
}

export function Stepper({ steps, currentStep, onStepChange }: StepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <button
              onClick={() => onStepChange(index)}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border transition-all",
                index < currentStep
                  ? "bg-purple-600 border-purple-600 text-white"
                  : index === currentStep
                    ? "border-purple-600 text-white"
                    : "border-zinc-700 text-zinc-500",
              )}
            >
              {index < currentStep ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
            </button>
            <span
              className={cn("text-xs mt-2 hidden md:block", index === currentStep ? "text-white" : "text-zinc-500")}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <VSpacer size="sm" />

      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-zinc-800">
          <div
            className="h-full bg-purple-600 transition-all"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="md:hidden text-center mt-4">
        <span className="text-white font-medium">{steps[currentStep].label}</span>
      </div>
    </div>
  )
}
