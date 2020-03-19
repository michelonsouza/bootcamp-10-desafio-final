import { Router } from 'express';

import AuthController from '../app/controllers/AuthController';
import AuthDeliveryManController from '../app/controllers/AuthDeliveryManController';

import validateAuthStore from '../app/validators/AuthStore';
import validateAuthDeliveryManStore from '../app/validators/AuthDeliveryManStore';

const routes = new Router();

routes.post(
  '/auth/deliveryman',
  validateAuthDeliveryManStore,
  AuthDeliveryManController.store
);
routes.post('/auth', validateAuthStore, AuthController.store);

export default routes;
