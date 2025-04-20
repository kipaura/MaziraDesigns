"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { GHLCalendarWidget } from "@/components/ghl-calendar-widget"

// Add Typography import
import { Typography } from "@/components/typography-provider"
const { H2, H3, P, PSmall, TextLink } = Typography

// Add import:
import { getPlatformIcon } from "@/components/platform-icons"
import { GHLService } from "@/lib/services/ghl"

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Using the exact data structure provided
      const webhookData = {
        contact: {
          email: email,
          customFields: [
            {
              id: "signup_source",
              value: "Footer Newsletter Form"
            }
          ]
        }
      }

      const success = await GHLService.submitFormData(webhookData, 'rapid')
      
      if (success) {
        // Show success message
        alert("Thanks for subscribing! You'll receive our newsletter updates soon.")
        
        // Clear form
        setEmail("")
        
        // Reload page after a short delay
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      alert('Subscription failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="border-t border-zinc-800 py-12 bg-black">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Column 1: Company Info */}
          <div className="md:col-span-3 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-8 h-8">
                <img src="/images/white_logo.svg" alt="Mazira Logo" className="w-full h-full" />
              </div>
              <h2 className="font-bold">
                <span className="text-pink-600">MAZIRA</span>
                <span className="text-white">DESIGNS</span>
              </h2>
            </Link>
            <p className="text-zinc-400">Strategic content built to fit</p>
            <div className="flex gap-0 mt-4">
              <a
                href="https://www.facebook.com/maziradesigns/"
                className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                {getPlatformIcon("facebook")}
              </a>
              <a
                href="https://www.instagram.com/mazira.designs/"
                className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                {getPlatformIcon("instagram")}
              </a>
              <a
                href="https://www.tiktok.com/@maziradesigns"
                className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800"
                aria-label="TikTok"
                target="_blank"
                rel="noopener noreferrer"
              >
                {getPlatformIcon("tiktok")}
              </a>
              <a
                href="https://www.pinterest.com/maziradesigns/"
                className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800"
                aria-label="Pinterest"
                target="_blank"
                rel="noopener noreferrer"
              >
                {getPlatformIcon("pinterest")}
              </a>
              <a
                href="https://www.youtube.com/@MaziraDesigns"
                className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
              >
                {getPlatformIcon("youtube")}
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="border-l-4 border-pink-600 pl-3">Services</h3>
            <ul className="space-y-0 text-zinc-400 border-l border-zinc-800">
              <li>
                <Link
                  href="/services#social-media-management"
                  className="block py-2 pl-4 hover:text-white hover:bg-zinc-900"
                >
                  Social Media Management
                </Link>
              </li>
              <li>
                <Link href="/services#video-content" className="block py-2 pl-4 hover:text-white hover:bg-zinc-900">
                  Video Content
                </Link>
              </li>
              <li>
                <Link href="/services#email-campaigns" className="block py-2 pl-4 hover:text-white hover:bg-zinc-900">
                  Email Campaigns
                </Link>
              </li>
              <li>
                <Link href="/services#seo-blog-posts" className="block py-2 pl-4 hover:text-white hover:bg-zinc-900">
                  SEO Blog Posts
                </Link>
              </li>
              <li>
                <Link href="/services#backlink-building" className="block py-2 pl-4 hover:text-white hover:bg-zinc-900">
                  Backlink Building
                </Link>
              </li>
              <li>
                <Link href="/build" className="block py-2 pl-4 hover:text-white hover:bg-zinc-900">
                  View All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="border-l-4 border-purple-600 pl-3">Company</h3>
            <ul className="space-y-0 text-zinc-400 border-l border-zinc-800">
              <li>
                <Link href="/about" className="block py-2 pl-4 hover:text-white hover:bg-zinc-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="block py-2 pl-4 hover:text-white hover:bg-zinc-900">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="block py-2 pl-4 hover:text-white hover:bg-zinc-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="block py-2 pl-4 hover:text-white hover:bg-zinc-900">
                  Blog
                </Link>
              </li>
              <li className="py-2 pl-4">
                <GHLCalendarWidget buttonText="Book a Call" />
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="md:col-span-4 space-y-4 bg-zinc-900 p-6">
            <h3 className="border-l-4 border-pink-600 pl-3">Newsletter</h3>
            <p className="text-zinc-400">
              Get monthly tips, templates, and content strategies straight to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="flex flex-col space-y-0">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="bg-black border-0 text-white h-12"
                />
                <Button 
                  type="submit" 
                  className="bg-pink-600 hover:bg-pink-700 text-white font-bold h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </Button>
              </div>
              
              <p className="text-zinc-500 text-xs">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Mazira Designs. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-zinc-500 text-sm">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/refund" className="hover:text-white transition-colors">
              Satisfaction & Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
