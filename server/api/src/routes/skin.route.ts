import express from 'express';

import { skinCtrl } from '../controllers/skin/skin.controller';
import { rolesCheck } from '../middlewares/rolesCheck.middleware';

function createSkinRoutes(): express.Router {
  const skinRoutes: express.Router = express.Router();

  skinRoutes.post('/create', rolesCheck(['ADMIN']), skinCtrl.create);
  skinRoutes.post('/retrieve', skinCtrl.retrieve);
  return skinRoutes;
}

const skinRoutes: express.Router = createSkinRoutes();

export { skinRoutes };
