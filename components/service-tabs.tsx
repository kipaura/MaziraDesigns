"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Instagram, Video, Mail, FileText, ArrowRight, CheckCircle, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { CardContainer } from "@/components/ui/card-container"

// Add Typography import
import { Typography } from "@/components/typography-provider"
const { H2, H3, P } = Typography

interface ServiceTabsProps {
  className?: string
}

interface Tab {
  id: string
  label: string
  icon: React.ReactElement<React.SVGAttributes<SVGElement>>
  color: string
  iconBg: string
  // ...rest of the properties
}

export function ServiceTabs({ className }: ServiceTabsProps) {
  const [activeTab, setActiveTab] = useState("social")
  const [activeStat, setActiveStat] = useState(0)
  const router = useRouter()

  // Service data
  const tabs = [
    {
      id: "social",
      label: "Social Media",
      icon: <Instagram className="w-5 h-5" />,
      color: "pink-600",
      iconBg: "bg-pink-600",
      benefits: [
        "Stay visible with consistent posting",
        "Build authentic connections with your audience",
        "Drive traffic to your site and offers",
        "Repurpose content across platforms",
      ],
      stats: [
        "Brands that post consistently see 2x higher engagement rates",
        "Social media drives 91% of brand awareness for new businesses",
        "Consistent posting increases follower growth by up to 30%",
      ],
      service: {
        title: "Social Posts",
        price: "$150/mo",
        description:
          "Premium content designed around your brand voice. Whether you're just getting started or maintaining momentum, we'll help you stay consistent across platforms.",
        features: [
          "10–13 business days delivery",
          "Unlimited revisions",
          "Platform-optimized formatting",
          "Custom-caption writing",
        ],
        primaryCta: {
          text: "Start Building",
          link: "/build#social-posts",
        },
      },
    },
    {
      id: "video",
      label: "Video",
      icon: <Video className="w-5 h-5" />,
      color: "purple-600",
      iconBg: "bg-purple-600",
      benefits: [
        "Increases engagement across every platform",
        "Tells your brand story in seconds",
        "Outperforms static content in ads",
        "Drives reach while reducing ad costs",
      ],
      stats: [
        "Short-form video content delivers 30–50% higher conversion rates than static posts",
        "Videos get 1200% more shares than text and image content combined",
        "Viewers retain 95% of a message when watching video compared to 10% when reading text",
      ],
      service: {
        title: "Short-Form Video",
        price: "$100/mo",
        description:
          "Scroll-stopping content for TikTok, Reels, and Shorts—tailored to your tone, aesthetic, and offer.",
        features: [
          "10–13 business days delivery",
          "Scripts + platform formatting",
          "Unlimited revisions",
          "Custom editing & effects",
        ],
        primaryCta: {
          text: "Start Building",
          link: "/build#video",
        },
      },
    },
    {
      id: "blog",
      label: "Blogs",
      icon: <FileText className="w-5 h-5" />,
      color: "pink-600",
      iconBg: "bg-pink-600",
      benefits: [
        "Drives organic traffic with every post",
        "Positions you as an expert in your space",
        "Multiplies content across other channels",
        "Builds long-term brand authority",
      ],
      stats: [
        "Businesses that blog generate 67% more leads than those that don't",
        "Companies with blogs produce 55% more website visitors",
        "Long-form content receives 77% more backlinks than short articles",
      ],
      service: {
        title: "Blog Content",
        price: "$100/mo",
        description:
          "SEO-optimized, in-depth blog content designed to rank and drive traffic—without sounding robotic.",
        features: [
          "10–13 business days delivery",
          "1000+ words, fully formatted",
          "SEO optimization included",
          "Links, headings, CTA copy",
        ],
        primaryCta: {
          text: "Start Building",
          link: "/build#blogs",
        },
      },
    },
    {
      id: "email",
      label: "Email",
      icon: <Mail className="w-5 h-5" />,
      color: "purple-600",
      iconBg: "bg-purple-600",
      benefits: [
        "Builds trust and drives long-term sales",
        "Converts better than social or ads",
        "Reaches your audience directly",
        "Works across launches, promos, and evergreen flows",
      ],
      stats: [
        "Email marketing drives 4x higher ROI than paid ads on average",
        "Email subscribers are 3x more likely to share content on social media",
        "Segmented email campaigns have 14.31% higher open rates than non-segmented campaigns",
      ],
      service: {
        title: "Email Campaigns",
        price: "$150/mo",
        description: "Whether it's a single promo or an automated flow, we craft emails that drive opens and clicks.",
        features: [
          "10–13 business days delivery",
          "Copy, structure, CTA design",
          "Works with any ESP",
          "A/B testing recommendations",
        ],
        primaryCta: {
          text: "Start Building",
          link: "/build#email-campaigns",
        },
      },
    },
  ]

  const activeService = tabs.find((tab) => tab.id === activeTab)

  // Rotate through stats every 5 seconds
  useEffect(() => {
    if (!activeService) return

    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % activeService.stats.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [activeService])

  // Reset stat index when tab changes
  useEffect(() => {
    setActiveStat(0)
  }, [activeTab])

  // Optimized regex pattern that correctly captures numbers with optional x/X and % characters
  const numberPattern = /(\d+(?:\.\d+)?(?:[xX])?%?)/g

  return (
    <div className={cn("space-y-0", className)}>
      {/* Tab Navigation - Hard-edged, bold tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={cn(
              "flex items-center gap-3 p-6 transition-all duration-200 border-b-2 border-zinc-800",
              activeTab === tab.id ? `bg-zinc-900 border-b-2 border-${tab.color}` : "bg-black hover:bg-zinc-900",
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            <div className={cn("flex items-center justify-center w-10 h-10", tab.iconBg)}>
              {React.cloneElement(tab.icon as React.ReactElement, {
                className: "w-5 h-5 text-white"
              } as React.SVGAttributes<SVGElement>)}
            </div>
            <span className={cn("font-light text-lg", activeTab === tab.id ? "text-white" : "text-zinc-400")}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Content Area - Tile-based layout */}
      <AnimatePresence mode="wait">
        {activeService && (
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-0"
          >
            {/* Left Column - Benefits Tile */}
            <div className="md:col-span-5 bg-zinc-900 p-8 border-r border-zinc-800">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={cn(
                    "w-1 h-8",
                    activeService.id === "social" || activeService.id === "blog" ? "bg-pink-600" : "bg-purple-600",
                  )}
                ></div>
                <H3 className="text-2xl font-light">Why It Works</H3>
              </div>

              {/* Highlight Graphics */}
              <CardContainer
                variant="dark"
                color={activeService.id === "social" || activeService.id === "blog" ? "pink" : "purple"}
                className="mb-8 p-4 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  {React.cloneElement(activeService.icon as React.ReactElement, {
                    className: "w-full h-full text-white"
                  } as React.SVGAttributes<SVGElement>)}
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 opacity-10 rotate-12">
                  <Sparkles className="w-full h-full text-white" />
                </div>
                <ul className="space-y-4 relative z-10">
                  {activeService.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className={cn("w-5 h-5 shrink-0 mt-0.5", `text-${activeService.color}`)} />
                      <span className="text-zinc-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContainer>

              {/* Stat Box with Rotation */}
              <div className="bg-black p-6 border-l-4 border-pink-600 relative overflow-hidden min-h-[100px] bg-gradient-to-r from-black to-zinc-900/80">
                <div className="absolute top-0 right-0 w-16 h-16 opacity-5">
                  <Sparkles className="w-full h-full text-white" />
                </div>
                <AnimatePresence mode="wait">
                  <P className="text-white text-lg font-bold">
                    {/* Highlight numbers with opposing accent color using the optimized regex */}
                    {activeService.stats[activeStat].split(numberPattern).map((part, i) => {
                      // Check if the part matches our number pattern
                      const isNumber = part && numberPattern.test(part)
                      numberPattern.lastIndex = 0 // Reset the regex state

                      return isNumber ? (
                        <span
                          key={i}
                          className={cn(
                            "font-extrabold",
                            activeService.id === "social" || activeService.id === "blog"
                              ? "text-purple-500"
                              : "text-pink-500",
                          )}
                        >
                          {part}
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    })}
                  </P>
                </AnimatePresence>
                <div className="flex mt-4 justify-center gap-2">
                  {activeService.stats.map((_, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        idx === activeStat ? `bg-${activeService.color}` : "bg-zinc-700",
                      )}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Service Details Tile */}
            <div className="md:col-span-7 bg-black p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className={cn("w-1 h-8", `bg-${activeService.color}`)}></div>
                <div>
                  <h3 className="text-2xl font-light text-white">{activeService.service.title}</h3>
                  <p className={cn("font-normal", `text-${activeService.color}`)}>
                    Starting at {activeService.service.price}
                  </p>
                </div>
              </div>

              <p className="text-zinc-300 mb-6 text-lg">{activeService.service.description}</p>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {activeService.service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className={cn("w-2 h-2", `bg-${activeService.color}`)}></div>
                    <span className="text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button - Only primary button now */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  onClick={() => {
                    // Navigate to the build page with the correct anchor
                    router.push(activeService.service.primaryCta.link)
                  }}
                  className={cn(
                    "glass-effect-dark glass-btn glass-btn-shimmer glass-rounded px-8 py-6 h-auto text-white font-light text-base border",
                    activeService.id === "social" || activeService.id === "blog"
                      ? "glass-pink border-pink-600"
                      : "glass-purple border-purple-600",
                  )}
                >
                  {activeService.service.primaryCta.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
