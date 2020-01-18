import express from 'express';
import { connect } from 'mongoose';
import http from 'http';

import { setupWebSocket } from './websocket';

import routes from './routes';

import cors from 'cors';
class App {
  constructor() {
    this.app = express();

    this.server = http.Server(this.app);

    setupWebSocket(this.server);

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
    this.app.use(express.json());
    this.app.use(cors());
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
