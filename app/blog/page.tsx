"use client"

import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Typography } from "@/components/typography-provider"
import { Button } from "@/components/ui/button"
import { CardContainer } from "@/components/ui/card-container"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ProofStrip } from "@/components/proof-strip"

const { H1, H2, H3, P, PLarge } = Typography

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "10 Content Strategies That Actually Convert in 2025",
    excerpt: "Discover the proven content strategies that are driving real results for businesses this year.",
    category: "Content Strategy",
    date: "April 15, 2025",
    author: "Sarah Johnson",
    authorRole: "Content Director",
    image: "/placeholder.svg?height=600&width=800&text=Content+Strategies",
    slug: "content-strategies-that-convert",
  },
  {
    id: 2,
    title: "How to Build a Content Calendar That Works",
    excerpt:
      "Stop struggling with content planning. Learn how to create a sustainable content calendar for your business.",
    category: "Content Planning",
    date: "April 10, 2025",
    author: "Michael Chen",
    authorRole: "Strategy Lead",
    image: "/placeholder.svg?height=600&width=800&text=Content+Calendar",
    slug: "build-content-calendar",
  },
  {
    id: 3,
    title: "The Psychology Behind High-Converting Social Posts",
    excerpt: "Understanding the psychological triggers that make people engage with and share your social content.",
    category: "Social Media",
    date: "April 5, 2025",
    author: "Priya Patel",
    authorRole: "Social Media Strategist",
    image: "/placeholder.svg?height=600&width=800&text=Social+Psychology",
    slug: "psychology-high-converting-social",
  },
  {
    id: 4,
    title: "Email Marketing in 2025: What's Working Now",
    excerpt: "The latest trends, tactics, and tools for email marketing success in today's crowded inboxes.",
    category: "Email Marketing",
    date: "March 28, 2025",
    author: "James Wilson",
    authorRole: "Email Specialist",
    image: "/placeholder.svg?height=600&width=800&text=Email+Marketing",
    slug: "email-marketing-2025",
  },
  {
    id: 5,
    title: "Video Content: The Complete Guide for Small Businesses",
    excerpt: "Everything you need to know about creating effective video content without breaking the bank.",
    category: "Video Marketing",
    date: "March 20, 2025",
    author: "Elena Rodriguez",
    authorRole: "Video Production Lead",
    image: "/placeholder.svg?height=600&width=800&text=Video+Content",
    slug: "video-content-small-business",
  },
  {
    id: 6,
    title: "SEO for Content Creators: Beyond the Basics",
    excerpt:
      "Advanced SEO techniques specifically for content creators who want to rank higher and drive more traffic.",
    category: "SEO",
    date: "March 15, 2025",
    author: "David Kim",
    authorRole: "SEO Specialist",
    image: "/placeholder.svg?height=600&width=800&text=SEO+Content",
    slug: "seo-content-creators",
  },
]

// Categories for the filter
const categories = [
  "All",
  "Content Strategy",
  "Social Media",
  "Email Marketing",
  "Video Marketing",
  "SEO",
  "Content Planning",
]

export default function BlogPage() {
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

          <Container className="relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <H1 className="mb-6">Mazira Blog</H1>
              <div className="h-1 w-40 bg-purple-600 mx-auto mb-8"></div>
              <PLarge className="mb-10">
                Insights, strategies, and practical tips to help you create better content and grow your business.
              </PLarge>
            </div>
          </Container>
        </Section>

        <ProofStrip />

        {/* Category Filter */}
        <Section size="sm" className="bg-zinc-900/30">
          <Container>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "All" ? "purple" : "outline"}
                  className="glass-effect-dark glass-btn glass-rounded border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                >
                  {category}
                </Button>
              ))}
            </div>
          </Container>
        </Section>

        {/* Blog Posts Grid */}
        <Section size="lg">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.id}>
                  <CardContainer
                    variant="dark"
                    color={post.id % 2 === 0 ? "purple" : "pink"}
                    className="h-full transition-all duration-300 hover:translate-y-[-4px]"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800 text-zinc-300">
                          {post.category}
                        </span>
                        <span className="text-xs text-zinc-400">{post.date}</span>
                      </div>
                      <H3 className="mb-3 line-clamp-2">{post.title}</H3>
                      <P className="mb-4 text-sm line-clamp-3">{post.excerpt}</P>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                            {post.author.charAt(0)}
                          </div>
                          <div className="ml-2">
                            <p className="text-sm font-medium text-white">{post.author}</p>
                            <p className="text-xs text-zinc-400">{post.authorRole}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-400" />
                      </div>
                    </div>
                  </CardContainer>
                </Link>
              ))}
            </div>
          </Container>
        </Section>

        {/* Newsletter Section */}
        <Section size="lg" className="bg-zinc-900/30">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <H2 className="mb-4">Subscribe to Our Newsletter</H2>
              <P className="mb-6">
                Get the latest content strategies, tips, and insights delivered straight to your inbox.
              </P>

              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-3 bg-black border border-zinc-700 rounded-lg flex-grow text-white"
                />
                <Button className="glass-effect-dark glass-btn glass-btn-shimmer glass-rounded glass-purple border border-purple-600 text-white">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-zinc-500 mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
          </Container>
        </Section>

        {/* Featured Content */}
        <Section size="lg">
          <Container>
            <div className="text-center mb-12">
              <H2 className="mb-4">Featured Resources</H2>
              <P className="max-w-2xl mx-auto">
                Download our free guides and templates to level up your content strategy
              </P>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Content Calendar Template",
                  description: "Plan your content strategy with our easy-to-use template",
                  image: "/placeholder.svg?height=300&width=400&text=Calendar+Template",
                  color: "pink",
                },
                {
                  title: "Social Media Checklist",
                  description: "Ensure your social posts are optimized for maximum engagement",
                  image: "/placeholder.svg?height=300&width=400&text=Social+Checklist",
                  color: "purple",
                },
                {
                  title: "Email Marketing Guide",
                  description: "Learn how to create emails that convert and drive results",
                  image: "/placeholder.svg?height=300&width=400&text=Email+Guide",
                  color: "pink",
                },
              ].map((resource, index) => (
                <CardContainer
                  key={index}
                  variant="dark"
                  color={resource.color as "pink" | "purple"}
                  className="overflow-hidden"
                >
                  <div className="aspect-video relative">
                    <Image
                      src={resource.image || "/placeholder.svg"}
                      alt={resource.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <H3 className="mb-2">{resource.title}</H3>
                    <P className="mb-4">{resource.description}</P>
                    <Button variant="outline" className="w-full">
                      Download Free
                    </Button>
                  </div>
                </CardContainer>
              ))}
            </div>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </div>
  )
}
