import { describe, it, expect } from 'vitest';
import express from 'express';
import request from 'supertest';

import { getHealth } from './healthController';
import validate from '../middleware/validate';

function createApp(): express.Express {
  const app = express();
  app.get('/api/health', validate([]), getHealth);
  return app;
}

describe('GET /api/health', () => {
  it('returns 200 with status ok', async () => {
    const app = createApp();
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
