import express from 'express';

const app = express();

app.get('/', (req, res) => {
  return res.json({ dev: true });
});

app.listen(3333);