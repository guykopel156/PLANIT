import { Request, Response } from 'express';

const STATUS_OK = 'ok';

const getHealth = (_req: Request, res: Response): void => {
  res.json({ status: STATUS_OK });
};

export { getHealth };
