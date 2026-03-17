import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}
