//File: priceIdLookup.ts
// This mapping is used to look up the price ID based on the product name when creating a checkout session.
// The price IDs are specific to the Stripe account and should be kept secure.
// The mapping is structured as a record where the keys are product names and the values are their corresponding price IDs.

/**
 * A lookup table mapping product descriptions to their corresponding Stripe price IDs.
 * 
 * This object is organized into several categories, each representing a type of service or product.
 * Each key is a human-readable description of the product, and the value is the associated Stripe price ID.
 * 
 * ### Categories:
 * 
 * - **Social Media Posts**: Pricing for various quantities of social media posts.
 * - **Video: Short Form**: Pricing for short-form video packages.
 * - **Video: Long Form**: Pricing for long-form video packages.
 * - **Blog Posts**: Pricing for blog post packages.
 * - **Email Campaigns**: Pricing for email campaign packages.
 * - **Backlinks**: Pricing for backlinks based on domain authority (DA) ranges.
 * - **Stories**: Pricing for daily story packs, typically for Instagram.
 * - **Carousels**: Pricing for Instagram carousel series with varying numbers of posts.
 * - **Social Add-Ons**: Additional social media platforms that can be added to social media post packages.
 * - **Platform Add-Ons (Short Form Video)**: Additional platforms for short-form video packages, with free and paid options.
 * - **Platform Add-Ons (Long Form Video)**: Additional platforms for long-form video packages, with free and paid options.
 * 
 * This lookup table is used to retrieve the Stripe price ID for a given product description, enabling integration
 * with Stripe's API for payment processing.
 */
export const priceIdLookup: Record<string, string> = {
   
    // ==== SOCIAL MEDIA POSTS ====
    "10 Social Posts": "price_1RBAj8Aog87WCP1EZThpEO52",
    "15 Social Posts": "price_1RBAj7Aog87WCP1E2PC6WHtr",
    "20 Social Posts": "price_1RBAj7Aog87WCP1E7y33eaWz",
    "25 Social Posts": "price_1RBAj6Aog87WCP1EvEw6xkpm",
    "30 Social Posts": "price_1RBAj6Aog87WCP1EpE1erkQ4",
    "35 Social Posts": "price_1RBAj5Aog87WCP1EizNs8TI6",
    "40 Social Posts": "price_1RBM67Aog87WCP1E5gBuXNUt",
  
    // ==== VIDEO: SHORT FORM ====
    "2 Short Form Videos": "price_1RBAjRAog87WCP1E13c1426w",
    "4 Short Form Videos": "price_1RDxvkAog87WCP1ETmfheZd3",
    "6 Short Form Videos": "price_1RDxvlAog87WCP1EU9489Y9w",
    "8 Short Form Videos": "price_1RDxvlAog87WCP1EBN8NvOM4",
    "10 Short Form Videos": "price_1RBAjJAog87WCP1EBPb7Q1fK",
  
    // ==== VIDEO: LONG FORM ====
    "2 Long Form Videos": "price_1RBAjMAog87WCP1EDwjmAV7S",
    "4 Long Form Videos": "price_1RBAjLAog87WCP1EjRU8iv4V",
    "6 Long Form Videos": "price_1RBAjLAog87WCP1EikvU2Kmg",
    "8 Long Form Videos": "price_1RBAjKAog87WCP1E9AkTiWWT",
    "10 Long Form Videos": "price_1RBAjKAog87WCP1EhPihu488",
  
    // ==== BLOG POSTS ====
    "2 Blog Posts": "price_1RBAjAAog87WCP1E4X4rFuVN",
    "4 Blog Posts": "price_1RBAjAAog87WCP1E99Yn83Iv",
    "6 Blog Posts": "price_1RBAj9Aog87WCP1EGqXoewWr",
    "8 Blog Posts": "price_1RBAj9Aog87WCP1E0C0K1djl",
    "10 Blog Posts": "price_1RBAj8Aog87WCP1EL9tQ9bCq",
  
    // ==== EMAIL CAMPAIGNS ====
    "2 Email Campaigns": "price_1RBAjDAog87WCP1EqmK7Nzke",
    "4 Email Campaigns": "price_1RBAjDAog87WCP1ElEDuhr1q",
    "6 Email Campaigns": "price_1RBAjCAog87WCP1EjmRjEAsh",
    "8 Email Campaigns": "price_1RBAjCAog87WCP1EjeEf53KG",
    "10 Email Campaigns": "price_1RBAjBAog87WCP1EqniPdwGp",
  
    // ==== BACKLINKS ====
    "DA 10–19": "price_1RBAixAog87WCP1EZWRhzr8r",
    "DA 20–29": "price_1RBAiwAog87WCP1EdArsgHHT",
    "DA 30–39": "price_1RBAiwAog87WCP1EeiBVdGk7",
    "DA 40–49": "price_1RBAivAog87WCP1EHQ6zLZeF",
    "DA 50+": "price_1RBAivAog87WCP1E4An2O38P",
    "DA 60+": "price_1RBAiuAog87WCP1Eeg2SaXIv",
  
    // ==== STORIES ====
        // lives under Instagram Add-Ons
    "10 Daily Stories Pack": "price_1RBAj1Aog87WCP1ETnoTxTrh",
    "20 Daily Stories Pack": "price_1RBAj1Aog87WCP1Eh81mlhPh",
    "30 Daily Stories Pack": "price_1RBAj0Aog87WCP1EognDrhd7",
  
    // ==== CAROUSELS ====
        // lives under Instagram Add-Ons
    "5-Post Instagram Carousel Series": "price_1RBAj0Aog87WCP1EDlWEQcgP",
    "10-Post Instagram Carousel Series": "price_1RBAizAog87WCP1EVMHvLFO9",
    "15-Post Instagram Carousel Series": "price_1RBAizAog87WCP1ED9YwvVqB",
    "20-Post Instagram Carousel Series": "price_1RBAiyAog87WCP1E7agZT0Df",
    "25-Post Instagram Carousel Series": "price_1RBAiyAog87WCP1Et19MB5dE",
    "30-Post Instagram Carousel Series": "price_1RBAixAog87WCP1Ep1g3szRD",
  
    // ==== SocialADD-ONS ====
        // always offered as one free with social posts selection, and unlimited additional within this category
    "Add Instagram (Social)": "price_1RDxvgAog87WCP1E6dbFV1sI",
    "Add TikTok (Social)": "price_1RDxvhAog87WCP1Eyjv85Jz5",
    "Add Facebook (Social)": "price_1RDxvhAog87WCP1En85Lt8PQ",
    "Add LinkedIn (Social)": "price_1RDxvgAog87WCP1EF0SHrPBR",
    "Add Pinterest (Social)": "price_1RDxviAog87WCP1EQq6PItNw",
    "Add Google (Social)": "price_1RDxvfAog87WCP1Eus9ohJ5k",
    "Free Instagram (Social)": "price_1RBAj3Aog87WCP1EFZvpUNit",
    "Free TikTok (Social)": "price_1RBAj4Aog87WCP1EwkTTukqk",
    "Free Facebook (Social)": "price_1RBAj4Aog87WCP1En15F6abl",
    "Free LinkedIn (Social)": "price_1RBAj3Aog87WCP1EupWG9c5S",
    "Free Pinterest (Social)": "price_1RBAj2Aog87WCP1E3bykvrD7",
    "Free Google (Social)": "price_1RBAj2Aog87WCP1EpSy9E5gk",
  

    // ==== Platform Add-Ons (Short Form Video) ====
    // always offered as one free with Short Form Video selection, and unlimited additional within this category
    "Add Instagram (Video)": "price_1RDxviAog87WCP1E37g1h0Da",
    "Add TikTok (Video)": "price_1RDxvjAog87WCP1EvvCKImdr",
    "Add Facebook (Video)": "price_1RBAjOAog87WCP1Ennnv4MVK",
    "Add LinkedIn (Video)": "price_1RBAjNAog87WCP1EICrc7nxN",
    "Add YouTube (Video)": "price_1RDxvjAog87WCP1EQAqzXMSp",
    "Add Google (Video)": "price_1RBAjMAog87WCP1En5a3zZLq",
    "Free Instagram (Video)": "price_1RBAjJAog87WCP1EBPb7Q1fK",
    "Free TikTok (Video)": "price_1RBAjGAog87WCP1Ej3aCPcC4",
    "Free Facebook (Video)": "price_1RBAjRAog87WCP1EtPz0yB1p",
    "Free LinkedIn (Video)": "price_1RBAjIAog87WCP1ErqsNtNAM",
    "Free YouTube (Video)": "price_1RBAjHAog87WCP1E5JM4UMmj",
    "Free Google (Video)": "price_1RBAjHAog87WCP1EgUt8eOXd",
  
    // ==== Platform Add-Ons (Long Form Video) ====
        // always offered as one free with Long Form Video selection, and unlimited additional within this category
    "Add Instagram (Video - Long)": "price_1RBAjFAog87WCP1El8fSerxL",
    "Add TikTok (Video - Long)": "price_1RBAjGAog87WCP1Ej3aCPcC4",
    "Add Facebook (Video - Long)": "price_1RBAjGAog87WCP1EAisog7W4",
    "Add LinkedIn (Video - Long)": "price_1RBAjFAog87WCP1EjeS2toRd",
    "Add YouTube (Video - Long)": "price_1RBAjEAog87WCP1EJCoXxehQ",
    "Add Google (Video - Long)": "price_1RBAjEAog87WCP1Eylj4gemf",
    "Free Instagram (Video - Long)": "price_1RBAjIAog87WCP1EBPb7Q1fK",
    "Free TikTok (Video - Long)": "price_1RBAjJAog87WCP1EguLpACPE",
    "Free Facebook (Video - Long)": "price_1RBAjJAog87WCP1EpX43Tamb",
    "Free LinkedIn (Video - Long)": "price_1RBAjIAog87WCP1ErqsNtNAM",
    "Free YouTube (Video - Long)": "price_1RBAjPAog87WCP1EE7zDAki7",
    "Free Google (Video - Long)": "price_1RDxvdAog87WCP1ElRAFBeNL"
  };
  
  