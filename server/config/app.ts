import { NextFunction, Request, Response } from 'express';

export const vars = {
  GOOGLE_CLIENT_ID: process.env['GOOGLE_CLIENT_ID'],
  GOOGLE_CLIENT_SECRERT: process.env['GOOGLE_CLIENT_SECRERT'],
  SECRET: process.env['SECRET'],
};

export class AppResponse {
  data: any;
  message: string;
  code: number;
  error: any;

  constructor(data: any, message: string, code: number, error: any) {
    this.data = data;
    this.message = message;
    this.code = code;
    this.error = error;
  }

  static create(data?: any, message?: string, code?: number) {
    return new AppResponse(data, message || '', code || 200, false);
  }

  static createError(data?: any, message?: string, code?: number) {
    return new AppResponse(data, message, code, true);
  }
}

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  console.log(`config/app.js/errorMiddelware:`, JSON.stringify(err));

  if (!(err instanceof AppResponse))
    err = AppResponse.createError(null, 'Something went wrong!', 500);

  res.status(err.code).json(err);
}
