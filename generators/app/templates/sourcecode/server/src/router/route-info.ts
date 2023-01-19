import { Middleware } from '@/types';
import express from 'express';

export type ExpressHandler = (req: express.Request, res: express.Response) => unknown;

export interface RouteInfo {
  path: string;
  get?: ExpressHandler;
  post?: ExpressHandler;
  put?: ExpressHandler;
  delete?: ExpressHandler;
  options?: ExpressHandler;
  middleware?: Middleware[];
}
