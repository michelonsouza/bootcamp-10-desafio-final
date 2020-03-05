import { Router } from 'express';

import AuthController from '../app/controllers/AuthController';
import AuthDeliveryManController from '../app/controllers/AuthDeliveryManController';

const routes = new Router();

routes.post('/auth/deliveryman', AuthDeliveryManController.store);
routes.post('/auth', AuthController.store);

export default routes;
