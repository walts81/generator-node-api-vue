import { Request, Response, NextFunction } from 'express';

export type Middleware = (req: Request, res: Response, next: NextFunction) => void;
export type MiddlewareFactory = () => Middleware;
export type MiddlewareFactoryWithArgs<T = any> = (data: T) => Middleware;
