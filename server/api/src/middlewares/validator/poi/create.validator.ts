import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const trail = Joi.object({
  id: Joi.string().required()
}).required();

const poi = Joi.object({
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required()
}).required();

const create = Joi.object({
  user: authJOI.payload,
  trail: trail,
  poi: poi
});

export { create };
