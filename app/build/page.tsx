"use client"

import { useState, useEffect } from "react"
import { SocialPostSelector } from "@/components/social-post-selector"
import { ShortFormVideoSelector } from "@/components/short-form-video-selector"
import { LongFormVideoSelector } from "@/components/long-form-video-selector"
import { EmailCampaignSelector } from "@/components/email-campaign-selector"
import { BlogPostSelector } from "@/components/blog-post-selector"
import { InstagramAddOnSelector } from "@/components/instagram-addon-selector"
import { BacklinkSelector } from "@/components/backlink-selector"
import { SummaryPanel } from "@/components/summary-panel"
import { useMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProofStrip } from "@/components/proof-strip"
import { Button } from "@/components/ui/button"
import { Calendar, ChevronDown, ChevronUp, ArrowRight } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { GHLCalendarWidget } from "@/components/ghl-calendar-widget"
import { BuildSummary } from "@/components/build-summary"

export default function Home() {
  const isMobile = useMobile()
  const [selectedServices, setSelectedServices] = useState<Array<{ name: string; tier: string; price: number }>>([])
  const [total, setTotal] = useState(0)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [checkoutServices, setCheckoutServices] = useState<Array<{ name: string; tier: string; price: number }> | null>(null)

  // State for social post selection
  const [socialPostSelection, setSocialPostSelection] = useState<{
    plan: string
    planLabel: string
    price: number
    freePlatform: string
    additionalPlatforms: string[]
    totalPrice: number
  } | null>(null)

  // State for short-form video selection
  const [shortFormVideoSelection, setShortFormVideoSelection] = useState<{
    plan: string
    planLabel: string
    price: number
    freePlatform: string
    additionalPlatforms: string[]
    totalPrice: number
  } | null>(null)

  // State for long-form video selection
  const [longFormVideoSelection, setLongFormVideoSelection] = useState<{
    plan: string
    planLabel: string
    price: number
    freePlatform: string
    additionalPlatforms: string[]
    totalPrice: number
  } | null>(null)

  // State for email campaign selection
  const [emailCampaignSelection, setEmailCampaignSelection] = useState<{
    plan: string
    planLabel: string
    price: number
  } | null>(null)

  // State for blog post selection
  const [blogPostSelection, setBlogPostSelection] = useState<{
    plan: string
    planLabel: string
    price: number
  } | null>(null)

  // State for Instagram add-on selection
  const [instagramAddOnSelection, setInstagramAddOnSelection] = useState<{
    storiesPlan: string | null
    storiesPlanLabel: string | null
    storiesPrice: number
    carouselsPlan: string | null
    carouselsPlanLabel: string | null
    carouselsPrice: number
    totalPrice: number
  } | null>(null)

  // State for backlink selection
  const [backlinkSelection, setBacklinkSelection] = useState<{
    plan: string
    planLabel: string
    price: number
  } | null>(null)

  // FAQ data
  const faqItems = [
    {
      question: "How does the content creation process work?",
      answer:
        "After checkout, you'll complete a brief onboarding form. Our team will then create your content based on your brand guidelines and deliver it within 10-13 business days.",
    },
    {
      question: "Can I request revisions?",
      answer:
        "Yes! All of our content packages include unlimited revisions within the delivery window to ensure you're completely satisfied.",
    },
    {
      question: "How do I receive my content?",
      answer:
        "Your content will be delivered via your preferred method - email, Google Drive, or directly posted to your platforms if you choose that option.",
    },
    {
      question: "Can I cancel or change my plan?",
      answer:
        "Absolutely. All plans are month-to-month with no long-term contracts. You can upgrade, downgrade, or cancel at any time.",
    },
  ]

  // Helper function to properly capitalize platform names
  const capitalizeFirstLetter = (str: string) => {
    if (str === "tiktok") return "TikTok"
    if (str === "instagram") return "Instagram"
    if (str === "facebook") return "Facebook"
    if (str === "linkedin") return "LinkedIn"
    if (str === "youtube") return "YouTube"
    if (str === "pinterest") return "Pinterest"
    if (str === "google") return "Google"
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const handleServiceSelect = (service: string, tier: string, price: number) => {
    // Remove any existing selection for this service
    const filtered = selectedServices.filter((item) => item.name !== service)

    // Add the new selection if tier is not "none"
    const newSelections = tier !== "none" ? [...filtered, { name: service, tier, price }] : filtered

    setSelectedServices(newSelections)
  }

  const handleSocialPostUpdate = (selection: {
    plan: string
    planLabel: string
    price: number
    freePlatform: string
    additionalPlatforms: string[]
    totalPrice: number
  }) => {
    setSocialPostSelection(selection)

    // Update the selected services list
    const filtered = selectedServices.filter((item) => item.name !== "Social Media Posts")

    // Properly capitalize platform names

    const platformInfo = `${capitalizeFirstLetter(selection.freePlatform)}${
      selection.additionalPlatforms.length > 0 ? ` + ${selection.additionalPlatforms.length} more` : ""
    }`

    setSelectedServices([
      ...filtered,
      {
        name: "Social Media Posts",
        tier: `${selection.planLabel.split("–")[0].trim()} (${platformInfo})`,
        price: selection.totalPrice,
      },
    ])
  }

  const handleShortFormVideoUpdate = (selection: {
    plan: string
    planLabel: string
    price: number
    freePlatform: string
    additionalPlatforms: string[]
    totalPrice: number
  }) => {
    setShortFormVideoSelection(selection)

    // Update the selected services list
    const filtered = selectedServices.filter((item) => item.name !== "Short-Form Videos")

    // Properly capitalize platform names

    const platformInfo = `${capitalizeFirstLetter(selection.freePlatform)}${
      selection.additionalPlatforms.length > 0 ? ` + ${selection.additionalPlatforms.length} more` : ""
    }`

    setSelectedServices([
      ...filtered,
      {
        name: "Short-Form Videos",
        tier: `${selection.planLabel.split("–")[0].trim()} (${platformInfo})`,
        price: selection.totalPrice,
      },
    ])
  }

  const handleLongFormVideoUpdate = (selection: {
    plan: string
    planLabel: string
    price: number
    freePlatform: string
    additionalPlatforms: string[]
    totalPrice: number
  }) => {
    setLongFormVideoSelection(selection)

    // Update the selected services list
    const filtered = selectedServices.filter((item) => item.name !== "Long-Form Videos")

    // Properly capitalize platform names

    const platformInfo = `${capitalizeFirstLetter(selection.freePlatform)}${
      selection.additionalPlatforms.length > 0 ? ` + ${selection.additionalPlatforms.length} more` : ""
    }`

    setSelectedServices([
      ...filtered,
      {
        name: "Long-Form Videos",
        tier: `${selection.planLabel.split("–")[0].trim()} (${platformInfo})`,
        price: selection.totalPrice,
      },
    ])
  }

  const handleEmailCampaignUpdate = (selection: {
    plan: string
    planLabel: string
    price: number
  }) => {
    setEmailCampaignSelection(selection)

    // Update the selected services list
    const filtered = selectedServices.filter((item) => item.name !== "Email Campaigns")

    setSelectedServices([
      ...filtered,
      {
        name: "Email Campaigns",
        tier: selection.planLabel.split("–")[0].trim(),
        price: selection.price,
      },
    ])
  }

  const handleBlogPostUpdate = (selection: {
    plan: string
    planLabel: string
    price: number
  }) => {
    setBlogPostSelection(selection)

    // Update the selected services list
    const filtered = selectedServices.filter((item) => item.name !== "SEO Blog Posts")

    setSelectedServices([
      ...filtered,
      {
        name: "SEO Blog Posts",
        tier: selection.planLabel.split("–")[0].trim(),
        price: selection.price,
      },
    ])
  }

  const handleInstagramAddOnUpdate = (selection: {
    storiesPlan: string | null
    storiesPlanLabel: string | null
    storiesPrice: number
    carouselsPlan: string | null
    carouselsPlanLabel: string | null
    carouselsPrice: number
    totalPrice: number
  }) => {
    setInstagramAddOnSelection(selection)

    // Update the selected services list
    const filtered = selectedServices.filter(
      (item) => item.name !== "Instagram Stories" && item.name !== "Instagram Carousels",
    )

    const newSelections = [...filtered]

    // Add Stories if selected
    if (selection.storiesPlan) {
      newSelections.push({
        name: "Instagram Stories",
        tier: selection.storiesPlanLabel?.split("–")[0].trim() || "",
        price: selection.storiesPrice,
      })
    }

    // Add Carousels if selected
    if (selection.carouselsPlan) {
      newSelections.push({
        name: "Instagram Carousels",
        tier: selection.carouselsPlanLabel?.split("–")[0].trim() || "",
        price: selection.carouselsPrice,
      })
    }

    setSelectedServices(newSelections)
  }

  const handleBacklinkUpdate = (selection: {
    plan: string
    planLabel: string
    price: number
  }) => {
    setBacklinkSelection(selection)

    // Update the selected services list
    const filtered = selectedServices.filter((item) => item.name !== "Backlink Building")

    setSelectedServices([
      ...filtered,
      {
        name: "Backlink Building",
        tier: selection.planLabel.split("–")[0].trim(),
        price: selection.price,
      },
    ])
  }

  // Calculate total whenever selections change
  useEffect(() => {
    const newTotal = selectedServices.reduce((sum, service) => sum + service.price, 0)
    setTotal(newTotal)
  }, [selectedServices])

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const handleCheckout = (services: Array<{ name: string; tier: string; price: number }>) => {
    setCheckoutServices(services)
  }

  const calculateTotal = (services: Array<{ name: string; tier: string; price: number }>) => {
    return services.reduce((sum, service) => sum + service.price, 0)
  }

  // Load pre-selected service on mount
  useEffect(() => {
    const preSelectedService = sessionStorage.getItem('preSelectedService')
    if (preSelectedService) {
      const selection = JSON.parse(preSelectedService)
      
      // Add the pre-selected service to the selections
      setSelectedServices(prev => {
        // Remove any existing selection for this service
        const filtered = prev.filter(item => item.name !== selection.name)
        // Add the new selection
        return [...filtered, selection]
      })
      
      // Clear the pre-selection from storage
      sessionStorage.removeItem('preSelectedService')
      
      // Update the corresponding selector state based on service type
      switch(selection.name) {
        case 'Social Media Posts':
          setSocialPostSelection({
            plan: selection.tier,
            planLabel: `${selection.tier} – $${selection.price}/mo`,
            price: selection.price,
            freePlatform: 'instagram', // Default platform
            additionalPlatforms: [],
            totalPrice: selection.price
          })
          break
        case 'Short-Form Videos':
          setShortFormVideoSelection({
            plan: selection.tier,
            planLabel: `${selection.tier} – $${selection.price}/mo`,
            price: selection.price,
            freePlatform: 'tiktok', // Default platform
            additionalPlatforms: [],
            totalPrice: selection.price
          })
          break
        // Add cases for other service types
      }
      
      // Scroll to the relevant section after a short delay
      setTimeout(() => {
        const element = document.getElementById(selection.name.toLowerCase().replace(' ', '-'))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [])

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <SiteHeader />

      {/* Hero Section */}
      <Section size="lg" className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl"></div>
        </div>

        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white whitespace-nowrap">
              Build Your Content Plan
            </h1>
            <div className="h-1 w-40 bg-pink-600 mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed">
              Select the services you need and customize your content strategy. Mix and match to create the perfect plan
              for your business.
            </p>
          </div>
        </Container>
      </Section>

      <ProofStrip />

      <Section size="sm" className={cn("pb-8", isMobile && "pb-20")}>
        <Container className={cn(isMobile ? "" : "grid grid-cols-1 md:grid-cols-3 gap-8")}>
          <div className={isMobile ? "w-full space-y-6" : "md:col-span-2 space-y-6"}>
            {/* Social Post Selector */}
            <div id="social-posts">
              <SocialPostSelector onUpdate={handleSocialPostUpdate} />
            </div>

            {/* Short Form Video Selector */}
            {/* Long Form Video Selector */}
            <div id="video">
              {/* Short Form Video Selector */}
              <ShortFormVideoSelector onUpdate={handleShortFormVideoUpdate} />

              {/* Long Form Video Selector */}
              <LongFormVideoSelector onUpdate={handleLongFormVideoUpdate} />
            </div>

            {/* Email Campaign Selector */}
            <div id="email-campaigns">
              <EmailCampaignSelector onUpdate={handleEmailCampaignUpdate} />
            </div>

            {/* Blog Post Selector */}
            <div id="blogs">
              <BlogPostSelector onUpdate={handleBlogPostUpdate} />
            </div>

            {/* Instagram Add-On Selector */}
            <div id="instagram-addons">
              <InstagramAddOnSelector onUpdate={handleInstagramAddOnUpdate} />
            </div>

            {/* Backlink Selector */}
            <div id="backlink-building">
              <BacklinkSelector onUpdate={handleBacklinkUpdate} />
            </div>
          </div>

          {!isMobile && (
            <div className="md:col-span-1">
              <SummaryPanel selectedServices={selectedServices} total={total} />
            </div>
          )}
        </Container>
      </Section>

      {/* FAQ and Meeting Scheduling Section */}
      <Section size="lg" className="bg-zinc-900/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* FAQ Column */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="glass-effect-dark glass-btn-shimmer glass-rounded-lg border border-zinc-800 overflow-hidden"
                  >
                    <button
                      className="w-full px-6 py-4 flex justify-between items-center text-left"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="text-base font-semibold">{item.question}</h3>
                      {openFAQ === index ? (
                        <ChevronUp className="w-5 h-5 text-pink-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-pink-400 flex-shrink-0" />
                      )}
                    </button>
                    <div
                      className={cn(
                        "px-6 overflow-hidden transition-all duration-300",
                        openFAQ === index ? "max-h-96 pb-6" : "max-h-0",
                      )}
                    >
                      <p className="text-zinc-300">{item.answer}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <Button
                  variant="outline"
                  className="glass-effect-dark glass-btn glass-rounded border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  onClick={() => (window.location.href = "/faq")}
                >
                  View All FAQs <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Meeting Scheduling Column */}
            <div className="glass-effect-dark glass-btn-shimmer glass-rounded-lg glass-purple border border-purple-600 p-8">
              <h2 className="text-2xl font-bold mb-4">Need Help Deciding?</h2>
              <p className="text-zinc-300 mb-6">
                Not sure which services are right for your business? Schedule a free 15-minute consultation with our
                content strategists to get personalized recommendations.
              </p>

              <div className="bg-zinc-800/50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-purple-400" /> What to Expect:
                </h3>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Brief overview of your business needs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Recommendations for your content strategy</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>Answers to any questions about our services</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>No pressure, no sales tactics</span>
                  </li>
                </ul>
              </div>

              <GHLCalendarWidget buttonText="Schedule Your Free Call" className="w-full" />
            </div>
          </div>
        </Container>
      </Section>

      {isMobile && <SummaryPanel selectedServices={selectedServices} total={total} />}

      <SiteFooter />

      {/* Add SummaryPanel for checkout */}
      {checkoutServices && (
        <SummaryPanel
          selectedServices={checkoutServices}
          total={calculateTotal(checkoutServices)}
        />
      )}
    </div>
  )
}