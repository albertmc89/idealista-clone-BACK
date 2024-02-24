import { type Response, type NextFunction } from "express";
import CustomError from "../../CustomError/CustomError.js";
import Property from "../../database/models/Property.js";
import { type AuthRequest } from "../types.js";

export const getPropertiesController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const limitRequest = 10;

  try {
    const _id = req.userId;

    const properties = await Property.find({ user: _id })
      .limit(limitRequest)
      .exec();

    res.status(200).json({ properties });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Couldn't retrieve properties",
      404,
      (error as Error).message,
    );

    next(customError);
  }
};
