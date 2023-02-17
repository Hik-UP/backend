import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const user = Joi.object({
  username: Joi.string().min(8).max(24),
  email: Joi.string().email().min(16).max(256),
  picture: Joi.string().uri().min(16).max(1024)
});

const update = Joi.object({
  user: authJOI.payload.concat(user).min(3)
});

export { update };
