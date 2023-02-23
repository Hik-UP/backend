import express from 'express';

import { hikeCtrl } from '../controllers/hike/hike.controller';
import { validator } from '../middlewares/validator/validator.middleware';
import { hikeJOI } from '../middlewares/validator/hike/hike.validator';

function createHikeRoutes(): express.Router {
  const hikeRoutes: express.Router = express.Router();

  hikeRoutes.post('/create', validator(hikeJOI.create), hikeCtrl.create);
  hikeRoutes.post('/retrieve', validator(hikeJOI.retrieve), hikeCtrl.retrieve);
  hikeRoutes.put('/accept', validator(hikeJOI.accept), hikeCtrl.accept);
  hikeRoutes.put('/refuse', validator(hikeJOI.refuse), hikeCtrl.refuse);
  return hikeRoutes;
}

const hikeRoutes: express.Router = createHikeRoutes();

export { hikeRoutes };
