import express from 'express';

import { signupCtrl } from '../controllers/authentication/signup.controller';
import { loginCtrl } from '../controllers/authentication/login.controller';

function createAuthRoutes(): express.Router {
  const authRoutes: express.Router = express.Router();

  authRoutes.post('/signup', signupCtrl.signup);
  authRoutes.post('/login', loginCtrl.login);
  return authRoutes;
}

const authRoutes: express.Router = createAuthRoutes();

export { authRoutes };
