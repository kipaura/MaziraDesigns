export interface BaseOnboardingFormData {
  first_name: string
  last_name: string
  email: string
  company_name: string
  website?: string
  phone?: string
  logo?: File | null
}

export interface RapidOnboardingFormData extends BaseOnboardingFormData {
  business_type: string
  target_audience: string
  brand_description: string
}

export interface FullOnboardingFormData extends BaseOnboardingFormData {
  business_type: string
  target_audience: string
  brand_description: string
  brand_values: string
  brand_voice: string
  brand_colors: string
  brand_inspiration: string
  competitors: string
  goals: string
  timeline: string
  budget: string
  additional_info?: string
}

export type OnboardingType = 'rapid' | 'full'

export interface OnboardingSubmitOptions {
  type: OnboardingType
  webhookUrl: string
  formData: RapidOnboardingFormData | FullOnboardingFormData
  logoFile?: File | null
} 