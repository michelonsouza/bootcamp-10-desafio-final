import { Router } from 'express';

import auth from './auth';
import recipients from './recipients';
import deliveryman from './deliveryman';
import orders from './orders';

import authMiddleware from '../app/middlewares/auth';

const routes = new Router();

routes.use(auth);

routes.use(authMiddleware);

routes.use(recipients);
routes.use(deliveryman);
routes.use(orders);

export default routes;
