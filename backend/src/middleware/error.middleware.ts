import {
  Request,
  Response,
  NextFunction,
} from "express";

import ApiError from "../utils/ApiError";

const errorMiddleware = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode =
    err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message:
      err.message ||
      "Internal Server Error",
  });
};

export default errorMiddleware;