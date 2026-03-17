import { Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
import { AuthRequest } from "../types";
import { sendSuccess } from "../utils/apiResponse";

export const UserController = {
  getAll: async (_req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const users = await UserService.getAll();
      sendSuccess(res, users);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const user = await UserService.getById(id);
      sendSuccess(res, user);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const user = await UserService.update(id, req.body);
      sendSuccess(res, user, "User updated successfully.");
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      await UserService.delete(id);
      sendSuccess(res, null, "User deleted successfully.");
    } catch (error) {
      next(error);
    }
  },
};
