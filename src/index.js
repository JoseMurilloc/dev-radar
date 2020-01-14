import express from 'express';
import { connect } from 'mongoose';

import routes from './routes';

const app = express();

// Routes params são usados quando queremos usar: DELETE ou PUT 
// Body é usado no POST ou PUT para o envio dos dados do corpo da aplicação

connect('mongodb://localhost/week10', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(routes);

app.listen(3333);