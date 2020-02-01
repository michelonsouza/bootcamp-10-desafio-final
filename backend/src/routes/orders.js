import { Router } from 'express';

import OrderController from '../app/controllers/OrderController';

const routes = new Router();

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

export default routes;
