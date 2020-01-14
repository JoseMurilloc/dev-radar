import express from 'express';
import { connect } from 'mongoose';

import routes from './routes';


class App {
  constructor() {
    this.server = express();

    this.database();
    this.middleware();
    this.routes();
  }

  database() {
    connect('mongodb://localhost/week10', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }

  middleware() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
