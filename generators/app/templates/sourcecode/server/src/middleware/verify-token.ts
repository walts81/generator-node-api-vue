import jwt from 'jsonwebtoken';
import { authConfig } from '../config/auth-config';
import { Middleware } from '@/types';
import httpStatus from 'http-status';

export const verifyToken: Middleware = (req, res, next) => {
  const token = (req.query['token'] as string) || (req.headers['x-access-token'] as string);

  if (!token) {
    return res.status(httpStatus.FORBIDDEN).json({
      message: 'No token provided',
    });
  }

  const verifyCallback = (err: unknown, decoded: { userKey: string; username: string; roles: string[] }) => {
    if (!!err) {
      return false;
    }
    const userKey = decoded.userKey || '';
    const username = decoded.username || '';
    const roles = decoded.roles || [];
    if (!!userKey && roles.length > 0) {
      const r: any = req;
      r.userKey = userKey;
      r.roles = roles;
      r.username = username;
      return true;
    }
    return false;
  };

  jwt.verify(token, authConfig.secret, (err, decoded: any) => {
    if (verifyCallback(err, decoded)) {
      next();
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: 'Unauthorized',
      });
    }
  });
};
