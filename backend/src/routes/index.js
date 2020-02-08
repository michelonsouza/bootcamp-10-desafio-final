import { Router } from 'express';

import auth from './auth';
import recipients from './recipients';
import deliveryman from './deliveryman';
import orders from './orders';
import deliveryManProblems from './deliveryManProblems';
import distributorProblems from './distributorProblems';
import deliveryManDeliveries from './deliveryManDeliveries';

import authMiddleware from '../app/middlewares/auth';

const routes = new Router();

routes.use(auth);
routes.use(deliveryManProblems);
routes.use(deliveryManDeliveries);

routes.use(authMiddleware);

routes.use(recipients);
routes.use(deliveryman);
routes.use(orders);
routes.use(distributorProblems);

export default routes;
