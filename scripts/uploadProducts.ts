// /scripts/uploadProducts.ts

import fs from "fs"
import path from "path"
import Stripe from "stripe"
import csv from "csv-parser"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2025-03-31.basil",
})

const CSV_PATH = path.resolve(__dirname, "app/scripts/mappedfields.csv")

interface Product {
  name: string;
  description: string;
  price: number;
  // Add other fields as needed
}

async function uploadProducts(csvFilePath: string): Promise<void> {
  const results: Product[] = []

  try {
    // Read and parse the CSV file
    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (data: Product) => results.push(data))
        .on("end", resolve)
        .on("error", reject)
    })

    // Process the products
    for (const product of results) {
      console.log(`Processing product: ${product.name}`)
      const name = product.name?.trim()
      const price = parseFloat(product.price)
      if (!name || isNaN(price)) {
        console.warn("Skipping row due to missing name or price:", product)
        continue
      }

      try {
        const stripeProduct = await stripe.products.create({
          name,
          description: product.description?.trim() || "",
          metadata: {
            category: product.category || "",
            package_type: product.package_type || "",
            feature1: product.feature1 || "",
            feature2: product.feature2 || "",
            feature3: product.feature3 || "",
            feature4: product.feature4 || "",
            feature5: product.feature5 || "",
            feature6: product.feature6 || "",
            unit: product.unit || "",
          },
        })

        await stripe.prices.create({
          product: stripeProduct.id,
          unit_amount: Math.round(price * 100), // convert to cents
          currency: "usd",
          recurring: {
            interval: product.interval || "month",
          },
          metadata: {
            original_price: product.price,
          },
        })

        console.log(`Created product: ${name}`)
      } catch (err: any) {
        console.error(`Failed to create product ${name}:`, err.message)
      }
    }

    console.log("Upload completed successfully")
  } catch (error) {
    console.error("Error uploading products:", error)
    throw error
  }
}

export default uploadProducts

// Allow running directly from command line
if (require.main === module) {
  const csvFilePath = process.argv[2]
  if (!csvFilePath) {
    console.error("Please provide a CSV file path")
    process.exit(1)
  }

  uploadProducts(csvFilePath)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
