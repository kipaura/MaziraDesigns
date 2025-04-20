"use client"

import { TestimonialVideoGrid } from "@/components/testimonial-video-grid"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProofStrip } from "@/components/proof-strip"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"

export default function TestimonialsPage() {
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
                Industries We Serve
              </h1>
              <div className="h-1 w-40 bg-purple-600 mx-auto mb-8"></div>
              <p className="text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed">
                See how our content solutions drive results across different industries
              </p>
            </div>
          </Container>
        </Section>

        <ProofStrip />

        {/* Testimonial Videos */}
        <Section size="lg">
          <Container>
            <TestimonialVideoGrid />
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </div>
  )
}
