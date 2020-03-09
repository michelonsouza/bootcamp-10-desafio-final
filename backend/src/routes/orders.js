import { Router } from 'express';

import OrderController from '../app/controllers/OrderController';
import OrdersWithProblemsController from '../app/controllers/OrdersWithProblemsController';

const routes = new Router();

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);
routes.get('/orders-with-problems', OrdersWithProblemsController.index);

export default routes;
