import express from 'express';

import { auth } from '../middlewares/auth.middleware';
import { hikeCtrl } from '../controllers/hike/hike.controller';

function createhikeRoutes(): express.Router {
  const hikeRoutes: express.Router = express.Router();

  hikeRoutes.post('/create', auth, hikeCtrl.create);
  hikeRoutes.post('/retrieve', auth, hikeCtrl.retrieve);
  return hikeRoutes;
}

const hikeRoutes: express.Router = createhikeRoutes();

export { hikeRoutes };
