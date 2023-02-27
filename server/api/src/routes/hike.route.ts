import express from 'express';

import { hikeCtrl } from '../controllers/hike/hike.controller';
import { validator } from '../middlewares/validator/validator.middleware';
import { hikeJOI } from '../middlewares/validator/hike/hike.validator';

function createHikeRoutes(): express.Router {
  const hikeRoutes: express.Router = express.Router();

  hikeRoutes.post('/create', validator(hikeJOI.create), hikeCtrl.create);
  hikeRoutes.post('/retrieve', validator(hikeJOI.retrieve), hikeCtrl.retrieve);
  hikeRoutes.put('/update', validator(hikeJOI.update), hikeCtrl.update);
  hikeRoutes.put('/leave', validator(hikeJOI.leave), hikeCtrl.leave);
  hikeRoutes.delete('/remove', validator(hikeJOI.remove), hikeCtrl.remove);
  return hikeRoutes;
}

const hikeRoutes: express.Router = createHikeRoutes();

export { hikeRoutes };
