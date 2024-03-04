import { MongoMemoryServer } from "mongodb-memory-server";
import admin from "firebase-admin";
import mongoose from "mongoose";
import request from "supertest";

import app from "../..";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { mockId, userMock } from "../../mocks/usersMock";
import User from "../../../database/models/User";
import Property from "../../../database/models/Property";
import { idPropertyMock, propertyMock1 } from "../../mocks/propertiesMocks";
import connectToDataBase from "../../../database/connectToDataBase";
jest.mock("firebase-admin");

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDataBase(server.getUri());

  const token: Partial<DecodedIdToken> = {
    uid: mockId,
  };

  admin.auth = jest.fn().mockReturnValue({
    verifyIdToken: jest.fn().mockResolvedValue(token),
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe(`Given a PATCH '/properties/:idProperty' endpoint`, () => {
  describe("When it receives a request", () => {
    test("Then it should respond with status 200 and a property'", async () => {
      const expectedStatusCode = 200;
      const path = `/properties/${idPropertyMock}`;
      const propertyById = propertyMock1[0].isRented;

      await Property.create(propertyMock1);
      await User.create(userMock);

      const response = await request(app)
        .patch(path)
        .set("Authorization", "Bearer token")
        .send({ isRented: true })
        .expect(expectedStatusCode);

      expect(response.body.property).toHaveProperty("isRented", propertyById);
    });
  });
});
