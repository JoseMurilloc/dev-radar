import express from 'express';

const app = express();

// Routes params são usados quando queremos usar: DELETE ou PUT 
// Body é usado no POST ou PUT para o envio dos dados do corpo da aplicação

app.use(express.json());

app.post('/users', (req, res) => {
  const user = req.body;
  return res.json(user);
});

app.listen(3333);