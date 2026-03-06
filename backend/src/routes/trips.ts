import { Router } from 'express';

import { generate } from '../controllers/tripsController';
import { authenticate } from '../middleware/usersMiddleware';
import { validateGenerateItinerary } from '../middleware/tripsMiddleware';

const router = Router();

router.post('/trips/generate', authenticate, validateGenerateItinerary, generate);

export default router;
