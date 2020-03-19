import { Router } from 'express';

import OrderController from '../app/controllers/OrderController';
import OrdersWithProblemsController from '../app/controllers/OrdersWithProblemsController';

import validateOrderStore from '../app/validators/OrderStore';
import validateOrderUpdate from '../app/validators/OrderUpdate';

const routes = new Router();

routes.get('/orders', OrderController.index);
routes.post('/orders', validateOrderStore, OrderController.store);
routes.put('/orders/:id', validateOrderUpdate, OrderController.update);
routes.delete('/orders/:id', OrderController.delete);
routes.get('/orders-with-problems', OrdersWithProblemsController.index);

export default routes;
