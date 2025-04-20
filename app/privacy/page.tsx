"use client"

import { PolicyLayout } from "@/components/policy-layout"

const privacyContent = `
## Introduction

Mazira Designs ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you interact with our website, services, and platforms. By using our services, you agree to the terms of this policy.

## 1. Information We Collect

We collect the following types of information:

### Personal Information
- Name, email address, phone number
- Company name and website URL
- Other identifiers you voluntarily submit

### Payment Information
- Processed securely via Stripe
- We do not store your credit card details

### Content Preferences
- Through onboarding forms
- Revision requests and feedback
- Service customization choices

### Technical Information
- Browser type and IP address
- Device data and cookies
- Analytics tracking via:
  - Google Analytics
  - Meta
  - TikTok
  - LinkedIn

## 2. How We Use Your Information

We use the information to:
- Deliver and improve our services
- Manage your account and preferences
- Process payments securely via Stripe
- Communicate updates, offers, or service information
- Request testimonials or feedback (optional and non-mandatory)

## 3. Data Sharing & Third Parties

We may share data with:
- Payment processors (e.g., Stripe)
- Analytics providers (e.g., Google Analytics, Meta Pixel)
- CRM and marketing platforms (e.g., GoHighLevel)

**Important**: We do not sell or rent your information.

## 4. Security

We implement industry-standard security measures:
- Encryption protocols
- Authentication measures
- Regular security audits

For security concerns, contact: security@mazira.design

## 5. AI & Chatbot Disclosure

We use chatbots powered by AI to assist users on our website:
- Collect information voluntarily provided
- Help route or resolve queries
- Improve user experience

## 6. Cookies

Our cookie usage includes:
- Tracking user behavior
- Retargeting ads
- Analytics purposes

You may adjust cookie settings via your browser preferences.

## 7. Your Rights

You may request to:
- Access or correct your information
- Delete your account
- Opt-out of email marketing

To exercise these rights, email: privacy@mazira.design

## 8. Contact Information

Mazira Designs
1321 Upland Dr, PMB 3904
Houston, TX 77043

Email Contacts:
- General: hello@mazira.design
- Privacy: privacy@mazira.design
- Security: security@mazira.design
`

export default function PrivacyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      lastUpdated="April 17, 2025"
      content={privacyContent}
    />
  )
}
