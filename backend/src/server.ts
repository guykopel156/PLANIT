import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db';
import env from './config/env';
import routes from './routes';
import errorHandler from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', routes);

// Error handler
app.use(errorHandler);

// Start server
const start = async (): Promise<void> => {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
};

start();
