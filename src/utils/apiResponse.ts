import { Response } from "express";

export const sendSuccess = <T>(res: Response, data: T, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (res: Response, message = "Internal Server Error", statusCode = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export const sendCreated = <T>(res: Response, data: T, message = "Created successfully") => {
  return sendSuccess(res, data, message, 201);
};
