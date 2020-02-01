import { Router } from 'express';

import DeliveryManController from '../app/controllers/DeliveryManController';

const routes = new Router();

routes.get('/deliverymans', DeliveryManController.index);
routes.post('/deliverymans', DeliveryManController.store);
routes.put('/deliverymans/:id', DeliveryManController.update);
routes.delete('/deliverymans/:id', DeliveryManController.delete);

export default routes;
