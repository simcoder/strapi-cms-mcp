import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";

/**
 * Create a McpError from any error
 */
export function createMcpError(
  message: string,
  originalError?: unknown
): McpError {
  console.error(`[Error] ${message}`, originalError);
  
  if (originalError instanceof McpError) {
    return originalError;
  }

  const errorMessage = originalError instanceof Error 
    ? `${message}: ${originalError.message}`
    : message;

  return new McpError(ErrorCode.InternalError, errorMessage);
}

/**
 * Log an error with standard formatting
 */
export function logError(context: string, error: unknown): void {
  if (error instanceof Error) {
    console.error(`[Error] ${context}:`, error.message);
    if (error.stack) {
      console.error(error.stack);
    }
  } else {
    console.error(`[Error] ${context}:`, error);
  }
} 