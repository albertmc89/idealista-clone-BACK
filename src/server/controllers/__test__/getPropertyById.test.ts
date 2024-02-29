import { type NextFunction, type Response } from "express";
import { type AuthRequest } from "../../types";
import Property from "../../../database/models/Property.js";
import { getPropertyByIdController } from "../propertiesControllers.js";
import CustomError from "../../../CustomError/CustomError.js";
import { idPropertyMock, propertyMock1 } from "../../mocks/propertiesMocks";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req: Partial<AuthRequest> = {
  params: {
    propertyId: idPropertyMock,
  },
};

const next: NextFunction = jest.fn();

describe("Given a getPropertyByIdController controller", () => {
  describe("When it receives a response", () => {
    Property.findById = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(propertyMock1),
    });

    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      await getPropertyByIdController(
        req as AuthRequest,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the method json should be called an object with a property the propertyId has been loaded", async () => {
      await getPropertyByIdController(
        req as AuthRequest,
        res as Response,
        next,
      );

      expect(res.json).toBeCalledWith({ property: propertyMock1 });
    });

    test("Then it should call the received next function with a 500  'Couldn't retrieve property' error", async () => {
      const expectedError =
        "Cannot read properties of undefined (reading 'json')";
      const customError = new CustomError(
        "Can't retrieve property",
        500,
        expectedError,
      );

      Property.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(propertyMock1),
      });

      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };

      await getPropertyByIdController(
        req as AuthRequest,
        res as Response,
        next,
      );

      expect(next).toBeCalledWith(customError);
    });
  });
});
