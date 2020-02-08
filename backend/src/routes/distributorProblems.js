import { Router } from 'express';

import DistributorProblemController from '../app/controllers/DistributorProblemController';

const routes = new Router();

routes.get('/delivery/problems', DistributorProblemController.index);
routes.delete(
  '/problem/:id/cancel-delivery',
  DistributorProblemController.delete
);

export default routes;
