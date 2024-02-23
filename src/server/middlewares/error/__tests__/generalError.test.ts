import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../../CustomError/CustomError.js";
import { generalErrorHandler } from "../errors.js";

beforeEach(() => {
  jest.clearAllMocks();
});

const next: NextFunction = jest.fn();

describe("Given an generalErrorHandler middleware", () => {
  const req: Partial<Request> = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  describe("When it receives a response and an error with the status code 500", () => {
    const customError = new CustomError(
      "Internal server error",
      500,
      "Internal server error",
    );

    test("Then it should call it's response status method with the status code '500'", () => {
      generalErrorHandler(customError, req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(customError.statusCode);
    });

    test("Then it should call it's json response method with the message 'Internal server error'", () => {
      const error = new Error();
      const expectedErrorMessage = "Internal server error";

      generalErrorHandler(
        error as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({ error: expectedErrorMessage });
    });
  });
});
