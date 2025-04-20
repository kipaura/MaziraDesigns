"use client"

import { PolicyLayout } from "@/components/policy-layout"

const refundContent = `
## 1. First Delivery & 30-Day Satisfaction Guarantee

We guarantee satisfaction on your first delivery and within the first 30 days of service:
- We'll work with you to revise or adjust deliverables at no additional cost
- If a resolution cannot be reached, a full or partial refund may be considered
- All adjustments must be requested within the 30-day window

## 2. Unlimited Revisions Policy

All plans include unlimited revisions for the active service period:
- Revisions must align with original deliverable scope
- Eligible for platforms, types, and styles specified in original agreement
- Must be requested before next billing cycle
- Subject to reasonable turnaround times

## 3. Subscription Terms

Our subscription service terms:
- Monthly automatic renewal
- Cancellations apply to next billing cycle
- No refunds for partial months
- Changes take effect at next billing date

## 4. Non-Refundable Situations

The following are not eligible for refunds:
- Work already approved by the client
- Missed deadlines due to client inaction
- Lack of client communication
- Custom branding work
- Large-scope work outside standard revisions

## 5. Refund Requests

To request a refund:
- Submit in writing to hello@mazira.design
- Include project name
- Specify delivery date
- Provide detailed feedback
- Allow 3-5 business days for review

## 6. Chargebacks

Our chargeback policy:
- Contact us before initiating any chargeback
- Unauthorized chargebacks may result in:
  - Service cancellation
  - Legal dispute resolution
- We aim to resolve all issues directly

## 7. Licensing & Use of Deliverables

Client rights and permissions:
- Perpetual, royalty-free license for all final deliverables
- Unrestricted use for business and marketing purposes
- Mazira Designs retains right to use anonymized versions
- Portfolio and case study usage rights
- Optional participation in testimonials

## 8. Dispute Resolution & Arbitration

Resolution process:
- Initial informal resolution attempt
- Binding arbitration under AAA rules if unresolved
- Small claims court option in Harris County, Texas
- Individual claims only (no class actions)
- Commitment to fair resolution

## Contact Information

For questions or concerns:
Email: hello@mazira.design
Address: 1321 Upland Dr, PMB 3904, Houston, TX 77043
`

export default function RefundPage() {
  return (
    <PolicyLayout
      title="Satisfaction & Refund Policy"
      lastUpdated="April 17, 2025"
      content={refundContent}
    />
  )
} 