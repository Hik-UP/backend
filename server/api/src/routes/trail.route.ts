import express from 'express';

import { trailCtrl } from '../controllers/trail/trail.controller';
import { rolesCheck } from '../middlewares/rolesCheck.middleware';
import { validator } from '../middlewares/validator/validator.middleware';
import { trailJOI } from '../middlewares/validator/trail/trail.validator';

function createTrailRoutes(): express.Router {
  const trailRoutes: express.Router = express.Router();

  trailRoutes.post(
    '/create',
    validator(trailJOI.create),
    rolesCheck(['ADMIN']),
    trailCtrl.create
  );
  trailRoutes.post(
    '/retrieve',
    validator(trailJOI.retrieve),
    trailCtrl.retrieve
  );
  trailRoutes.post('/details', validator(trailJOI.details), trailCtrl.details);

  trailRoutes.post(
    '/comment/create',
    validator(trailJOI.comment.create),
    trailCtrl.comment.create
  );
  trailRoutes.put(
    '/comment/update',
    validator(trailJOI.comment.update),
    trailCtrl.comment.update
  );
  trailRoutes.delete(
    '/comment/remove',
    validator(trailJOI.comment.remove),
    trailCtrl.comment.remove
  );
  return trailRoutes;
}

const trailRoutes: express.Router = createTrailRoutes();

export { trailRoutes };
