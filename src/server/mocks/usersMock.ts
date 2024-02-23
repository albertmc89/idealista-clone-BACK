import { type UserStructure } from "../../types";
import mongoose from "mongoose";

export const userMongooseId = new mongoose.Types.ObjectId().toString();

export const mockId = "93huwhue7y3";

export const userMock: UserStructure[] = [
  {
    _id: userMongooseId,
    name: "Daniela",
    authId: mockId,
  },
];
