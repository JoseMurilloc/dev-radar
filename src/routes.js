import { Router } from 'express';

import DevController from './controllers/DevController';

const routes = Router();

routes.post('/devs', DevController.create);

export default routes;