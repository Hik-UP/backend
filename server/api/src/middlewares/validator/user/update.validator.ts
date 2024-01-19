import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const user = Joi.object({
  username: Joi.string().min(6).max(24),
  email: Joi.string().max(256),
  picture: Joi.string().uri().max(1024),
  fcmToken: Joi.string().max(512)
});

const update = Joi.object({
  user: authJOI.payload.concat(user).min(3).required()
}).required();

export { update };
