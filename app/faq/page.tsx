"use client"

import { useState, useCallback, useMemo } from "react"
import { ChevronDown, ChevronUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProofStrip } from "@/components/proof-strip"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { GHLCalendarWidget } from "@/components/ghl-calendar-widget"

// Add Typography import
import { Typography } from "@/components/typography-provider"
const { H1, H2, H3, P, PLarge } = Typography

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  title: string
  description: string
  items: FAQItem[]
}

export default function FAQPage() {
  const router = useRouter()
  const [openCategory, setOpenCategory] = useState<number | null>(0)
  const [openQuestions, setOpenQuestions] = useState<Record<number, Record<number, boolean>>>({})

  // FAQ data - moved outside component for better performance
  const faqCategories: FAQCategory[] = useMemo(
    () => [
      {
        title: "Social Media FAQs",
        description: "Common questions about our social media content services",
        items: [
          {
            question: "What's included in a social post?",
            answer:
              "A professionally written caption, visual direction or designed asset, hashtags, and a strong CTA—fully branded to match your tone.",
          },
          {
            question: "Do you post the content too?",
            answer:
              "Yes, you can choose during onboarding if you want us to post on your behalf or just deliver the files.",
          },
          {
            question: "Can I request edits or changes?",
            answer:
              "Absolutely. We include unlimited revisions within the delivery window to make sure you love every piece.",
          },
          {
            question: "What's the turnaround time?",
            answer: "All social packages are delivered in 10–13 business days.",
          },
        ],
      },
      {
        title: "Video Content FAQs",
        description: "Everything you need to know about our video production services",
        items: [
          {
            question: "What kind of video do you create?",
            answer:
              "We specialize in short-form (15–60 sec) vertical videos for TikTok, Reels, and YouTube Shorts—formatted for each platform.",
          },
          {
            question: "Can I use one video on multiple platforms?",
            answer: "Yes! You can add as many platforms as you need. We'll optimize each version accordingly.",
          },
          {
            question: "Do you include scripting?",
            answer: "Yes. Each video includes a custom hook, structure, and CTA written to convert.",
          },
          {
            question: "Do you use my footage or create it?",
            answer: "We can do both. Send us your raw clips, or choose a fully built-from-scratch stock-based option.",
          },
          {
            question: "When do I get my videos?",
            answer: "Video packages are delivered in 10–13 business days.",
          },
        ],
      },
      {
        title: "Blog Content FAQs",
        description: "Learn about our blog writing and SEO content services",
        items: [
          {
            question: "Do I get to approve the outline first?",
            answer:
              "Yes. Every blog starts with a proposed topic and outline—you'll review and approve it before we write anything.",
          },
          {
            question: "Are your blog posts SEO optimized?",
            answer: "100%. We include keyword targeting, metadata, internal links, and formatting designed to rank.",
          },
          {
            question: "Do you write long-form content too?",
            answer: "Yes. You can request longer posts, pillar pages, or multi-part series as an add-on.",
          },
          {
            question: "What's the word count?",
            answer: "Standard blogs are 1,000+ words, but we scale up if your goals require more depth.",
          },
          {
            question: "What's the delivery timeline?",
            answer: "Blog posts are delivered in 10–13 business days.",
          },
        ],
      },
      {
        title: "Email Campaign FAQs",
        description: "Details about our email marketing services",
        items: [
          {
            question: "Do you write sequences or one-off emails?",
            answer:
              "Both. We handle welcome flows, promo blasts, cart recovery, and nurture sequences—whatever your funnel needs.",
          },
          {
            question: "Can I choose the style and voice?",
            answer:
              "Yes. Our onboarding form captures your tone, vibe, and audience—so your emails sound like you, not a template.",
          },
          {
            question: "Will the emails be formatted for my platform?",
            answer:
              "Yes. You'll receive a structured version you can paste into Klaviyo, Mailchimp, or any email tool.",
          },
          {
            question: "Do you handle design too?",
            answer: "Yes. Clean layout, spacing, mobile-friendly design, and built-in CTAs are part of every email.",
          },
          {
            question: "When is everything delivered?",
            answer: "Email campaigns are delivered in 10–13 business days.",
          },
        ],
      },
      {
        title: "General / How It Works",
        description: "General questions about our services and process",
        items: [
          {
            question: "How do I get started?",
            answer:
              'Click "Build Your Plan" to select your services. After checkout, you\'ll complete our onboarding form with your brand details.',
          },
          {
            question: "Can I mix and match services?",
            answer:
              "Yes. You can combine social, video, blogs, email—everything is modular and made to scale with you.",
          },
          {
            question: "Can you post for me?",
            answer:
              "Yes, but it's optional. You choose whether we deliver ready-to-post content or handle publishing too.",
          },
          {
            question: "Do you offer rush delivery?",
            answer:
              "No. We work on a fixed schedule to ensure high-quality output—10–13 business days for all services.",
          },
          {
            question: "What if I want changes?",
            answer: "No problem. We offer unlimited revisions within each monthly cycle.",
          },
          {
            question: "Can I cancel or pause anytime?",
            answer: "Yes. Everything is month-to-month. You're never locked in.",
          },
        ],
      },
    ],
    [],
  )

  const toggleCategory = useCallback(
    (index: number) => {
      setOpenCategory(openCategory === index ? null : index)
    },
    [openCategory],
  )

  const toggleQuestion = useCallback((categoryIndex: number, questionIndex: number) => {
    setOpenQuestions((prev) => {
      const newState = { ...prev }
      if (!newState[categoryIndex]) {
        newState[categoryIndex] = {}
      }
      newState[categoryIndex][questionIndex] = !newState[categoryIndex][questionIndex]
      return newState
    })
  }, [])

  const isQuestionOpen = useCallback(
    (categoryIndex: number, questionIndex: number) => {
      return openQuestions[categoryIndex]?.[questionIndex] || false
    },
    [openQuestions],
  )

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="relative">
        {/* Accent lighting effects */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-purple-700 blur-sm"></div>
        <div className="absolute top-40 right-0 w-1/3 h-80 bg-purple-900/20 blur-lg -z-10"></div>
        <div className="absolute top-80 left-0 w-1/4 h-60 bg-blue-900/20 blur-lg -z-10"></div>
      </div>

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
            <H1 className="mb-6 whitespace-nowrap">Frequently Asked Questions</H1>
            <div className="h-1 w-40 bg-purple-600 mx-auto mb-8"></div>
            <PLarge className="mb-10 leading-relaxed">
              Get quick answers to common questions about our services, process, and policies.
            </PLarge>
          </div>
        </Container>
      </Section>

      <ProofStrip />

      {/* FAQ Categories Section */}
      <Section size="md" className="mb-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {faqCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => toggleCategory(index)}
                className={cn(
                  "p-4 rounded-xl text-left transition-all duration-300",
                  openCategory === index
                    ? "bg-gradient-to-br from-purple-900/50 to-purple-900/20 border border-purple-500/50"
                    : "bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 hover:border-purple-500/30",
                )}
              >
                <h3
                  className={cn("font-semibold text-lg mb-1", openCategory === index ? "text-white" : "text-zinc-300")}
                >
                  {category.title}
                </h3>
                <p className="text-sm text-zinc-400">{category.description}</p>
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-6">
            {openCategory !== null && (
              <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-xl p-6">
                <H2 className="mb-6 text-center">{faqCategories[openCategory].title}</H2>
                <div className="h-px w-full bg-zinc-800 mb-6"></div>

                <div className="space-y-4">
                  {faqCategories[openCategory].items.map((item, qIndex) => (
                    <div
                      key={qIndex}
                      className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-purple-500/50"
                    >
                      <button
                        className="w-full px-6 py-4 flex justify-between items-center text-left"
                        onClick={() => toggleQuestion(openCategory, qIndex)}
                      >
                        <H3 className="text-lg">{item.question}</H3>
                        {isQuestionOpen(openCategory, qIndex) ? (
                          <ChevronUp className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-purple-400 flex-shrink-0" />
                        )}
                      </button>
                      <div
                        className={cn(
                          "px-6 overflow-hidden transition-all duration-300",
                          isQuestionOpen(openCategory, qIndex) ? "max-h-96 pb-6" : "max-h-0",
                        )}
                      >
                        <p className="text-zinc-300">{item.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Additional Help */}
          <div className="mt-12 bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold mb-3">Still have questions?</h3>
            <p className="text-zinc-300 mb-8">
              We're happy to help with any other questions you might have about our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Button
                onClick={() => router.push("/contact")}
                className="glass-effect-dark glass-btn glass-btn-shimmer glass-rounded glass-purple border border-purple-600 text-white"
              >
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <GHLCalendarWidget buttonText="Schedule a Call" />
            </div>
            <Button
              onClick={() => router.push("/build")}
              variant="outline"
              className="glass-effect-dark glass-btn glass-rounded border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white mt-4"
            >
              Build Your Plan <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  )
}
