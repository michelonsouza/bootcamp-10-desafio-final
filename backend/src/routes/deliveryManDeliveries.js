import { Router } from 'express';
import multer from 'multer';

import DeliveryManDeliveriesController from '../app/controllers/DeliverymanDeliveriesController';
import FileController from '../app/controllers/FileController';
import multerConfig from '../config/multer';

const routes = new Router();

const upload = multer(multerConfig);

routes.get(
  '/deliveryman/:id/deliveries',
  DeliveryManDeliveriesController.index
);

routes.post(
  '/deliveryman/:id/deliveries/:deliveryId',
  DeliveryManDeliveriesController.store
);

routes.put(
  '/deliveryman/:id/deliveries/:deliveryId',
  DeliveryManDeliveriesController.update
);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
