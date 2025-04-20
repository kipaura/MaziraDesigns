"use client"

import { PolicyLayout } from "@/components/policy-layout"

const termsContent = `
Welcome to Mazira Designs! These Terms & Conditions ("Terms") govern your use of our website and any services, products, or materials we offer. By accessing or using our website or services, you agree to these Terms in full.

## Who We Are

Mazira Designs is a digital marketing and content services provider headquartered in Houston, Texas. Our goal is to deliver beautiful, high-performing content for creators, small businesses, and brands across platforms.

**Contact Information**
- General Inquiries: hello@mazira.design
- Privacy Requests: privacy@mazira.design
- Security Issues: security@mazira.design
- Mailing Address: 1321 Upland Dr, PMB 3904, Houston, TX 77043

## Use of Services

By using our services, you confirm that:
- You're at least 18 years old or have legal capacity to agree to these Terms
- Any information you provide is accurate and up to date
- You won't misuse our services (e.g., for spamming, unlawful content, or attempting to reverse-engineer our code)
- We reserve the right to deny or suspend service at our discretion

## Account Information & Security

If you create an account or submit information through our platform, you're responsible for:
- Keeping your login credentials confidential
- Notifying us immediately if you suspect unauthorized access

We take your data seriously and have security measures in place, but you agree that Mazira Designs is not liable for loss caused by someone accessing your account due to your negligence.

## Privacy & Data Use

We collect limited personal data to deliver and improve our services. This includes:
- Your name and email
- Social handles
- Payment information
- Brand preferences
- Any uploads (like logos)

We use this data solely to fulfill your services and do not sell your information. For details, refer to our Privacy Policy.

## Analytics, Ads, and AI

Our site uses:
- Industry-standard analytics (Google Analytics)
- Advertising platforms (Meta Pixel, TikTok Pixel)
- AI-driven tools and chatbots for assistance

## Payment Terms

All payments are in USD and processed securely via Stripe or similar providers. Subscriptions auto-renew monthly unless canceled. By subscribing, you agree to:
- Automatic billing until cancellation
- Non-refundable service terms as outlined in our Refund Policy
- Providing accurate billing information

## Cancellations & Refunds

- You can cancel anytime before your next billing cycle
- All service sales are final due to immediate work commencement
- We'll always work with you to make things right—reach out at hello@mazira.design

## License & Ownership

- Clients receive a non-exclusive, perpetual license for all final deliverables
- Mazira retains rights to reuse anonymized content for:
  - Internal promotions
  - Training
  - Advertisements
  - Portfolio use
- We may request permission for testimonials or named work usage

## Prohibited Use

You may not:
- Reproduce, resell, or relicense our templates or tools
- Use our content for illegal or unethical purposes
- Impersonate another person or brand while using our platform

## Intellectual Property

- All original content is owned by Mazira Designs
- Protected by U.S. and international copyright laws
- Written permission required for content distribution

## Limitation of Liability

- Not liable for indirect, incidental, or consequential damages
- Liability limited to amount paid for services in past 60 days
- No guarantee of performance results
- Commitment to strategic execution with care

## Dispute Resolution & Arbitration

We believe in resolving issues calmly and fairly:
- Both parties agree to binding arbitration
- Following American Arbitration Association (AAA) rules
- Located in Harris County, Texas
- Each party covers own legal costs

**Exceptions:**
- Small claims court filing permitted if qualified
- Injunctive relief for content/trademark misuse

## Changes to These Terms

- Terms may be updated periodically
- "Last Updated" date will reflect changes
- Continued use indicates acceptance

## Final Notes

We want to see you succeed—and build marketing you're proud of. If you ever have questions or concerns, just contact us directly.

Thanks for trusting Mazira Designs with your brand.
`

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      lastUpdated="March 2024"
      content={termsContent}
    />
  )
}
