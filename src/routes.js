import { Router } from 'express';

import DevController from './controllers/DevController';
import SeachController from './controllers/SeachController';

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.create);

routes.get('/seach', SeachController.index);

export default routes;