import { Router } from 'express';

import publicRoutes from './publicRoutes';
import privateRoutes from './privateRoutes';

const routes = new Router();

routes.use(publicRoutes);
routes.use(privateRoutes);

export default routes;
