import { Request } from 'express';
import { MiddlewareFactoryWithArgs } from '@/types';

export const log: MiddlewareFactoryWithArgs<(req: Request) => string> =
  (actionMessage: (req: Request) => string) => (req, res, next) => {
    console.log(actionMessage(req));
    next();
  };
