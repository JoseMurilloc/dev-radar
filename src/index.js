import express from 'express';

const app = express();

// Routes params são usados quando queremos usar: DELETE ou PUT 

app.delete('/users/:id', (req, res) => {
  console.log(req.params.id);
  return res.json({ dev: true });
});

app.listen(3333);