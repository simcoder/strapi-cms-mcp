import { makeStrapiRequest } from "../utils/api.js";
import { logError } from "../utils/error.js";
import {
  getSingleTypeSchema,
  updateSingleTypeSchema,
  deleteSingleTypeSchema,
  type GetSingleTypeParams,
  type UpdateSingleTypeParams,
  type DeleteSingleTypeParams,
} from "../schemas/single.js";

/**
 * Get a single type
 */
export async function getSingleType(rawParams: any) {
  const params = getSingleTypeSchema.parse(rawParams);
  console.error(`[API] Getting single type: ${params.contentType}`);

  try {
    // Build query parameters
    const queryParams: Record<string, string> = {};
    
    if (params.populate) {
      queryParams.populate = params.populate;
    }
    
    if (params.locale) {
      queryParams.locale = params.locale;
    }

    const response = await makeStrapiRequest(
      `/api/${params.contentType}`,
      "GET",
      undefined,
      queryParams
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2)
        }
      ]
    };
  } catch (error) {
    logError("Error getting single type", error);
    throw error;
  }
}

/**
 * Update a single type
 */
export async function updateSingleType(rawParams: any) {
  const params = updateSingleTypeSchema.parse(rawParams);
  console.error(`[API] Updating single type: ${params.contentType}`);

  try {
    // Build query parameters
    const queryParams: Record<string, string> = {};
    
    if (params.locale) {
      queryParams.locale = params.locale;
    }

    const response = await makeStrapiRequest(
      `/api/${params.contentType}`,
      "PUT",
      { data: params.data },
      queryParams
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(response, null, 2)
        }
      ]
    };
  } catch (error) {
    logError("Error updating single type", error);
    throw error;
  }
}

/**
 * Delete a single type
 */
export async function deleteSingleType(rawParams: any) {
  const params = deleteSingleTypeSchema.parse(rawParams);
  console.error(`[API] Deleting single type: ${params.contentType}`);

  try {
    const response = await makeStrapiRequest(
      `/api/${params.contentType}`,
      "DELETE"
    );

    return {
      content: [
        {
          type: "text",
          text: "Single type deleted successfully"
        }
      ]
    };
  } catch (error) {
    logError("Error deleting single type", error);
    throw error;
  }
}

/**
 * Tool definitions for single types
 */
export const singleTools = [
  {
    name: "get_single_type",
    description: "Get a single type content",
    inputSchema: {
      type: "object",
      properties: {
        contentType: {
          type: "string",
          description: "The singular API ID of the content type (e.g., 'homepage', 'about')",
        },
        populate: {
          type: "string",
          description: "Fields to populate (e.g., 'image', '*', 'components', etc.)",
        },
        locale: {
          type: "string",
          description: "Locale to filter by (e.g., 'en', 'fr')",
        },
      },
      required: ["contentType"],
    },
  },
  {
    name: "update_single_type",
    description: "Update a single type content",
    inputSchema: {
      type: "object",
      properties: {
        contentType: {
          type: "string",
          description: "The singular API ID of the content type (e.g., 'homepage', 'about')",
        },
        data: {
          type: "object",
          description: "The data to update",
        },
        locale: {
          type: "string",
          description: "Locale to update (e.g., 'en', 'fr')",
        },
      },
      required: ["contentType", "data"],
    },
  },
  {
    name: "delete_single_type",
    description: "Delete a single type content",
    inputSchema: {
      type: "object",
      properties: {
        contentType: {
          type: "string",
          description: "The singular API ID of the content type (e.g., 'homepage', 'about')",
        },
      },
      required: ["contentType"],
    },
  },
]; 