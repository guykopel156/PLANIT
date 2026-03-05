import { describe, it, expect } from 'vitest';
import express, { type Request, type Response } from 'express';
import request from 'supertest';
import { body } from 'express-validator';

import validate from './validate';

function createApp(): express.Express {
  const app = express();
  app.use(express.json());
  app.post(
    '/test',
    validate([body('email').isEmail().withMessage('Invalid email')]),
    (_req: Request, res: Response): void => {
      res.json({ success: true });
    }
  );
  return app;
}

describe('validate middleware', () => {
  it('passes when validation rules are satisfied', async () => {
    const app = createApp();
    const response = await request(app)
      .post('/test')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
  });

  it('returns 400 with error details when validation fails', async () => {
    const app = createApp();
    const response = await request(app)
      .post('/test')
      .send({ email: 'not-an-email' });

    expect(response.status).toBe(400);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
    expect(response.body.error.details.length).toBeGreaterThan(0);
  });
});
