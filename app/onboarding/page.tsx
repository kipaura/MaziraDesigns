"use client"

import { Suspense, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProofStrip } from "@/components/proof-strip"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { CardContainer } from "@/components/ui/card-container"
import Image from "next/image"
import { ArrowRight, Clock, FileText } from "lucide-react"
import { useState } from "react"

// Add Typography import
import { Typography } from "@/components/typography-provider"
import { Button } from "@/components/ui/button"
const { H1, H2, H3, P, PLarge } = Typography

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingContent />
    </Suspense>
  )
}

function OnboardingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const success = searchParams?.get("success")
    const sessionId = searchParams?.get("session_id")
    if (success === "true" && sessionId) {
      setTimeout(() => {
        sessionStorage.removeItem("checkoutServices")
        window.history.replaceState({}, "", "/onboarding")
      }, 300)
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <Section size="lg" className="relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-10 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl"></div>
          </div>

          <Container>
            <div className="text-center max-w-3xl mx-auto">
              {/* Replace direct h1 with Typography component */}
              <H1 className="mb-6 whitespace-nowrap">Let's Get You Onboarded</H1>
              <div className="h-1 w-40 bg-purple-600 mx-auto mb-8"></div>
              {/* Replace direct p with Typography component */}
              <PLarge className="mb-10 leading-relaxed">
                Choose how you'd like to get started. Rapid onboarding gets you up and running in 10 minutes. Full
                onboarding gives us everything to deeply personalize your content.
              </PLarge>
            </div>
          </Container>
        </Section>

        {/* Proof Strip */}
        <ProofStrip />

        {/* Onboarding Options */}
        <Section size="md">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Rapid Onboarding Card */}
              <CardContainer
                variant="dark"
                color="pink"
                className="p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-pink-900/20"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-pink-900/30 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-pink-400" />
                    </div>
                    {/* Replace direct h3 with Typography component */}
                    <H3>Rapid Onboarding</H3>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-pink-900/30 text-pink-400 text-xs rounded-full mb-2">
                      10 minutes
                    </span>
                    <span className="inline-block px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full ml-2">
                      13-day delivery
                    </span>
                  </div>
                  <p className="text-zinc-300 mb-6">
                    Best for fast setup and ongoing collaboration. We'll ask for basic info and get your first content
                    set rolling immediately.
                  </p>
                </div>
                {/* Standardize button variant */}
                <Button onClick={() => router.push("/onboarding/rapid")} variant="pink" className="w-full">
                  Start Rapid Onboarding <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContainer>

              {/* Center Image */}
              <div className="flex items-center justify-center">
                <Image
                  src="https://res.cloudinary.com/mazira/image/upload/v1745202865/mazira_assets/images/onboarding-flow_ncxtll.svg"
                  alt="Onboarding process visualization"
                  width={300}
                  height={300}
                  className="w-full max-w-[250px] h-auto"
                />
              </div>

              {/* Full Onboarding Card */}
              <CardContainer
                variant="dark"
                color="purple"
                className="p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-purple-900/30 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white">Full Onboarding</h3>
                  </div>
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-purple-900/30 text-purple-400 text-xs rounded-full mb-2">
                      30 minutes
                    </span>
                    <span className="inline-block px-3 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full ml-2">
                      10-day delivery
                    </span>
                  </div>
                  <p className="text-zinc-300 mb-6">
                    Perfect if you want deeper customization from the start. We'll gather full brand details, goals, and
                    preferences to tailor everything.
                  </p>
                </div>
                <Button
                  onClick={() => router.push("/onboarding/full")}
                  className="w-full glass-effect-dark glass-btn glass-btn-shimmer glass-rounded glass-purple border border-purple-600 text-white"
                >
                  Start Full Onboarding <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContainer>
            </div>

            <div className="mt-8 text-center">
              <p className="text-zinc-500">
                Need help deciding?{" "}
                <a href="#" className="text-purple-400 hover:text-purple-300">
                  Schedule a call
                </a>{" "}
                with our onboarding team.
              </p>
            </div>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </div>
  )
}
