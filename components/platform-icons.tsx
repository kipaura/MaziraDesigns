// Standardize all platform icons to use Lucide React where possible
// and maintain consistent sizing and styling

"use client"

import { Instagram, Facebook, Linkedin, Youtube, Globe } from "lucide-react"

// TikTok icon - standardized size and stroke width
export function TiktokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm10-9a3 3 0 0 0-3 3v10a7 7 0 1 1-7-7v4a3 3 0 1 0 3 3V3h7z"></path>
    </svg>
  )
}

// Pinterest icon - standardized size and stroke width
export function PinterestIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0z"></path>
      <path d="M12 2a10 10 0 0 0-3.16 19.5c0-.63-.13-1.58-.27-2.35l-1.33-4.93h2.8l1.33 4.93a10 10 0 0 0 3.16-19.5z"></path>
    </svg>
  )
}

// Google icon - standardized size and stroke width
export function GoogleIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"></path>
      <path d="M12 8v8"></path>
      <path d="M8 12h8"></path>
    </svg>
  )
}

// Function to get platform icon by name - standardized with consistent sizing
export function getPlatformIcon(iconName: string, className = "w-5 h-5") {
  switch (iconName.toLowerCase()) {
    case "instagram":
      return <Instagram className={className} />
    case "tiktok":
      return <TiktokIcon className={className} />
    case "facebook":
      return <Facebook className={className} />
    case "linkedin":
      return <Linkedin className={className} />
    case "youtube":
      return <Youtube className={className} />
    case "pinterest":
      return <PinterestIcon className={className} />
    case "google":
      return <GoogleIcon className={className} />
    case "web":
    case "website":
      return <Globe className={className} />
    default:
      return <Globe className={className} />
  }
}
