import { type Request, type Response, type NextFunction } from "express";
import CustomError from "../../CustomError/CustomError.js";
import Property from "../../database/models/Property.js";
import {
  type RequestWithBody,
  type AuthRequest,
  AuthRequestWithBooleanBody,
} from "../types.js";

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

export const deletePropertyByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { idProperty } = req.params;

  try {
    const property = await Property.findByIdAndDelete({
      _id: idProperty,
    }).exec();

    if (!property) {
      next(new CustomError("Property not found", 404, "Property not found"));
      return;
    }

    res.status(200).json({ message: "Property successfully deleted" });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Can't delete property",
      500,
      (error as Error).message,
    );

    next(customError);
  }
};

export const addPropertyController = async (
  req: RequestWithBody,
  res: Response,
  next: NextFunction,
) => {
  const property = req.body;
  const _id = req.userId;

  try {
    const newproperty = await Property.create({ ...property, user: _id });

    res.status(201).json({ property: newproperty });
  } catch (error) {
    const customError = new CustomError(
      "Couldn't create the property",
      404,
      (error as Error).message,
    );

    next(customError);
  }
};

export const getPropertyByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { idProperty } = req.params;

  try {
    const property = await Property.findById(idProperty).exec();

    res.status(200).json({ property });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Can't retrieve property",
      500,
      (error as Error).message,
    );

    next(customError);
  }
};

export const modifyByIdController = async (
  req: AuthRequestWithBooleanBody,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { idProperty } = req.params;
    const { isRented } = req.body;

    const modifiedProperty = await Property.findByIdAndUpdate(
      { _id: idProperty },
      {
        isRented: !isRented,
      },
      { returnDocument: "after" },
    ).exec();

    res.status(200).json({ property: modifiedProperty });
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Couldn't modify the property",
    );

    next(customError);
  }
};
