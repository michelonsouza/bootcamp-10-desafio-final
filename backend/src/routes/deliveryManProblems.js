import { Router } from 'express';

import DeliveryManProblemController from '../app/controllers/DeliveryManProblemController';

import validateDeliveryManProblemStore from '../app/validators/DeliveryManProblemStore';

const routes = new Router();

routes.get('/delivery/:id/problems', DeliveryManProblemController.index);
routes.post(
  '/delivery/:id/problems',
  validateDeliveryManProblemStore,
  DeliveryManProblemController.store
);

export default routes;
