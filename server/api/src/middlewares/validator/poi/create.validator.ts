import Joi from 'joi';

import { authJOI } from '../auth/auth.validator';

const trail = Joi.object({
  id: Joi.string().required()
}).required();

const poi = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required()
}).required();

const create = Joi.object({
  user: authJOI.payload,
  trail: trail,
  poi: poi
});

export { create };
