import httpStatus from 'http-status';
import { Middleware, MiddlewareFactoryWithArgs } from '@/types';

export const requiresRole: MiddlewareFactoryWithArgs<string> = (role: string) => (req, res, next) => {
  const roles: string[] = (req as any).roles || [];
  if (roles.some(x => x === role)) {
    next();
  } else {
    res.status(httpStatus.FORBIDDEN).json({
      message: `Requires ${role} role`,
    });
  }
};

export const requiresAdmin: Middleware = (req, res, next) => requiresRole('admin')(req, res, next);
