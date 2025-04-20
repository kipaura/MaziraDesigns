import { NextResponse } from "next/server"

// GHL API configuration
const GHL_API_KEY = process.env.GHL_API_KEY
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID
const GHL_API_URL = "https://rest.gohighlevel.com/v1/contacts/"

// Helper function to map form fields to GHL fields
async function mapFormToGHLFields(formData: FormData) {
  // Extract basic contact info
  const firstName = (formData.get("first_name") as string) || ""
  const email = (formData.get("email") as string) || ""
  const companyName = (formData.get("company_name") as string) || ""
  const website = (formData.get("website") as string) || ""

  // Map content goals to tags
  const contentGoals = formData.get("content_goals")
  const tags = []

  if (contentGoals) {
    try {
      const goalsArray = JSON.parse(contentGoals as string)
      if (goalsArray.includes("Sales")) tags.push("goal_sales")
      if (goalsArray.includes("Awareness")) tags.push("goal_awareness")
      if (goalsArray.includes("Education")) tags.push("goal_education")
      if (goalsArray.includes("Trust")) tags.push("goal_trust")
    } catch (e) {
      console.error("Error parsing content goals:", e)
    }
  }

  // Add workflow tag
  const workflow = formData.get("workflow") as string
  if (workflow) {
    tags.push(workflow)
  }

  // Map marketing channels to custom fields
  const customFields = []
  const marketingChannels = formData.get("marketing_channels")

  if (marketingChannels) {
    try {
      const channelsArray = JSON.parse(marketingChannels as string)
      channelsArray.forEach((channel: string) => {
        customFields.push({
          name: `channel_${channel.toLowerCase().replace(/\s+/g, "")}`,
          value: "true",
        })
      })
    } catch (e) {
      console.error("Error parsing marketing channels:", e)
    }
  }

  // Add delivery method
  const deliveryMethod = formData.get("delivery_method") as string
  if (deliveryMethod) {
    customFields.push({
      name: "delivery_method",
      value: deliveryMethod,
    })
  }

  // Add all other form fields as custom fields
  for (const [key, value] of formData.entries()) {
    // Skip fields we've already processed and files
    if (
      key !== "first_name" &&
      key !== "email" &&
      key !== "company_name" &&
      key !== "website" &&
      key !== "content_goals" &&
      key !== "marketing_channels" &&
      key !== "workflow" &&
      key !== "company_logo" &&
      typeof value === "string"
    ) {
      customFields.push({
        name: key,
        value: value,
      })
    }
  }

  // Handle file upload if present
  const logoFile = formData.get("company_logo") as File
  let logoUrl = ""

  if (logoFile && logoFile.size > 0) {
    try {
      // Here you would typically upload the file to a storage service
      // and get back a URL. For this example, we'll just note that a file was uploaded.
      logoUrl = "file_uploaded" // Placeholder

      // Add the logo URL as a custom field
      customFields.push({
        name: "company_logo_url",
        value: logoUrl,
      })
    } catch (e) {
      console.error("Error uploading logo:", e)
    }
  }

  // Build the GHL contact object
  return {
    locationId: GHL_LOCATION_ID,
    firstName: firstName,
    email: email,
    companyName: companyName,
    website: website,
    tags: tags,
    customFields: customFields,
    source: "website_onboarding",
  }
}

export async function POST(request: Request) {
  try {
    // Check if API key is configured
    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      return NextResponse.json({ error: "GHL API not configured" }, { status: 500 })
    }

    // Check if the request is multipart/form-data
    const contentType = request.headers.get("content-type") || ""

    let ghlData

    if (contentType.includes("multipart/form-data")) {
      // Handle form data with file upload
      const formData = await request.formData()
      ghlData = await mapFormToGHLFields(formData)
    } else {
      // Handle JSON data
      const jsonData = await request.json()

      // Convert JSON to FormData for consistent processing
      const formData = new FormData()
      Object.entries(jsonData).forEach(([key, value]) => {
        if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, String(value))
        }
      })

      ghlData = await mapFormToGHLFields(formData)
    }

    // Submit to GHL API
    const response = await fetch(GHL_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GHL_API_KEY}`,
      },
      body: JSON.stringify(ghlData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error("GHL API error:", errorData)
      return NextResponse.json({ error: "Failed to submit to GHL API" }, { status: response.status })
    }

    const responseData = await response.json()

    return NextResponse.json({
      success: true,
      contactId: responseData.id,
    })
  } catch (error) {
    console.error("Error in GHL submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
