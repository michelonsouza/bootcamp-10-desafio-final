import 'dotenv/config';
import './database';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { resolve } from 'path';

import responseNormalize from './app/middlewares/responseNormalize';

import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(responseNormalize());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
