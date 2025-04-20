"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote } from "lucide-react"
import { VSpacer } from "@/components/ui/spacing"

interface Testimonial {
  id: string
  industry: string
  quote: string
  author: string
  videoSrc: string
}

export function TestimonialVideoGrid() {
  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: "dtc1",
      industry: "DTC / E-Commerce",
      quote:
        "We went from 3 random posts a week to a branded content system. Engagement's up 40%, and we didn't lift a finger.",
      author: "DTC Brand",
      videoSrc: "/videos/ecommerce.mp4",
    },
    {
      id: "dtc2",
      industry: "DTC / E-Commerce",
      quote:
        "Mazira helped us launch a consistent email campaign that actually converts. Our abandoned cart recovery tripled in 2 months.",
      author: "E-Commerce Founder",
      videoSrc: "/videos/ecommerce.mp4",
    },
    {
      id: "coach1",
      industry: "Coaching / Consulting",
      quote: "I've booked 4 new clients just from the blog + email package. It sounds like me—but way more strategic.",
      author: "Business Coach",
      videoSrc: "/videos/consultant.mp4",
    },
    {
      id: "coach2",
      industry: "Coaching / Consulting",
      quote: "I stopped overthinking content. Mazira made it modular, repeatable, and totally hands-off.",
      author: "Consultant",
      videoSrc: "/videos/consultant.mp4",
    },
    {
      id: "beauty1",
      industry: "Beauty / Wellness",
      quote:
        "Their Reels and Stories made our brand feel 10x more polished. We're finally proud of how we show up online.",
      author: "Beauty Brand",
      videoSrc: "/videos/beauty.mp4",
    },
    {
      id: "beauty2",
      industry: "Beauty / Wellness",
      quote: "Customers literally DM us saying, 'your content is fire.' That never happened before Mazira.",
      author: "Wellness Studio",
      videoSrc: "/videos/beauty.mp4",
    },
    {
      id: "saas1",
      industry: "SaaS / Startup",
      quote:
        "Mazira became our async content team. We ship updates, case studies, and feature posts without touching Google Docs.",
      author: "SaaS Founder",
      videoSrc: "/videos/saas.mp4",
    },
    {
      id: "saas2",
      industry: "SaaS / Startup",
      quote:
        "We needed content fast that didn't feel cheap. Mazira delivered custom work that looked in-house—on a startup budget.",
      author: "Startup Operator",
      videoSrc: "/videos/saas.mp4",
    },
  ]

  // State and refs
  const [displayedTestimonials, setDisplayedTestimonials] = useState<Testimonial[]>([])
  const [activeCards, setActiveCards] = useState<{ [key: string]: boolean }>({})
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})
  const intervalRefs = useRef<{ [key: string]: NodeJS.Timeout | null }>({})
  const playingStateRef = useRef<{ [key: string]: boolean }>({})
  const playPromiseRef = useRef<{ [key: string]: Promise<void> | null }>({})

  // Initialize the grid with 8 random testimonials
  useEffect(() => {
    // Shuffle and pick 8 testimonials
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random())
    const selected = shuffled.slice(0, 8)
    setDisplayedTestimonials(selected)

    // Initialize with alternating pattern
    const initialStates: { [key: string]: boolean } = {}
    const initialPlayingStates: { [key: string]: boolean } = {}

    selected.forEach((testimonial, index) => {
      // Create a checkerboard pattern for 4x2 grid
      const isEvenRow = Math.floor(index / 4) % 2 === 0
      const isEvenCol = (index % 4) % 2 === 0
      const showVideo = isEvenRow ? isEvenCol : !isEvenCol

      initialStates[testimonial.id] = showVideo
      initialPlayingStates[testimonial.id] = showVideo
    })

    setActiveCards(initialStates)
    playingStateRef.current = initialPlayingStates

    // Cleanup function
    return () => {
      Object.values(intervalRefs.current).forEach((interval) => {
        if (interval) clearInterval(interval)
      })
    }
  }, [])

  // Set up individual intervals for each card
  useEffect(() => {
    if (displayedTestimonials.length === 0) return

    // Clear any existing intervals
    Object.values(intervalRefs.current).forEach((interval) => {
      if (interval) clearInterval(interval)
    })

    // Set up new intervals for each card
    displayedTestimonials.forEach((testimonial, index) => {
      // Different timing for each card (between 5-10 seconds)
      const intervalTime = 5000 + index * 500

      intervalRefs.current[testimonial.id] = setInterval(() => {
        // Only toggle if we're not in the middle of a play/pause operation
        if (playPromiseRef.current[testimonial.id]) return

        setActiveCards((prev) => {
          const newState = !prev[testimonial.id]
          // Update the playing state ref
          playingStateRef.current[testimonial.id] = newState
          return { ...prev, [testimonial.id]: newState }
        })
      }, intervalTime)
    })

    // Cleanup function
    return () => {
      Object.values(intervalRefs.current).forEach((interval) => {
        if (interval) clearInterval(interval)
      })
    }
  }, [displayedTestimonials])

  // Handle video playback when state changes
  useEffect(() => {
    if (Object.keys(activeCards).length === 0) return

    displayedTestimonials.forEach((testimonial) => {
      const video = videoRefs.current[testimonial.id]
      if (!video) return

      const isActive = activeCards[testimonial.id]
      const wasPlaying = playingStateRef.current[testimonial.id]

      // Only take action if the state has changed
      if (isActive !== wasPlaying) {
        if (isActive) {
          // Card is showing video and wasn't playing before
          video.currentTime = 0
          video.muted = true
          video.autoplay = true // Ensure autoplay is enabled

          // Store the play promise
          try {
            const playPromise = video.play()
            if (playPromise !== undefined) {
              playPromiseRef.current[testimonial.id] = playPromise

              playPromise
                .then(() => {
                  // Play succeeded, clear the promise ref
                  playPromiseRef.current[testimonial.id] = null
                  playingStateRef.current[testimonial.id] = true
                })
                .catch((error) => {
                  console.error("Video play error:", error)
                  // Play failed, clear the promise ref
                  playPromiseRef.current[testimonial.id] = null
                  playingStateRef.current[testimonial.id] = false

                  // Revert to text state if video can't play
                  setActiveCards((prev) => ({ ...prev, [testimonial.id]: false }))
                })
            }
          } catch (error) {
            console.error("Video play error:", error)
            playingStateRef.current[testimonial.id] = false
            setActiveCards((prev) => ({ ...prev, [testimonial.id]: false }))
          }
        } else if (playPromiseRef.current[testimonial.id] === null) {
          // Only pause if there's no pending play operation
          try {
            if (!video.paused) {
              video.pause()
            }
            playingStateRef.current[testimonial.id] = false
          } catch (error) {
            console.error("Video pause error:", error)
          }
        }
      }
    })
  }, [activeCards, displayedTestimonials])

  // Loading state
  if (displayedTestimonials.length === 0) {
    return (
      <div className="text-center py-10">
        <p>Loading testimonials...</p>
        <VSpacer size="md" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
      {displayedTestimonials.map((testimonial, index) => (
        <div key={testimonial.id} className="relative bg-black border border-zinc-800 overflow-hidden aspect-square">
          {/* Video Layer */}
          <AnimatePresence mode="wait">
            {activeCards[testimonial.id] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 z-10"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[testimonial.id] = el;
                  }}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  loop
                  autoPlay
                >
                  <source src={testimonial.videoSrc} type="video/mp4" />
                </video>

                {/* Industry title overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/60 px-6 py-3">
                    <h3 className="text-white font-bold text-lg">{testimonial.industry}</h3>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Text Layer */}
          <AnimatePresence mode="wait">
            {!activeCards[testimonial.id] && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 z-20 flex flex-col p-6"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white">{testimonial.industry}</h3>
                  <div className="h-1 w-16 bg-pink-600 mt-2"></div>
                </div>

                <div className="flex-grow flex flex-col justify-center">
                  <Quote className="text-pink-600 w-8 h-8 mb-2 opacity-50" />
                  <p className="text-white text-sm md:text-base mb-4 leading-relaxed">{testimonial.quote}</p>
                  <p className="text-pink-600 font-bold text-sm">— {testimonial.author}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
