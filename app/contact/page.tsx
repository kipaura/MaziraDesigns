"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Calendar, Send, HelpCircle } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProofStrip } from "@/components/proof-strip"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { CardContainer } from "@/components/ui/card-container"
import { GHLCalendarWidget } from "@/components/ghl-calendar-widget"
import { useRouter } from "next/navigation"

// Add Typography import
import { Typography } from "@/components/typography-provider"
const { H1, H2, H3, P, PLarge } = Typography

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: "",
  })

  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      website: "",
      message: "",
    })
    // Show success message
    alert("Thanks for reaching out! We'll get back to you soon.")
  }

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
              <H1 className="mb-6 whitespace-nowrap">Let's Start the Conversation</H1>
              <div className="h-1 w-40 bg-purple-600 mx-auto mb-8"></div>
              {/* Replace direct p with Typography component */}
              <PLarge className="mb-10 leading-relaxed">
                Whether you're ready to build your stack or just want help choosing the right plan, we're here and happy
                to talk it through.
              </PLarge>
            </div>
          </Container>
        </Section>

        {/* Proof Strip */}
        <ProofStrip />

        {/* Contact Options Section */}
        <Section size="md" className="relative">
          {/* Visual background element */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920&text=Contact+Background')] bg-cover bg-center opacity-10 mix-blend-luminosity"></div>

          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Book a Call */}
              <CardContainer
                variant="dark"
                color="purple"
                className="p-8 transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/20"
              >
                <div className="border-t md:border-t-0 md:border-l border-zinc-800 pt-8 md:pt-0 md:pl-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      {/* Replace direct h3 with Typography component */}
                      <H3 className="mb-1">Schedule a Call</H3>
                      <p className="text-zinc-400">Book a time that works for you</p>
                    </div>
                  </div>

                  <p className="text-zinc-300 mb-6">
                    Questions? Need help picking the right plan? Want to brainstorm your first campaign? We're here and
                    happy to help.
                  </p>

                  <div className="text-center">
                    <GHLCalendarWidget
                      buttonText="Book Your Free 15-Minute Call"
                      calendarUrl="https://api.leadconnectorhq.com/widget/booking/66yNvknvcOgCKkyqZszb"
                      className="w-full py-3"
                    />
                    <p className="mt-4 text-sm text-zinc-400">
                      Our team will reach out to confirm your appointment and answer any initial questions.
                    </p>
                  </div>
                </div>
              </CardContainer>

              {/* Right Column - Contact Form */}
              <CardContainer variant="dark" color="pink" className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-pink-900/30 flex items-center justify-center">
                    <Send className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Send Us a Message</h3>
                    <p className="text-zinc-400">We'll get back to you within 24 hours</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white mb-1 block">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-zinc-900 border-zinc-700 text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white mb-1 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-zinc-900 border-zinc-700 text-white"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="website" className="text-white mb-1 block">
                      Business Website
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="bg-zinc-900 border-zinc-700 text-white"
                      placeholder="https://"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white mb-1 block">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-zinc-900 border-zinc-700 text-white min-h-[120px]"
                      required
                    />
                  </div>

                  {/* Standardize button variant */}
                  <Button type="submit" variant="pink" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContainer>
            </div>

            {/* FAQ Link */}
            <div className="mt-16 text-center">
              <CardContainer
                variant="dark"
                color="purple"
                className="p-6 max-w-2xl mx-auto transition-all duration-300 hover:border-purple-500/50"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  <HelpCircle className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold">Not sure what you need?</h3>
                </div>
                <p className="text-zinc-400 mb-4">
                  Browse our frequently asked questions to learn more about our services and process.
                </p>
                <Button
                  variant="outline"
                  className="glass-effect-dark glass-btn glass-rounded border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                  onClick={() => router.push("/faq")}
                >
                  Check the FAQ
                </Button>
              </CardContainer>
            </div>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </div>
  )
}
