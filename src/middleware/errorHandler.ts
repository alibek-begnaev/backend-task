import { Request, Response, NextFunction } from "express"

// Define error handling middleware with TypeScript
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.stack)

  // Default error status code
  let statusCode = 500
  let errorMessage = "Internal Server Error"

  // Handle specific error types
  if (err instanceof SyntaxError) {
    statusCode = 400 // Bad Request
    errorMessage = "Malformed JSON"
  } else if (err.name === "ValidationError") {
    statusCode = 422 // Unprocessable Entity
    errorMessage = err.message
  }

  // Send error response
  res.status(statusCode).json({ error: errorMessage })
}

export default errorHandler
