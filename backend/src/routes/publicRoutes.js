import { Router } from 'express';

import AuthController from '../app/controllers/AuthController';
import UserController from '../app/controllers/UserController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/auth', AuthController.store);

export default routes;
