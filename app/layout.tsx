import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import { TypographyProvider } from "@/components/typography-provider"

export const metadata = {
  generator: 'v0.dev'
};

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} font-sans`}>
      <body className="min-h-screen bg-black text-zinc-100">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TypographyProvider>{children}</TypographyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
