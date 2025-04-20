"use client"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/glass-card"
import Link from "next/link"
import { CheckCircle, Users, Briefcase, Lightbulb, Heart, Zap, Sparkles, ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProofStrip } from "@/components/proof-strip"
import { Container } from "@/components/ui/container"

// Add Typography import
import { Typography } from "@/components/typography-provider"
const { H1, H2, H3, P, PLarge, SectionTitle } = Typography

// Content data
const valuesList = [
  { title: "Strategy First", desc: "Every piece we deliver has a purpose—and a plan." },
  { title: "Simplicity Wins", desc: "We remove the bloat, so you stay focused." },
  { title: "Human Over Hype", desc: "Real people, real voices. No spammy AI junk." },
  { title: "Built to Fit", desc: "We design content that matches your tone—not ours." },
  { title: "Always Sharpening", desc: "We improve every month, every brief, every build." },
]

const audienceList = [
  { icon: Users, text: "Solo founders with no time for content" },
  { icon: Sparkles, text: "Creators who want to look like a brand" },
  { icon: Lightbulb, text: "Coaches who need consistent authority" },
  { icon: Briefcase, text: "Ecom brands tired of hiring freelancers" },
  { icon: Zap, text: "Agencies who need white-label output" },
  { icon: Heart, text: "Nonprofits who want stories that stick" },
]

const problemList = [
  "Businesses were paying too much for content that didn't convert",
  "Creators were drowning in DIY burnout",
  "Agencies were sending strategy decks no one implemented",
  "Great ideas were stuck in drafts and half-written captions",
]

export default function AboutPage() {
  // TODO: This page uses direct h1, h2, h3 tags instead of the Typography components
  // Consider updating to use Typography components (H1, H2, H3, etc.) for consistency
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-10 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-screen-xl mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              {/* Replace direct h1 with Typography component */}
              <H1 className="mb-6 whitespace-nowrap">Our Story</H1>
              <div className="h-1 w-40 bg-purple-600 mx-auto mb-8"></div>
              <p className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto">
                The journey behind Mazira and how we're changing content creation for small brands.
              </p>
            </div>
          </div>
        </section>

        <ProofStrip />

        <Container size="md" className="relative space-y-12 mt-16">
          {/* Section 1: Hero Block */}
          {/* Replace GlassCard with CardContainer */}
          <GlassCard variant="dark" color="pink" className="p-8">
            {/* Replace direct h2 with Typography component */}
            <H2 className="mb-6">We Didn't Start as an Agency. We Started as a Workaround.</H2>
            <div className="space-y-4 text-zinc-300">
              {/* Replace direct p with Typography component */}
              <P>
                Before Mazira, we were building campaigns from scratch—running content ops for nonprofits, creators, and
                small brands who needed results, not fluff.
              </P>
              <P>
                We weren't thinking about "productized services." We were thinking about how to get it done, better and
                faster.
              </P>
              <p className="font-medium text-white">Mazira is the system we wish we had years ago.</p>
            </div>
          </GlassCard>

          {/* Section 2: Problem Recognition */}
          <GlassCard variant="dark" color="purple" className="p-8">
            <h2 className="text-3xl font-bold mb-6">Content Was Always the Bottleneck</h2>
            <ul className="space-y-4 mb-8">
              {problemList.map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-pink-500 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-zinc-300">{item}</span>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-zinc-800/50 rounded-lg border-l-4 border-pink-600 mb-6">
              <p className="text-lg font-medium">
                So we built a fix: modular content plans, strategy-backed, and done-for-you.
              </p>
            </div>
          </GlassCard>

          {/* Section 3: The Mazira Model */}
          <GlassCard variant="dark" color="pink" className="p-8">
            <h2 className="text-3xl font-bold mb-6">Built for Brands That Build</h2>
            <p className="text-zinc-300 mb-8">
              Mazira is a modular content studio for small teams that move fast. We offer fixed-price packages for
              social posts, video, blogs, and emails—customized to your brand and delivered in 10–13 days.
            </p>
            <div className="bg-zinc-800/50 rounded-xl p-8 text-center mb-6">
              <p className="text-2xl font-medium leading-relaxed">
                Not templated.
                <br />
                Not bloated.
                <br />
                Just clean content that works.
              </p>
            </div>
          </GlassCard>

          {/* Section 4: Who We Serve */}
          <GlassCard variant="dark" color="purple" className="p-8">
            <h2 className="text-3xl font-bold mb-8">Who We're Built For</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {audienceList.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-4 glass-effect-dark glass-rounded-lg border border-zinc-800"
                >
                  <item.icon className="h-6 w-6 text-pink-500 mr-3 flex-shrink-0" />
                  <span className="text-zinc-300">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/build" passHref>
                <Button className="glass-effect-dark glass-btn glass-btn-shimmer glass-rounded glass-pink border border-pink-600 text-white">
                  Start Building Your Plan <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </GlassCard>

          {/* Section 5: Our Values */}
          <GlassCard variant="dark" color="pink" className="p-8">
            <h2 className="text-3xl font-bold mb-8">What We Believe</h2>
            <div className="space-y-6 mb-8">
              {valuesList.map((item, index) => (
                <div key={index} className="p-5 glass-effect-dark glass-rounded-lg border-l-4 border-pink-500">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-zinc-300">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Closing Statement */}
            <div className="mt-12 glass-effect-dark glass-btn-shimmer glass-rounded-xl border border-zinc-700 p-8">
              <h2 className="text-2xl font-bold mb-4">Mazira Exists Because We Needed It Too</h2>
              <p className="text-zinc-300 mb-8">
                This isn't some trend-chasing content agency. It's a system built from experience—one that delivers
                strategy-backed content fast, clean, and built to match your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services" passHref>
                  <Button className="glass-effect-dark glass-btn glass-btn-shimmer glass-rounded glass-pink border border-pink-600 text-white">
                    Explore Services <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/build" passHref>
                  <Button
                    variant="outline"
                    className="glass-effect-dark glass-btn glass-rounded border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  >
                    Start Building <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </GlassCard>
        </Container>
      </main>

      <SiteFooter />
    </div>
  )
}
