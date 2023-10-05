import { type Request, type Response } from "express";
import pingController from "../pingController";

describe("Given a pingController controller", () => {
  describe("When it a request is sent to '/'", () => {
    const req: Partial<Request> = {};
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("Then it should respond with a status code 200", () => {
      const expectedStatusCode = 200;

      pingController(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should respond with a message 'pong'", () => {
      const messageText = "pong";
      pingController(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({ message: messageText });
    });
  });
});
