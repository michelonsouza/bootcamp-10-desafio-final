import { Router } from 'express';

import DeliveryManController from '../app/controllers/DeliveryManController';

import validateDeliveryManStore from '../app/validators/DeliveryManStore';
import validateDeliveryManUpdate from '../app/validators/DeliveryManUpdate';

const routes = new Router();

routes.get('/deliverymans', DeliveryManController.index);
routes.post(
  '/deliverymans',
  validateDeliveryManStore,
  DeliveryManController.store
);
routes.put(
  '/deliverymans/:id',
  validateDeliveryManUpdate,
  DeliveryManController.update
);
routes.delete('/deliverymans/:id', DeliveryManController.delete);

export default routes;
