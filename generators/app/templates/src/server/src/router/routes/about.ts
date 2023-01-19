import { log, verifyToken } from '@/middleware';
import { RouteInfo } from '../route-info';

const getTime = () => new Date().toISOString();
export const AboutRoute: RouteInfo = {
  path: '/about',
  get: (req, res) => {
    return res.json({
      project: 'Vue 3 + Express API',
      from: '<%= githubUser %>',
    });
  },
  middleware: [verifyToken, log(req => `${getTime()}:  'About' endpoint requested by: ${req['username']}`)],
};
