import express from 'express';

import { trailCtrl } from '../controllers/trail/trail.controller';
import { roleCheck } from '../middlewares/rolesCheck.middleware';

function createTrailRoutes(): express.Router {
  const trailRoutes: express.Router = express.Router();

  trailRoutes.post('/create', roleCheck(['ADMIN']), trailCtrl.create);
  trailRoutes.post('/retrieve', trailCtrl.retrieve);
  return trailRoutes;
}

const trailRoutes: express.Router = createTrailRoutes();

export { trailRoutes };
