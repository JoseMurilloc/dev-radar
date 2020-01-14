import express from 'express';
import { connect } from 'mongoose';

import routes from './routes';


class App {
  constructor() {
    this.app = express();

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
    this.app.use(express.json());
  }

  routes() {
    this.app.use(routes);
  }
}

new App().app.listen(3333);
