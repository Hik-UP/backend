import express from 'express';

import { skinCtrl } from '../controllers/skin/skin.controller';
import { rolesCheck } from '../middlewares/rolesCheck.middleware';
import { validator } from '../middlewares/validator/validator.middleware';
import { skinJOI } from '../middlewares/validator/skin/skin.validator';

function createSkinRoutes(): express.Router {
  const skinRoutes: express.Router = express.Router();

  skinRoutes.post(
    '/create',
    validator(skinJOI.create),
    rolesCheck(['ADMIN']),
    skinCtrl.create
  );
  skinRoutes.post('/retrieve', validator(skinJOI.retrieve), skinCtrl.retrieve);
  skinRoutes.put(
    '/update-current-skin',
    validator(skinJOI.updateCurrentSkin),
    skinCtrl.updateCurrentSkin
  );
  return skinRoutes;
}

const skinRoutes: express.Router = createSkinRoutes();

export { skinRoutes };
