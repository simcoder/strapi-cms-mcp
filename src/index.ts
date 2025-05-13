#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ErrorCode,
} from "@modelcontextprotocol/sdk/types.js";

// Import utility functions
import { createMcpError, logError } from "./utils/error.js";

// Import tool implementations
import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument,
  collectionTools,
} from "./tools/collection.js";

import {
  getSingleType,
  updateSingleType,
  deleteSingleType,
  singleTools,
} from "./tools/single.js";

// Create MCP server
const server = new Server(
  {
    name: "strapi-cms",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool implementations
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      // Collection type tools
      ...collectionTools,
      // Single type tools
      ...singleTools,
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    switch (request.params.name) {
      // Collection type operations
      case "get_documents":
        return await getDocuments(request.params.arguments || {});
      case "get_document":
        return await getDocument(request.params.arguments || {});
      case "create_document":
        return await createDocument(request.params.arguments || {});
      case "update_document":
        return await updateDocument(request.params.arguments || {});
      case "delete_document":
        return await deleteDocument(request.params.arguments || {});

      // Single type operations
      case "get_single_type":
        return await getSingleType(request.params.arguments || {});
      case "update_single_type":
        return await updateSingleType(request.params.arguments || {});
      case "delete_single_type":
        return await deleteSingleType(request.params.arguments || {});

      default:
        throw new McpError(
          ErrorCode.MethodNotFound,
          `Unknown tool: ${request.params.name}`
        );
    }
  } catch (error: unknown) {
    return {
      content: [
        {
          type: "text",
          text: `Operation failed: ${
            error instanceof Error ? error.message : String(error)
          }`,
        },
      ],
      isError: true,
    };
  }
});

async function main() {
  try {
    console.error("[Setup] Initializing Strapi CMS MCP server");
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("[Setup] Server running on stdio");
  } catch (error) {
    logError("Server initialization failed", error);
    process.exit(1);
  }
}

main().catch((error: unknown) => {
  logError("Unhandled error", error);
  process.exit(1);
}); 