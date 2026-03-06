import { Router } from 'express';

import { generate, create, list, getById, update, remove } from '../controllers/tripsController';
import { authenticate } from '../middleware/usersMiddleware';
import { validateGenerateItinerary, validateCreateTrip, validateUpdateTrip } from '../middleware/tripsMiddleware';

const router = Router();

router.post('/trips/generate', authenticate, validateGenerateItinerary, generate);
router.post('/trips', authenticate, validateCreateTrip, create);
router.get('/trips', authenticate, list);
router.get('/trips/:id', authenticate, getById);
router.put('/trips/:id', authenticate, validateUpdateTrip, update);
router.delete('/trips/:id', authenticate, remove);

export default router;
