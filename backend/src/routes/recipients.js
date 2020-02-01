import { Router } from 'express';

import RecipientController from '../app/controllers/RecipientController';

import authMiddleware from '../app/middlewares/auth';

const routes = new Router();

routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

export default routes;
