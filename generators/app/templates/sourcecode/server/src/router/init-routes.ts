import { Application, Router } from 'express';
import { routes } from './routes';

const apiUrlBase = '/api/v1/';

export const initRoutes = (app: Application) => {
  const apiRoute = Router();
  for (const r of routes) {
    const router = Router();
    if (!!r.middleware) {
      r.middleware.forEach(x => router.use(x));
    }
    const path = '/';
    if (!!r.get) router.get(path, r.get);
    if (!!r.post) router.post(path, r.post);
    if (!!r.put) router.put(path, r.put);
    if (!!r.delete) router.delete(path, r.delete);
    if (!!r.options) router.options(path, r.options);
    apiRoute.use(r.path || path, router);
  }
  app.use(apiUrlBase, apiRoute);
};
