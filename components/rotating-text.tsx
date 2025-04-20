"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Typography } from "@/components/typography-provider"

const { H2 } = Typography
const phrases = ["Your Budget.", "Your Business.", "Your Schedule."]

export function RotatingText() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-16 md:h-20 lg:h-24 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute w-full"
        >
          <H2 className="text-4xl md:text-5xl lg:text-6xl font-light text-pink-600">{phrases[currentIndex]}</H2>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
