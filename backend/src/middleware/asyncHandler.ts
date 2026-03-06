import { Request, Response, NextFunction } from 'express';

type AsyncRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

function asyncHandler(handler: AsyncRouteHandler): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    handler(req, res, next).catch(next);
  };
}

export { asyncHandler };
export type { AsyncRouteHandler };
