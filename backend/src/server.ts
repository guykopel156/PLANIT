import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/db';
import env from './config/env';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import logger from './utils/logger';

const app = express();

app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.use(errorHandler);

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(env.PORT, () => {
    logger.info(`Server running on port ${env.PORT}`);
  });
};

start().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  logger.error('Failed to start server', { detail: message });
  process.exit(1);
});
