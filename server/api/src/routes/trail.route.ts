import express from 'express';

import { auth } from '../middlewares/auth.middleware';
import { trailCtrl } from '../controllers/trail/trail.controller';

function createTrailRoutes(): express.Router {
  const trailRoutes: express.Router = express.Router();

  trailRoutes.post('/create', auth, trailCtrl.create);
  trailRoutes.post('/retrieve', auth, trailCtrl.retrieve);
  return trailRoutes;
}

const trailRoutes: express.Router = createTrailRoutes();

export { trailRoutes };
