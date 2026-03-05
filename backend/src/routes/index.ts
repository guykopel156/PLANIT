import { Router } from 'express';

import { getHealth } from '../controllers/healthController';
import validate from '../middleware/validate';

const router = Router();

router.get('/health', validate([]), getHealth);

export default router;
