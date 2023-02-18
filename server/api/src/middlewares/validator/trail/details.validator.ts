import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const user = Joi.object({
  weight: Joi.number().min(24).max(512).required(),
  tall: Joi.number().min(24).max(512).required(),
  sex: Joi.string().min(1).max(1).required(),
  age: Joi.number().min(0).max(128).required()
}).required();

const trail = Joi.object({
  id: Joi.string().min(36).max(36).required()
}).required();

const details = Joi.object({
  user: authJOI.payload.concat(user),
  trail: trail
}).required();

export { details };
