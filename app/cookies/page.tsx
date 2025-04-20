"use client"

import { PolicyLayout } from "@/components/policy-layout"

const cookiesContent = `
# Cookie Policy

## What Are Cookies

Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide useful information to the website owners.

## How We Use Cookies

We use cookies for the following purposes:

### Essential Cookies
- Enable core functionality
- Maintain your session
- Remember your preferences
- Keep you logged in

### Analytics Cookies
- Track website usage
- Monitor performance
- Improve user experience
- Understand visitor behavior

### Marketing Cookies
- Deliver relevant advertisements
- Measure ad effectiveness
- Personalize content
- Track campaign performance

## Types of Cookies We Use

### Session Cookies
- Temporary cookies that expire when you close your browser
- Used to maintain your session while using our website

### Persistent Cookies
- Remain on your device for a set period
- Remember your preferences and settings

### Third-Party Cookies
- Set by our trusted partners
- Used for analytics and advertising
- Subject to their respective privacy policies

## Managing Cookies

You can control and/or delete cookies as you wish. You can:
- Delete all cookies that are already on your device
- Set your browser to prevent cookies from being placed
- Configure your browser to notify you when cookies are being set

## Impact of Disabling Cookies

If you disable cookies:
- Some website features may not function properly
- Your preferences won't be remembered
- You may need to re-enter information
- Some services may be unavailable

## Updates to This Policy

We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new policy on this page.

## Contact Us

If you have any questions about our use of cookies, please contact us at:
Email: hello@mazira.design
Address: 1321 Upland Dr, PMB 3904, Houston, TX 77043
`

export default function CookiesPage() {
  return (
    <PolicyLayout
      title="Cookie Policy"
      lastUpdated="March 2024"
      content={cookiesContent}
    />
  )
}
