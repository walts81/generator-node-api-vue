import { RouteInfo } from '../route-info';
import { AboutRoute } from './about';
import { AuthRoute } from './auth';
import { DefaultRoute } from './default';

export const routes: RouteInfo[] = [DefaultRoute, AboutRoute, AuthRoute];
