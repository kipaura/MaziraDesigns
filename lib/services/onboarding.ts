import { toast } from 'sonner'
import { OnboardingSubmitOptions } from '../types/onboarding'

export class OnboardingService {
  private static async uploadLogo(file: File): Promise<string> {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
      formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error('Failed to upload logo')
      }

      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error('Error uploading logo:', error)
      throw error
    }
  }

  private static formatWebhookData(options: OnboardingSubmitOptions, logoUrl?: string) {
    const { formData, type } = options
    const customFields = []

    // Add logo URL if available
    if (logoUrl) {
      customFields.push({
        id: 'logo_url',
        value: logoUrl
      })
    }

    // Add form type
    customFields.push({
      id: 'onboarding_type',
      value: type
    })

    // Add all form fields as custom fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value && key !== 'logo') {
        customFields.push({
          id: key,
          value: value.toString()
        })
      }
    })

    return {
      contact: {
        firstName: formData.first_name,
        lastName: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.company_name,
        website: formData.website,
      },
      customFields
    }
  }

  static async submit(options: OnboardingSubmitOptions): Promise<void> {
    try {
      let logoUrl: string | undefined

      // Upload logo if provided
      if (options.logoFile) {
        try {
          logoUrl = await this.uploadLogo(options.logoFile)
        } catch (error) {
          toast.error('Failed to upload logo. Continuing with form submission.')
          console.error('Logo upload error:', error)
        }
      }

      // Format data for webhook
      const webhookData = this.formatWebhookData(options, logoUrl)

      // Submit to webhook
      const response = await fetch(options.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      // Clear form data from localStorage
      localStorage.removeItem('onboardingFormData')
      localStorage.removeItem('onboardingLogo')

      // Show success message
      toast.success('Form submitted successfully!')

      // Return successful response
      return
    } catch (error) {
      console.error('Form submission error:', error)
      throw error
    }
  }
} 