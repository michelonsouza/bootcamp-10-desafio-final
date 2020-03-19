import { Router } from 'express';

import RecipientController from '../app/controllers/RecipientController';

import validateRecipientStore from '../app/validators/RecipientStore';
import validateRecipientUpdate from '../app/validators/RecipientUpdate';

const routes = new Router();

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', validateRecipientStore, RecipientController.store);
routes.put(
  '/recipients/:id',
  validateRecipientUpdate,
  RecipientController.update
);
routes.delete('/recipients/:id', RecipientController.delete);

export default routes;
