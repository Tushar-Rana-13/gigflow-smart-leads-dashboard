import {
  Request,
  Response,
  NextFunction,
} from "express";

const notFoundMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = new Error(
    `Route not found - ${req.originalUrl}`
  );

  next(error);
};

export default notFoundMiddleware;