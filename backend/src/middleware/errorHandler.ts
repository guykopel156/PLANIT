import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const code = err.code || 'INTERNAL_ERROR';

  console.error(`[Error] ${code}: ${err.message}`);

  res.status(statusCode).json({
    error: {
      code,
      message: err.message || 'Internal server error',
    },
  });
};

export default errorHandler;
