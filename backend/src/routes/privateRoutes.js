import { Router } from 'express';

import authMiddleware from '../app/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);

export default routes;
