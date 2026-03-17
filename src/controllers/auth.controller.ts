import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";
import { sendSuccess, sendCreated } from "../utils/apiResponse";

export const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const user = await AuthService.register(name, email, password);
      sendCreated(res, user, "User registered successfully.");
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      sendSuccess(res, result, "Login successful.");
    } catch (error) {
      next(error);
    }
  },
};
