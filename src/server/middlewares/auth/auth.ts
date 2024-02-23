import { type NextFunction, type Response } from "express";
import admin from "firebase-admin";
import CustomError from "../../../CustomError/CustomError.js";
import firebaseApp from "../../../firebase.js";
import { type AuthRequest } from "../../types.js";
import User from "../../../database/models/User.js";
import { type UserStructure } from "../../../types.js";

const auth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const error = new CustomError("Unauthorized", 401, "Unauthorized");

      next(error);
      return;
    }

    const { uid } = await admin.auth(firebaseApp).verifyIdToken(token);

    const user = await User.findOne<UserStructure>({
      authId: uid,
    }).exec();

    if (!user) {
      const userNotFound = new CustomError(
        "Couldn't find the user",
        404,
        "Couldn't find the user",
      );

      next(userNotFound);
      return;
    }

    req.userId = user._id;

    next();
  } catch (error: unknown) {
    const customError = new CustomError(
      "Invalid token",
      401,
      (error as Error).message,
    );

    next(customError);
  }
};

export default auth;
