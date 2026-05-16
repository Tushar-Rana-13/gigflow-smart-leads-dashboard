import {
  Request,
  Response,
  NextFunction,
} from "express";

import { ZodError } from "zod";

const errorMiddleware = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",

      errors: err.issues.map((error) => ({
        field: error.path[0],
        message: error.message,
      })),
    });
  }

  // Mongoose invalid object id
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
    });
  }

  // Default error
  return res.status(
    err.statusCode || 500
  ).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
};

export default errorMiddleware;