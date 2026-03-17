import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { AppError } from "./error.middleware";

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const messages = error.details.map((detail) => detail.message).join(", ");
      throw new AppError(400, messages);
    }

    next();
  };
};
