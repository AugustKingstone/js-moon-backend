import { UserModel } from "../models/user.model";
import { AppError } from "../middlewares/error.middleware";

export const UserService = {
  getAll: async () => {
    return UserModel.findAll();
  },

  getById: async (id: string) => {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new AppError(404, "User not found.");
    }
    return user;
  },

  update: async (id: string, data: { name?: string; email?: string }) => {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new AppError(404, "User not found.");
    }
    return UserModel.update(id, data);
  },

  delete: async (id: string) => {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new AppError(404, "User not found.");
    }
    return UserModel.delete(id);
  },
};
