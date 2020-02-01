import { Router } from 'express';

import auth from './auth';
import recipients from './recipients';

const routes = new Router();

routes.use(auth);
routes.use(recipients);

export default routes;
