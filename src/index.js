import express from 'express';
import { connect } from 'mongoose';
import http from 'http';
import 'dotenv/config';

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
    connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongodatabase-efqrb.mongodb.net/test?retryWrites=true&w=majority`, {
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
