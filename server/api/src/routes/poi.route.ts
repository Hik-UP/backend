import express from 'express';

import { poiCtrl } from '../controllers/poi/poi.controller';

function createPOIRoutes(): express.Router {
  const POIRoutes: express.Router = express.Router();

  POIRoutes.post('/create', poiCtrl.create);
  POIRoutes.post('/retrieve', poiCtrl.retrieve);
  return POIRoutes;
}

const POIRoutes: express.Router = createPOIRoutes();

export { POIRoutes };
