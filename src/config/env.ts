// Environment variables for authentication and defaults
export const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
export const STRAPI_API_URL = process.env.STRAPI_API_URL;

// Validate required environment variables
if (!STRAPI_API_TOKEN || !STRAPI_API_URL) {
  throw new Error(
    "STRAPI_API_TOKEN and STRAPI_API_URL environment variables are required"
  );
}

// Log configuration
console.error("[Setup] Using Strapi API URL:", STRAPI_API_URL); 