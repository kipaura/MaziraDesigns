import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand colors - standardized
        brand: {
          pink: {
            DEFAULT: "#db2777", // pink-600
            light: "#f9a8d4", // pink-300
            dark: "#9d174d", // pink-800
          },
          purple: {
            DEFAULT: "#9333ea", // purple-600
            light: "#d8b4fe", // purple-300
            dark: "#6b21a8", // purple-800
          },
          green: {
            DEFAULT: "#10b981", // green-600
            light: "#6ee7b7", // green-300
            dark: "#065f46", // green-800
          },
          cyan: {
            DEFAULT: "#0891b2", // cyan-600
            light: "#67e8f9", // cyan-300
            dark: "#155e75", // cyan-800
          },
          amber: {
            DEFAULT: "#d97706", // amber-600
            light: "#fcd34d", // amber-300
            dark: "#92400e", // amber-800
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        scrollProof: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scrollProof: "scrollProof 20s linear infinite",
      },
      width: {
        "27": "6.75rem", // For 9:16 ratio with h-48
        "45": "11.25rem", // For 9:16 ratio with h-80
        "72": "18rem", // For 9:16 ratio with h-128
      },
      height: {
        "128": "32rem", // Extra large size for videos
      },
      spacing: {
        section: "4rem", // 64px
        "section-sm": "2.5rem", // 40px
        "section-lg": "6rem", // 96px
        content: "1.5rem", // 24px
        "content-sm": "1rem", // 16px
        "content-lg": "2rem", // 32px
      },
      maxWidth: {
        container: "1280px", // max-w-screen-xl
        "container-sm": "1024px", // max-w-screen-lg
        "container-xs": "768px", // max-w-screen-md
        content: "65ch", // Good reading width
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
