"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Instagram, Video, Mail, FileText, LinkIcon, TrendingUp, Facebook, Linkedin } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProofStrip } from "@/components/proof-strip"
import Image from "next/image"
import { useRef, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { BookingButton } from "@/components/booking-button"

// Add Typography import
import { Typography } from "@/components/typography-provider"
const { H1, H2, H3, P, PLarge } = Typography

// Custom icons for platforms that aren't in lucide-react
const TiktokLogo = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-zinc-400"
  >
    <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm10-9a3 3 0 0 0-3 3v10a7 7 0 1 1-7-7v4a3 3 0 1 0 3 3V3h7z"></path>
  </svg>
)

const PinterestLogo = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-zinc-400"
  >
    <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"></path>
    <path d="M12 2a10 10 0 0 0-3.16 19.5c0-.63-.13-1.58-.27-2.35l-1.33-4.93h2.8l1.33 4.93a10 10 0 0 0 3.16-19.5z"></path>
  </svg>
)

const GoogleLogo = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-zinc-400"
  >
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path>
    <path d="M12 8v8"></path>
    <path d="M8 12h8"></path>
  </svg>
)

export default function ServicesPage() {
  const router = useRouter()
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  // Initialize videos when component mounts
  useEffect(() => {
    // Set up videos
    Object.keys(videoRefs.current).forEach((key) => {
      const video = videoRefs.current[key]
      if (video) {
        video.muted = true
        video.loop = true
        video.playsInline = true
        video.autoplay = true
      }
    })
  }, [])

  const handleStartBuilding = () => {
    router.push("/build")
  }

  // Social media package options
  const socialPackages = [
    { name: "10 Posts", price: "$150/mo", link: "/build#social-posts" },
    { name: "15 Posts", price: "$215/mo", link: "/build#social-posts" },
    { name: "20 Posts", price: "$270/mo", link: "/build#social-posts" },
  ]

  // Video content package options
  const videoPackages = [
    { name: "2 Videos", price: "$100/mo", link: "/build#video" },
    { name: "4 Videos", price: "$200/mo", link: "/build#video" },
    { name: "6 Videos", price: "$300/mo", link: "/build#video" },
  ]

  // Email campaign package options
  const emailPackages = [
    { name: "2 Emails", price: "$150/mo", link: "/build#email-campaigns" },
    { name: "4 Emails", price: "$270/mo", link: "/build#email-campaigns" },
    { name: "6 Emails", price: "$360/mo", link: "/build#email-campaigns" },
  ]

  // Blog post package options
  const blogPackages = [
    { name: "2 Blogs", price: "$100/mo", link: "/build#blogs" },
    { name: "4 Blogs", price: "$180/mo", link: "/build#blogs" },
    { name: "6 Blogs", price: "$250/mo", link: "/build#blogs" },
  ]

  // Backlink package options
  const backlinkPackages = [
    { name: "DA 10-19", price: "$205/mo", link: "/build#backlink-building" },
    { name: "DA 20-29", price: "$270/mo", link: "/build#backlink-building" },
    { name: "DA 30-39", price: "$340/mo", link: "/build#backlink-building" },
  ]

  // Video showcase data
  const videoShowcase = [
    { src: "/videos/stories4.mp4", title: "Product Showcase" },
    { src: "/videos/stories2.mp4", title: "Brand Story" },
    { src: "/videos/stories5.mp4", title: "Tutorial" },
    { src: "/videos/stories1.mp4", title: "Promotion" },
  ]

  const handlePackageSelect = (service: string, tier: string, price: string) => {
    // Convert price string to number (remove $ and /mo)
    const priceNumber = parseInt(price.replace('$', '').replace('/mo', ''))
    
    // Save selection to sessionStorage
    const selection = {
      name: service,
      tier: tier,
      price: priceNumber
    }
    
    sessionStorage.setItem('preSelectedService', JSON.stringify(selection))
    
    // Navigate to build page with anchor
    router.push(`/build#${service.toLowerCase().replace(' ', '-')}`)
  }

  // TODO: This page uses direct h1, h2, h3 tags instead of the Typography components
  // Consider updating to use Typography components (H1, H2, H3, etc.) for consistency
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="relative">
        {/* Accent lighting effects */}
        <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-purple-700 blur-sm"></div>
        <div className="absolute top-40 right-0 w-1/3 h-80 bg-purple-900/20 blur-lg -z-10"></div>
        <div className="absolute top-80 left-0 w-1/4 h-60 bg-blue-900/20 blur-lg -z-10"></div>
      </div>

      <SiteHeader />

      {/* Hero Section - Adjusted to match the site */}
      <Section size="lg" className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl"></div>
        </div>

        <Container>
          <div className="text-center">
            <H1 className="mb-6 whitespace-nowrap">Marketing Made Modular</H1>
            <div className="h-1 w-40 bg-purple-600 mx-auto mb-8"></div>
            <PLarge className="mb-10 leading-relaxed max-w-3xl mx-auto">
              Our services are structured as monthly deliverables, not vague hourly retainers. Pick only what you
              need—then scale up or down as your goals evolve.
            </PLarge>
          </div>

          {/* Static Grid of Examples */}
          <div className="mt-12 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Example 1 */}
              <div className="aspect-square overflow-hidden rounded-lg relative">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-600/20 mix-blend-overlay z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                <div className="p-4 flex flex-col h-full justify-end relative z-20">
                  <h3 className="text-xl font-bold text-white mb-1">Custom Design</h3>
                  <p className="text-sm text-zinc-300">Social Media Campaign</p>
                </div>
                <div className="absolute inset-0 bg-zinc-900">
                  <Image
                    src="https://res.cloudinary.com/mazira/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1745202865/mazira_assets/images/email1_iopxf8.png"
                    alt="Custom design social post"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-60"
                  />
                </div>
              </div>

              {/* Example 2 (swapped with Example 3) */}
              <div className="aspect-square overflow-hidden rounded-lg relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 mix-blend-overlay z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                <div className="p-4 flex flex-col h-full justify-end relative z-20">
                  <h3 className="text-xl font-bold text-white mb-1">Everything You Need To Know</h3>
                  <p className="text-sm text-zinc-300">Educational Content</p>
                </div>
                <div className="absolute inset-0 bg-zinc-900">
                  <Image
                    src="https://res.cloudinary.com/mazira/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1745202865/mazira_assets/images/square4_t8zvfy.png"
                    alt="Smart IT Solutions"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-60"
                  />
                </div>
              </div>

              {/* Example 3 (swapped with Example 2) */}
              <div className="aspect-square overflow-hidden rounded-lg relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 mix-blend-overlay z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                <div className="p-4 flex flex-col h-full justify-end relative z-20">
                  <h3 className="text-xl font-bold text-white mb-1">Iconic</h3>
                  <p className="text-sm text-zinc-300">Brand Identity</p>
                </div>
                <div className="absolute inset-0 bg-zinc-900">
                  <Image
                    src="https://res.cloudinary.com/mazira/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1745202865/mazira_assets/images/square5_cvwsgn.png"
                    alt="Educational content design"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-60"
                  />
                </div>
              </div>

              {/* Example 4 */}
              <div className="aspect-square overflow-hidden rounded-lg relative">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 to-orange-600/20 mix-blend-overlay z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"></div>
                <div className="p-4 flex flex-col h-full justify-end relative z-20">
                  <h3 className="text-xl font-bold text-white mb-1">Dance Till You Drop!</h3>
                  <p className="text-sm text-zinc-300">Event Promotion</p>
                </div>
                <div className="absolute inset-0 bg-zinc-900">
                  <Image
                    src="https://res.cloudinary.com/mazira/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1745202865/mazira_assets/images/square6_fop0ur.png"
                    alt="Event promotion design"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-60"
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <ProofStrip />

      {/* Service Blocks */}
      <Section size="lg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Social Media Management */}
            <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black">
              {/* Sharp accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600"></div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800">
                    <Instagram className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <H3>Social Media Management</H3>
                  </div>
                </div>

                <p className="text-zinc-300 mb-4">
                  Omni-channel post bundles tailored to your brand voice. Includes carousels, stories, reels, and feed
                  posts—scheduled and ready to go.
                </p>

                <div className="mt-auto">
                  <span className="text-sm font-medium text-zinc-400">Best for:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">creators</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">ecommerce</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">personal brands</span>
                  </div>
                </div>

                {/* Package options in small square buttons */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {socialPackages.map((pkg) => (
                    <Button
                      key={pkg.name}
                      onClick={() => handlePackageSelect('Social Media Posts', pkg.name, pkg.price)}
                      variant="outline"
                      className="flex flex-col h-auto py-3 border-zinc-700 bg-zinc-800/50 hover:bg-pink-600/20 hover:border-pink-600"
                    >
                      <span className="text-sm font-medium">{pkg.name}</span>
                      <span className="text-xs text-zinc-400">{pkg.price}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Content */}
            <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black">
              {/* Sharp accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800">
                    <Video className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <H3>Video Content</H3>
                  </div>
                </div>

                <p className="text-zinc-300 mb-4">
                  Short-form content that actually gets watched. Includes planning, scripting, captions, and formatted
                  delivery for TikTok, Reels, or Shorts.
                </p>

                <div className="mt-auto">
                  <span className="text-sm font-medium text-zinc-400">Best for:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">coaches</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">UGC creators</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">ecommerce</span>
                  </div>
                </div>

                {/* Package options in small square buttons */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {videoPackages.map((pkg) => (
                    <Button
                      key={pkg.name}
                      onClick={() => handlePackageSelect('Short-Form Videos', pkg.name, pkg.price)}
                      variant="outline"
                      className="flex flex-col h-auto py-3 border-zinc-700 bg-zinc-800/50 hover:bg-purple-600/20 hover:border-purple-600"
                    >
                      <span className="text-sm font-medium">{pkg.name}</span>
                      <span className="text-xs text-zinc-400">{pkg.price}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Email Campaigns */}
            <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black">
              {/* Sharp accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-600 to-emerald-600"></div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800">
                    <Mail className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <H3>Email Campaigns</H3>
                  </div>
                </div>

                <p className="text-zinc-300 mb-4">
                  High-converting emails for launches, promos, or nurture flows. We handle the subject lines,
                  segmentation, and automation setup.
                </p>

                <div className="mt-auto">
                  <span className="text-sm font-medium text-zinc-400">Best for:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">product-based businesses</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">service providers</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">digital launches</span>
                  </div>
                </div>

                {/* Package options in small square buttons */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {emailPackages.map((pkg) => (
                    <Button
                      key={pkg.name}
                      onClick={() => handlePackageSelect('Email Campaigns', pkg.name, pkg.price)}
                      variant="outline"
                      className="flex flex-col h-auto py-3 border-zinc-700 bg-zinc-800/50 hover:bg-green-600/20 hover:border-green-600"
                    >
                      <span className="text-sm font-medium">{pkg.name}</span>
                      <span className="text-xs text-zinc-400">{pkg.price}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* SEO Blog Articles */}
            <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black">
              {/* Sharp accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-600 to-teal-600"></div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800">
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <H3>SEO Blog Articles</H3>
                  </div>
                </div>

                <p className="text-zinc-300 mb-4">
                  Keyword-rich long-form blog content that drives organic traffic. Includes internal links, formatting,
                  and CTA placement.
                </p>

                <div className="mt-auto">
                  <span className="text-sm font-medium text-zinc-400">Best for:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">niche websites</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">coaches</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">consultants</span>
                  </div>
                </div>

                {/* Package options in small square buttons */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {blogPackages.map((pkg) => (
                    <Button
                      key={pkg.name}
                      onClick={() => handlePackageSelect('SEO Blog Articles', pkg.name, pkg.price)}
                      variant="outline"
                      className="flex flex-col h-auto py-3 border-zinc-700 bg-zinc-800/50 hover:bg-cyan-600/20 hover:border-cyan-600"
                    >
                      <span className="text-sm font-medium">{pkg.name}</span>
                      <span className="text-xs text-zinc-400">{pkg.price}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Backlink Boosters */}
            <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black">
              {/* Sharp accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-orange-600"></div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800">
                    <LinkIcon className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <H3>Backlink Boosters</H3>
                  </div>
                </div>

                <p className="text-zinc-300 mb-4">
                  Authoritative link building without the spam. We offer manual, vetted backlinks (1 per month) that
                  help improve your domain trust and rankings.
                </p>

                <div className="mt-auto">
                  <span className="text-sm font-medium text-zinc-400">Best for:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">SEO-driven brands</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">bloggers</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">affiliate marketers</span>
                  </div>
                </div>

                {/* Package options in small square buttons */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {backlinkPackages.map((pkg) => (
                    <Button
                      key={pkg.name}
                      onClick={() => handlePackageSelect('Backlink Boosters', pkg.name, pkg.price)}
                      variant="outline"
                      className="flex flex-col h-auto py-3 border-zinc-700 bg-zinc-800/50 hover:bg-amber-600/20 hover:border-amber-600"
                    >
                      <span className="text-sm font-medium">{pkg.name}</span>
                      <span className="text-xs text-zinc-400">{pkg.price}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Growth Strategy - Additional Card */}
            <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-black">
              {/* Sharp accent line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-600 to-purple-600"></div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-800">
                    <TrendingUp className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <H3>Growth Strategy</H3>
                  </div>
                </div>

                <p className="text-zinc-300 mb-4">
                  Need a comprehensive plan? Our strategists can build a custom content roadmap aligned with your
                  business goals and target audience.
                </p>

                <div className="mt-auto">
                  <span className="text-sm font-medium text-zinc-400">Best for:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">scaling businesses</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">rebrands</span>
                    <span className="px-2 py-1 bg-zinc-800 rounded-full text-xs">market pivots</span>
                  </div>
                </div>

                <div className="mt-4">
                  <BookingButton buttonText="Request Consultation" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Platform Add-Ons */}
      <Section size="lg" className="bg-zinc-900/50">
        <Container>
          <div className="text-center mb-12">
            <H2 className="text-2xl font-bold mb-4">Platform Add-Ons</H2>
            <P className="text-zinc-300 max-w-2xl mx-auto">
              Every package includes one platform. Add more for $10-20/mo each.
            </P>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
            <div className="p-4 flex flex-col items-center justify-center text-center rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-pink-600/50 transition-all duration-300">
              <Instagram className="w-8 h-8 text-zinc-400 mb-2" />
              <span className="text-sm">Instagram</span>
            </div>
            <div className="p-4 flex flex-col items-center justify-center text-center rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-purple-600/50 transition-all duration-300">
              <TiktokLogo />
              <span className="text-sm mt-2">TikTok</span>
            </div>
            <div className="p-4 flex flex-col items-center justify-center text-center rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-cyan-600/50 transition-all duration-300">
              <PinterestLogo />
              <span className="text-sm mt-2">Pinterest</span>
            </div>
            <div className="p-4 flex flex-col items-center justify-center text-center rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-blue-600/50 transition-all duration-300">
              <Facebook className="w-8 h-8 text-zinc-400 mb-2" />
              <span className="text-sm">Facebook</span>
            </div>
            <div className="p-4 flex flex-col items-center justify-center text-center rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-purple-600/50 transition-all duration-300">
              <Linkedin className="w-8 h-8 text-zinc-400 mb-2" />
              <span className="text-sm">LinkedIn</span>
            </div>
            <div className="p-4 flex flex-col items-center justify-center text-center rounded-lg border border-zinc-800 bg-zinc-900/50 hover:border-amber-600/50 transition-all duration-300">
              <GoogleLogo />
              <span className="text-sm mt-2">Google</span>
            </div>
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
          <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
            {/* Removed gradient from horizontal line */}
            <div className="h-1 w-20 bg-purple-600 mx-auto mb-8"></div>
            <H2 className="text-3xl font-bold mb-4">Ready to Build a Custom Stack?</H2>
            <P className="text-zinc-300 mb-8">Pick your content, choose your platforms, and checkout in minutes.</P>
            <Button
              onClick={handleStartBuilding}
              className="glass-effect-dark glass-btn glass-btn-shimmer glass-rounded glass-purple border border-purple-600 text-white px-8 py-6 text-lg h-auto"
            >
              Start Building <span className="ml-2">→</span>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Static Video Carousel Section - Moved to bottom */}
      <Section size="lg" className="bg-zinc-900/30">
        <Container>
          <div className="text-center mb-12">
            <H2 className="text-2xl font-bold mb-4">Content That Converts</H2>
            <P className="text-zinc-300 max-w-2xl mx-auto">
              Our video content is designed to engage your audience and drive results across platforms.
            </P>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videoShowcase.map((video, index) => (
              <div key={index} className="relative aspect-[9/16] rounded-lg overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                <video
                  ref={(el) => (videoRefs.current[`video-${index}`] = el)}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="text-white font-bold">{video.title}</h3>
                  <p className="text-zinc-300 text-sm">Short-form content</p>
                </div>
                <div className="absolute inset-0 bg-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5"></div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <SiteFooter />
    </div>
  )
}
