import { Router } from 'express';

import DevController from './controllers/DevController';

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.create);

export default routes;