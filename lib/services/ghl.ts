import { toast } from "sonner"

interface GHLWebhookData {
  contact: {
    firstName?: string
    lastName?: string
    email: string
    phone?: string
    companyName?: string
    website?: string
    [key: string]: any
  }
  customFields?: Array<{
    id: string
    value: string | number | boolean
  }>
  source?: string
  workflow_type?: string
}

interface GHLAPIData {
  firstName?: string
  lastName?: string
  email: string
  phone?: string
  companyName?: string
  website?: string
  tags?: string[]
  source?: string
  customFields?: Record<string, string | number | boolean>
}

interface WebhookResponse {
  success: boolean;
  message?: string;
}

export class GHLService {
  private static readonly API_URL = "https://rest.gohighlevel.com/v1/contacts/"
  private static readonly API_KEY = process.env.GHL_API_KEY
  private static readonly RAPID_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/k0kSpAXAHqFOlef030ZV/webhook-trigger/VsToUzxUlNEhuhFlt4vW"
  private static readonly FULL_WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/k0kSpAXAHqFOlef030ZV/webhook-trigger/iXnzTITay8UD167PFUSj"

  /**
   * Submit data to GHL webhook
   */
  static async submitToWebhook(data: any, isFull: boolean): Promise<WebhookResponse> {
    const webhookUrl = isFull ? this.FULL_WEBHOOK_URL : this.RAPID_WEBHOOK_URL;
    
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Webhook submission failed: ${response.statusText}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Webhook submission error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Submit data to GHL API
   */
  static async submitToAPI(data: GHLAPIData) {
    if (!this.API_KEY) {
      throw new Error("GHL API key is not configured")
    }

    try {
      const response = await fetch(this.API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.API_KEY}`,
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`API submission failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      return this.handleErrors(error)
    }
  }

  /**
   * Format data for webhook submission
   */
  static formatWebhookData(data: any, mode: 'rapid' | 'full'): any {
    const baseData = {
      timestamp: new Date().toISOString(),
      ...data,
    };

    if (mode === 'rapid') {
      return {
        ...baseData,
        submissionType: 'rapid',
      };
    }

    return {
      ...baseData,
      submissionType: 'full',
      // Add any full-specific data formatting here
    };
  }

  /**
   * Format data for API submission
   */
  static formatAPIData(data: Record<string, any>, type: "rapid" | "full"): GHLAPIData {
    return {
      firstName: data.first_name,
      lastName: data.last_name,
      email: data.email,
      phone: data.phone,
      companyName: data.company_name,
      website: data.website,
      tags: [type === "rapid" ? "Rapid Onboarding" : "Full Onboarding"],
      source: "Website Onboarding",
      customFields: Object.entries(data)
        .filter(([key, value]) => !["first_name", "last_name", "email", "phone", "company_name", "website"].includes(key))
        .reduce((acc, [key, value]) => ({
          ...acc,
          [key]: Array.isArray(value) ? value.join(", ") : value,
        }), {}),
    }
  }

  /**
   * Handle errors from API and webhook submissions
   */
  static handleErrors(error: any) {
    console.error("GHL submission error:", error)

    // Return a standardized error object
    return {
      success: false,
      error: error?.message || error?.toString() || "An error occurred while submitting the form",
      details: error?.response?.data || error,
    }
  }

  public static async submitFormData(data: any, mode: 'rapid' | 'full'): Promise<boolean> {
    const formattedData = this.formatWebhookData(data, mode);
    const result = await this.submitToWebhook(formattedData, mode === 'full');

    if (result.success) {
      toast.success('Form submitted successfully!');
      return true;
    } else {
      toast.error(result.message || 'Failed to submit form. Please try again.');
      return false;
    }
  }
} 