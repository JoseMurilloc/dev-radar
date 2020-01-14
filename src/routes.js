import { Router } from 'express';

const routes = Router();

routes.post('/users', (req, res) => {
  const user = req.body;
  return res.json(user);
});

export default routes;