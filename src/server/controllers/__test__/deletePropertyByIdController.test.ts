import { type NextFunction, type Response, type Request } from "express";
import Property from "../../../database/models/Property.js";
import { propertyMock } from "../../mocks/propertiesMocks.js";
import { deletePropertyByIdController } from "../propertiesControllers.js";
import CustomError from "../../../CustomError/CustomError.js";

const propertyIdMock = "l3mdlfd0324n292";

const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req: Partial<Request> = {
  params: {
    propertyId: propertyIdMock,
  },
};

const next: NextFunction = jest.fn();

describe("Given a deletePropertyById controller", () => {
  describe("When it receives a response", () => {
    Property.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({ propertyMock }),
    });

    test("Then it should call its method status with 200", async () => {
      const expectedStatusCode = 200;

      await deletePropertyByIdController(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then the method json should be called an object with a property the id 'l3mdlfd0324n292' has been deleted", async () => {
      await deletePropertyByIdController(req as Request, res as Response, next);
      expect(res.json).toBeCalledWith({
        message: "Property successfully deleted",
      });
    });

    test("Then it should call the received next function with a 404 'Property not found' error", async () => {
      Property.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });
      const expectedError = new CustomError(
        "Property not found",
        404,
        "Property not found",
      );
      await deletePropertyByIdController(req as Request, res as Response, next);

      expect(next).toBeCalledWith(expectedError);
    });

    test("Then it should call the received next function with a 500  'Can't delete property' error", async () => {
      const expectedError = new CustomError(
        "Can't delete property",
        500,
        "Can't delete property",
      );

      Property.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await deletePropertyByIdController(req as Request, res as Response, next);

      expect(next).toBeCalledWith(expectedError);
    });
  });
});
