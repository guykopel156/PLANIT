import { validationResult } from 'express-validator';

import type { Request, Response, NextFunction } from 'express';
import type { ValidationChain } from 'express-validator';

const VALIDATION_ERROR_CODE = 'VALIDATION_ERROR';
const VALIDATION_ERROR_MESSAGE = 'Invalid request data';
const VALIDATION_STATUS_CODE = 400;

function validateRequest(rules: ValidationChain[]): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    for (const rule of rules) {
      await rule.run(req);
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(VALIDATION_STATUS_CODE).json({
        error: {
          code: VALIDATION_ERROR_CODE,
          message: VALIDATION_ERROR_MESSAGE,
          details: errors.array(),
        },
      });
      return;
    }

    next();
  };
}

export { validateRequest };
