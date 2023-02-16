import express from 'express';

import { trailCtrl } from '../controllers/trail/trail.controller';
import { rolesCheck } from '../middlewares/rolesCheck.middleware';

function createTrailRoutes(): express.Router {
  const trailRoutes: express.Router = express.Router();

  trailRoutes.post('/create', rolesCheck(['ADMIN']), trailCtrl.create);
  trailRoutes.post('/retrieve', trailCtrl.retrieve);
  trailRoutes.post('/details', trailCtrl.details);
  return trailRoutes;
}

const trailRoutes: express.Router = createTrailRoutes();

export { trailRoutes };
