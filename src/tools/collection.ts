import { makeStrapiRequest } from "../utils/api.js";
import { logError } from "../utils/error.js";
import {
  getDocumentsSchema,
  getDocumentSchema,
  createDocumentSchema,
  updateDocumentSchema,
  deleteDocumentSchema,
  type GetDocumentsParams,
  type GetDocumentParams,
  type CreateDocumentParams,
  type UpdateDocumentParams,
  type DeleteDocumentParams,
} from "../schemas/collection.js";

/**
 * Get a list of documents from a collection type
 */
export async function getDocuments(rawParams: any) {
  const params = getDocumentsSchema.parse(rawParams);
  console.error(`[API] Getting documents from: ${params.contentType}`);

  try {
    // Build query parameters
    const queryParams: Record<string, string> = {};
    
    if (params.populate) {
      queryParams.populate = params.populate;
    }
    
    if (params.filters) {
      queryParams.filters = params.filters;
    }
    
    if (params.sort) {
      queryParams.sort = params.sort;
    }
    
    if (params.pagination) {
      if (params.pagination.page !== undefined) {
        queryParams["pagination[page]"] = params.pagination.page.toString();
      }
      if (params.pagination.pageSize !== undefined) {
        queryParams["pagination[pageSize]"] = params.pagination.pageSize.toString();
      }
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
    logError("Error getting documents", error);
    throw error;
  }
}

/**
 * Get a single document from a collection type
 */
export async function getDocument(rawParams: any) {
  const params = getDocumentSchema.parse(rawParams);
  console.error(`[API] Getting document: ${params.contentType}/${params.documentId}`);

  try {
    // Build query parameters
    const queryParams: Record<string, string> = {};
    
    if (params.populate) {
      queryParams.populate = params.populate;
    }

    const response = await makeStrapiRequest(
      `/api/${params.contentType}/${params.documentId}`,
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
    logError("Error getting document", error);
    throw error;
  }
}

/**
 * Create a document in a collection type
 */
export async function createDocument(rawParams: any) {
  const params = createDocumentSchema.parse(rawParams);
  console.error(`[API] Creating document in ${params.contentType}`);

  try {
    const response = await makeStrapiRequest(
      `/api/${params.contentType}`,
      "POST",
      { data: params.data }
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
    logError("Error creating document", error);
    throw error;
  }
}

/**
 * Update a document in a collection type
 */
export async function updateDocument(rawParams: any) {
  const params = updateDocumentSchema.parse(rawParams);
  console.error(`[API] Updating document: ${params.contentType}/${params.documentId}`);

  try {
    const response = await makeStrapiRequest(
      `/api/${params.contentType}/${params.documentId}`,
      "PUT",
      { data: params.data }
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
    logError("Error updating document", error);
    throw error;
  }
}

/**
 * Delete a document from a collection type
 */
export async function deleteDocument(rawParams: any) {
  const params = deleteDocumentSchema.parse(rawParams);
  console.error(`[API] Deleting document: ${params.contentType}/${params.documentId}`);

  try {
    const response = await makeStrapiRequest(
      `/api/${params.contentType}/${params.documentId}`,
      "DELETE"
    );

    return {
      content: [
        {
          type: "text",
          text: "Document deleted successfully"
        }
      ]
    };
  } catch (error) {
    logError("Error deleting document", error);
    throw error;
  }
}

/**
 * Tool definitions for collection types
 */
export const collectionTools = [
  {
    name: "get_documents",
    description: "Get a list of documents from a collection type",
    inputSchema: {
      type: "object",
      properties: {
        contentType: {
          type: "string",
          description: "The plural API ID of the content type (e.g., 'restaurants', 'articles')",
        },
        populate: {
          type: "string",
          description: "Fields to populate (e.g., 'image', '*', 'categories,image', etc.)",
        },
        filters: {
          type: "string",
          description: "Filters to apply (e.g., 'filters[name][$eq]=Restaurant')",
        },
        sort: {
          type: "string",
          description: "Sorting options (e.g., 'name:asc', 'createdAt:desc')",
        },
        pagination: {
          type: "object",
          properties: {
            page: {
              type: "number",
              description: "Page number",
            },
            pageSize: {
              type: "number",
              description: "Page size",
            }
          },
          description: "Pagination options",
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
    name: "get_document",
    description: "Get a single document from a collection type by ID",
    inputSchema: {
      type: "object",
      properties: {
        contentType: {
          type: "string",
          description: "The plural API ID of the content type (e.g., 'restaurants', 'articles')",
        },
        documentId: {
          type: "string",
          description: "The document ID",
        },
        populate: {
          type: "string",
          description: "Fields to populate (e.g., 'image', '*', 'categories,image', etc.)",
        },
      },
      required: ["contentType", "documentId"],
    },
  },
  {
    name: "create_document",
    description: "Create a new document in a collection type",
    inputSchema: {
      type: "object",
      properties: {
        contentType: {
          type: "string",
          description: "The plural API ID of the content type (e.g., 'restaurants', 'articles')",
        },
        data: {
          type: "object",
          description: "The data to create",
        },
      },
      required: ["contentType", "data"],
    },
  },
  {
    name: "update_document",
    description: "Update a document in a collection type",
    inputSchema: {
      type: "object",
      properties: {
        contentType: {
          type: "string",
          description: "The plural API ID of the content type (e.g., 'restaurants', 'articles')",
        },
        documentId: {
          type: "string",
          description: "The document ID",
        },
        data: {
          type: "object",
          description: "The data to update",
        },
      },
      required: ["contentType", "documentId", "data"],
    },
  },
  {
    name: "delete_document",
    description: "Delete a document from a collection type",
    inputSchema: {
      type: "object",
      properties: {
        contentType: {
          type: "string",
          description: "The plural API ID of the content type (e.g., 'restaurants', 'articles')",
        },
        documentId: {
          type: "string",
          description: "The document ID",
        },
      },
      required: ["contentType", "documentId"],
    },
  },
]; 