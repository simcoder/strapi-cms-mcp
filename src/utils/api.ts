import { STRAPI_API_TOKEN, STRAPI_API_URL } from "../config/env.js";

/**
 * Helper function to make authenticated REST API calls to Strapi CMS
 */
export async function makeStrapiRequest(
  endpoint: string,
  method = "GET",
  body?: any,
  queryParams?: Record<string, string>,
  extraHeaders?: Record<string, string>
) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${STRAPI_API_TOKEN}`,
    ...extraHeaders,
  };

  try {
    // Construct URL with query parameters
    let url = `${STRAPI_API_URL}${endpoint}`;
    if (queryParams && Object.keys(queryParams).length > 0) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(queryParams)) {
        params.append(key, value);
      }
      url += `?${params.toString()}`;
    }

    console.error(`[API] Making request to: ${url}`);
    console.error(`[API] Method: ${method}`);
    if (body) console.error(`[API] Body:`, JSON.stringify(body, null, 2));
    if (extraHeaders) console.error(`[API] Extra headers:`, extraHeaders);

    const requestBody = body ? JSON.stringify(body) : undefined;

    const response = await fetch(url, {
      method,
      headers,
      body: requestBody,
    });

    console.error(`[API] Response status:`, response.status);

    const responseText = await response.text();
    console.error(`[API] Response body:`, responseText);

    if (!response.ok) {
      throw new Error(
        `API request failed (${response.status}): ${responseText}`
      );
    }

    if (responseText) {
      try {
        // If content type is JSON, parse it
        return JSON.parse(responseText);
      } catch (parseError) {
        console.error(`[API] Failed to parse JSON response:`, parseError);
        // Return the raw text if parsing fails
        return responseText;
      }
    }
    // Return null if response body is empty
    return null;
  } catch (error) {
    console.error(`[API] Request failed:`, error);
    throw error;
  }
} 