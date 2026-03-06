import { Router } from 'express';

import { register, login, logout, getProfile, updateProfile, deleteAccount } from '../controllers/usersController';
import { authenticate, validateRegister, validateLogin, validateUpdateProfile } from '../middleware/usersMiddleware';

const router = Router();

router.post('/auth/register', validateRegister, register);
router.post('/auth/login', validateLogin, login);
router.post('/auth/logout', authenticate, logout);
router.get('/auth/profile', authenticate, getProfile);
router.put('/auth/profile', authenticate, validateUpdateProfile, updateProfile);
router.delete('/auth/profile', authenticate, deleteAccount);

export default router;
