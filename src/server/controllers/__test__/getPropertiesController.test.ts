import { type NextFunction, type Response, type Request } from "express";
import { propertyMock } from "../../mocks/propertiesMocks.js";
import { getPropertiesController } from "../propertiesControllers.js";
import CustomError from "../../../CustomError/CustomError.js";
import Property from "../../../database/models/Property.js";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

describe("Given a getPropertiesController controller", () => {
  describe("When it receives a request", () => {
    Property.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockReturnValue(propertyMock),
    });

    test("Then it should call its status method with code 200", async () => {
      const expectedStatusCode = 200;

      await getPropertiesController(req as Request, res as Response, next);

      expect(res.status).toBeCalledWith(expectedStatusCode);
    });

    test("Then it should call it's json method with the property with address 'Carrer Londres, Alella'", async () => {
      await getPropertiesController(req as Request, res as Response, next);

      expect(res.json).toBeCalledWith({ properties: propertyMock });
    });
  });

  describe("When it receives a response with a status mehtod that rejects and a next function", () => {
    test("Then the next function should be called with error 'Couldn't retrieve properties'", async () => {
      const expectedErrorMessage = "Couldn't retrieve properties";

      const res: Partial<Response> = {
        status: jest.fn(),
        json: jest.fn(),
      };

      const customError = new CustomError(
        expectedErrorMessage,
        404,
        expectedErrorMessage,
      );

      await getPropertiesController(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(customError);
    });
  });
});
