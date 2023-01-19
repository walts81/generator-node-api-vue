import { RouteInfo } from '../route-info';
import { AboutRoute } from './about';

export const DefaultRoute: RouteInfo = {
  path: '/',
  get: (req, res) => AboutRoute.get?.call(this, req, res),
};
