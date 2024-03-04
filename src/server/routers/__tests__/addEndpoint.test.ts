import mongoose from "mongoose";
import admin from "firebase-admin";
import app from "../..";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { mockId, userMock } from "../../mocks/usersMock.js";
import User from "../../../database/models/User.js";
import { postPropertyMock, propertyMock } from "../../mocks/propertiesMocks.js";
import connectToDataBase from "../../../database/connectToDataBase.js";
import Property from "../../../database/models/Property.js";

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

describe(`Given a ADD '/properties' endpoint`, () => {
  beforeEach(async () => {
    await Property.create(propertyMock);
    await User.create(userMock);
  });

  describe("When it receives a request with an existan property id", () => {
    test(`Then it should respond with a status 201 and the property 'Calle Londres, Alella' posted'`, async () => {
      const expectedStatusCode = 201;
      const path = "/properties";

      const response = await request(app)
        .post(path)
        .set("Authorization", "Bearer token")
        .send(postPropertyMock)
        .expect(expectedStatusCode);

      expect(response.body).toHaveProperty("property", postPropertyMock);
    });
  });
});
