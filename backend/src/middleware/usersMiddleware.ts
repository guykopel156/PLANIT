import { body } from 'express-validator';

import { NAME_MIN_LENGTH, NAME_MAX_LENGTH } from '../constants/validation';
import { verifyAccessToken } from '../services/usersService';
import { validateRequest } from './validateRequest';

import type { Request, Response, NextFunction } from 'express';
import type { ValidationChain } from 'express-validator';
import type { AuthPayload } from '../types/user';

const AUTH_ERROR_CODE = 'UNAUTHORIZED';
const AUTH_ERROR_MESSAGE = 'Authentication required';
const BEARER_PREFIX = 'Bearer ';
const AUTH_STATUS_CODE = 401;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_COMPLEXITY_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userEmail?: string;
    }
  }
}

function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith(BEARER_PREFIX)) {
    res.status(AUTH_STATUS_CODE).json({
      error: {
        code: AUTH_ERROR_CODE,
        message: AUTH_ERROR_MESSAGE,
        details: [],
      },
    });
    return;
  }

  const token = authHeader.slice(BEARER_PREFIX.length);

  let payload: AuthPayload;
  try {
    payload = verifyAccessToken(token);
  } catch {
    res.status(AUTH_STATUS_CODE).json({
      error: {
        code: AUTH_ERROR_CODE,
        message: 'Invalid or expired token',
        details: [],
      },
    });
    return;
  }

  req.userId = payload.userId;
  req.userEmail = payload.email;
  next();
}

const registerRules: ValidationChain[] = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: NAME_MIN_LENGTH, max: NAME_MAX_LENGTH })
    .withMessage(`Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters`),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
    .matches(PASSWORD_COMPLEXITY_REGEX)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
];

const loginRules: ValidationChain[] = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const updateProfileRules: ValidationChain[] = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: NAME_MIN_LENGTH, max: NAME_MAX_LENGTH })
    .withMessage(`Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters`),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .optional()
    .isLength({ min: PASSWORD_MIN_LENGTH })
    .withMessage(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`)
    .matches(PASSWORD_COMPLEXITY_REGEX)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('avatar')
    .optional()
    .isURL()
    .withMessage('Avatar must be a valid URL'),
];

const validateRegister = validateRequest(registerRules);
const validateLogin = validateRequest(loginRules);
const validateUpdateProfile = validateRequest(updateProfileRules);

export { authenticate, validateRegister, validateLogin, validateUpdateProfile };
