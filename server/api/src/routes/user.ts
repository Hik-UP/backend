import express from 'express';

import { authentication } from '../middleware/authentication';
import * as userCtrl from '../controllers/user';

function createUserRoutes(): express.Router {
  const userRoutes: express.Router = express.Router();

  userRoutes.post('/signup', userCtrl.signup);
  userRoutes.post('/login', userCtrl.login);
  userRoutes.post('/test', authentication, userCtrl.test);
  return userRoutes;
}

const userRoutes: express.Router = createUserRoutes();

export { userRoutes };
