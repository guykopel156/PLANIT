import { describe, it, expect } from 'vitest';
import express, { type Request, type Response, type NextFunction } from 'express';
import request from 'supertest';

import errorHandler from './errorHandler';

class TestAppError extends Error {
  statusCode?: number;
  code?: string;

  constructor(message?: string, statusCode?: number, code?: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

function createApp(error: TestAppError): express.Express {
  const app = express();
  app.get('/test', (_req: Request, _res: Response, next: NextFunction): void => {
    next(error);
  });
  app.use(errorHandler);
  return app;
}

describe('errorHandler middleware', () => {
  it('returns 500 with default error when no details provided', async () => {
    const error = new TestAppError();
    const app = createApp(error);
    const response = await request(app).get('/test');

    expect(response.status).toBe(500);
    expect(response.body.error.code).toBe('INTERNAL_ERROR');
  });

  it('returns custom status code and error code', async () => {
    const error = new TestAppError('Not found', 404, 'NOT_FOUND');
    const app = createApp(error);
    const response = await request(app).get('/test');

    expect(response.status).toBe(404);
    expect(response.body.error).toEqual({
      code: 'NOT_FOUND',
      message: 'Not found',
      details: [],
    });
  });
});
