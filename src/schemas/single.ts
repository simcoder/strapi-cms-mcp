import { z } from "zod";

/**
 * Schema for getting a single type
 */
export const getSingleTypeSchema = z.object({
  contentType: z.string().describe("The singular API ID of the content type"),
  populate: z.string().optional().describe("Fields to populate"),
  locale: z.string().optional().describe("Locale to filter by"),
});

export type GetSingleTypeParams = z.infer<typeof getSingleTypeSchema>;

/**
 * Schema for updating a single type
 */
export const updateSingleTypeSchema = z.object({
  contentType: z.string().describe("The singular API ID of the content type"),
  data: z.record(z.any()).describe("The data to update"),
  locale: z.string().optional().describe("Locale to update"),
});

export type UpdateSingleTypeParams = z.infer<typeof updateSingleTypeSchema>;

/**
 * Schema for deleting a single type
 */
export const deleteSingleTypeSchema = z.object({
  contentType: z.string().describe("The singular API ID of the content type"),
});

export type DeleteSingleTypeParams = z.infer<typeof deleteSingleTypeSchema>; 