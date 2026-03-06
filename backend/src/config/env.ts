import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const DEFAULT_PORT = 5000;
const DEFAULT_CORS_ORIGIN = 'http://localhost:5173';

interface EnvConfig {
  PORT: number;
  CORS_ORIGIN: string;
  MONGODB_URI: string;
  JWT_SECRET: string;
  ANTHROPIC_API_KEY: string;
}

const env: EnvConfig = {
  PORT: parseInt(process.env.PORT || String(DEFAULT_PORT), 10),
  CORS_ORIGIN: process.env.CORS_ORIGIN || DEFAULT_CORS_ORIGIN,
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || '',
};

export default env;
