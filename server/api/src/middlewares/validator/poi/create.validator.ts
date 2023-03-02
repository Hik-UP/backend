import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const trail = Joi.object({
  id: Joi.string().min(36).max(36).required()
}).required();

const poi = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
}).required();

const create = Joi.object({
  user: authJOI.payload.required(),
  trail: trail.required(),
  poi: poi.required()
}).required();

export { create };
