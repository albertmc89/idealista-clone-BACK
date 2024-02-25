import mongoose from "mongoose";
import admin from "firebase-admin";
import app from "../..";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { mockId, userMock } from "../../mocks/usersMock.js";
import User from "../../../database/models/User.js";
import connectToDataBase from "../../../database/connectToDataBase";
import Property from "../../../database/models/Property";
import { propertyMock } from "../../mocks/propertiesMocks";

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

describe(`Given a DELETE '/properties/:idProperty' endpoint`, () => {
  beforeEach(async () => {
    await Property.create(propertyMock);
    await User.create(userMock);
  });

  describe("When it receives a request with an existan property id", () => {
    test(`Then it should respond with a status 200 and an a message 'Property succesfully deleted'`, async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "Property successfully deleted";
      const path = `/properties/${propertyMock[0]._id}`;

      const response = await request(app)
        .delete(path)
        .set("Authorization", "Bearer token")
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("message", expectedMessage);
    });
  });
});
