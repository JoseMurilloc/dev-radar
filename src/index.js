import express from 'express';
import { connect } from 'mongoose';

import routes from './routes';

import cors from 'cors';
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
      useFindAndModify: false,
    });
  }

  middleware() {
    this.server.use(express.json());
    this.server.use(cors({ origin: 'http://localhost:3000' }));
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
