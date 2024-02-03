import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const other = Joi.object({
  email: Joi.string().max(256).required()
}).required();

const check = Joi.object({
  user: authJOI.payload.required(),
  other: other.required()
}).required();

export { check };
