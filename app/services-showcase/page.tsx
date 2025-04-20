"use client"

import { ServiceTabs } from "@/components/service-tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { ScrollingCarousel } from "@/components/scrolling-carousel"
import { ProofStrip } from "@/components/proof-strip"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

export default function ServicesShowcasePage() {
  const router = useRouter()

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
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white whitespace-nowrap">
                Our Services & Why They Work
              </h1>
              <div className="h-1 w-40 bg-purple-600 mx-auto mb-8"></div>
              <p className="text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed">
                Explore our content services and the benefits they bring to your business. Each service is designed to
                solve specific marketing challenges.
              </p>
            </div>
          </Container>
        </Section>

        {/* Proof Strip */}
        <ProofStrip />

        {/* Tabs Section */}
        <Section size="md">
          <Container>
            <ServiceTabs />
          </Container>
        </Section>

        {/* Examples Section */}
        <Section size="lg" className="bg-zinc-900/30">
          <Container>
            <ScrollingCarousel speed="normal" imageSize="medium" />
          </Container>
        </Section>

        {/* Testimonials Section */}
        <Section size="lg">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "Starting out I couldn't afford the high prices of an agency. I started with Mazira before it even had a name and my channels have grown exponentially.",
                  author: "Erin D.",
                  role: "Life Coach",
                },
                {
                  quote: "Their video team gave us 12 Reels in 10 days. We went viral twice.",
                  author: "Drew M.",
                  role: "Ecommerce Brand",
                },
                {
                  quote: "I finally get emails out every month on a consistent basis—and they actually convert.",
                  author: "Rita G.",
                  role: "Consultant",
                },
              ].map((testimonial, idx) => (
                <div
                  key={idx}
                  className="glass-effect-dark glass-btn-shimmer glass-rounded-lg border border-zinc-800 p-6 transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-900/20"
                >
                  <p className="text-zinc-300 italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.author}</p>
                      <p className="text-zinc-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section size="lg" className="relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-10 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl"></div>
          </div>

          <Container>
            <div className="glass-effect-dark glass-btn-shimmer glass-rounded-lg glass-pink border border-pink-600 p-8 md:p-12 text-center max-w-3xl mx-auto">
              <div className="h-1 w-20 bg-purple-600 mx-auto mb-8"></div>
              <h2 className="text-3xl font-bold mb-4">Ready to Build Your Content Stack?</h2>
              <p className="text-zinc-300 mb-8">
                Pick your content, choose your platforms, and checkout in minutes. No contracts, cancel anytime.
              </p>
              <Button
                onClick={() => router.push("/build")}
                className="glass-effect-dark glass-btn glass-btn-shimmer glass-rounded glass-pink border border-pink-600 text-white px-8 py-6 text-lg h-auto"
              >
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </div>
  )
}
