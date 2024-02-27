import { type Response, type Request, type NextFunction } from "express";
import Property from "../../../database/models/Property.js";
import { type PropertyStructure } from "../../../types.js";
import { addPropertyController } from "../propertiesControllers.js";
import { propertyCreatedMock } from "../../mocks/propertiesMocks.js";
import CustomError from "../../../CustomError/CustomError.js";

describe("Given an addPlayerController controller", () => {
  const req: Partial<Request> = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next: NextFunction = jest.fn();

  describe("When it receives a request with a new property, a response and a next function", () => {
    Property.create = jest.fn().mockResolvedValue(propertyCreatedMock);

    test("Then it should repond with status 201", async () => {
      const expectedStatus = 201;

      await addPropertyController(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          PropertyStructure
        >,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should respond with the new property created", async () => {
      await addPropertyController(
        req as Request<
          Record<string, unknown>,
          Record<string, unknown>,
          PropertyStructure
        >,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ property: propertyCreatedMock });
    });

    describe("When it receives a request with a incorrect form property, and a response and a next function", () => {
      test("Then it should respond with an error", async () => {
        const error = new Error("error");
        const customError = new CustomError(
          "Couldn't create the property",
          404,
          error.message,
        );

        Property.create = jest.fn().mockRejectedValue(error);

        await addPropertyController(
          req as Request<
            Record<string, unknown>,
            Record<string, unknown>,
            PropertyStructure
          >,
          res as Response,
          next,
        );

        expect(next).toHaveBeenCalledWith(customError);
      });
    });
  });
});
