import express from 'express';

import { userCtrl } from '../controllers/user/user.controller';

function createUserRoutes(): express.Router {
  const userRoutes: express.Router = express.Router();

  userRoutes.post('/profile', userCtrl.profile);

  return userRoutes;
}

const userRoutes: express.Router = createUserRoutes();

export { userRoutes };
