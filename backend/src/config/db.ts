import mongoose from 'mongoose';

import env from './env';
import logger from '../utils/logger';

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info('MongoDB connected');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error('MongoDB connection error', { detail: message });
    process.exit(1);
  }
};

export default connectDB;
