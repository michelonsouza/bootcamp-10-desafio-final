import { Router } from 'express';

import RecipientController from '../app/controllers/RecipientController';

const routes = new Router();

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

export default routes;
