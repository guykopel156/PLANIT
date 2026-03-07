import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

import env from './config/env';
import routes from './routes/auth';
import tripRoutes from './routes/trips';
import logger from './utils/logger';
import { AppError } from './utils/appError';

import type { Request, Response, NextFunction } from 'express';

const DEFAULT_STATUS_CODE = 500;
const DEFAULT_ERROR_CODE = 'INTERNAL_ERROR';
const DEFAULT_ERROR_MESSAGE = 'Internal server error';

const app = express();

app.use(cors({
  origin: env.CORS_ORIGIN,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);
app.use('/api', tripRoutes);

app.use((err: AppError, _req: Request, res: Response, _next: NextFunction): void => {
  const statusCode = err.statusCode || DEFAULT_STATUS_CODE;
  const code = err.code || DEFAULT_ERROR_CODE;
  const message = err.message || DEFAULT_ERROR_MESSAGE;

  logger.error(`${code}: ${message}`, { statusCode, code });

  res.status(statusCode).json({
    error: { code, message, details: [] },
  });
});

const start = async (): Promise<void> => {
  await mongoose.connect(env.MONGODB_URI);
  logger.info('MongoDB connected');

  app.listen(env.PORT, (): void => {
    logger.info(`Server running on port ${env.PORT}`);
  });
};

start().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  logger.error('Failed to start server', { detail: message });
  process.exit(1);
});
