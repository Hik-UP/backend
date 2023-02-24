import express from 'express';

import { userCtrl } from '../controllers/user/user.controller';
import { validator } from '../middlewares/validator/validator.middleware';
import { userJOI } from '../middlewares/validator/user/user.validator';

function createUserRoutes(): express.Router {
  const userRoutes: express.Router = express.Router();

  userRoutes.post('/profile', validator(userJOI.profile), userCtrl.profile);
  userRoutes.put('/profile/update', validator(userJOI.update), userCtrl.update);

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

  userRoutes.put(
    '/hike/accept',
    validator(userJOI.hike.accept),
    userCtrl.hike.accept
  );
  userRoutes.put(
    '/hike/refuse',
    validator(userJOI.hike.refuse),
    userCtrl.hike.refuse
  );
  return userRoutes;
}

const userRoutes: express.Router = createUserRoutes();

export { userRoutes };
