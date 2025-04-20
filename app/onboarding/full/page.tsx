"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { GHLService } from "@/lib/services/ghl"
import { Stepper } from "@/components/stepper"
import {
  TextField,
  TextareaField,
  NumberField,
  DropdownField,
  CheckboxField,
  FileUploadField,
} from "@/components/form-fields"
import { ThankYouPopup } from "@/components/thank-you-popup"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProofStrip } from "@/components/proof-strip"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { GHLCalendarWidget } from "@/components/ghl-calendar-widget"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent } from "react"

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "mazira"
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "mazira_unsigned"

// Add form schema
const fullOnboardingSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email address"),
  company_name: z.string().min(1, "Company name is required"),
  website: z.string().optional(),
  industry: z.string().optional(),
  brand_keywords: z.string().optional(),
  brand_voice: z.string().optional(),
  color_palette: z.string().optional(),
  font_preference: z.string().optional(),
  core_offers: z.string().optional(),
  top_sellers: z.string().optional(),
  common_questions: z.string().optional(),
  target_audience: z.string().optional(),
  pain_points: z.string().optional(),
  audience_goals: z.string().optional(),
  reference_links: z.string().optional(),
  media_dislikes: z.string().optional(),
  influencer_inspiration: z.string().optional(),
  content_goals: z.array(z.string()).optional(),
  marketing_channels: z.array(z.string()).optional(),
  delivery_method: z.string().optional(),
  company_logo: z.any().optional(),
  numeric_field: z.number().optional(),
})

type FullOnboardingFormData = z.infer<typeof fullOnboardingSchema>

type FieldConfig = {
  type: 'text' | 'textarea' | 'number' | 'dropdown' | 'checkbox' | 'file';
  field: keyof FullOnboardingFormData;
  label: string;
  options?: string[];
  placeholder?: string;
};

export default function FullOnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [showThankYou, setShowThankYou] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [logoFile, setLogoFile] = useState<File | null>(null)

  const form = useForm<FullOnboardingFormData>({
    resolver: zodResolver(fullOnboardingSchema),
    defaultValues: {
      first_name: "",
      email: "",
      company_name: "",
      website: "",
      industry: "",
      brand_keywords: "",
      brand_voice: "",
      color_palette: "",
      font_preference: "",
      core_offers: "",
      top_sellers: "",
      common_questions: "",
      target_audience: "",
      pain_points: "",
      audience_goals: "",
      reference_links: "",
      media_dislikes: "",
      influencer_inspiration: "",
      content_goals: [],
      marketing_channels: [],
      delivery_method: "",
      company_logo: null,
      numeric_field: undefined,
    }
  })

  // Load saved form data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem("onboarding-full")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        form.reset(parsedData)
      } catch (e) {
        console.error("Error parsing saved form data", e)
      }
    }
  }, [])

  // Update the steps array to include better labels
  const steps: Array<{
    label: string;
    fields: FieldConfig[];
  }> = [
    {
      label: "Brand Basics",
      fields: [
        { type: "text", field: "first_name", label: "What's your first name?" },
        { type: "text", field: "email", label: "Best email to reach you?" },
        { type: "text", field: "company_name", label: "What's your business name?" },
        { 
          type: "text", 
          field: "website", 
          label: "What's your website? (optional)",
          placeholder: "example.com"
        },
        {
          type: "dropdown",
          field: "industry",
          label: "What industry are you in?",
          options: [
            "Content Creator",
            "Ecommerce - Fashion",
            "Ecommerce - Electronics",
            "Ecommerce - Home Goods",
            "Ecommerce - Other",
            "Life Coach",
            "Retail - Fashion",
            "Retail - Electronics",
            "Retail - Home Goods",
            "Retail - Other",
            "Sports Team/Coach",
            "Other",
          ],
        },
      ],
    },
    {
      label: "Brand Identity",
      fields: [
        { type: "textarea", field: "brand_keywords", label: "What words describe your brand?" },
        {
          type: "dropdown",
          field: "brand_voice",
          label: "How would you describe your brand's voice?",
          options: ["Professional", "Playful", "Bold", "Calm"],
        },
        { type: "textarea", field: "color_palette", label: "What are your brand colors?" },
        { type: "textarea", field: "font_preference", label: "Do you have specific fonts you use?" },
      ],
    },
    {
      label: "Products & Services",
      fields: [
        { type: "textarea", field: "core_offers", label: "What's your main product or service?" },
        { type: "textarea", field: "top_sellers", label: "What are your best-selling products or services?" },
        { type: "textarea", field: "common_questions", label: "What questions do customers frequently ask?" },
      ],
    },
    {
      label: "Target Audience",
      fields: [
        { type: "textarea", field: "target_audience", label: "Who's your target audience?" },
        { type: "textarea", field: "pain_points", label: "What pain points does your audience have?" },
        { type: "textarea", field: "audience_goals", label: "What does your audience want to achieve?" },
      ],
    },
    {
      label: "Visual Direction",
      fields: [
        { type: "textarea", field: "reference_links", label: "Do you have any visual inspiration or brand examples?" },
        { type: "textarea", field: "media_dislikes", label: "Any visual styles you want to avoid?" },
        { type: "textarea", field: "influencer_inspiration", label: "Any influencers or brands you admire?" },
      ],
    },
    {
      label: "Strategy & Delivery",
      fields: [
        {
          type: "checkbox",
          field: "content_goals",
          label: "What should your content accomplish?",
          options: ["Sales", "Awareness", "Education", "Trust"],
        },
        {
          type: "checkbox",
          field: "marketing_channels",
          label: "Where are you active or want content for?",
          options: ["Instagram", "TikTok", "Facebook", "LinkedIn", "YouTube", "Pinterest", "Google"],
        },
        {
          type: "dropdown",
          field: "delivery_method",
          label: "How should we deliver your content?",
          options: ["Google Drive", "Client Portal", "Auto-Post to Platforms"],
        },
        {
          type: "file",
          field: "company_logo",
          label: "Upload your logo (optional)",
        },
      ],
    },
  ]

  const handleFieldChange = (field: keyof FullOnboardingFormData, value: any) => {
    const updatedFormData = {
      ...form.getValues(),
      [field]: value === '' ? undefined : value,
    } as FullOnboardingFormData;

    form.reset(updatedFormData);
    localStorage.setItem("onboarding-full", JSON.stringify(updatedFormData));
  };

  // Add handleFileChange function
  const handleFileChange = (field: keyof FullOnboardingFormData, file: File | null) => {
    setLogoFile(file);

    const updatedFormData = {
      ...form.getValues(),
      [field]: file,
    } as FullOnboardingFormData;

    form.reset(updatedFormData);
    localStorage.setItem("onboarding-full", JSON.stringify(updatedFormData));
  };

  const handleNext = () => {
    // Validate current step fields before proceeding
    const currentFields = steps[currentStep].fields;
    const isValid = currentFields.every(field => {
      const value = form.getValues(field.field);
      return !form.getFieldState(field.field).error;
    });

    if (isValid) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      }
    } else {
      // Trigger validation on current fields
      currentFields.forEach(field => {
        form.trigger(field.field);
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async (data: FullOnboardingFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      // Handle logo upload first if exists
      let logoUrl = "";
      if (logoFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', logoFile);
        uploadFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: uploadFormData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error('Failed to upload logo');
        }

        const uploadResult = await uploadResponse.json();
        logoUrl = uploadResult.secure_url;
      }

      // Prepare webhook data
      const webhookData = {
        contact: {
          firstName: data.first_name,
          email: data.email,
          companyName: data.company_name,
          website: data.website,
          customFields: [
            { id: "industry", value: data.industry },
            { id: "brand_keywords", value: data.brand_keywords },
            { id: "brand_voice", value: data.brand_voice },
            { id: "color_palette", value: data.color_palette },
            { id: "font_preference", value: data.font_preference },
            { id: "core_offers", value: data.core_offers },
            { id: "top_sellers", value: data.top_sellers },
            { id: "common_questions", value: data.common_questions },
            { id: "target_audience", value: data.target_audience },
            { id: "pain_points", value: data.pain_points },
            { id: "audience_goals", value: data.audience_goals },
            { id: "reference_links", value: data.reference_links },
            { id: "media_dislikes", value: data.media_dislikes },
            { id: "influencer_inspiration", value: data.influencer_inspiration },
            { id: "content_goals", value: data.content_goals?.join(", ") },
            { id: "marketing_channels", value: data.marketing_channels?.join(", ") },
            { id: "delivery_method", value: data.delivery_method },
            { id: "logo_url", value: logoUrl },
          ].filter(field => field.value),
        }
      };

      // Submit to GHL webhook
      await GHLService.submitFormData(webhookData, 'full');
      
      // Clear localStorage
      localStorage.removeItem("onboarding-full");
      
      // Show thank you popup
      setShowThankYou(true);
      
      // Reset form
      form.reset();
      
      // Redirect after delay
      setTimeout(() => {
        setShowThankYou(false);
        router.push("/blog");
      }, 3000);

    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update the renderField function to include better labels and placeholders
  const renderField = (fieldConfig: FieldConfig) => {
    switch (fieldConfig.type) {
      case "text":
        return (
          <FormField
            key={fieldConfig.field}
            control={form.control}
            name={fieldConfig.field}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldConfig.label}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "textarea":
        return (
          <FormField
            key={fieldConfig.field}
            control={form.control}
            name={fieldConfig.field}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldConfig.label}</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "number":
        return (
          <FormField
            key={fieldConfig.field}
            control={form.control}
            name={fieldConfig.field}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldConfig.label}</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "dropdown":
        return (
          <FormField
            key={fieldConfig.field}
            control={form.control}
            name={fieldConfig.field}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldConfig.label}</FormLabel>
                <FormControl>
                  <select {...field} className="w-full p-2 bg-zinc-900 text-white border border-zinc-700 rounded-md">
                    <option value="">Select an option</option>
                    {fieldConfig.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "checkbox":
        return (
          <FormField
            key={fieldConfig.field}
            control={form.control}
            name={fieldConfig.field}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldConfig.label}</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    {fieldConfig.options?.map((option) => (
                      <label key={option} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.value?.includes(option)}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const values = field.value || [];
                            if (e.target.checked) {
                              field.onChange([...values, option]);
                            } else {
                              field.onChange(values.filter((v: string) => v !== option));
                            }
                          }}
                          className="form-checkbox"
                        />
                        <span className="text-white">{option}</span>
                      </label>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "file":
        return (
          <FormField
            key={fieldConfig.field}
            control={form.control}
            name={fieldConfig.field}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{fieldConfig.label}</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setLogoFile(file);
                        field.onChange(file);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <ThankYouPopup isOpen={showThankYou} />
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <Section size="lg" className="relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 right-10 w-72 h-72 bg-purple-900/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-900/20 rounded-full blur-3xl"></div>
          </div>

          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <Button
                type="button"
                variant="ghost"
                className="mb-6 text-zinc-400 hover:text-white"
                onClick={() => router.push("/onboarding")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to options
              </Button>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white whitespace-nowrap">
                Full Onboarding
              </h1>
              <div className="h-1 w-40 bg-purple-600 mx-auto mb-8"></div>
              <p className="text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed">
                Let's deeply customize your content strategy
              </p>
            </div>
          </Container>
        </Section>

        {/* Proof Strip */}
        <ProofStrip />

        {/* Form Section */}
        <Section size="md">
          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="border border-pink-600 p-8 rounded-lg">
              <Form {...form}>
<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <Stepper steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />

                  <div className="py-6">{steps[currentStep].fields.map((field) => renderField(field))}</div>

                  <div className="flex justify-between mt-10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="text-zinc-300 hover:text-white py-3 px-6 h-auto"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>

                {currentStep === steps.length - 1 ? (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-6 h-auto text-lg px-8"
                    variant="pink"
                  >
                    {isSubmitting ? "Submitting..." : "Submit & Let's Go"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="py-6 h-auto text-lg px-8"
                    variant="pink"
                  >
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
                </form>
              </Form>
            </div>

            {/* Need help section */}
            <div className="mt-10 text-center">
              <p className="text-zinc-400 mb-4">Need help with your onboarding? Our team is here to assist you.</p>
              <GHLCalendarWidget buttonText="Schedule a Call with Our Team" />
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </div>
  )
}
