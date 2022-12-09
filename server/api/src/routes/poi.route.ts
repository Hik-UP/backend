import express from 'express';

import { auth } from '../middlewares/auth.middleware';
import { poiCtrl } from '../controllers/poi/poi.controller';

function createPOIRoutes(): express.Router {
  const POIRoutes: express.Router = express.Router();

  POIRoutes.post('/create', auth, poiCtrl.create);
  return POIRoutes;
}

const POIRoutes: express.Router = createPOIRoutes();

export { POIRoutes };
