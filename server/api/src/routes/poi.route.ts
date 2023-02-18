import express from 'express';

import { poiCtrl } from '../controllers/poi/poi.controller';
import { validator } from '../middlewares/validator/validator.middleware';
import { poiJOI } from '../middlewares/validator/poi/poi.validator';

function createPOIRoutes(): express.Router {
  const POIRoutes: express.Router = express.Router();

  POIRoutes.post('/create', validator(poiJOI.create), poiCtrl.create);
  POIRoutes.post('/retrieve', validator(poiJOI.retrieve), poiCtrl.retrieve);
  return POIRoutes;
}

const POIRoutes: express.Router = createPOIRoutes();

export { POIRoutes };
