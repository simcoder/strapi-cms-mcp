import { z } from "zod";

/**
 * Schema for getting a list of documents
 */
export const getDocumentsSchema = z.object({
  contentType: z.string().describe("The plural API ID of the content type"),
  populate: z.string().optional().describe("Fields to populate"),
  filters: z.string().optional().describe("Filters to apply to the request"),
  sort: z.string().optional().describe("Sorting options"),
  pagination: z.object({
    page: z.number().optional().describe("Page number"),
    pageSize: z.number().optional().describe("Page size")
  }).optional().describe("Pagination options"),
  locale: z.string().optional().describe("Locale to filter by"),
});

export type GetDocumentsParams = z.infer<typeof getDocumentsSchema>;

/**
 * Schema for getting a single document
 */
export const getDocumentSchema = z.object({
  contentType: z.string().describe("The plural API ID of the content type"),
  documentId: z.string().describe("The document ID"),
  populate: z.string().optional().describe("Fields to populate"),
});

export type GetDocumentParams = z.infer<typeof getDocumentSchema>;

/**
 * Schema for creating a document
 */
export const createDocumentSchema = z.object({
  contentType: z.string().describe("The plural API ID of the content type"),
  data: z.record(z.any()).describe("The data to create"),
});

export type CreateDocumentParams = z.infer<typeof createDocumentSchema>;

/**
 * Schema for updating a document
 */
export const updateDocumentSchema = z.object({
  contentType: z.string().describe("The plural API ID of the content type"),
  documentId: z.string().describe("The document ID"),
  data: z.record(z.any()).describe("The data to update"),
});

export type UpdateDocumentParams = z.infer<typeof updateDocumentSchema>;

/**
 * Schema for deleting a document
 */
export const deleteDocumentSchema = z.object({
  contentType: z.string().describe("The plural API ID of the content type"),
  documentId: z.string().describe("The document ID"),
});

export type DeleteDocumentParams = z.infer<typeof deleteDocumentSchema>; 