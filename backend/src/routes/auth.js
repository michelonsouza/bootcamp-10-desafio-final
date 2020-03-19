import { Router } from 'express';

import AuthController from '../app/controllers/AuthController';
import AuthDeliveryManController from '../app/controllers/AuthDeliveryManController';

import validateAuthStore from '../app/validators/AuthStore';
import validateAuthDeliveryManStore from '../app/validators/AuthDeliveryManStore';

import bruteForce from '../app/middlewares/bruteForce';

const routes = new Router();

routes.post(
  '/auth/deliveryman',
  bruteForce.prevent,
  validateAuthDeliveryManStore,
  AuthDeliveryManController.store
);
routes.post(
  '/auth',
  bruteForce.prevent,
  validateAuthStore,
  AuthController.store
);

export default routes;
