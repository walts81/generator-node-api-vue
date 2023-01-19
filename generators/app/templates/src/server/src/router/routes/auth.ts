import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { RouteInfo } from '../route-info';
import { authConfig } from '@/config/auth-config';
import { UserRole } from '@/data';
import { login } from '@/services';

export const AuthRoute: RouteInfo = {
  path: '/auth',
  post: async (req, res) => {
    const username: string = req.body.username;
    const pwd: string = req.body.password;
    const user = await login(username, pwd);
    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        accessToken: null,
        message: 'Invalid username/password',
      });
    }

    const userKey = user.key;
    const roles = !!user.roles ? user.roles.map(x => x.name) : [UserRole.User];
    const accessToken = jwt.sign({ userKey, username, roles }, authConfig.secret, {
      expiresIn: 86400, // 24 hours
    });
    const result = {
      userKey,
      username,
      roles,
      accessToken,
    };
    return res.status(httpStatus.OK).json(result);
  },
};
