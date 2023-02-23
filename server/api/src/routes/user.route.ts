import express from 'express';

import { userCtrl } from '../controllers/user/user.controller';
import { validator } from '../middlewares/validator/validator.middleware';
import { userJOI } from '../middlewares/validator/user/user.validator';

function createUserRoutes(): express.Router {
  const userRoutes: express.Router = express.Router();

  userRoutes.post('/profile', validator(userJOI.profile), userCtrl.profile);
  userRoutes.post(
    '/skin/locked',
    validator(userJOI.skin.locked),
    userCtrl.skin.locked
  );
  userRoutes.post(
    '/skin/unlocked',
    validator(userJOI.skin.unlocked),
    userCtrl.skin.unlocked
  );
  userRoutes.put('/profile/update', validator(userJOI.update), userCtrl.update);
  return userRoutes;
}

const userRoutes: express.Router = createUserRoutes();

export { userRoutes };
