export interface OnboardingFormData {
  first_name: string
  email: string
  company_name: string
  website: string
  core_offers: string
  target_audience: string
  content_goals: string[]
  marketing_channels: string[]
  delivery_method: string
  reference_links: string
  team_notes: string
}

export interface FullOnboardingFormData extends OnboardingFormData {
  industry: string
  brand_keywords: string
  brand_voice: string
  color_palette: string
  font_preference: string
  top_sellers: string
  common_questions: string
  pain_points: string
  audience_goals: string
  media_dislikes: string
  influencer_inspiration: string
} 