import Joi from 'joi';

import { authJOI } from '../../auth/auth.validator';

const poi = Joi.object({
  id: Joi.string().min(36).max(36).required()
}).required();

const remove = Joi.object({
  user: authJOI.payload.required(),
  poi: poi.required()
}).required();

export { remove };
