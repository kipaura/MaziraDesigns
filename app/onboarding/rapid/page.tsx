"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { OnboardingService } from "@/lib/services/onboarding"
import { GHLService } from "@/lib/services/ghl"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ArrowLeft } from "lucide-react"
import { ThankYouPopup } from "@/components/thank-you-popup"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProofStrip } from "@/components/proof-strip"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { GHLCalendarWidget } from "@/components/ghl-calendar-widget"

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "mazira"
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "mazira_unsigned"

const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

const rapidOnboardingSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  email: z.string().email("Please enter a valid email address"),
  company_name: z.string().min(1, "Company name is required"),
  website: z.string().optional(),
  logo: z.instanceof(File).optional().nullable(),
})

type RapidOnboardingData = z.infer<typeof rapidOnboardingSchema>

const initialData: RapidOnboardingData = {
  first_name: "",
  email: "",
  company_name: "",
  website: "",
  logo: null,
}

type FormErrors = Partial<Record<keyof RapidOnboardingData | "submit", string>>

export default function RapidOnboardingPage() {
  const router = useRouter()
  const [showThankYou, setShowThankYou] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const form = useForm<RapidOnboardingData>({
    resolver: zodResolver(rapidOnboardingSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (data: RapidOnboardingData) => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);

      let logoUrl = "";
      if (data.logo) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', data.logo);
        uploadFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        
        try {
          const uploadResponse = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: 'POST',
              body: uploadFormData,
            }
          );

          if (!uploadResponse.ok) {
            const errorData = await uploadResponse.json();
            throw new Error(`Failed to upload logo: ${errorData.error?.message || uploadResponse.statusText}`);
          }

          const uploadResult = await uploadResponse.json();
          logoUrl = uploadResult.secure_url;
        } catch (uploadError) {
          console.error("Logo upload error:", uploadError);
          toast.error("Failed to upload logo. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }

      // Format data for GHL webhook
      const webhookData = {
        contact: {
          firstName: data.first_name,
          email: data.email,
          companyName: data.company_name,
          website: data.website,
          customFields: [
            { id: "logo_url", value: logoUrl }
          ].filter(field => field.value)
        }
      };

      const success = await GHLService.submitFormData(webhookData, 'rapid');
      
      if (success) {
        // Clear saved data
        localStorage.removeItem("onboarding-rapid");
        
        // Show success message and popup
        setShowThankYou(true);
        
        // Delay to allow popup to show, then redirect
        setTimeout(() => {
          setShowThankYou(false);
          router.push("/blog");
        }, 4000);
        
        // Reset form after popup is displayed
        form.reset();
        setLogoPreview("");
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      toast.error(error instanceof Error ? error.message : "Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue("logo", file)
      setLogoPreview(URL.createObjectURL(file))
    }
  }

  const handleReset = () => {
    form.reset()
    setErrors({})
    setLogoPreview("")
  }

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <SiteHeader />

      <main>
        <ThankYouPopup isOpen={showThankYou} />
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
                variant="ghost"
                className="mb-6 text-zinc-400 hover:text-white"
                onClick={() => router.push("/onboarding")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to options
              </Button>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white whitespace-nowrap">
                Rapid Onboarding
              </h1>
              <div className="h-1 w-40 bg-purple-600 mx-auto mb-8"></div>
              <p className="text-lg md:text-xl text-zinc-300 mb-10 leading-relaxed">
                Let's get your content strategy up and running quickly
              </p>
            </div>
          </Container>
        </Section>

        {/* Proof Strip */}
        <ProofStrip />

        {/* Form Section */}
        <Section size="md">
          <div className="w-full max-w-3xl mx-auto px-4">
            <div className="glass-effect-dark glass-rounded-lg glass-pink border border-pink-600 p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website (Optional)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="text"
                            placeholder="www.example.com"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Logo (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                        </FormControl>
                        <FormMessage />
                        {logoPreview && (
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="mt-2 h-20 w-20 object-contain bg-white/10 rounded-lg p-2"
                          />
                        )}
                      </FormItem>
                    )}
                  />

                  {errors.submit && (
                    <p className="text-sm text-red-400">{errors.submit}</p>
                  )}

                  <div className="flex space-x-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 h-auto text-lg"
                      variant="pink"
                    >
                      {isSubmitting ? "Submitting..." : "Submit & Let's Go"}
                    </Button>
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
