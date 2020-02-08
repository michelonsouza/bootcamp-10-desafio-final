import { Router } from 'express';

import DeliveryManProblemController from '../app/controllers/DeliveryManProblemController';

const routes = new Router();

routes.get('/delivery/:id/problems', DeliveryManProblemController.index);
routes.post('/delivery/:id/problems', DeliveryManProblemController.store);

export default routes;
