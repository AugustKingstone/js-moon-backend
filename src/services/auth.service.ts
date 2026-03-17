import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../config/env";
import { UserModel } from "../models/user.model";
import { AppError } from "../middlewares/error.middleware";

export const AuthService = {
  register: async (name: string, email: string, password: string) => {
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      throw new AppError(409, "Email already in use.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPassword });

    return { id: user.id, name: user.name, email: user.email };
  },

  login: async (email: string, password: string) => {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw new AppError(401, "Invalid email or password.");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError(401, "Invalid email or password.");
    }

    const signOptions: SignOptions = {
      expiresIn: env.jwtExpiresIn,
    } as SignOptions;
    const token = jwt.sign({ userId: user.id }, env.jwtSecret, signOptions);

    return { token, user: { id: user.id, name: user.name, email: user.email } };
  },
};
