import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const user = Joi.object({
  username: Joi.string().min(6).max(24),
  email: Joi.string().email().max(256),
  picture: Joi.string().uri().min(16).max(1024)
});

const update = Joi.object({
  user: authJOI.payload.concat(user).min(3)
}).required();

export { update };
