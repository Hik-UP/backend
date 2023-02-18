import express from 'express';

import { signupCtrl } from '../controllers/authentication/signup.controller';
import { loginCtrl } from '../controllers/authentication/login.controller';
import { validator } from '../middlewares/validator/validator.middleware';
import { authJOI } from '../middlewares/validator/auth/auth.validator';

function createAuthRoutes(): express.Router {
  const authRoutes: express.Router = express.Router();

  authRoutes.post('/signup', validator(authJOI.signup), signupCtrl.signup);
  authRoutes.post('/login', validator(authJOI.login), loginCtrl.login);
  return authRoutes;
}

const authRoutes: express.Router = createAuthRoutes();

export { authRoutes };
