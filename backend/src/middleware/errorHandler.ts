import { Request, Response, NextFunction } from 'express';

import logger from '../utils/logger';

interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

const DEFAULT_STATUS_CODE = 500;
const DEFAULT_ERROR_CODE = 'INTERNAL_ERROR';
const DEFAULT_ERROR_MESSAGE = 'Internal server error';

const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode || DEFAULT_STATUS_CODE;
  const code = err.code || DEFAULT_ERROR_CODE;
  const message = err.message || DEFAULT_ERROR_MESSAGE;

  logger.error(`${code}: ${message}`, { statusCode, code });

  res.status(statusCode).json({
    error: { code, message, details: [] },
  });
};

export default errorHandler;
