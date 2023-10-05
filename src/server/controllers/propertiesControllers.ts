import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../CustomError/CustomError.js";
import Property from "../../database/models/Property.js";

export const getPropertiesController = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const limitRequest = 10;

  try {
    const properties = await Property.find().limit(limitRequest).exec();

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
