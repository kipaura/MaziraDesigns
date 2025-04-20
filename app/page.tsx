"use client"
import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import { ScrollingCarousel } from "@/components/scrolling-carousel"
import { ArrowRight, ChevronDown, ChevronUp, Instagram, Video, Mail, FileText, LinkIcon } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ServiceTabs } from "@/components/service-tabs"
import { TestimonialVideoGrid } from "@/components/testimonial-video-grid"
import { useState } from "react"
import { RotatingText } from "@/components/rotating-text"
import { ServiceBlock } from "@/components/service-block"
import { BuildSummary } from "@/components/build-summary"
import { ProofStrip } from "@/components/proof-strip"
// Update imports to include our new components
import { Container as UIContainer } from "@/components/ui/container"
import { Section as UISection } from "@/components/ui/section"
// To use the Typography components directly:
import { Typography } from "@/components/typography-provider"
import { GHLCalendarWidget } from "@/components/ghl-calendar-widget"
const { H1, PLarge, SectionTitle, P } = Typography

export default function HomePage() {
  const router = useRouter()
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  // FAQ data organized by categories
  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      questions: [
        {
          question: "Can I cancel anytime?",
          answer: "Yes. All of our content plans are month-to-month with no contracts.",
        },
        {
          question: "What if I need revisions?",
          answer: "Every deliverable includes one round of revisions based on your feedback.",
        },
        {
          question: "Do I own the content?",
          answer: "Yes. Everything we produce is yours to use however you'd like.",
        },
      ],
    },
    {
      id: "services",
      title: "Services & Pricing",
      questions: [
        {
          question: "Can I mix services each month?",
          answer: "Yes! You can adjust your stack anytime. Need more blogs and fewer videos next month? Easy.",
        },
        {
          question: "Do you help with strategy?",
          answer: "Every plan includes light strategic support. You can also book a deeper strategy session.",
        },
        {
          question: "What's included in each service?",
          answer:
            "Each service includes planning, creation, revisions, and delivery. Check individual service pages for specifics.",
        },
      ],
    },
    {
      id: "delivery",
      title: "Delivery & Process",
      questions: [
        {
          question: "How long does it take to get my content?",
          answer: "All services are delivered within 10-13 business days from approval of your brief.",
        },
        {
          question: "Do you post the content for me?",
          answer: "We can! Just let us know during onboarding if you'd like us to handle posting.",
        },
        {
          question: "What happens after I purchase?",
          answer: "You'll complete a quick onboarding form, then we'll start creating your first batch of content.",
        },
      ],
    },
  ]

  // Service blocks data for the building blocks section
  const serviceBlocks = [
    {
      id: "social",
      title: "Social Media",
      icon: <Instagram className="w-6 h-6" />,
      description: "Consistent, on-brand posts for your platforms",
      price: "$150/mo",
      color: "pink",
    },
    {
      id: "video",
      title: "Video Content",
      icon: <Video className="w-6 h-6" />,
      description: "Short-form videos that convert viewers",
      price: "$100/mo",
      color: "purple",
    },
    {
      id: "email",
      title: "Email Campaigns",
      icon: <Mail className="w-6 h-6" />,
      description: "High-converting emails for your list",
      price: "$150/mo",
      color: "green",
    },
    {
      id: "blog",
      title: "SEO Blog Posts",
      icon: <FileText className="w-6 h-6" />,
      description: "Long-form content that ranks and converts",
      price: "$100/mo",
      color: "cyan",
    },
    {
      id: "backlink",
      title: "Backlink Building",
      icon: <LinkIcon className="w-6 h-6" />,
      description: "Authority-building links for your domain",
      price: "$270/mo",
      color: "amber",
    },
  ]

  const toggleCategory = (categoryId: string) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId)
  }

  const toggleServiceSelection = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
    )
  }

  const handleCheckout = (services: Array<{ name: string; tier: string; price: number }>) => {
    // Store the selected services in sessionStorage before navigation
    sessionStorage.setItem('selectedBuildServices', JSON.stringify({
      services: services,
      total: services.reduce((sum, service) => sum + service.price, 0)
    }))
    
    // Navigate to the build page
    router.push('/build')
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <SiteHeader />

      {/* Hero Section */}
      <UISection size="lg" className="py-20">
        <UIContainer>
          <div className="text-center mb-12">
            <H1 className="mb-6">Strategic Content. Built To Fit.</H1>
            <RotatingText />
            <PLarge className="mt-8 mb-10 font-light max-w-4xl mx-auto">
              Mazira Designs gives you sharp, on-brand content without the agency overhead. You pick the plan, we handle
              the strategy, creation, and delivery—simple as that.
            </PLarge>
          </div>

          {/* Scrolling Example Bar */}
          <div className="mt-12">
            <ScrollingCarousel speed="normal" imageSize="medium" />
          </div>
        </UIContainer>
      </UISection>

      {/* Services Showcase Section */}
      <ProofStrip />

      {/* Services Showcase Section */}
      <UISection size="md" className="pt-8 pb-20 bg-zinc-900">
        <UIContainer>
          <ServiceTabs />
        </UIContainer>
      </UISection>

      {/* Proof Strip - Added before Testimonials section */}
      <ProofStrip />

      {/* Testimonials Section with Video Grid */}
      <UISection size="lg">
        <UIContainer>
          <div className="text-center mb-12">
            <SectionTitle>Who We Work With</SectionTitle>
            <P className="text-zinc-300 max-w-2xl mx-auto mb-8">
              See how businesses across industries are transforming their content with Mazira.
            </P>
          </div>

          <TestimonialVideoGrid />
        </UIContainer>
      </UISection>

      {/* Building Blocks Section */}
      <UISection size="lg" className="bg-zinc-900">
        <UIContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pick Your Plans. Stack Your Strategy.</h2>
            <p className="text-zinc-300 max-w-2xl mx-auto">
              Mix and match our content building blocks to create your perfect marketing stack.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {serviceBlocks.map((block) => (
                  <ServiceBlock
                    key={block.id}
                    block={block}
                    isSelected={selectedServices.includes(block.id)}
                    onSelect={toggleServiceSelection}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <BuildSummary
                selectedServices={selectedServices}
                serviceBlocks={serviceBlocks}
                onClearSelections={() => setSelectedServices([])}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </UIContainer>
      </UISection>

      {/* Proof Strip - Added before About & Contact Section */}
      <ProofStrip />

      {/* Combined About & Contact Section */}
      <UISection size="lg">
        <UIContainer>
          <div className="bg-zinc-900/30 border border-zinc-800 p-8 md:p-12 max-w-4xl mx-auto glass-effect-dark glass-btn-shimmer glass-rounded-lg">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Built for Small Brands With Big Goals</h2>
              <div className="h-1 w-20 bg-pink-600 mx-auto mb-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-lg text-zinc-300 mb-6">
                  We know what it's like to juggle content, client work, and a growing to-do list—because we've done it.
                  Mazira exists for the small-but-mighty brands building something real.
                </p>
                <p className="text-lg text-zinc-300 mb-6">
                  We've spent over a decade crafting stories, launching campaigns, and building content systems for
                  nonprofits, creators, and startups. Now we've turned that experience into flexible, fixed-price plans
                  made for real businesses—like yours.
                </p>
                <Button
                  onClick={() => router.push("/about")}
                  variant="outline"
                  className="w-full md:w-auto glass-effect-dark glass-btn glass-rounded border-zinc-700 text-white hover:bg-zinc-800 hover:text-white font-bold"
                >
                  Read Our Story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="border-t md:border-t-0 md:border-l border-zinc-800 pt-8 md:pt-0 md:pl-10">
                <h3 className="text-xl font-bold mb-4 text-pink-600">Let's Talk—Even If You're Not Ready to Buy</h3>
                <p className="text-zinc-300 mb-6">
                  Questions? Need help picking the right plan? Want to brainstorm your first campaign? We're here and
                  happy to help.
                </p>
                <GHLCalendarWidget buttonText="Book a Free 15-Minute Call" />
              </div>
            </div>
          </div>
        </UIContainer>
      </UISection>

      {/* FAQ Section */}
      <UISection size="lg" className="bg-zinc-900">
        <UIContainer>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 w-full">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqCategories.map((category) => (
              <div
                key={category.id}
                className="glass-effect-dark glass-btn-shimmer glass-rounded-lg border border-zinc-800"
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full p-4 flex justify-between items-center text-left"
                >
                  <h3 className="text-lg font-bold text-white">{category.title}</h3>
                  {openCategory === category.id ? (
                    <ChevronUp className="w-5 h-5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                  )}
                </button>

                {openCategory === category.id && (
                  <div className="p-4 pt-0 border-t border-zinc-800 mt-2">
                    <div className="space-y-4">
                      {category.questions.map((faq, idx) => (
                        <div key={idx} className="bg-black/30 p-4 rounded-lg">
                          <h4 className="text-base font-bold mb-2 text-white">Q: {faq.question}</h4>
                          <p className="text-zinc-300 text-sm">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              onClick={() => router.push("/faq")}
              variant="outline"
              className="glass-effect-dark glass-btn glass-rounded border-zinc-700 text-white hover:bg-zinc-800 hover:text-white font-bold"
            >
              View All FAQs
            </Button>
          </div>
        </UIContainer>
      </UISection>

      <SiteFooter />
    </div>
  )
}
