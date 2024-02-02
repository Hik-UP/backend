import express from 'express';

import { signupCtrl } from '../controllers/authentication/signup.controller';
import { loginCtrl } from '../controllers/authentication/login.controller';
import { resetCtrl } from '../controllers/authentication/reset.controller';
import { tokenCtrl } from '../controllers/authentication/resend.controller';
import { validator } from '../middlewares/validator/validator.middleware';
import { authJOI } from '../middlewares/validator/auth/auth.validator';

function createAuthRoutes(): express.Router {
  const authRoutes: express.Router = express.Router();

  authRoutes.post('/signup', validator(authJOI.signup), signupCtrl.signup);
  authRoutes.post('/login', validator(authJOI.login), loginCtrl.login);
  authRoutes.put('/reset', validator(authJOI.reset), resetCtrl.password);
  authRoutes.post('/resend', validator(authJOI.resend), tokenCtrl.resend);
  return authRoutes;
}

const authRoutes: express.Router = createAuthRoutes();

export { authRoutes };
