import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../CustomError/CustomError.js";

export const generalErrorHandler = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const errorMessage = error.message || "Internal server error";
  const statusCode = error.statusCode ?? 500;

  res.status(statusCode).json({ error: errorMessage });
};
