import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const user = Joi.object({
  username: Joi.string(),
  email: Joi.string(),
  picture: Joi.string()
});

const update = Joi.object({
  user: authJOI.payload.concat(user).min(3)
});

export { update };
