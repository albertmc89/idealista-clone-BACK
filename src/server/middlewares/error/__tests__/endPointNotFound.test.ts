import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../../CustomError/CustomError.js";
import { endpointNotFound } from "../errors.js";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

describe("Given a endpointNotFound middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call its status with 404 and messge 'Endpoint not found'", () => {
      const customError = new CustomError(
        "Endpoint not found",
        404,
        "Endpoint not found",
      );

      endpointNotFound(req as Request, res as Response, next);

      expect(next).toBeCalledWith(customError);
    });
  });
});
